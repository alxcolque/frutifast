var LocalStrategy = require("passport-local").Strategy;

var mysql = require("mysql");
var bcrypt = require("bcrypt");
var dbconfig = require("./database");
var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM users WHERE user_id = ? ", [id], function (
      err,
      rows
    ) {
      done(err, rows[0]);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        connection.query(
          "SELECT * FROM users WHERE user_name = ? ",
          [username],
          function (err, rows) {
            if (err) 
              return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("errors_msg", "El nombre de usuario ya existe")
              );
            } else {
              const { name, password, confirm_pass } = req.body;
              if(password.length<6){
                return done(
                  null,
                  false,
                  req.flash("errors_msg", "La contraseña debe tener mínimo 6 digitos.")
                );
              }
              if (password != confirm_pass){
                return done(
                  null,
                  false,
                  req.flash("errors_msg", "Las claves deben coincidir..")
                );
              }else{
                var newUserMysql = {
                  name: name,
                  username: username,
                  password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                  rol: 1,
                };

                var insertQuery =
                  "INSERT INTO users (name, user_name, password, rol) values (?, ?, ?, ?)";

                connection.query(
                  insertQuery,
                  [
                    newUserMysql.name,
                    newUserMysql.username,
                    newUserMysql.password,
                    newUserMysql.rol,
                  ],
                  function (err, rows) {
                    newUserMysql.id = rows.insertId;

                    return done(null, newUserMysql);
                  }
                );
              }
                
            }
          }
        );
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        connection.query(
          "SELECT * FROM users WHERE user_name = ? ",
          [username],
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(
                null,
                false,
                req.flash("errors_msg", "No User Found")
              );
            }
            if (bcrypt.hashSync(password, bcrypt.genSaltSync(10)) !== rows[0].password){
              return done(
                null,
                false,
                req.flash("errors_msg", "Wrong Password"),
                console.log("Hola: " + rows[0].password)
              );
            }else {
              return done(null, rows[0]);
            }
          }
        );
      }
    )
  );
};
