import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import LabJob from "@/models/LabJob";
import User from "@/models/User";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  OutputFixingParser,
  StructuredOutputParser,
} from "langchain/output_parsers";
import { z } from "zod";
import { cookies } from "next/headers";

// Define the expected output structure
const experimentSchema = z.object({
  title: z.string().describe("The experiment title"),
  aim: z.string().describe("The aim/objective of the experiment"),
  apparatus: z
    .array(z.string())
    .describe("List of apparatus/materials required"),
  theory: z.string().describe("Theoretical background of the experiment"),
  procedure: z.array(z.string()).describe("Step-by-step procedure"),
  code: z.string().optional().describe("Code snippets as plain text (no markdown formatting)"),
  codeOutput: z.string().describe("Terminal-style code output showing program execution with sample data and results"),
  observations: z.string().describe("Actual observations with outputs and results"),
  calculations: z.string().describe("Relevant calculations or formulas"),
  result: z.string().describe("What was accomplished and learned"),
  precautions: z
    .array(z.string())
    .describe("Safety precautions and important notes"),
  references: z.array(z.string()).describe("References or sources"),
});

export async function POST(request) {
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

    const body = await request.json();
    const { jobId, experimentIndex } = body;

    // Get the lab job
    const labJob = await LabJob.findOne({ _id: jobId, userId: decoded.userId });
    if (!labJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Get the specific experiment
    const experiment = labJob.experiments[experimentIndex];
    if (!experiment) {
      return NextResponse.json(
        { message: "Experiment not found" },
        { status: 404 }
      );
    }

    // Check if already processed
    if (experiment.status === "completed") {
      return NextResponse.json({
        message: "Experiment already processed",
        result: experiment.generatedContent,
      });
    }

    // Get user and decrypt Gemini API key using the model method
    const user = await User.findById(decoded.userId);
    if (!user || !user.geminiApiKey) {
      return NextResponse.json(
        { message: "Gemini API key not found" },
        { status: 400 }
      );
    }

    const decryptedApiKey = user.decryptGeminiKey();
    if (!decryptedApiKey) {
      return NextResponse.json(
        { message: "Failed to decrypt Gemini API key" },
        { status: 400 }
      );
    }

    // Update experiment status to processing
    labJob.experiments[experimentIndex].status = "processing";
    await labJob.save();
    console.log("Processing experiment:", experimentIndex, " Of job:", jobId);

    try {
      // Initialize LangChain with Google Gemini
      const model = new ChatGoogleGenerativeAI({
        apiKey: decryptedApiKey,
        model: "gemini-1.5-flash",
        temperature: 0.3,
      });

      // Create structured output parser
      const parser = StructuredOutputParser.fromZodSchema(experimentSchema);
      const fixingParser = OutputFixingParser.fromLLM(model, parser);

      // Create prompt template
      const prompt = PromptTemplate.fromTemplate(
        `Write a detailed lab report for a computer science practical experiment in an Indian university. The report should be professional, academic, and written in third person or general passive voice.

Subject: {subject} ({subjectCode})
Instructor: {instructorName}
Practical Title: {practicalTitle}

Experiment {experimentNumber}: {title}
Objective: {aim}
Additional Context: {additionalNotes}

CRITICAL WRITING GUIDELINES:
- Write in THIRD PERSON or PASSIVE VOICE ("The experiment was conducted...", "The algorithm was implemented...", "Results were obtained...")
- Use **bold formatting** generously for headings, key terms, important values, and section titles
- Include REAL, working code examples with actual sample outputs and results
- NEVER use markdown code blocks (triple backticks) - return all code as plain text
- Write observations based on actual execution results
- Include specific details like execution times, memory usage, error handling
- Use professional academic language appropriate for computer science
- Mention implementation challenges and their solutions
- Reference standard algorithms and methodologies
- Keep text concise and avoid excessive spacing between paragraphs
- FOR DS/ALGORITHM LABS: ALWAYS include comprehensive terminal output showing data structure operations, algorithm execution steps, and results

DETAILED CONTENT REQUIREMENTS:

**Title**: Write as "**{title}**"

**Aim**: Start with "**The aim of this experiment was to...**" - describe the objective in general terms

**Apparatus**: List with **bold** software/hardware names:
- **Software**: Include specific versions (e.g., **Python 3.11**, **VS Code**, **Windows 11**)
- **Hardware**: Mention typical computer specifications
- **Libraries**: List packages used with versions

**Theory**: Explain the theoretical concepts involved:
- **Key concepts** and **algorithms** in bold
- **Mathematical formulations** and **complexity analysis**
- **Real-world applications** and use cases
- Reference standard textbook concepts and definitions
- Explain how the algorithm/concept works step by step

**Procedure**: Write step-by-step methodology:
- "**Step 1**: The development environment was set up..."
- "**Step 2**: The algorithm was implemented using..."
- Include actual commands and setup procedures
- Mention IDE configuration and debugging approaches

**Code**: Include complete, runnable code examples as PLAIN TEXT ONLY:
- Add **comments** explaining key sections
- NEVER use markdown backticks or triple backticks for code blocks
- Return code as plain text without any formatting symbols
- Show **multiple code sections** separated by newlines if needed

**Code Output** (MANDATORY for DS/Programming Labs): For Data Structures, Algorithms, Programming, and similar practical experiments, ALWAYS provide terminal output:
- Start with the command used to run the program (e.g., "python filename.py", "javac Program.java && java Program", "gcc program.c -o program && ./program")
- Show the exact output as it would appear in a terminal with sample data
- Include multiple test cases and their outputs
- Show any user input prompts and responses
- End with "Program exited with code 0" (or appropriate exit code)
- Format it exactly like a terminal session
- For DS labs: Show data structure operations, insertions, deletions, traversals, etc.
- For Algorithm labs: Show step-by-step execution, sorting processes, search results, etc.
- Even if the program just prints "Hello World", include the terminal output

**Observations**: Document what was observed during execution:
- **Actual output** with sample data and results
- **Performance metrics** (execution time, memory usage)
- **Error handling** scenarios that were tested
- **Behavioral patterns** and edge cases
- **Comparison** between expected and actual results

**Calculations**: If applicable, include:
- **Mathematical derivations** and formulas used
- **Complexity analysis** (time and space)
- **Performance measurements** and benchmarks

**Result**: Summarize what was accomplished:
- "**The experiment successfully demonstrated...**"
- **Key outcomes** and **conclusions** in bold
- **Technical insights** gained from the implementation

**Precautions**: List important considerations:
- **Safety measures** for system resources
- **Best practices** followed during implementation
- **Common pitfalls** to avoid in similar implementations

**References**: Include academic sources:
- **Standard CS textbooks** (Cormen, Tanenbaum, etc.)
- **Online documentation** and official resources
- **Research papers** and academic publications

Write this as a professional lab report with technical accuracy, proper methodology, and clear explanations of concepts and implementations. Keep content concise and well-structured.

{format_instructions}`
      );

      const formatInstructions = parser.getFormatInstructions();

      // Add subject-specific instructions for programming labs
      const subjectLower = labJob.subject.toLowerCase();
      const isProgrammingLab = subjectLower.includes('data structure') || 
                              subjectLower.includes('algorithm') || 
                              subjectLower.includes('programming') || 
                              subjectLower.includes('computer') ||
                              subjectLower.includes('software') ||
                              subjectLower.includes('coding') ||
                              labJob.subjectCode.toLowerCase().includes('cs') ||
                              labJob.subjectCode.toLowerCase().includes('it') ||
                              labJob.subjectCode.toLowerCase().includes('cse');

      const additionalInstructions = isProgrammingLab ? 
        "\n\nSPECIAL REQUIREMENT: This is a programming/CS lab. You MUST include detailed terminal output showing program execution, test cases, and results. The codeOutput field is mandatory and should demonstrate the program working with sample data." : 
        "";

      const formattedPrompt = await prompt.format({
        subject: labJob.subject,
        subjectCode: labJob.subjectCode,
        instructorName: labJob.instructorName,
        practicalTitle: labJob.practicalTitle,
        experimentNumber: experiment.experimentNumber,
        title: experiment.title,
        aim: experiment.aim,
        additionalNotes: experiment.additionalNotes,
        format_instructions: formatInstructions + additionalInstructions,
      });

      const response = await model.invoke(formattedPrompt);
      
      // Clean the response content to remove markdown code blocks
      let cleanedContent = response.content;
      
      // Remove markdown code blocks (```language...```) and replace with plain text
      cleanedContent = cleanedContent.replace(/```[\w]*\n?([\s\S]*?)\n?```/g, '$1');
      
      // Remove any remaining standalone backticks that might break JSON
      cleanedContent = cleanedContent.replace(/`/g, '');
      
      const parsedResult = await fixingParser.parse(cleanedContent);

      console.log("Parsed Result:", parsedResult);

      // Validation: Ensure codeOutput is present for programming labs
      if (isProgrammingLab && (!parsedResult.codeOutput || parsedResult.codeOutput.trim().length === 0)) {
        // Retry with more explicit instruction
        const retryPrompt = formattedPrompt + "\n\nIMPORTANT: You FAILED to provide the required terminal output. Please regenerate with a comprehensive codeOutput section showing program execution with sample data, test cases, and 'Program exited with code 0'.";
        
        const retryResponse = await model.invoke(retryPrompt);
        let retryCleanedContent = retryResponse.content;
        retryCleanedContent = retryCleanedContent.replace(/```[\w]*\n?([\s\S]*?)\n?```/g, '$1');
        retryCleanedContent = retryCleanedContent.replace(/`/g, '');
        
        const retryParsedResult = await fixingParser.parse(retryCleanedContent);
        
        // If still no codeOutput, add a default one
        if (!retryParsedResult.codeOutput || retryParsedResult.codeOutput.trim().length === 0) {
          retryParsedResult.codeOutput = `$ python ${experiment.title.toLowerCase().replace(/\s+/g, '_')}.py
Program executed successfully with sample data
Test case 1: Input processed
Test case 2: Expected output generated
All operations completed successfully
Program exited with code 0`;
        }
        
        parsedResult.codeOutput = retryParsedResult.codeOutput;
      }

      // Update experiment with result
      labJob.experiments[experimentIndex].status = "completed";
      labJob.experiments[experimentIndex].generatedContent = parsedResult;
      labJob.experiments[experimentIndex].error = null;
      labJob.progress.completed = labJob.experiments.filter(
        (exp) => exp.status === "completed"
      ).length;

      // Check if all experiments are completed
      const allCompleted = labJob.experiments.every(
        (exp) => exp.status === "completed"
      );
      if (allCompleted) {
        labJob.status = "completed";
        labJob.completedAt = new Date();
      } else {
        labJob.status = "processing";
      }

      await labJob.save();

      return NextResponse.json({
        message: "Experiment processed successfully",
        result: parsedResult,
        experimentIndex,
        allCompleted,
      });
    } catch (aiError) {
      console.error("AI processing error:", aiError);

      // Update experiment with error
      labJob.experiments[experimentIndex].status = "failed";
      labJob.experiments[experimentIndex].error =
        aiError.message || "AI processing failed";
      labJob.experiments[experimentIndex].retryCount += 1;
      await labJob.save();

      return NextResponse.json(
        {
          message: "AI processing failed",
          error: aiError.message,
          experimentIndex,
          canRetry: true,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing experiment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Retry endpoint for failed experiments
export async function PATCH(request) {
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

    const body = await request.json();
    const { jobId, experimentIndex } = body;

    // Get the lab job
    const labJob = await LabJob.findOne({ _id: jobId, userId: decoded.userId });
    if (!labJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Reset experiment status to pending for retry
    if (labJob.experiments[experimentIndex]) {
      labJob.experiments[experimentIndex].status = "pending";
      labJob.experiments[experimentIndex].error = null;
      await labJob.save();
    }

    return NextResponse.json({ message: "Experiment reset for retry" });
  } catch (error) {
    console.error("Error resetting experiment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
