// Node Modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from '../../lib/mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Load models
import User from '../../models/User';
import Task from '../../models/Task';
import Profile from '../../models/Profile';
import Question from '../../models/Question';

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    await mongoose();
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//* @route   POST api/profile/updateQuestions
//* @desc    Updates users current questions and returns new questions
//* @access  Private

app.post(
  '*',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { id } = req.user;
    const { currentAssQuestionsData, currentSubject } = req.body;

    // Create array of current questions Ids
    const currentAssQuestionsIds = currentAssQuestionsData.map(question => question._id);

    // Find user current profile
    const currentProfile = await Profile.findOne({
      user: id
    });

    // Update answered and selected values for user's questions history
    currentProfile.questionsHistory.map(question => {
      let stringedQuestion = question.questionContent.toString();
      return currentAssQuestionsData.map(currentAssQuestion => {
        if (currentAssQuestion._id === stringedQuestion) {
          question.answered = currentAssQuestion.answered;
          question.selected = currentAssQuestion.selected;
        }
      });
    });

    // Save user's updated questions history
    await currentProfile.save();

    // Find the answered value for user's last current question
    // const lastQuestionAnswered =
    //   currentAssQuestionsData[currentAssQuestionsData.length - 1].answered;

    //* If the last question is answered then...
    // if (lastQuestionAnswered) {
    const { allCurrentTasks } = req.body;

    // Update all current questions in user's questions history to completed
    currentProfile.questionsHistory.map(question => {
      let stringedQuestion = question.questionContent.toString();
      if (currentAssQuestionsIds.includes(stringedQuestion)) {
        question.completed = true;
      }
    });

    // Filter new tasks based on current subject and return an array of task ids
    const newTaskIds = allCurrentTasks
      .filter(currentTask => currentTask.taskContent.subject === currentSubject)
      .map(currentTask => currentTask.taskContent.taskId);

    // Find new questions using new task ids array and current subject
    const newQuestions = await Question.aggregate([
      {
        $lookup: {
          from: 'passages',
          let: { questionId: '$questionId', subject: '$subject' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$passageId', '$$questionId'] },
                    { $eq: ['$subject', '$$subject'] }
                  ]
                }
              }
            }
          ],
          as: 'passage'
        }
      },
      {
        $match: {
          $and: [{ subject: currentSubject }, { questionId: { $in: newTaskIds } }]
        }
      }
    ]);

    // Format these new questions
    const newQuestionIds = newQuestions.map(newQuestion => {
      return {
        questionContent: newQuestion._id
      };
    });

    // Push new question ids to user's question history and save their updated profile
    await currentProfile.questionsHistory.push(...newQuestionIds);
    await currentProfile.save();

    // Filter out all of the user's completed questions
    currentProfile.questionsHistory = currentProfile.questionsHistory.filter(
      question => question.completed === false
    );

    // Populate user's updated profile with question content
    const profile = await currentProfile
      .populate({
        path: 'questionsHistory.questionContent',
        model: 'questions'
      })
      .execPopulate();

    // Return user's updated questions history to client
    res.send(profile.questionsHistory);

    //* If user presses 'save and quit'
    // } else {
    //   // Filter out all user's completed questions
    //   currentProfile.questionsHistory = currentProfile.questionsHistory.filter(
    //     question => question.completed === false
    //   );

    //   // Populate user's updated profile with question content
    //   const profile = await currentProfile
    //     .populate({
    //       path: 'questionsHistory.questionContent',
    //       model: 'questions'
    //     })
    //     .execPopulate();

    //   // Return user's updated questions history to client
    //   res.send(profile.questionsHistory);
    // }
  }
);

export default app;
