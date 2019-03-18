const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");

const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/Users");

// @route GET api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors); // sending error status code
    } else {
      //Used gravatar for providing unique avatar to all users
      const avatar = gravatar.url(req.body.email, {
        //If user already has a gravatar then that will be used else default avatar will be used
        s: "200", //Size
        r: "pg", //rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      //Used bcrypt for password hashing
      bcrypt.genSalt(10, (err, salt) => {
        //Generating salt
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //Creating hash
          if (err) throw err;
          newUser.password = hash; //setting password to the hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc login user
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Finding user through email
  User.findOne({ email }).then(user => {
    if (!user) {
      //If user not found then send error code
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Comparing passwords
    bcrypt
      .compare(password, user.password) //'password' is the password typed at login and user.password is the hashed password stored in db
      .then(isMatch => {
        if (isMatch) {
          //if password is matched then
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload

          jwt.sign(
            payload,
            keys.secretOrKey, //This key is present in config/keys file
            { expiresIn: 7200 }, //Time in seconds the token stays valid
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token //Token value
              });
            }
          );
        } else {
          //if password not matched then send error code and message
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
  });
});

// @route GET api/users/register
// @desc Register user
// @access Public

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
