// eslint-disable-next-line import/prefer-default-export
export function list(req, res) {
  res.send({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
}
