import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const PracticeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  tasks: {
    type: Array
  },
  completedTasks: {
    type: Array
  },
  questions: [[{}], [{}], [{}]],
  completedQuestions: [
    [
      {
        type: Schema.Types.Mixed
      }
    ],
    [
      {
        type: Schema.Types.Mixed
      }
    ],
    [
      {
        type: Schema.Types.Mixed
      }
    ]
  ],
  assignment: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Practice = mongoose.model('practices', PracticeSchema);

export default Practice;
