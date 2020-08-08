const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT item_id,i.type_id,i.name, price, picture, t.name as type FROM items i, types t WHERE i.type_id = t.type_id ORDER BY item_id",
        (err, items) => {
          if (err) reject(err);
          else resolve(items);
        }
      );
    });
  },

  add(type_id, name, price, picture) {
    const newRow = {
      type_id,
      name,
      price,
      picture,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO items set ?", [newRow], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM items WHERE item_id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  update(item_id, type_id, name, price, picture) {
    const newRow = {
      item_id,
      type_id,
      name,
      price,
      picture,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE items set ? WHERE item_id = ?",
        [newRow, item_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
