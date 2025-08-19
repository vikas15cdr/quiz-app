import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Question text is required'],
    minlength: [5, 'Question must be at least 5 characters'],
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length >= 2 && options.length <= 6,
      message: 'Quiz must have 2-6 options'
    }
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    validate: {
      validator: function(value) {
        return this.options.includes(value);
      },
      message: 'Correct answer must be one of the options'
    }
  },
  explanation: {
    type: String,
    maxlength: [1000, 'Explanation cannot exceed 1000 characters']
  }
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: (questions) => questions.length > 0 && questions.length <= 50,
      message: 'Quiz must contain 1-50 questions'
    }
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['Science', 'Math', 'History', 'General', 'Programming'],
      message: 'Invalid category'
    }
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  timeLimit: {  // in minutes
    type: Number,
    min: [1, 'Minimum time limit is 1 minute'],
    max: [180, 'Maximum time limit is 180 minutes']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
quizSchema.index({ title: 'text', category: 1 });
quizSchema.index({ createdBy: 1, isPublished: 1 });

// Virtual for question count
quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Pre-save hook to sanitize data
quizSchema.pre('save', function(next) {
  this.title = this.title.trim();
  this.options = this.options.map(opt => opt.trim());
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;