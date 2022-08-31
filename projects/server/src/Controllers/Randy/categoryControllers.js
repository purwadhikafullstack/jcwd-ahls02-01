const db = require("../../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../../Config/nodemailer");
const uploader = require("../../Config/uploader");
const fs = require("fs");


module.exports = {
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
  getCategoryList: async (req,res) =>{
    const getData = `Select * From category`
    let sql15 = await query(getData);
    return res.status(200).json({
        data:sql15,
        message:"all category",
        error:false,
    })
  }
}