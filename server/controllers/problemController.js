import Problem from '../models/Problem';

const problemController = {
  list(req, res) {
    Problem.find({}).then(p => {
      res.send(p);
    });
  }
};

export default problemController;
