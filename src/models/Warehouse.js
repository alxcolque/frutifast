const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM warehouses ORDER BY warehouse_id",
        (err, warehouses) => {
          if (err) reject(err);
          else resolve(warehouses);
        }
      );
    });
  },

  add(name, address) {
    const newRow = {
      name,
      address,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO warehouses set ?", [newRow], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM warehouses WHERE warehouse_id = ?",
        [id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  update(warehouse_id, name, address) {
    const newRow = {
      warehouse_id,
      name,
      address,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE warehouses set ? WHERE warehouse_id = ?",
        [newRow, warehouse_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
