const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  getProdukHistory: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        console.log("req.query._page", req.query._page)
        let produkHistoryPaginate = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
            ORDER BY ph.addDate DESC LIMIT 10 OFFSET ${dbConf.escape((req.query._page - 1) * 10)};`);

        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistoryPaginate.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        let productHistoryPaginateLength = 0
        productHistoryPaginateLength += produkHistory.length
        // console.log("produkHistory PAGINATE ==>>", produkHistory)
        return res.status(200).send({ produkHistoryPaginate, productHistoryPaginateLength });
      }
    } catch (error) {
      return next(error)
    }
  },
  getProdukHistoryTanggalASC: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let produkHistoryPaginate = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
            ORDER BY ph.addDate DESC LIMIT 10 OFFSET ${dbConf.escape((req.query._page - 1) * 10)};`);

        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistoryPaginate.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        let produkHistoryPaginated = produkHistoryPaginate.sort((a, b) => { return b.addDate - a.addDate })
        let produkHistoryPaginatedLength = 0
        produkHistoryPaginatedLength += produkHistory.length
        // console.log("produkHistory", produkHistory)
        return res.status(200).send({ produkHistoryPaginated, produkHistoryPaginatedLength });
      }
    } catch (error) {
      return next(error)
    }
  },
  getProdukHistoryTanggalDSC: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let produkHistoryPaginate = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
            ORDER BY ph.addDate LIMIT 10 OFFSET ${dbConf.escape((req.query._page - 1) * 10)};`);

        let produkHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
            FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct ;`);

        produkHistoryPaginate.forEach(valueProdukHistory => {
          valueProdukHistory.dateSlice = valueProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueProdukHistory.dYear = valueProdukHistory.dateSlice.slice(0, 4)
          valueProdukHistory.dMonth = valueProdukHistory.dateSlice.slice(5, 7)
          valueProdukHistory.dDate = valueProdukHistory.dateSlice.slice(8, 10)
          valueProdukHistory.dateFE = `${valueProdukHistory.dDate}-${valueProdukHistory.dMonth}-${valueProdukHistory.dYear}`
        })

        let produkHistoryPaginated = produkHistoryPaginate.sort((a, b) => { return a.addDate - b.addDate })
        let produkHistoryPaginatedLength = 0
        produkHistoryPaginatedLength += produkHistory.length
        console.log("=========================", produkHistoryPaginated, produkHistoryPaginatedLength)
        return res.status(200).send({ produkHistoryPaginated, produkHistoryPaginatedLength });
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
        console.log("req.body.inputProduk", req.body.inputProduk)
        let searchProdukHistoryPaginate = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE p.productName LIKE '%${req.body.inputProduk}%'
                ORDER BY ph.addDate DESC LIMIT 10 OFFSET ${dbConf.escape((req.query._page - 1) * 10)};`);

        let searchProdukHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE p.productName LIKE '%${req.body.inputProduk}%';`);

        searchProdukHistoryPaginate.forEach(valueSearchProdukHistory => {
          valueSearchProdukHistory.dateSlice = valueSearchProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueSearchProdukHistory.dYear = valueSearchProdukHistory.dateSlice.slice(0, 4)
          valueSearchProdukHistory.dMonth = valueSearchProdukHistory.dateSlice.slice(5, 7)
          valueSearchProdukHistory.dDate = valueSearchProdukHistory.dateSlice.slice(8, 10)
          valueSearchProdukHistory.dateFE = `${valueSearchProdukHistory.dDate}-${valueSearchProdukHistory.dMonth}-${valueSearchProdukHistory.dYear}`
        })

        let searchProdukHistoryLength = 0
        searchProdukHistoryLength += searchProdukHistory.length
        // console.log("===searchProdukHistoryLength===", searchProdukHistoryLength)
        return res.status(200).send({ searchProdukHistoryPaginate, searchProdukHistoryLength });
      }
    } catch (error) {
      return next(error)
    }
  },
  getFilterProdukHistory: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        // console.log("filter invoice", parseInt(req.body.tanggalAkhir.slice(8, 11)) + 1)
        setTanggalAwal = parseInt(req.body.tanggalAwal.slice(8, 11)) - 1
        setTanggalAkhir = parseInt(req.body.tanggalAkhir.slice(8, 11)) + 1
        setAwal = req.body.tanggalAkhir.slice(0, 8)
        setAkhir = req.body.tanggalAkhir.slice(0, 8)
        setAwal += setTanggalAwal
        setAkhir += setTanggalAkhir
        console.log("Awal", setAwal, "Akhir", setAkhir)

        let filterProdukHistoryPaginate = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE ph.addDate BETWEEN '${setAwal}' AND '${setAkhir}'
                ORDER BY ph.addDate DESC LIMIT 10 OFFSET ${dbConf.escape((req.query._page - 1) * 10)};`);

        let filterProdukHistory = await dbQuery(`SELECT ph.idStock, ph.mutationSource, ph.mutationType, ph.addDate, s.stockType, s.stockQuantity, p.productName
                FROM producthistory ph JOIN stocks s ON ph.idStock = s.idStock JOIN products p ON s.idProduct = p.idProduct
                WHERE ph.addDate BETWEEN '${setAwal}' AND '${setAkhir}';`);

        filterProdukHistoryPaginate.forEach(valueFilterProdukHistory => {
          valueFilterProdukHistory.dateSlice = valueFilterProdukHistory.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueFilterProdukHistory.dYear = valueFilterProdukHistory.dateSlice.slice(0, 4)
          valueFilterProdukHistory.dMonth = valueFilterProdukHistory.dateSlice.slice(5, 7)
          valueFilterProdukHistory.dDate = valueFilterProdukHistory.dateSlice.slice(8, 10)
          valueFilterProdukHistory.dateFE = `${valueFilterProdukHistory.dDate}-${valueFilterProdukHistory.dMonth}-${valueFilterProdukHistory.dYear}`
        })

        let filterProdukHistoryLength = 0
        filterProdukHistoryLength += filterProdukHistory.length
        // console.log("filterProdukHistory", filterProdukHistory)
        return res.status(200).send({ filterProdukHistoryPaginate, filterProdukHistoryLength });
      }
    } catch (error) {
      return next(error)
    }
  },
}