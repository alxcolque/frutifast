const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM stocks ORDER BY stock_id", (err, stocks) => {
        if (err) reject(err);
        else resolve(stocks);
      });
    });
  },

  add(name) {
    const newType = {
      name,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO stocks set ?", [newType], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM stocks WHERE stock_id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  update(stock_id, name) {
    const newType = {
      stock_id,
      name,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE stocks set ? WHERE stock_id = ?",
        [newType, stock_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
