import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  answers: {
    type: [String], // Storing the student's answers
    required: true
  }
}, {
  timestamps: true
});

// Ensure a student can only attempt a quiz once
// If you want to allow re-attempts, you can remove this index
resultSchema.index({ quiz: 1, student: 1 }, { unique: true });

const Result = mongoose.model('Result', resultSchema);

export default Result;
