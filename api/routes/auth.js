const router = require('express').Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verify = require('../verifyToken');
//register a user
router.post('/register', async (req, res) => {
  try {
    //generate new phone no
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.pw, salt);
    //create user
    const newUser = new User({
      userName: req.body.userName,
      pw: hashedPw,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({userName: req.body.userName});
    if (!user) {
      res.status(404).json('user not found');
      return;
    }
    //check valid phone no or not
    const validPw = await bcrypt.compare(req.body.pw, user.pw);
    if (!validPw) {
      res.status(400).json('wrong phoneNo');
      return;
    }

    //create token and assign user.token as the created token
    const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 'sss', {
      expiresIn: '1d',
    });
    await user.updateOne({$set: {token: accessToken}});
    const {pw, ...info} = user._doc;

    res.status(200).json({...info, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', verify, async (req, res) => {
  try {
    const user = await Users.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
