import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProblemSchema = new Schema({}, { strict: false });
const Problem = mongoose.model('problems', ProblemSchema);
export default Problem;
