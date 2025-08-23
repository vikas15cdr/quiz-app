import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Question text is required'],
  },
  options: {
    type: [String],
    required: true,
    validate: [val => val.length >= 2, 'Must have at least 2 options']
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
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
  },
  description: {
    type: String,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: [val => val.length > 0, 'Quiz must have at least one question']
  },
  category: {
    type: String,
    required: true,
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
});

// BUG FIX: Correctly trim the options within each question before saving
quizSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    this.questions.forEach(question => {
      question.options = question.options.map(opt => opt.trim());
    });
  }
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
