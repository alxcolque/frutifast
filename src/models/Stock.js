const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT s.warehouse_id, s.item_id, w.name as warehouse, i.name as item, i.price, quantity, t.unit, picture FROM stocks s, items i, warehouses w, types t WHERE t.type_id = i.type_id AND i.item_id = s.item_id AND s.warehouse_id = w.warehouse_id",
        (err, stocks) => {
          if (err) reject(err);
          else resolve(stocks);
        }
      );
    });
  },

  add(warehouse_id, item_id, quantity) {
    const newRow = {
      warehouse_id,
      item_id,
      quantity,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO stocks set ?", [newRow], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  addPurchase(user_id, item_id, quantity) {
    const newRow = {
      user_id,
      item_id,
      quantity,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO purchases set ?", [newRow], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  delete(warehouse_id, item_id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM stocks WHERE warehouse_id = ? AND item_id=?",
        [warehouse_id, item_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  update(warehouse_id, item_id, quantity) {
    const newRow = {
      quantity,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE stocks set ? WHERE warehouse_id = ? AND item_id = ?",
        [newRow, warehouse_id, item_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
