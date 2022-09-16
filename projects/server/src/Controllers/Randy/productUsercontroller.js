const db = require("../../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../../Config/nodemailer");
const { uploader } = require("../../Config/uploader");
const fs = require("fs");
const unitConversion = require("../../Helper/conversionHelper");

module.exports = {
  getProducts: async (req, res) => {
    const qGetProducts = `SELECT p.*,s.priceSale FROM products as p JOIN stocks as s ON p.idProduct=s.idProduct WHERE s.isMain="true"`;
    const xGetProducts = await query(qGetProducts);
    res.status(200).json({
      data: xGetProducts,
    });
  },
  getproductDetail: async (req, res) => {
    const idProduct = req.params.id;
    const qGetProducts = `SELECT p.*,s.priceSale FROM products as p JOIN stocks as s ON p.idProduct=s.idProduct WHERE s.isMain="true" AND p.idProduct=${idProduct}`;
    const xGetProducts = await query(qGetProducts);
    res.status(200).json({
      data: xGetProducts,
    });
  },
};
