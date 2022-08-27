const db = require("../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../Config/nodemailer");
const uploader = require("../Config/uploader");
const fs = require("fs");

module.exports = {
  getDataProduct: async (req, res) => {
    try {
      const query1 =
        "SELECT idProduct,productName,productPicture,composition,dosage,description,warning,defaultUnit FROM products";
      const products = await query(query1);

      let query2 = "SELECT defaultUnit FROM products ";
      for (let i = 0; i < products.length; i++) {
        let satuan = await query(query2, products[i].defaultUnit);
        products[i] = {
          ...products[i],
          defaultUnit: defaultUnit[""].defaultUnit,
        };
      }

      let query3 = "SELECT categoryName FROM Category ";
      for (let i = 0; i < products.length; i++) {
        let kategori = await query(query3, products[i].idCategory);
        products[i] = { ...products[i], kategori: kategori[0].categoryName };
      }
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      var ProdukId = req.params.id;
      console.log("ini produk id", ProdukId);

      const sql0 = `Select * From stocks WHERE idProduct = ${ProdukId};`;
      let sql10Result = await query(sql0);

      if (sql10Result.length > 0) {
        const sqlA = `DELETE FROM stocks WHERE idProduct = ?;`;
        let sqlAResult = await query(sqlA, [ProdukId]);

        const sql1 = `DELETE FROM products WHERE idProduct = ?`;
        let sql1Result = await query(sql1, [ProdukId]);
      } else {
        const sql3 = `DELETE FROM products WHERE idProduct = ?`;
        let sql3Result = await query(sql3, [ProdukId]);
      }
      const sql2 = `Select product.productName, product.productPicture, product.composition,product.dosage,product.description,product.warning FROM products ;`;
      let sql2Result = await query(sql2);

      res.status(200).send({
        error: false,
        message: "Hapus Produk Sukses!",
        data: sql2Result,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  addProduct: (req, res) => {
    try {
      const path = "Public/Produk/images";
      const upload = uploader(path, "Product").fields([{ name: "gambar" }]);
      const id = req.dataToken.id;
      console.log("ini id", id);
      upload(req, res, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Upload Foto Produk Gagal!", error: err.message });
        }
        const { gambar } = req.files;
        const imagePath = gambar ? path + "/" + gambar[0].filename : null;
        const data = JSON.parse(req.body.data);
        data.gambar = imagePath;
        console.log("data add data", data);

        if (
          data.productName === "" ||
          data.composition === "" ||
          data.dosage === "" ||
          data.description === "" ||
          data.warning === "" ||
          data.defaultUnit === "" ||
          data.productPicture === null
        ) {
          return res
            .status(500)
            .json({ message: "Semua Data Harus Di isi", error: true });
        }
        var sql = `INSERT INTO products SET ?`;
        db.query(sql, data, (err, results) => {
          console.log("ini result", results);
          if (err) {
            fs.unlinkSync("" + imagePath);
            return res
              .status(500)
              .json({ message: "server Error", error: err.message });
          }
          sql = `SELECT * FROM products`;
          db.query(sql, (err, results) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "server Error", error: error.message });
            }
            return res.status(200).send({
              message: "Add Product Success",
              error: false,
              results: results,
            });
          });
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  },
  editProduct: (req, res) => {
    var produk_id = parseInt(req.query.id);
    var id = req.dataToken.id;

    var sql = `Select * from products where id = ${produk_id};`;
    db.query(sql, (err, results) => {
      console.log("hasil edit produk", results);
      if (err) throw err;
      if (results.length > 0) {
        const path = "Public/Produk/images";
        const upload = uploader(path, "Produk").fields([{ name: "gambar" }]);

        upload(req, res, (err) => {
          if (err) {
            return res.status(500).json({
              message: "Update Gambar Produk Gagal!",
              error: err.message,
            });
          }
          const { gambar } = req.files;
          console.log("{ gambar }", { gambar });
          var imagePath = gambar ? path + "/" + gambar[0].filename : null;
          console.log("imagePath", imagePath);
          var data = JSON.parse(req.body.data);
          console.log("data", data);
          console.log("data.gambar", data.gambar);

          try {
            if (imagePath) {
              data.gambar = imagePath;
              console.log("data.gambar bawah", data.gambar);
            }
            if (data.stok < results[0].stok) {
              return res.status(500).json({
                message: "stok produk Tidak bisa diubah",
                error: true,
              });
            } else {
              let newDataStokMasuk = data.stok - results[0].stok;
              let sisa = results[0].stok + newDataStokMasuk;
            }
          } catch (error) {}
        });
      }
    });
  },
  createCategory: async (req, res) => {
    const categoryName = req.body.catName;
    const query4 = `SELECT * FROM category WHERE categoryName LIKE '${categoryName}' ; `;

    let sql11 = await query(query4);
    console.log(sql11);
    if (sql11.length > 0) {
      return res.status(500).json({
        message: "Kateogri sudah ada",
        error: "true",
      });
    } else {
      const insertQuery = `INSERT INTO category (categoryName) values ('${categoryName}')`;
      let sql12 = await query(insertQuery);
      console.log(sql12);
      return res.status(200).json({
        message: "kategori berhasil ditambah",
        error: false,
      });
    }
  },

  updateCategory: async (req, res) => {
    const categoryId = req.body.categoryId;
    const categoryName = req.body.categoryNama;
    const query4 = `SELECT * FROM category WHERE categoryName LIKE '${categoryName}' ; `;

    let sql11 = await query(query4);
    console.log(sql11);
    if (sql11.length > 0) {
      return res.status(500).json({
        message: "Kategori sudah ada",
        error: "true",
      });
    } else {
      const updateQuery = `UPDATE category set categoryName = '${categoryName}' WHERE idCategory = '${categoryId}' `;
      let sql12 = await query(updateQuery);
      console.log(sql12);
      return res.status(200).json({
        message: "kategori berhasil diedit",
        error: false,
      });
    }
  },
  deleteCategory: async (req, res) => {
    const categoryId = req.body.categoryId;
    const categoryName = req.body.categoryNama;
    const hapus = `DELETE FROM category WHERE categoryName LIKE '${categoryName}' AND idCategory = ${categoryId} ; `;
    let sql11 = await query(hapus);
    return res.status(200).json({
      message: "kategori berhasil dihapus",
      error: false,
    });
    console.log(sql11);
  },
  getAvailableUnit: async (req, res) => {
    const getUnit = `Select p.productName,s.stockQuantity from products as p join stocks as S on P.idproduct = s.idProduct WHERE s.isMain = 'true';`;
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
  // Select p.productName,s.stockQuantity from products as p join stocks as S on P.idproduct = s.idProduct WHERE s.isMain = 'true';
};
