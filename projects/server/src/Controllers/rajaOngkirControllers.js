const axios = require('axios');

const url = 'https://api.rajaongkir.com/starter';
const key = 'f7e960f8b1d392519e77eb69c2d44a47';

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
  getCost: async (req, res) => {
    try {
      const city = req.headers.kota;
      const berat = 1000;

      let query1 = {
        key: key,
        origin: '152', //152 = Tanah Abang
        destination: city,
        weight: berat,
        courier: 'jne',
      };
      let query2 = {
        key: key,
        origin: '152',
        destination: city,
        weight: berat,
        courier: 'pos',
      };
      let query3 = {
        key: key,
        origin: '152',
        destination: city,
        weight: berat,
        courier: 'tiki',
      };
      let dataOngkir = { jne: [], pos: [], tiki: [] };

      await axios
        .post(`${url}/cost`, query1)
        .then((response) => {
          console.log(`hasil tarik kurir jne`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.jne.push(element);
          });
          node;
        })
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .post(`${url}/cost`, query2)
        .then((response) => {
          console.log(`hasil tarik kurir pos`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.pos.push(element);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .post(`${url}/cost`, query3)
        .then((response) => {
          console.log(`hasil tarik kurir tiki`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.tiki.push(element);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      res.status(200).send({
        error: false,
        dataOngkir,
      });
    } catch (err) {
      res.status(500).send({
        status: 500,
        error: true,
        message: error.message,
      });
    }
  },
  getCost2: async (req, res) => {
    try {
      const city = req.headers.kota;
      const berat = 1000;

      let query1 = {
        key: key,
        origin: '152', //152 = Tanah Abang
        destination: city,
        weight: berat,
        courier: 'jne',
      };
      let query2 = {
        key: key,
        origin: '152',
        destination: city,
        weight: berat,
        courier: 'pos',
      };
      let query3 = {
        key: key,
        origin: '152',
        destination: city,
        weight: berat,
        courier: 'tiki',
      };
      let dataOngkir = { jne: [], pos: [], tiki: [] };

      await axios
        .post(`${url}/cost`, query1)
        .then((response) => {
          console.log(`hasil tarik kurir jne`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.jne.push(element);
          });
          node;
        })
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .post(`${url}/cost`, query2)
        .then((response) => {
          console.log(`hasil tarik kurir pos`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.pos.push(element);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .post(`${url}/cost`, query3)
        .then((response) => {
          console.log(`hasil tarik kurir tiki`, response.data.rajaongkir.results[0].costs)
          response.data.rajaongkir.results[0].costs.forEach((element) => {
            dataOngkir.tiki.push(element);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      res.status(200).send({
        dataOngkir
      });
    } catch (err) {
      res.status(500).send({
        status: 500,
        error: true,
        message: error.message,
      });
    }
  }
};