const { dbQuery } = require("../../Config/database");
const { hashPassword, createToken } = require("../../Config/encription");
const { transporter } = require("../../Config/nodemailer");
const { uploader } = require("../../Config/uploader");
const { fs } = require("../../Config/uploader");

module.exports = {
getAvailableUnit: async (req, res) => {
    const getUnit = `Select p.productName,s.stockQuantity from products as p join stocks as S on P.idproduct = s.idProduct WHERE s.isMain = 'false';`;
    let sql13 = await query(getUnit);
    console.log("sql13", sql13)
    return res.status(200).json({
      data: sql13,
    });
  },
  getProduct: async (req, res, next) => {
    try {
      console.log("req.body getProduct", req.body);
      console.log("req.dataUser", req.dataUser);
      if (req.body.idProducts) {
        console.log("getProduct JALANNNN");
        let getProducts =
          await dbQuery(`SELECT p.idProduct, p.idCategory, p.productName, p.productPicture, p.defaultUnit, p.convertedQuantity,
          s.idStock, s.idProduct, s.stockType, s.stockQuantity, s.isMain FROM products p JOIN stocks s ON p.idProduct = s.idProduct WHERE p.idProduct = ${req.body.idProducts};`);
        // console.log("getProduct", getProducts)

        return res.status(200).send(getProducts);
      }
    } catch (error) {
      return next(error);
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      // console.log("req.body getProduct", req.body)
      // console.log("req.dataUser", req.dataUser)
      // if (req.dataUser.idUser) {
      let getAllProducts =
        await dbQuery(`SELECT p.idProduct, p.idCategory, p.productName, p.productPicture, p.defaultUnit, p.convertedQuantity,
          s.idStock, s.idProduct, s.stockType, s.stockQuantity, s.priceSale, s.isMain FROM products p JOIN stocks s ON p.idProduct = s.idProduct;`);
      console.log("getAllProduct", getAllProducts);

      return res.status(200).send(getAllProducts);
      // }
    } catch (error) {
      return next(error);
    }
  },
  konversiStock: async (req, res, next) => {
    try {
      console.log("req.body getProduct", req.body);
      console.log("req.dataUser", req.dataUser);
      if (req.body.idProducts) {
        let updateStock = (req.body.stocksQuantityMain -=
          req.body.conversionQty);
        // if (req.body.stocksQuantity == 0) {
        //   let updateConversion = req.body.convertedsQuantity
        //   console.log("updateStock", updateStock)
        //   console.log("updateConversion", updateConversion)
        // } else {
        let converted = req.body.conversionQty * req.body.convertedsQuantity;
        let updateConversion = (req.body.stocksQuantity += converted);

        console.log("updateStock", updateStock);
        console.log("converted", converted);
        console.log("updateConversion", updateConversion);

        let konversi = await dbQuery(
          `UPDATE stocks SET stockQuantity = ${updateStock} WHERE idStock = ${req.body.idStocksMain};`
        );
        let updateKonversi = await dbQuery(
          `UPDATE stocks SET stockQuantity = ${updateConversion} WHERE idStock = ${req.body.idStocks};`
        );
        let updateProductHistoryMain =
          await dbQuery(`INSERT INTO producthistory (idStock, idTransaction, mutationSource, mutationType)
          VALUES (${req.body.idStocksMain}, 0, 'Unit conversion', 'Pengurangan');`);
        let updateProductHistory =
          await dbQuery(`INSERT INTO producthistory (idStock, idTransaction, mutationSource, mutationType)
          VALUES (${req.body.idStocks}, 0, 'Unit conversion', 'Penambahan');`);

        let getProducts =
          await dbQuery(`SELECT p.idProduct, p.idCategory, p.productName, p.productPicture, p.defaultUnit, p.convertedQuantity,
          s.idStock, s.idProduct, s.stockType, s.stockQuantity, s.isMain FROM products p JOIN stocks s ON p.idProduct = s.idProduct WHERE p.idProduct = ${req.body.idProducts};`);
        console.log("getProduct Konversi", getProducts[0]);

        return res.status(200).send(getProducts);
        // }
      }
    } catch (error) {
      return next(error);
    }
  },
};
