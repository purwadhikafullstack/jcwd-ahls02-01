const mysql = require('mysql');
const util = require('util');

const dbConf = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medhika',
  port: '3306'
})

const dbQuery = util.promisify(dbConf.query).bind(dbConf);

module.exports = { dbConf, dbQuery };