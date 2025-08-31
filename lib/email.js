import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send verification email
export const sendVerificationEmail = async (email, token, name) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"Labiotic" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify Your Labiotic Account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Labiotic!</h1>
        </div>
        
        <div style="padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Thanks for signing up for Labiotic! We're excited to help you create professional lab reports with AI.
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Please verify your email address by clicking the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Verify My Account
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${verificationUrl}" style="color: #3b82f6; word-break: break-all;">
              ${verificationUrl}
            </a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 20px;">
            This verification link will expire in 24 hours.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px;">
            If you didn't create an account with Labiotic, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token, name) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"Labiotic" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Your Labiotic Password',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
        </div>
        
        <div style="padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            We received a request to reset the password for your Labiotic account.
          </p>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Reset My Password
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">
              ${resetUrl}
            </a>
          </p>
          
          <p style="color: #dc2626; font-size: 14px; line-height: 1.6; margin-top: 20px; font-weight: bold;">
            This password reset link will expire in 10 minutes for security reasons.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px;">
            If you didn't request a password reset, please ignore this email and your password will remain unchanged.
          </p>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();
  
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
  
  const mailOptions = {
    from: `"Labiotic Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to Labiotic - Your Account is Ready!',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 You're All Set!</h1>
        </div>
        
        <div style="padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome aboard, ${name}!</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Your Labiotic account has been successfully verified and you're ready to start creating professional lab reports with AI!
          </p>
          
          <div style="background: white; border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">🚀 Quick Start Guide:</h3>
            <ul style="color: #4b5563; line-height: 1.8;">
              <li>✅ Upload your lab data or describe your experiment</li>
              <li>✅ Let our AI analyze and structure your content</li>
              <li>✅ Download professional DOCX and PDF reports</li>
              <li>✅ Start with 5 free reports this month!</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardUrl}" 
               style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Create Your First Report
            </a>
          </div>
          
          <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            Need help getting started? Check out our <a href="#" style="color: #3b82f6;">tutorial videos</a> 
            or reach out to our support team anytime.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px;">
            Happy researching!<br>
            The Labiotic Team
          </p>
        </div>
      </div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};
