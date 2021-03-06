const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //get the user that is beign sent on the payload = jwt token and return payload.
      User.findById(jwt_payload.id) // find user by id, returns a promise
        .then(user => {
          if (user) {
            //user found
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(error => console.error(error));
    })
  );
};
