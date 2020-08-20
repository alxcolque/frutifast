const pool = require("../connectionDB");
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT s.sale_id AS idSale, sd.item_id,sd.sale_id, i.name as item, picture ,i.price, quantity,(i.price*quantity) as total, s.fecha FROM items i, sales s, sales_detail sd WHERE s.sale_id = sd.sale_id AND i.item_id = sd.item_id ORDER BY 1 ASC",
        (err, sales) => {
          if (err) reject(err);
          else resolve(sales);
        }
      );
    });
  },
  getAllCat() {
    return new Promise((resolve, reject) => {
      pool.query(
        "select t.name,SUM(ds.quantity * i.price) total from items i, sales_detail ds, types t WHERE i.item_id = ds.item_id GROUP BY t.name",
        (err, sales) => {
          if (err) reject(err);
          else resolve(sales);
        }
      );
    });
  },
  getSaleTot() {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT s.sale_id,SUM(i.price*quantity) as total FROM items i, sales s, sales_detail sd WHERE s.sale_id = sd.sale_id AND i.item_id = sd.item_id",
        (err, salesTot) => {
          if (err) reject(err);
          else resolve(salesTot);
        }
      );
    });
  },

  add(user_id, warehouse_id) {
    const newRow = {
      user_id,
      warehouse_id,
    };
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO sales set ?", [newRow], (err) => {
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
};
