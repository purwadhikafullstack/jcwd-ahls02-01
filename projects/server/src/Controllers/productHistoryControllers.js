const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  getProdukHistory: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistory.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        console.log("produkHistory", produkHistory)
        return res.status(200).send(produkHistory);
      }
    } catch (error) {
      return next(error)
    }
  },
  getProdukHistoryTanggalASC: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistory.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        console.log("produkHistory", produkHistory)
        return res.status(200).send(produkHistory.sort((a, b) => { return b.addDate - a.addDate }));
      }
    } catch (error) {
      return next(error)
    }
  },
  getProdukHistoryTanggalDSC: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistory.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        console.log("produkHistory", produkHistory)
        return res.status(200).send(produkHistory.sort((a, b) => { return a.addDate - b.addDate }));
      }
    } catch (error) {
      return next(error)
    }
  },
  getSearchProdukHistory: async (req, res, next) => {
    try {
      console.log("search invoice", req.dataUser, req.body)
      if (req.dataUser.idUser) {
        // if (req.dataUser.idUser) {
        let searchProdukHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE p.productName LIKE '%${req.body.inputProduk}%';`);

        searchProdukHistory.forEach(valueSearchProdukHistory => {
          valueSearchProdukHistory.dateSlice = valueSearchProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueSearchProdukHistory.dYear = valueSearchProdukHistory.dateSlice.slice(0, 4)
          valueSearchProdukHistory.dMonth = valueSearchProdukHistory.dateSlice.slice(5, 7)
          valueSearchProdukHistory.dDate = valueSearchProdukHistory.dateSlice.slice(8, 10)
          valueSearchProdukHistory.dateFE = `${valueSearchProdukHistory.dDate}-${valueSearchProdukHistory.dMonth}-${valueSearchProdukHistory.dYear}`
        })

        console.log("searchProdukHistory", searchProdukHistory)
        return res.status(200).send(searchProdukHistory);
      }
    } catch (error) {
      return next(error)
    }
  },
  getFilterProdukHistory: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        // console.log("filter invoice", parseInt(req.body.tanggalAkhir.slice(8, 11)) + 1)
        setTanggalAwal = parseInt(req.body.tanggalAkhir.slice(8, 11)) - 1
        setTanggalAkhir = parseInt(req.body.tanggalAkhir.slice(8, 11)) + 1
        setAwal = req.body.tanggalAkhir.slice(0, 8)
        setAkhir = req.body.tanggalAkhir.slice(0, 8)
        setAwal += setTanggalAwal
        setAkhir += setTanggalAkhir
        console.log("Awal", setAwal, "Akhir", setAkhir)

        let filterProdukHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE ph.addDate BETWEEN '${setAwal}' AND '${setAkhir}';`);

        filterProdukHistory.forEach(valueFilterProdukHistory => {
          valueFilterProdukHistory.dateSlice = valueFilterProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueFilterProdukHistory.dYear = valueFilterProdukHistory.dateSlice.slice(0, 4)
          valueFilterProdukHistory.dMonth = valueFilterProdukHistory.dateSlice.slice(5, 7)
          valueFilterProdukHistory.dDate = valueFilterProdukHistory.dateSlice.slice(8, 10)
          valueFilterProdukHistory.dateFE = `${valueFilterProdukHistory.dDate}-${valueFilterProdukHistory.dMonth}-${valueFilterProdukHistory.dYear}`
        })

        console.log("filterProdukHistory", filterProdukHistory)
        return res.status(200).send(filterProdukHistory);
      }
    } catch (error) {
      return next(error)
    }
  },
}