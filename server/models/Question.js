import mongoose from 'mongoose';
// import findOrCreate from "mongoose-findorcreate";

const { Schema } = mongoose;

// Create Schema
const QuestionSchema = new Schema({
  questionId: {
    type: Number
  },
  subject: {
    type: String
  },
  type: {
    type: String
  },
  title: {
    type: String
  },
  choices: [{ type: String }],
  rightChoice: {
    type: String
  },
  solutions: {
    type: Array
  },
  alternate: {
    type: String
  },
  hints: {
    type: Number
  },
  img: {
    type: String
  },
  difficulty: {
    type: String
  },
  calculator: {
    type: Boolean
  },
  passage: {
    type: Schema.Types.ObjectId,
    ref: 'passages'
  },
  multi: {
    type: String
  }
});
// UserSchema.plugin(findOrCreate);
const Question = mongoose.model('questions', QuestionSchema);
export default Question;
