import mongoose from 'mongoose';

const experimentSchema = new mongoose.Schema({
  experimentNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  aim: String,
  additionalNotes: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  generatedContent: {
    title: String,
    aim: String,
    apparatus: [String], // Array of apparatus items
    theory: String,
    procedure: [String], // Array of procedure steps
    code: String, // Code snippets
    observations: String,
    calculations: String,
    result: String,
    conclusion: String,
    precautions: [String], // Array of precautions
    references: [String], // Array of references
    applications: String,
    codeOutput: String // Terminal-style code output
  },
  error: String,
  retryCount: {
    type: Number,
    default: 0
  }
});

const labJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructorName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true
  },
  practicalTitle: {
    type: String,
    required: true
  },
  experiments: [experimentSchema],
  status: {
    type: String,
    enum: ['created', 'processing', 'completed', 'failed'],
    default: 'created'
  },
  progress: {
    completed: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

// Index for efficient querying
labJobSchema.index({ userId: 1, createdAt: -1 });
labJobSchema.index({ status: 1 });

const LabJob = mongoose.models.LabJob || mongoose.model('LabJob', labJobSchema);

export default LabJob;
