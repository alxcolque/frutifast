const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT user_id,name,user_name,password,rol,pic,(CASE rol WHEN 1 THEN 'CLIENTE' WHEN 2 THEN 'RECEPCIONISTA' WHEN 3 THEN 'GERENTE' ELSE 'ADMINISTRADOR' END) as role FROM users",
        (err, personals) => {
          if (err) reject(err);
          else resolve(personals);
        }
      );
    });
  },

  update(user_id, rol) {
    const newRow = {
      rol,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE users set ? WHERE user_id = ?",
        [newRow, user_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
