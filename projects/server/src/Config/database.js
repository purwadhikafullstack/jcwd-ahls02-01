const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");
const util = require("util");

console.log(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_NAME,
  process.env.DB_PORT
);
const dbConf = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: "3306",
});

const dbQuery = util.promisify(dbConf.query).bind(dbConf);

module.exports = { dbConf, dbQuery };
