import mongoose from "mongoose";
// import findOrCreate from "mongoose-findorcreate";

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
// UserSchema.plugin(findOrCreate);
const User = mongoose.model("users", UserSchema);
export default User;
