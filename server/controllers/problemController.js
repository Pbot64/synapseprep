import Problem from '../models/Problem';
import '@babel/polyfill';

const problemController = {
  async list(req, res) {
    const problems = await Problem.find({});
    return res.send(problems);
  }
};

export default problemController;
