const db = require("../../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../../Config/nodemailer");
const { uploader } = require("../../Config/uploader");
const fs = require("fs");
const unitConversion = require("../../Helper/conversionHelper");

const productHistoryLog = async (data, config) => {
  const query7 = `SELECT idStock,stockQuantity FROM stocks Where idProduct=${data.idProduct} AND isMain="true"`;
  const sqlF = await query(query7);
  const stockData = sqlF[0];
  if (stockData.stockQuantity !== data.stock) {
    let queryLog;
    if (stockData.stockQuantity < data.stock) {
      queryLog = `INSERT INTO producthistory (idStock,idTransaction,mutationSource,mutationType) values (${
        stockData.idStock
      },${config.admin ? 0 : data.idTransaction},"${
        config.admin ? "Update stock" : data.mutationSource
      }","Penambahan")`;
    } else if (stockData.stockQuantity > data.stock) {
      queryLog = `INSERT INTO producthistory (idStock,idTransaction,mutationSource,mutationType) values (${
        stockData.idStock
      },${config.admin ? 0 : data.idTransaction},"${
        config.admin ? "Update Stock" : data.mutationSource
      }","Pengurangan")`;
    }
    console.log(queryLog, "query");
    const updateLog = await query(queryLog);
  }
};

module.exports = {
  getDataProduct: async (req, res) => {
    try {
      const query1 =
        "SELECT p.*,c.categoryName,s.priceSale, s.stockQuantity FROM products as p JOIN category as c ON p.idCategory=c.idCategory JOIN stocks as s ON p.idProduct=s.idProduct WHERE s.isMain ='true';";
      const products = await query(query1);
      return res.status(200).json({
        data: products,
        message: "all products",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const deleteStock = `DELETE FROM stocks WHERE idProduct = ${productId}`;
      const sqlE = await query(deleteStock);

      const deleteproduct = `DELETE FROM products WHERE idProduct = ${productId}`;
      const sqlD = await query(deleteproduct);
      console.log(req.params);
      return res.status(200).json({
        message: "Product Delete Success!",
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async (req, res) => {
    try {
      const path = "/Produk/images";
      const upload = uploader(path, "Product").fields([{ name: "file" }]);
      // const id = req.dataToken.id;
      // console.log("ini id", id);
      upload(req, res, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Upload Foto Produk Gagal!", error: err.message });
        }
        const { file } = req.files;
        const imagePath = file ? path + "/" + file[0].filename : null;
        const data = JSON.parse(req.body.data);
        data.file = imagePath;
        console.log("data add data", data);

        if (
          data.name === "" ||
          data.category === "" ||
          data.description === "" ||
          data.defaultUnit === "" ||
          data.composition === "" ||
          data.dosage === "" ||
          data.warning === ""
        ) {
          return res
            .status(500)
            .json({ message: "Semua Data Harus Di isi", error: true });
        }
        var sql = `INSERT INTO products (productName,idCategory,description,defaultUnit,productPicture,convertedQuantity,dosage,composition,warning)
        Values ("${data.name}","${data.category}","${data.description}","${data.defaultUnit}","${data.file}",${data.convertedQuantity},"${data.dosage}","${data.composition}","${data.warning}")`;
        const products = await query(sql);
        const getNewquery = `SELECT idProduct FROM products WHERE productName ="${data.name}" AND idCategory="${data.category}"`;
        const getInserted = await query(getNewquery);
        const measurementUnit = unitConversion.find(
          (x) => x.defaultUnit === data.defaultUnit
        ).measurementUnit;
        var insert = `INSERT INTO stocks (idProduct,stockType,stockQuantity,priceSale,pricePurchase,isMain)
        values ("${getInserted[0].idProduct}","${data.defaultUnit}",0,${
          data.price
        },${data.price},"true"),
        ("${getInserted[0].idProduct}","${measurementUnit}",0,${
          data.price / data.convertedQuantity
        },${data.price / data.convertedQuantity},"false")`;
        const sqlB = await query(insert);
        return res.status(200).json({
          data: products,
          message: "edited products",
          error: false,
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      const path = "/Produk/images";
      const upload = uploader(path, "Product").fields([{ name: "file" }]);
      // const id = req.dataToken.id;
      // console.log("ini id", id);
      upload(req, res, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Upload Foto Produk Gagal!", error: err.message });
        }
        const { file } = req.files;
        const imagePath = file ? path + "/" + file[0].filename : null;
        const data = JSON.parse(req.body.data);
        data.file = imagePath;
        data.stock = parseInt(data.stock);
        console.log("data add data", data);

        if (
          data.id === "" ||
          data.category === "" ||
          data.description === "" ||
          data.defaultUnit === "" ||
          data.composition === "" ||
          data.dosage === "" ||
          data.warning === ""
        ) {
          return res
            .status(500)
            .json({ message: "Semua Data Harus Di isi", error: true });
        }
        const query6 = `UPDATE products SET productName = "${data.name}",idCategory="${data.category}",description="${data.description}",productPicture="${data.file}" ,
        defaultUnit="${data.defaultUnit}",convertedQuantity=${data.convertedQuantity},composition="${data.composition}",dosage="${data.dosage}",warning="${data.warning}" WHERE idProduct=${data.id}`;
        const sqlC = await query(query6);
        const config = { admin: true };
        const data2 = { ...data, idProduct: data.id };
        await productHistoryLog(data2, config);
        const QupdateStock = `UPDATE stocks SET stockQuantity=${data.stock} WHERE idProduct=${data.id} AND isMain="true"`;
        const sqlG = await query(QupdateStock);
        return res.status(200).json({
          message: "all category",
          error: false,
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  },
  productHistoryLog: productHistoryLog,
};
