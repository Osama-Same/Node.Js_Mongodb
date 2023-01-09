const User = require("../model/users");

const getUser = (req, res) => {
  User.find((err, todos) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.json(todos);
  });
};

module.exports = {
  getUser,
};
