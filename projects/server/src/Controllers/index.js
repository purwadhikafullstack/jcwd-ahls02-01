const userControllers = require("./userControllers");
const adminControllers = require("./adminControllers");
const addressControllers = require('./addressControllers');
const rajaOngkirControllers = require('./rajaOngkirControllers');
const cartControllers = require('./cartControllers');
const transactionControllers = require('./transactionControllers');

module.exports = {
  userControllers, addressControllers, rajaOngkirControllers,
  adminControllers, cartControllers, transactionControllers
};
