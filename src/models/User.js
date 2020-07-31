const connection = require("../connectionDB");

module.exports = {
  register(name, user, pass, rol) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users(name, user_name, password, rol) VALUES (?,?,?,?)",
        [name, user, pass, rol]
      ), 
        (err) => {
          if (err) reject(err);
          else resolve();
        };
    });
  },
  login(user_name, pass) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_name=? and password=?",
        [user_name, pass],
        (err, user_name) => {
          if (err) reject(err);
          else if (user_name.length >= 1) resolve(user_name[0]);
               else resolve(false);
        }
      );
    });
  },
};
