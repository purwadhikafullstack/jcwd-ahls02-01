const axios = require('axios');

const url = 'https://api.rajaongkir.com/starter';
const key = 'f7e960f8b1d392519e77eb69c2d44a47';
// const key = '966ed2d62fc2929a5b38299f93e12063';

module.exports = {
  getProvince: (req, res) => {
    axios
      .get(`${url}/province?key=${key}`)
      .then((response) => {
        res.send({
          error: false,
          message: 'get data province success',
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCity: (req, res) => {
    axios
      .get(`${url}/city?province=${req.headers.provinceid}&key=${key}`)
      .then((response) => {
        res.send({
          error: false,
          message: 'get data kota success',
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};