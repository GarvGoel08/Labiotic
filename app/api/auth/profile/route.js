import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { verifyToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Helper function to get user from token
async function getUserFromToken(request) {
  await connectDB();

  // Try to get token from Authorization header first, then cookies
  let token;
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("auth-token");
  if (cookieToken) {
    token = cookieToken.value;
  }

  if (!token) {
    return null;
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  // Get user from database
  const user = await User.findById(decoded.userId).select(
    "-password -verificationToken -passwordResetToken"
  );

  if (user && user.geminiApiKey && user.geminiApiKey.encrypted) {
    user.decryptedGeminiKey = user.decryptGeminiKey();
  }

  return user;
}

export async function GET(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        reportsGenerated: user.reportsGenerated,
        monthlyReportsLimit: user.monthlyReportsLimit,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        profile: user.profile,
        hasGeminiKey: !!(user.geminiApiKey && user.geminiApiKey.encrypted),
        decryptedGeminiKey: user.decryptedGeminiKey || null,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { profile, geminiApiKey } = body;

    // Update profile if provided
    if (profile) {
      user.profile = {
        ...user.profile,
        ...profile,
      };
    }

    // Update Gemini API key if provided
    if (geminiApiKey && geminiApiKey.trim()) {
      user.encryptGeminiKey(geminiApiKey.trim());
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        reportsGenerated: user.reportsGenerated,
        monthlyReportsLimit: user.monthlyReportsLimit,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        profile: user.profile,
        hasGeminiKey: !!(user.geminiApiKey && user.geminiApiKey.encrypted),
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
