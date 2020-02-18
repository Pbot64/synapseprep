import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

const User = mongoose.model('users', UserSchema);
export default User;
