const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Users works.' }));

// @route GET api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  //find if email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email alread exists.';
      return res.status(400).json({ errors });
    } else {
      // if there isn't a registered email, create an user, uncluding gravatar
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //rating
        d: 'mm' //Default image placeholder option
      });

      //New mongo User model, creates new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // encrypt password and save new User to our database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(error => console.error(error));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user / returning the JWT token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    /**
     * TODO:
     * change status to 401? and message to something like 'Wrong credentials'
     */
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json({ errors });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched, passed so generate the token.
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // create jwt payload

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json({ errors });
      }
    });
  });
});

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
