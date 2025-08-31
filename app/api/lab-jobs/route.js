import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import LabJob from "@/models/LabJob";
import User from "@/models/User";
import { cookies } from "next/headers";

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

    // Get user to ensure they exist and have complete profile
    const user = await User.findById(decoded.userId);
    if (!user || !user.profile?.isProfileComplete) {
      return NextResponse.json(
        { message: "Profile incomplete" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      instructorName,
      subject,
      subjectCode,
      practicalTitle,
      experiments,
    } = body;

    // Validate required fields
    if (
      !instructorName ||
      !subject ||
      !subjectCode ||
      !practicalTitle ||
      !experiments ||
      experiments.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create lab job
    const labJob = new LabJob({
      userId: decoded.userId,
      instructorName,
      subject,
      subjectCode,
      practicalTitle,
      experiments: experiments.map((exp, index) => ({
        experimentNumber: index + 1,
        title: exp.title,
        aim: exp.aim || "",
        additionalNotes: exp.additionalNotes || "",
        status: "pending",
        generatedContent: null,
        error: null,
        retryCount: 0,
      })),
      status: "created",
      progress: {
        completed: 0,
        total: experiments.length,
      },
      createdAt: new Date(),
    });

    await labJob.save();

    return NextResponse.json(
      {
        message: "Lab job created successfully",
        jobId: labJob._id,
        experimentsCount: experiments.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lab job:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
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

    if (jobId) {
      // Get specific job
      const labJob = await LabJob.findOne({
        _id: jobId,
        userId: decoded.userId,
      });
      if (!labJob) {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }
      return NextResponse.json({ labJob });
    } else {
      // Get all jobs for user
      const labJobs = await LabJob.find({ userId: decoded.userId })
        .sort({ createdAt: -1 })
        .limit(50);
      return NextResponse.json({ labJobs });
    }
  } catch (error) {
    console.error("Error fetching lab jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
