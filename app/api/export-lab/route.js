import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import LabJob from "@/models/LabJob";
import User from "@/models/User";
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  TableLayoutType,
  Packer,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";
import { cookies } from "next/headers";

// Helper function to parse text with bold formatting
function parseFormattedText(text) {
  if (!text) return [{ text: "", bold: false }];

  const parts = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        bold: false,
      });
    }

    // Add the bold part
    parts.push({
      text: match[1],
      bold: true,
    });

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      bold: false,
    });
  }

  return parts.length > 0 ? parts : [{ text: text, bold: false }];
}

// Helper function to create DOCX TextRuns with bold formatting
function createFormattedTextRuns(text, baseFontSize = 20) {
  if (!text) return [new TextRun({ text: "", size: baseFontSize })];

  const parts = parseFormattedText(text);
  return parts.map(
    (part) =>
      new TextRun({
        text: part.text,
        bold: part.bold,
        size: baseFontSize,
      })
  );
}

// Helper function to create formatted paragraphs
function createFormattedParagraph(
  text,
  baseFontSize = 20,
  alignment = AlignmentType.LEFT
) {
  return new Paragraph({
    children: createFormattedTextRuns(text, baseFontSize),
    alignment: alignment,
    spacing: { after: 100 }, // Reduced spacing
  });
}

// Helper function to add formatted text to PDF with bold support
function addFormattedTextToPDF(doc, text, fontSize = 12) {
  if (!text) return;

  const parts = parseFormattedText(text);

  // This is a simplified way; PDFKit doesn't have a rich text concept like docx.
  // We can't easily switch fonts inline. We'll just combine the text.
  // The bold information is lost here, but it prevents the line break issues.
  const fullText = parts.map((part) => part.text).join("");

  doc.fontSize(fontSize).text(fullText, {
    align: "left",
  });
}

