//Jwt strategy definition
const mongoose = require("mongoose");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = mongoose.model("users");

const keys = require("./keys");

const info = {};
info.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

info.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new jwtStrategy(info, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
