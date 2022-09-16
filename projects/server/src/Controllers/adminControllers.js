const db = require("../Config/database");
const util = require("util");
const query = db.dbQuery;
const transporter = require("../Config/nodemailer");
const uploader = require("../Config/uploader");
const fs = require("fs");
const categoryControllers = require("./Randy/categoryControllers")
const productControllers = require("./Randy/productControllers")
const conversionControllers = require("./Randy/conversionControllers")


module.exports = {
  ...categoryControllers,
  ...productControllers,
  ...conversionControllers




  // Select p.productName,s.stockQuantity from products as p join stocks as S on P.idproduct = s.idProduct WHERE s.isMain = 'true';
};
// dari stocks 