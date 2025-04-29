import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    day: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
  gender: {
    type: String,
    enum: ['Female', 'Male'],
    required: true,
  },
  email: {
    type: String,
    required: true, // Can be mobile or email
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;