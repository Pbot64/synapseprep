import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProblemSchema = new Schema({ any: Schema.Types.Mixed });
const Problem = mongoose.model('problems', ProblemSchema);
export default Problem;
