const db = require("../Config/database");
const util = require("util");
const query = db.query;
const transporter = require("../Config/nodemailer");
const uploader = require("../Config/uploader");
var fs = require("fs");

module.exports = {
  getTotalProductsNum: (req, res) => {
    const category = req.query.category;
    let hargaMin = req.query.hargaMin;
    let hargaMax = req.query.hargaMax;
  },
};
