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
          // error: false,
          // message: 'get data province success',
          data: response.data.rajaongkir.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getProvince2: (req, res) => {
    axios
      .get(`${url}/province?key=${key}`)
      .then((response) => {
        let namaProvinsi = []
        console.log("cek Header Province2===")
        console.log("cek Header Province2", req.headers.provinceid)
        let resultTemp = response.data.rajaongkir.results
        for (let i = 0; i < resultTemp.length; i++) {
          if (resultTemp[i].province_id == req.headers.provinceid) {
            namaProvinsi.push(resultTemp[i].province)
            console.log("check namaProvinsi", namaProvinsi)
            res.send({
              // error: false,
              // message: 'get data province success',
              namaProvinsi
            });
          }
        }
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
          // error: false,
          // message: 'get data kota success',
          // data: response.data,
          data: response.data.rajaongkir.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCity2: (req, res) => {
    axios
      .get(`${url}/city?province=${req.headers.provinceid}&key=${key}`)
      .then((response) => {
        let namaKota = []
        console.log("cek Header Kota2===")
        console.log("cek Header Kota2", req.headers.provinceid, "&", req.headers.cityid)
        let resultTemp = response.data.rajaongkir.results
        for (let i = 0; i < resultTemp.length; i++) {
          if (resultTemp[i].city_id == req.headers.cityid) {
            namaKota.push(resultTemp[i].city_name)
            console.log("check namaKota", namaKota)
            res.send({
              // error: false,
              // message: 'get data province success',
              namaKota
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};