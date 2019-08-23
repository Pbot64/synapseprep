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
  img: {
    type: String
  },
  choices: {
    type: Array
  },
  explanations: {
    type: Array
  },
  difficulty: {
    type: String
  },
  calculator: {
    type: Boolean
  },
  rightChoice: {
    type: String
  },
  wrongChoices: {
    type: Array
  },
  selected: {
    type: String
  },
  completed: {
    type: Boolean
  }
});
// UserSchema.plugin(findOrCreate);
const Question = mongoose.model('questions', QuestionSchema);
export default Question;
