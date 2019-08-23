import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const TaskSchema = new Schema({
  groupId: {
    type: Number
  },
  taskId: {
    type: Number
  },
  title: {
    type: String
  },
  subject: {
    type: String
  },
  img: {
    type: String
  },
  completed: {
    type: Boolean
  },
  difficulty: {
    type: String
  }
});
// UserSchema.plugin(findOrCreate);
const Task = mongoose.model('tasks', TaskSchema);
export default Task;
