import mongoose from 'mongoose';

const { Schema } = mongoose;

// Creat Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  tasksHistory: [
    {
      completed: {
        type: Boolean,
        default: false
      },
      taskContent: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
      }
    }
  ],
  questionsHistory: [
    {
      answered: {
        type: Boolean,
        default: false
      },
      selected: {
        type: String,
        default: ''
      },
      completed: {
        type: Boolean,
        default: false
      },
      questionContent: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
      }
    }
  ]
});

const Profile = mongoose.model('profiles', ProfileSchema);

export default Profile;
