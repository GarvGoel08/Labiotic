import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'team'],
    default: 'free',
  },
  subscriptionExpires: Date,
  reportsGenerated: {
    type: Number,
    default: 0,
  },
  monthlyReportsLimit: {
    type: Number,
    default: 5, // Free plan limit
  },
  
  // Profile Information
  profile: {
    // Personal Details
    fullName: String,
    rollNumber: String,
    course: String,
    semester: String,
    section: String,
    
    // University/Institution Details
    university: {
      name: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      department: String,
    },
    
    // Profile completion status
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  
  // Encrypted Gemini API Key
  geminiApiKey: {
    encrypted: String,
    iv: String, // Initialization Vector for encryption
  },
  
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate verification token
UserSchema.methods.createVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.verificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return token;
};

// Generate password reset token
UserSchema.methods.createPasswordResetToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Encrypt Gemini API key
UserSchema.methods.encryptGeminiKey = function (apiKey) {
  const crypto = require('crypto');
  const algorithm = 'aes-256-cbc';

  // Derive a 32-byte key from your JWT_SECRET
  const key = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  this.geminiApiKey = {
    encrypted,
    iv: iv.toString('hex'),
  };
};

// Decrypt Gemini API key
UserSchema.methods.decryptGeminiKey = function () {
  if (!this.geminiApiKey || !this.geminiApiKey.encrypted) return null;

  const crypto = require('crypto');
  const algorithm = 'aes-256-cbc';

  const key = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const iv = Buffer.from(this.geminiApiKey.iv, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(this.geminiApiKey.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};


export default mongoose.models.User || mongoose.model('User', UserSchema);
