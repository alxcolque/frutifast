const { findById } = require("../models/User");
const userCrtl = {};
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("../models/User");
const { Passport } = require("passport");
const crypto = require("crypto");

//Ecriptacion
function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

//registro
userCrtl.renderSignUpForm = (req, res) => {
  res.render("signup");
};

userCrtl.signup = (req, res) => {
  const errors = [];
  const { name, user, pass, confirm_pass } = req.body;
  User.verifyUser(user,function(err,data){
    if (err) {
    console.log('Error con la Consulta',err);
    }else{
      if (data) {
        //console.log("El nombre de usuario ya existe.!", data);
        req.flash("errors_msg", "El nombre de usuario ya existe.!");
        res.redirect("signup");
      } else {
        
        if (pass.length < 4) {
          //errors.push({ text: "Password moust be at last 4 characters." });
          req.flash("errors_msg", "La contrasña debe tener mayor a 4 digitos");
          res.redirect("signup");
          //console.log("La contrasña debe tener mayor a 4 digitos");
        }
        if (pass != confirm_pass) {
          //errors.push({ text: "Password do not Match" });
          req.flash("errors_msg", "Las claves no coinciden");
          res.redirect("signup");
          //console.log("Las claves no coinciden");
        }

        else {
            User.register(name, user, sha256(pass), 1).then(
            req.flash("success_msg", "You are registered"),
            res.redirect("signin")
          );
        }
      }
    } 
  })
};

//login

userCrtl.renderSignInForm = (req, res) => {
  
  res.render("signin");
};
userCrtl.signin = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "signup",
  failureFlash: true,
}),
function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  };

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      connection.query(
        "SELECT * FROM users WHERE username = ? ",
        [username],
        function (err, rows) {
          if (err) return done(err);
          if (!rows.length) {
            return done(
              null,
              false,
              req.flash("loginMessage", "No User Found")
            );
          }
          if (!bcrypt.compareSync(password, rows[0].password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Wrong Password")
            );

          return done(null, rows[0]);
        }
      );
    }
  )
);

/*passport.use(
  new LocalStrategy((username, password, done) => {
    User.login(username, sha256(password)).then((users) => {
      if (users) {
        session.users = users;
        return done(null, users);
      } else return done(null, false, { info: "njsjjsjsjs" });
    });
  })
);


/*(userCrtl.signin = passport.authenticate("local", {
  failureRedirect: "signin",
  failureMessage: true,
})),
  function (req, res) {
    if (session.usuario.tipo == 1) res.redirect("/admin");
    else res.redirect("/admin");
  };

(userCrtl.signin = passport.authenticate("local", {
  failureRedirect: "signin",
  successRedirect: "/admin",
  failureMessage: true
})),
  function (req, res) {
    console.log("iniciado");
    if (session.users.rol == 1) res.redirect("/admin");
    else res.redirect("/admin");
  };*/
  //logout
  userCrtl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect("signin");
  };

module.exports = userCrtl;