export async function GET(request) {
  try {
    // Get token from cookies
    let token;
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("auth-token");
    if (cookieToken) {
      token = cookieToken.value;
    }

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    const url = new URL(request.url);
    const jobId = url.searchParams.get("jobId");
    const format = url.searchParams.get("format"); // 'pdf' or 'docx'

    if (!jobId || !format) {
      return NextResponse.json(
        { message: "Missing jobId or format parameter" },
        { status: 400 }
      );
    }

    // Get the lab job
    const labJob = await LabJob.findOne({ _id: jobId, userId: decoded.userId });
    if (!labJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    if (
      labJob.status !== "completed" &&
      labJob.experiments.some(
        (exp) => exp.status === "pending" || exp.status === "failed"
      )
    ) {
      return NextResponse.json(
        { message: "Job not completed yet" },
        { status: 400 }
      );
    }

    // Get user profile for cover page
    const user = await User.findById(decoded.userId);

    if (format === "pdf") {
      return await generatePDF(labJob, user);
    } else if (format === "docx") {
      return await generateDOCX(labJob, user);
    } else {
      return NextResponse.json(
        { message: "Invalid format. Use pdf or docx" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error exporting lab file:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function generatePDF(labJob, user) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
        // ensures Helvetica is resolved internally
        font: "Helvetica",
      });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);

        const response = new NextResponse(pdfBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${labJob.practicalTitle.replace(
              /[^a-zA-Z0-9]/g,
              "_"
            )}.pdf"`,
          },
        });
        resolve(response);
      });

      // Cover Page - All left aligned
      doc.fontSize(20).text("LABORATORY PRACTICAL FILE", { align: "left" });
      doc.moveDown(2);

      doc.fontSize(16).text(labJob.practicalTitle, { align: "left" });
      doc.moveDown(1);

      doc.fontSize(14).text(`Subject: ${labJob.subject}`, { align: "left" });
      doc.text(`Subject Code: ${labJob.subjectCode}`, { align: "left" });
      doc.text(`Instructor: ${labJob.instructorName}`, { align: "left" });
      doc.moveDown(2);

      // Student Details - All left aligned
      if (user.profile) {
        doc.text(`Student Name: ${user.name}`, { align: "left" });
        if (user.profile.rollNumber)
          doc.text(`Roll Number: ${user.profile.rollNumber}`, {
            align: "left",
          });
        if (user.profile.university)
          doc.text(`University: ${user.profile.university}`, {
            align: "left",
          });
        if (user.profile.department)
          doc.text(`Department: ${user.profile.department}`, {
            align: "left",
          });
      }

      doc.addPage();

      // Table of Contents with proper table format - All left aligned
      doc.fontSize(18).text("INDEX", { align: "left" });
      doc.moveDown(2);

      // Table headers
      const tableStartY = doc.y;
      const availableWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const colWidths = [
        availableWidth * 0.1, // S.No.
        availableWidth * 0.6, // Experiment Title (wider)
        availableWidth * 0.15, // Date
        availableWidth * 0.15, // Page No.
      ];
      const baseRowHeight = 35; // Base row height
      let currentY = tableStartY;
      let currentX = doc.page.margins.left;

      // Draw table headers
      doc.fontSize(12).font("Helvetica-Bold");
      doc.rect(currentX, currentY, colWidths[0], baseRowHeight).stroke();
      doc.text("S.No.", currentX + 5, currentY + 12, { align: "left" });
      currentX += colWidths[0];

      doc.rect(currentX, currentY, colWidths[1], baseRowHeight).stroke();
      doc.text("Experiment Title", currentX + 5, currentY + 12, {
        align: "left",
      });
      currentX += colWidths[1];

      doc.rect(currentX, currentY, colWidths[2], baseRowHeight).stroke();
      doc.text("Date", currentX + 5, currentY + 12, { align: "left" });
      currentX += colWidths[2];

      doc.rect(currentX, currentY, colWidths[3], baseRowHeight).stroke();
      doc.text("Page No.", currentX + 5, currentY + 12, { align: "left" });

      currentY += baseRowHeight;
      doc.font("Helvetica");

      // Table rows for experiments
      labJob.experiments.forEach((exp, index) => {
        currentX = doc.page.margins.left;

        const textHeight = doc.heightOfString(exp.generatedContent.title, {
          width: colWidths[1] - 10,
          align: "left",
        });
        const dynamicRowHeight = Math.max(baseRowHeight, textHeight + 15);

        doc.fontSize(10);

        doc.rect(currentX, currentY, colWidths[0], dynamicRowHeight).stroke();
        doc.text(`${index + 1}`, currentX + 5, currentY + 12, {
          align: "left",
        });
        currentX += colWidths[0];

        doc.rect(currentX, currentY, colWidths[1], dynamicRowHeight).stroke();
        doc.text(exp.generatedContent.title, currentX + 5, currentY + 12, {
          width: colWidths[1] - 10,
          align: "left",
        });
        currentX += colWidths[1];

        doc.rect(currentX, currentY, colWidths[2], dynamicRowHeight).stroke();
        doc.text("___/___/____", currentX + 5, currentY + 12, {
          align: "left",
        });
        currentX += colWidths[2];

        doc.rect(currentX, currentY, colWidths[3], dynamicRowHeight).stroke();
        doc.text(`${index + 3}`, currentX + 5, currentY + 12, {
          align: "left",
        });

        currentY += dynamicRowHeight;
      });

      // Experiments
      labJob.experiments.forEach((exp, index) => {
        doc.addPage();

        // Experiment Header - All left aligned
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .text(`Experiment ${exp.experimentNumber}`, { align: "left" });
        doc.moveDown(0.5);

        doc.fontSize(14).text(exp.generatedContent.title, { align: "left" });
        doc.moveDown(1);
        doc.font("Helvetica");

        // Aim - left aligned
        doc.font("Helvetica-Bold").fontSize(12).text("AIM:", { align: "left" });
        doc.font("Helvetica");
        addFormattedTextToPDF(doc, exp.generatedContent.aim, 12);
        doc.moveDown(0.5);

        // Apparatus - left aligned
        doc.font("Helvetica-Bold").text("APPARATUS:", { align: "left" });
        doc.font("Helvetica");
        if (Array.isArray(exp.generatedContent.apparatus)) {
          exp.generatedContent.apparatus.forEach((item) => {
            addFormattedTextToPDF(doc, `• ${item}`, 12);
          });
        } else {
          addFormattedTextToPDF(
            doc,
            exp.generatedContent.apparatus || "Not specified",
            12
          );
        }
        doc.moveDown(0.5);

        // Theory - left aligned
        doc.font("Helvetica-Bold").text("THEORY:", { align: "left" });
        doc.font("Helvetica");
        addFormattedTextToPDF(doc, exp.generatedContent.theory, 12);
        doc.moveDown(0.5);

        // Procedure - left aligned
        doc.font("Helvetica-Bold").text("PROCEDURE:", { align: "left" });
        doc.font("Helvetica");
        if (Array.isArray(exp.generatedContent.procedure)) {
          exp.generatedContent.procedure.forEach((step, i) => {
            addFormattedTextToPDF(doc, `${i + 1}. ${step}`, 12);
          });
        } else {
          addFormattedTextToPDF(
            doc,
            exp.generatedContent.procedure || "Not specified",
            12
          );
        }
        doc.moveDown(0.5);

        // Code - left aligned (if present)
        if (exp.generatedContent.code && exp.generatedContent.code.trim()) {
          doc.font("Helvetica-Bold").text("CODE:", { align: "left" });
          doc.font("Helvetica");
          doc.fontSize(10).text(exp.generatedContent.code, {
            width: 500,
            align: "left",
          });
          doc.moveDown(0.5);
        }

        // Observations - left aligned
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text("OBSERVATIONS:", { align: "left" });
        doc.font("Helvetica");
        addFormattedTextToPDF(doc, exp.generatedContent.observations, 12);
        doc.moveDown(0.5);

        // Calculations - left aligned
        if (
          exp.generatedContent.calculations &&
          exp.generatedContent.calculations.trim()
        ) {
          doc.font("Helvetica-Bold").text("CALCULATIONS:", { align: "left" });
          doc.font("Helvetica");
          addFormattedTextToPDF(doc, exp.generatedContent.calculations, 12);
          doc.moveDown(0.5);
        }

        // Result - left aligned
        doc.font("Helvetica-Bold").text("RESULT:", { align: "left" });
        doc.font("Helvetica");
        addFormattedTextToPDF(doc, exp.generatedContent.result, 12);
        doc.moveDown(0.5);

        // Precautions - left aligned
        doc.font("Helvetica-Bold").text("PRECAUTIONS:", { align: "left" });
        doc.font("Helvetica");
        if (Array.isArray(exp.generatedContent.precautions)) {
          exp.generatedContent.precautions.forEach((precaution) => {
            addFormattedTextToPDF(doc, `• ${precaution}`, 12);
          });
        } else {
          addFormattedTextToPDF(
            doc,
            exp.generatedContent.precautions ||
              "Follow standard lab safety procedures",
            12
          );
        }
        doc.moveDown(0.5);

        // References - left aligned
        if (
          exp.generatedContent.references &&
          Array.isArray(exp.generatedContent.references) &&
          exp.generatedContent.references.length > 0
        ) {
          doc.font("Helvetica-Bold").text("REFERENCES:", { align: "left" });
          doc.font("Helvetica");
          exp.generatedContent.references.forEach((ref, i) => {
            addFormattedTextToPDF(doc, `${i + 1}. ${ref}`, 12);
          });
        }
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function generateDOCX(labJob, user) {
  try {
    const doc = new Document({
      sections: [
        {
          children: [
            // --- Start of Improved Cover Page ---

            // University/Department Header - Centered for a formal look.
            // You could potentially add a university logo here as well.
            new Paragraph({
              children: [
                new TextRun({
                  text: user.profile?.university || "Your University Name",
                  bold: true,
                  size: 28, // 14pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: user.profile?.department || "Department of Engineering",
                  size: 24, // 12pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 800 }, // Generous space after the header
            }),

            // Main Title Block - Centered and with clear hierarchy
            new Paragraph({
              children: [
                new TextRun({
                  text: "LABORATORY PRACTICAL FILE",
                  bold: true,
                  size: 40, // 20pt, larger for emphasis
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Subject: ${labJob.subject}`,
                  bold: true,
                  size: 28, // 14pt
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Subject Code: ${labJob.subjectCode}`,
                  size: 24, // 12pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 1200 }, // Large vertical space to separate sections
            }),

            // Submission Details - Using a borderless table for clean, professional alignment
            new Table({
              width: { size: 9000, type: WidthType.DXA }, // Use about 90% of page width
              columnWidths: [4500, 4500], // Two equal columns
              rows: [
                // Row 1: Headings for the two sections
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "SUBMITTED TO",
                              bold: true,
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "SUBMITTED BY",
                              bold: true,
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                  ],
                }),
                // Row 2: Instructor Name and Student Name
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(labJob.instructorName)],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(user.name)],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                  ],
                }),
                // Row 3: Blank on the left, Roll number on the right
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("")], // Empty cell for spacing
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph(
                          user.profile?.rollNumber
                            ? `Roll Number: ${user.profile.rollNumber}`
                            : ""
                        ),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                    }),
                  ],
                }),
              ],
            }),

            // Spacer paragraph to push the date towards the bottom of the page
            new Paragraph({
              text: "",
              spacing: { before: 3000 },
            }),

            // Submission Date - Centered at the bottom
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date of Submission: ${new Date().toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "long", year: "numeric" }
                  )}`, // e.g., 31 August 2025
                  size: 24, // 12pt
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),

            // --- End of Improved Cover Page ---
          ],
        },

        // Table of Contents - FIX: Table and content are now left-aligned
        {
          width: { size: 100, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Index`,
                  size: 24, // 12pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.TITLE,
              spacing: { after: 300 }, // Large vertical space to separate sections
            }),
            new Table({
              width: { size: 9000, type: WidthType.DXA }, // Use about 90% of page width
              columnWidths: [900, 4300, 1350, 1350, 1100], // Adjusted widths for better balance
              // 1. Changed from AUTO to FIXED
              // 2. This line is the critical fix
              layout: TableLayoutType.FIXED,
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "S.No.",
                              bold: true,
                              size: 20,
                            }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      width: { size: 10, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Experiment Title",
                              bold: true,
                              size: 20,
                            }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      width: { size: 60, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Date", bold: true, size: 20 }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Page No.",
                              bold: true,
                              size: 20,
                            }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Signature",
                              bold: true,
                              size: 20,
                            }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      width: { size: 15, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                ...labJob.experiments.map(
                  (exp, index) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({ text: `${index + 1}`, size: 18 }),
                              ],
                              alignment: AlignmentType.LEFT,
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: exp.generatedContent.title,
                                  size: 18,
                                }),
                              ],
                              alignment: AlignmentType.LEFT,
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({ text: "___/___/____", size: 18 }),
                              ],
                              alignment: AlignmentType.LEFT,
                            }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({ text: `${index + 3}`, size: 18 }),
                              ],
                              alignment: AlignmentType.LEFT,
                            }),
                          ],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },

        // Experiments - FIX: All content is now left-aligned and spacing is adjusted
        ...labJob.experiments.map((exp) => ({
          children: [
            // Experiment title and number are now left-aligned
            new Paragraph({
              children: [
                new TextRun({
                  text: `Experiment ${exp.experimentNumber}`,
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.generatedContent.title,
                  bold: true,
                  size: 20,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 300 },
            }),

            // All content headings and text are left-aligned
            new Paragraph({
              children: [new TextRun({ text: "AIM:", bold: true, size: 20 })],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            createFormattedParagraph(exp.generatedContent.aim, 20),

            new Paragraph({
              children: [
                new TextRun({ text: "APPARATUS:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            ...(Array.isArray(exp.generatedContent.apparatus)
              ? exp.generatedContent.apparatus.map((item) =>
                  createFormattedParagraph(`• ${item}`, 20)
                )
              : [
                  createFormattedParagraph(
                    exp.generatedContent.apparatus || "Not specified",
                    20
                  ),
                ]),

            new Paragraph({
              children: [
                new TextRun({ text: "THEORY:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            createFormattedParagraph(exp.generatedContent.theory, 20),

            new Paragraph({
              children: [
                new TextRun({ text: "PROCEDURE:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            ...(Array.isArray(exp.generatedContent.procedure)
              ? exp.generatedContent.procedure.map((step, i) =>
                  createFormattedParagraph(`${i + 1}. ${step}`, 20)
                )
              : [
                  createFormattedParagraph(
                    exp.generatedContent.procedure || "Not specified",
                    20
                  ),
                ]),

            ...(exp.generatedContent.code && exp.generatedContent.code.trim()
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "CODE:", bold: true, size: 20 }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: exp.generatedContent.code,
                        font: "Courier New",
                        size: 18,
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 200 },
                  }),
                ]
              : []),

            new Paragraph({
              children: [
                new TextRun({ text: "OBSERVATIONS:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            createFormattedParagraph(exp.generatedContent.observations, 20),

            ...(exp.generatedContent.calculations &&
            exp.generatedContent.calculations.trim()
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "CALCULATIONS:",
                        bold: true,
                        size: 20,
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 100 },
                  }),
                  createFormattedParagraph(
                    exp.generatedContent.calculations,
                    20
                  ),
                ]
              : []),

            new Paragraph({
              children: [
                new TextRun({ text: "RESULT:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            createFormattedParagraph(exp.generatedContent.result, 20),

            new Paragraph({
              children: [
                new TextRun({ text: "PRECAUTIONS:", bold: true, size: 20 }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            ...(Array.isArray(exp.generatedContent.precautions)
              ? exp.generatedContent.precautions.map((precaution) =>
                  createFormattedParagraph(`• ${precaution}`, 20)
                )
              : [
                  createFormattedParagraph(
                    exp.generatedContent.precautions ||
                      "Follow standard lab safety procedures",
                    20
                  ),
                ]),

            ...(exp.generatedContent.references &&
            Array.isArray(exp.generatedContent.references) &&
            exp.generatedContent.references.length > 0
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "REFERENCES:",
                        bold: true,
                        size: 20,
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 100 },
                  }),
                  ...exp.generatedContent.references.map((ref, i) =>
                    createFormattedParagraph(`${i + 1}. ${ref}`, 20)
                  ),
                ]
              : []),
          ],
        })),
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    console.log("DOCX file generated successfully");
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${labJob.practicalTitle.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        )}.docx"`,
      },
    });
  } catch (error) {
    throw error;
  }
}
