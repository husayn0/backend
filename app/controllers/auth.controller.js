const config = require("../config/auth.config");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    password_hash: bcrypt.hashSync(req.body.password, 10)
  });
  user.save().then(saved => {
    res.json({ message: "user registered successfully!" });
  })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};

exports.signin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ user_id: user.user_id }, config.secret, { expiresIn: '24h' });
    return res.status(200).json({
      accessToken: token,
      user: { user_id: user.user_id, username: user.username , fullname: user.fullname }
    });
  } catch (error) {
    console.error('Error in signin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.checkAuth = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ where: { user_id: decoded.user_id } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
      }, message: "ValidToken"
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};


