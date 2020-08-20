var PDFDocument, doc;
var fs = require("fs");
PDFDocument = require("pdfkit");

const salesCtrl = {};
const Sale = require("../models/Sale");
const Item = require("../models/Item");
const Stock = require("../models/Stock");

salesCtrl.addSale = async (req, res, user) => {
  let warehouse_id = 1;
  const { item_id, user_id, quantity } = req.body;
  try {
    const insertado = await Sale.add(user_id, warehouse_id);
    const saleID = await Sale.getID();

    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/sales");
    } else {
      //console.log(insertado);
      await Sale.addDS(saleID[0].sale, item_id, quantity);
      const quant = await Stock.getQuant(warehouse_id, item_id);
      await Stock.update(
        warehouse_id,
        item_id,
        Number(quant[0].cuan) - Number(quantity)
      );
      req.flash("success", "Salida exitosa ");
      res.redirect("/sales");
    }
  } catch (e) {
    req.flash("message", "Ya existe este producto");
    res.redirect("/sales");
  }
};

salesCtrl.renderSales = async (req, res) => {
  const items = await Item.getAll();
  Sale.getAll().then((sales) => {
    res.render("users/sales", { sales, items });
  });
};



salesCtrl.deleteSale = async (req, res) => {
  const { warehouse_id, item_id } = req.body;
  await Sale.delete(warehouse_id, item_id).then(
    req.flash("success", "Eliminado Exitosamente"),
    res.redirect("/sales")
  );
};

salesCtrl.editSale = async (req, res) => {
  const { user_id, warehouse_id, item_id, quantity, oldquantity } = req.body;
  try {
    const insertado = await Sale.update(
      warehouse_id,
      item_id,
      Number(quantity) + Number(oldquantity)
    );
    //console.log(user.user_id, item_id, quantity);
    //await Sale.addPurchase(user.user_id, item_id, quantity);
    if (insertado) {
      //console.log(insertado);
      req.flash("success", "Se ha añadido con éxito");
      res.redirect("/sales");
    } else {
      //console.log(insertado);
      Sale.addPurchase(user_id, item_id, quantity);
      req.flash("success", "Acabas de añadir mas " + quantity),
        res.redirect("/sales");
    }
  } catch (e) {
    req.flash(
      "message",
      "Ya existe este producto en el sale. Para aumentar la cantidad use el boton AUMENTAR"
    );
    res.redirect("/sales");
  }
};


salesCtrl.reporteSale = async (req, res) => {
  const items = await Item.getAll();
  const sales = await Sale.getAll();
  const salesTot = await Sale.getSaleTot();
  ///Funciones 
  function generateHeader(doc) {
    doc
      .image("src/public/img/logo/favicon.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("Inc.", 110, 57)
      .fontSize(10)
      .text("Oruro 14 de agosto de 2020", 200, 80, { align: "right" })
      .moveDown();
  }
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Reporte de todas las ventas realizadas.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }
  function generateCustomerInformation(doc, sales) {
    const shipping = "Kulking";

    doc
      .text(`Número de venta: ${sales[0].sale_id}`, 50, 200)
      .text(`Fecha Reporte: ${new Date()}`, 50, 215)
      .text(`Suma Total: ${salesTot[0].total}`, 50, 130)

      .text(`Almacén Kulking`, 400, 200)
      .text(`Calle Ballivian #309`, 400, 215)
      .text(`Ciudad de Oruro, Bolivia`, 400, 230)
      .moveDown();
  }
  function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 120, y)
      .text(c3, 120, y, { width: 90, align: "right" })
      .text(c4, 200, y, { width: 90, align: "right" })
      .text(c5, 0, y, { align: "right" });
  }
  function generateInvoiceTable(doc, sales) {
    let i,
      salesTableTop = 250;
    doc
      .fontSize(10)
      .text(`PRODUCTO`, 50, 250)
      .text(`PRECIO`, 120, 250)
      .text(`CANTIDAD`, 180, 250)
      .text(`SUBTOTAL`, 250, 250)
      .text(`FECHA`, 350, 250);
    for (i = 0; i < sales.length; i++) {
      //const item = sales[i].item;
      const position = salesTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        sales[i].item,
        sales[i].price,
        sales[i].quantity,
        sales[i].total,
        sales[i].fecha
      );
    }
  }
  ///Fin funciones

  doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream("Sales.pdf"));
  generateHeader(doc);
  generateCustomerInformation(doc, sales);
  generateInvoiceTable(doc, sales);
  generateFooter(doc);
  doc.end();
  //req.flash("success", "Reporte generado con éxito");

  res.render("users/sales", { sales, items });
};

module.exports = salesCtrl;
