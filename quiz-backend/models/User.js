import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
email: { 
    type: String, 
    required: true, 
    unique: true 
  },
password: { 
    type: String, 
    required: true 
  },
name: {
    type: String,
    required: true
  },
userType: {
    type: String,
    required: true,
    enum: ['student', 'teacher'] // Ensures only 'student' or 'teacher' can be values
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password, 12);
next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
