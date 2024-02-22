const User = require("../models/User");

checkDuplicateUsername = (req, res, next) => {
    User.findOne({ where: {username:req.body.username}})
    .then(user => {
        if (user) {
            res.json({ message: "Failed! Username is already in use!" });
            return;
        }
        next();
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
};

const verifySignUp = {
    checkDuplicateUsername
};

module.exports = verifySignUp;
