const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const controlUser = require("../controllers/users.controller");

passport.use(
  new LocalStrategy((user_name, pass, done) => {
    User.login(user_name, controlUser.sha256(pass)).then((user_name) => {
      if (user_name) {
        session.user_name = user_name;
        return done(null, user_names);
      } else return done(null, false, { info: "njsjjsjsjs" });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
