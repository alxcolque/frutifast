const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../connectionDB");
const comprob = require("./encod");
const { Exception } = require("handlebars");

passport.use("local.signin",new LocalStrategy({
      usernameField: "user_name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, user_name, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE user_name = ?", [
        user_name,
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        //const validPassword = await comprob.matchPassword(password,user.password);
        //console.log(await comprob.encryptPassword(password), user.password);
        //if (validPassword) {
          if (password == user.password) {
            return done(
              null,
              user,
              req.flash("success", "Bienvenido " + user.name)
            );
          } else {
            return done(
              null,
              false,
              req.flash("message", "Contraseña incorrecta")
            );
          }
      } else {
        return done(
          null,
          false,
          req.flash("message", "Nombre de usuario no existe...")
        );
      }
    }
  )
);

passport.use("local.signup",new LocalStrategy({
      usernameField: "user_name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, user_name, password, done) => {
      var rol = 1;
      var cant = await pool.query("SELECT count(user_id) as cont FROM users");
      if(cant[0].cont < 1){
        rol = 4;
      }
      const { name, confirmpass } = req.body;
      
      const rows = await pool.query("SELECT user_name FROM users WHERE user_name = ?", [
        user_name,
      ]);
      if (rows.length > 0) {
        return done(null, false, req.flash("message", "Ya existe el usuario"));
      } 
      else if (password != confirmpass) {
        return done(null, false, req.flash("message", "Las constraseñas no coinciden"));
      }else{
          let pic = "user.png";
          let newUser = {
          name,
          user_name,
          password,
          rol,
          pic,
        };
        //newUser.password = await comprob.encryptPassword(password);
        // Saving in the Database
        const result = await pool.query("INSERT INTO users SET ? ", newUser);
        newUser.user_id = result.insertId;
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  try {
    done(null, user.user_id);
  } catch (err) {
    done(null, true);
  }
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const rows = await pool.query("SELECT user_id,name,user_name,password,rol,pic,(CASE rol WHEN 1 THEN 'CLIENTE' WHEN 2 THEN 'RECEPCIONISTA' WHEN 3 THEN 'GERENTE' ELSE 'ADMINISTRADOR' END) as role FROM users WHERE user_id = ?", [user_id]);
    //done(null, true);
    if(rows){
      done(null, rows[0]);
    }else{
      done(null, true);
    }
  } catch (err) {
    done(null, true);
  }
});
