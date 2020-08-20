const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT order_id,o.user_id,u.name,o.item_id,i.name AS pname, quantity, (CASE state WHEN 1 THEN 'PENDIENTE' WHEN 2 THEN 'COMPLETADO' ELSE 'RECHAZADO' END) AS stat FROM orders o, items i,users u WHERE i.item_id = o.item_id AND u.user_id = o.user_id",
        (err, sales) => {
          if (err) reject(err);
          else resolve(sales);
        }
      );
    });
  },

  add(user_id, item_id, address, quantity, state) {
    const newRow = {
      user_id,
      item_id,
      address,
      quantity,
      state,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO orders set ?", [newRow], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  getID() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT MAX(sale_id) as sale FROM sales", (err, sales) => {
        if (err) reject(err);
        else resolve(sales);
      });
    });
  },
  getById(user_id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT order_id,i.name, quantity, (CASE state WHEN 1 THEN 'PENDIENTE' WHEN 2 THEN 'COMPLETADO' ELSE 'RECHAZADO' END) AS stat FROM orders o, items i WHERE i.item_id = o.item_id AND o.user_id = ?",
        [user_id],
        (err, cant) => {
          if (err) reject(err);
          else resolve(cant);
        }
      );
    });
  },
  addDS(sale_id, item_id, quantity) {
    const newRow = {
      sale_id,
      item_id,
      quantity,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO sales_detail set ?", [newRow], (err) => {
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
        "DELETE FROM sales WHERE warehouse_id = ? AND item_id=?",
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
        "UPDATE sales set ? WHERE warehouse_id = ? AND item_id = ?",
        [newRow, warehouse_id, item_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  getMenos() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT order_id,o.user_id,u.name,i.name AS pname, quantity, (CASE state WHEN 1 THEN 'PENDIENTE' WHEN 2 THEN 'COMPLETADO' ELSE 'RECHAZADO' END) AS stat FROM orders o, items i,users u WHERE i.item_id = o.item_id AND u.user_id = o.user_id AND quantity <= (SELECT AVG(quantity)*0.75 FROM orders)",
        (err, menos) => {
          if (err) reject(err);
          else resolve(menos);
        }
      );
    });
  },
  updateStateOrder(order_id, state) {
    const newRow = {
      state,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE orders set ? WHERE order_id = ?",
        [newRow, order_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};
;
//F