const problemController = {
  list(req, res) {
    return res.send({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
  }
};

export default problemController;
