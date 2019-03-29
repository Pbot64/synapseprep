import problems from '../problems';

describe('Problem api', () => {
  it('can get create the Problems router', () => {
    expect(problems).not.toBeNull();
  });
});
