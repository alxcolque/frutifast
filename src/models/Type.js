const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM types ORDER BY type_id", (err, types) => {
        if (err) reject(err);
        else resolve(types);
      });
    });
  },

  add(name, unit) {
    const newType = {
      name,
      unit,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO types set ?", [newType], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM types WHERE type_id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  update(type_id, name, unit) {
    const newType = {
      type_id,
      name,
      unit,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE types set ? WHERE type_id = ?",
        [newType, type_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};