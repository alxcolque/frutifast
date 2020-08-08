const connection = require("../connectionDB");
module.exports = {
  verifyUser(user, callback) {
    connection.query(
      "SELECT user_name FROM users WHERE user_name=?",
      [user],
      (err, result) => {
        if (err) callback(err, null);
        else callback(null, result[0]);
      }
    );
  },
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
        async (err, result) => {
          if (err) reject(err);
          else if (user_name.length >= 1) resolve(result[0]);
          else resolve(false);
        }
      );
    });
  },
  update(id, name, pic) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET  name=?,pic=? WHERE user_id = "+id,
        [name, pic]
      ),
        (err) => {
          if (err) reject(err);
          else resolve();
        };
    });
  },
};
