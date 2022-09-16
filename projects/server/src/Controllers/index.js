const userControllers = require("./userControllers");
const adminControllers = require("./adminControllers");
const addressControllers = require('./addressControllers');
const rajaOngkirControllers = require('./rajaOngkirControllers');
const cartControllers = require('./cartControllers');
const transactionControllers = require('./transactionControllers');
const salesReportControllers = require('./salesReportControllers');

module.exports = {
  userControllers, addressControllers, rajaOngkirControllers,
  adminControllers, cartControllers, transactionControllers, salesReportControllers

};
