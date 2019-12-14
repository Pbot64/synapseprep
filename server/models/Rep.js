import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const RepSchema = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  calendlyLink: {
    type: String
  },
  gotLead: {
    type: Boolean
  }
});

const Rep = mongoose.model('reps', RepSchema);
export default Rep;
