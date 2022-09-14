const userControllers = require("./userControllers");
const adminControllers = require("./adminControllers");
const addressControllers = require('./addressControllers');
const rajaOngkirControllers = require('./rajaOngkirControllers');
const salesReportControllers = require('./salesReportControllers');

module.exports = {
  userControllers, addressControllers, rajaOngkirControllers,
  adminControllers, salesReportControllers
};
