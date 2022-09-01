
const db = require("../../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../../Config/nodemailer");
const uploader = require("../../Config/uploader");
const fs = require("fs");

module.exports = {
getAvailableUnit: async (req, res) => {
    const getUnit = `Select p.productName,s.stockQuantity from products as p join stocks as S on P.idproduct = s.idProduct WHERE s.isMain = 'false';`;
    let sql13 = await query(getUnit);
    return res.status(200).json({
      data: sql13,
    });
  },
  getConverstionUnit: async (req, res) => {
    const categoryId = req.body.categoryId;
    const quantity = req.body.quantity;
    let conversionQuantity = `Select convertedQuantity from products where idProduct = ${categoryId}  `;
    let sql14 = await query(conversionQuantity);
    const conversion = sql14[0].convertedQuantity;
    console.log(conversion);
    const hasil = quantity * conversion;
    return res.status(200).json({
      data: hasil,
    });
  },
}