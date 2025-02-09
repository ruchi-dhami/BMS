const tests = [{
    name: "ruchi",
    course: "software engineering"
}];

const getTestData = (req, res) => {
  res.status(200).json(tests);
};


module.exports = {
  getTestData,
};
