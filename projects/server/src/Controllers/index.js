const userControllers = require("./userControllers");
const adminControllers = require("./adminControllers");
const addressControllers = require('./addressControllers');
const rajaOngkirControllers = require('./rajaOngkirControllers');
const cartControllers = require('./cartControllers');

module.exports = {
  userControllers, addressControllers, rajaOngkirControllers,
  adminControllers, cartControllers
};
