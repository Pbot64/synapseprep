import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const PassageSchema = new Schema({
  passageId: {
    type: Number
  },
  title: {
    type: Number
  },
  questionRange: {
    type: String
  },
  content: {
    type: String
  },
  subject: {
    type: String
  }
});

const Passage = mongoose.model('passages', PassageSchema);
export default Passage;
