const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  getSalesByInvoice: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let salesByInvoice = await dbQuery(`SELECT t.*, u.name, u.email, u.phone, u.gender, u.birthDate FROM transactions t
          JOIN users u ON t.idUser = u.idUser ORDER BY addDate DESC;`);

        let transDetail = await dbQuery(`SELECT * FROM transactionsdetail;`)

        salesByInvoice.forEach(valueSalesByInvoice => {
          valueSalesByInvoice.dateSlice = valueSalesByInvoice.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueSalesByInvoice.dYear = valueSalesByInvoice.dateSlice.slice(0, 4)
          valueSalesByInvoice.dMonth = valueSalesByInvoice.dateSlice.slice(5, 7)
          valueSalesByInvoice.dDate = valueSalesByInvoice.dateSlice.slice(8, 10)
          valueSalesByInvoice.dateFE = `${valueSalesByInvoice.dDate}-${valueSalesByInvoice.dMonth}-${valueSalesByInvoice.dYear}`
          valueSalesByInvoice.detail = []
          valueSalesByInvoice.totalTransaksi = 0


          transDetail.forEach(valueTransDetail => {
            if (valueSalesByInvoice.idTransaction == valueTransDetail.idTransaction) {
              valueSalesByInvoice.detail.push(valueTransDetail)
              valueSalesByInvoice.totalTransaksi += valueTransDetail.subTotal
            }
          })
        })
        return res.status(200).send(salesByInvoice);
      }
    } catch (error) {
      return next(error)
    }
  },
  getProfitHariIni: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        const current = new Date();
        let profitHariIni = await dbQuery(`SELECT SUM(subTotal) as totalTransaksi FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%';`)

        // console.log("totalProfitnyaaaaaaaaa", profitHariIni)

        return res.status(200).send(profitHariIni);
      }
    } catch (error) {
      return next(error)
    }
  },
  getPenjualanHariIni: async (req, res, next) => {
    try {
      // console.log("dataUser PenjualanHariIni", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let penjualanHariIni = await dbQuery(`SELECT t.idTransaction, t.invoiceNumber FROM transactions t WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%';`)

        return res.status(200).send(penjualanHariIni);
      }
    } catch (error) {
      return next(error)
    }
  },
  getMenungguPembayaran: async (req, res, next) => {
    try {
      // console.log("dataUser Menunggu Pembayaran", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let menungguPembayaran = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Menunggu Pembayaran';`)

        return res.status(200).send(menungguPembayaran);
      }
    } catch (error) {
      return next(error)
    }
  },
  getKonfirmasiPembayaran: async (req, res, next) => {
    try {
      // console.log("dataUser Konfirmasi Pembayaran", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let konfirmasiPembayaran = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Konfirmasi Pembayaran';`)

        return res.status(200).send(konfirmasiPembayaran);
      }
    } catch (error) {
      return next(error)
    }
  },
  getSedangProses: async (req, res, next) => {
    try {
      // console.log("dataUser SedangProses", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let sedangProses = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Diproses';`)

        return res.status(200).send(sedangProses);
      }
    } catch (error) {
      return next(error)
    }
  },
  getSedangDikirim: async (req, res, next) => {
    try {
      // console.log("dataUser SedangDikirim", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let sedangDikirim = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Dikirim';`)

        return res.status(200).send(sedangDikirim);
      }
    } catch (error) {
      return next(error)
    }
  },
  getPesananTerkonfirmasi: async (req, res, next) => {
    try {
      // console.log("dataUser SedangDikirim", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let pesananTerkonfirmasi = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Pesanan Dikonfirmasi';`)

        return res.status(200).send(pesananTerkonfirmasi);
      }
    } catch (error) {
      return next(error)
    }
  },
  getPesananDibatalkan: async (req, res, next) => {
    try {
      // console.log("dataUser SedangDibatalkan", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let pesananDibatalkan = await dbQuery(`SELECT t.idTransaction, t.transactionStatus FROM transactions t WHERE
        addDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.transactionStatus = 'Dibatalkan';`)

        return res.status(200).send(pesananDibatalkan);
      }
    } catch (error) {
      return next(error)
    }
  },
  getStockAkanHabis: async (req, res, next) => {
    try {
      // console.log("dataUser Stock Habis", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        let stockAkanHabis = await dbQuery(`SELECT p.idProduct, p.productName, s.stockQuantity, s.isMain FROM products p JOIN stocks s ON p.idProduct = s.idProduct
        WHERE s.editDate LIKE '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND s.stockQuantity < 20 AND s.isMain = 'true';`)

        return res.status(200).send(stockAkanHabis);
      }
    } catch (error) {
      return next(error)
    }
  },
  getProfitMingguan: async (req, res, next) => {
    try {
      // console.log("dataUser getProfitMingguan", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        const profitHarian = []
        let profitHari1 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 6}%';`)
        if (profitHari1[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari1[0].totalHarian)
        }

        let profitHari2 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 5}%';`)
        if (profitHari2[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari2[0].totalHarian)
        }
        let profitHari3 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 4}%';`)
        if (profitHari3[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari3[0].totalHarian)
        }
        let profitHari4 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 3}%';`)
        if (profitHari4[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari4[0].totalHarian)
        }
        let profitHari5 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 2}%';`)
        if (profitHari5[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari5[0].totalHarian)
        }
        let profitHari6 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 1}%';`)
        if (profitHari6[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari6[0].totalHarian)
        }
        let profitHari7 = await dbQuery(`SELECT SUM(subTotal) as totalHarian FROM transactionsdetail WHERE addDate LIKE
        '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%';`)
        if (profitHari7[0].totalHarian == null) {
          profitHarian.push(0)
        } else {
          profitHarian.push(profitHari7[0].totalHarian)
        }

        console.log("profit harian", profitHarian)
        return res.status(200).send(profitHarian);
      }
    } catch (error) {
      return next(error)
    }
  },
  getPenjualanObatMingguan: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        const current = new Date();

        const penjualanObatHarian = []
        const penjualanObatRacikHarian = []

        let penjualanObatHari1 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 6}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari1.length)
        let penjualanObatHari1null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 6}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari1null.length)

        let penjualanObatHari2 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 5}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari2.length)
        let penjualanObatHari2null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 5}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari2null.length)

        let penjualanObatHari3 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 4}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari3.length)
        let penjualanObatHari3null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 4}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari3null.length)

        let penjualanObatHari4 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 3}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari4.length)
        let penjualanObatHari4null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 3}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari4null.length)

        let penjualanObatHari5 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 2}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari5.length)
        let penjualanObatHari5null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 2}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari5null.length)

        let penjualanObatHari6 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 1}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari6.length)
        let penjualanObatHari6null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate() - 1}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari6null.length)

        let penjualanObatHari7 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.prescription != 'null';`)
        penjualanObatRacikHarian.push(penjualanObatHari7.length)
        let penjualanObatHari7null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate LIKE
          '${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}%' AND t.prescription = 'null';`)
        penjualanObatHarian.push(penjualanObatHari7null.length)


        // console.log("penjualanObat harian", penjualanObatHarian)
        // console.log("penjualanObat racik", penjualanObatRacikHarian)
        // console.log("penjualanObat2 harian", penjualanObatHari6.length, "ss", penjualanObatHari6null.length)
        return res.status(200).send({ penjualanObatHarian, penjualanObatRacikHarian });
      }
    } catch (error) {
      return next(error)
    }
  },
  getProfitBulanan: async (req, res, next) => {
    try {
      // console.log("dataUser getProfitMingguan", req.dataUser)
      if (req.dataUser.idUser) {
        const current = new Date();

        const profitMingguan = []

        let profitMinggu1 = await dbQuery(`SELECT SUM(subTotal) as totalMingguan FROM transactionsdetail WHERE addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth()}-31' AND '${current.getFullYear()}-0${current.getMonth() + 1}-08';`)
        if (profitMinggu1[0].totalMingguan == null) {
          profitMingguan.push(0)
        } else {
          profitMingguan.push(profitMinggu1[0].totalMingguan)
        }

        let profitMinggu2 = await dbQuery(`SELECT SUM(subTotal) as totalMingguan FROM transactionsdetail WHERE addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-07' AND '${current.getFullYear()}-0${current.getMonth() + 1}-15';`)
        if (profitMinggu2[0].totalMingguan == null) {
          profitMingguan.push(0)
        } else {
          profitMingguan.push(profitMinggu2[0].totalMingguan)
        }

        let profitMinggu3 = await dbQuery(`SELECT SUM(subTotal) as totalMingguan FROM transactionsdetail WHERE addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-14' AND '${current.getFullYear()}-0${current.getMonth() + 1}-22';`)
        if (profitMinggu3[0].totalMingguan == null) {
          profitMingguan.push(0)
        } else {
          profitMingguan.push(profitMinggu3[0].totalMingguan)
        }

        let profitMinggu4 = await dbQuery(`SELECT SUM(subTotal) as totalMingguan FROM transactionsdetail WHERE addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-21' AND '${current.getFullYear()}-0${current.getMonth() + 1}-29';`)
        if (profitMinggu4[0].totalMingguan == null) {
          profitMingguan.push(0)
        } else {
          profitMingguan.push(profitMinggu4[0].totalMingguan)
        }

        let profitMinggu5 = await dbQuery(`SELECT SUM(subTotal) as totalMingguan FROM transactionsdetail WHERE addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-28' AND '${current.getFullYear()}-0${current.getMonth() + 2}-01';`)
        if (profitMinggu5[0].totalMingguan == null) {
          profitMingguan.push(0)
        } else {
          profitMingguan.push(profitMinggu5[0].totalMingguan)
        }

        // console.log("profit Mingguan", profitMingguan)
        return res.status(200).send(profitMingguan);
      }
    } catch (error) {
      return next(error)
    }
  },
  getPenjualanObatBulanan: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        const current = new Date();

        const penjualanObatMingguan = []
        const penjualanObatRacikMingguan = []

        let penjualanObatHari1 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth()}-31' AND '${current.getFullYear()}-0${current.getMonth() + 1}-08' AND t.prescription != 'null';`)
        penjualanObatRacikMingguan.push(penjualanObatHari1.length)
        let penjualanObatHari1null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth()}-31' AND '${current.getFullYear()}-0${current.getMonth() + 1}-08' AND t.prescription = 'null';`)
        penjualanObatMingguan.push(penjualanObatHari1null.length)

        let penjualanObatHari2 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-07' AND '${current.getFullYear()}-0${current.getMonth() + 1}-15' AND t.prescription != 'null';`)
        penjualanObatRacikMingguan.push(penjualanObatHari2.length)
        let penjualanObatHari2null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-07' AND '${current.getFullYear()}-0${current.getMonth() + 1}-15' AND t.prescription = 'null';`)
        penjualanObatMingguan.push(penjualanObatHari2null.length)

        let penjualanObatHari3 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-14' AND '${current.getFullYear()}-0${current.getMonth() + 1}-22' AND t.prescription != 'null';`)
        penjualanObatRacikMingguan.push(penjualanObatHari3.length)
        let penjualanObatHari3null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-14' AND '${current.getFullYear()}-0${current.getMonth() + 1}-22' AND t.prescription = 'null';`)
        penjualanObatMingguan.push(penjualanObatHari3null.length)

        let penjualanObatHari4 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-21' AND '${current.getFullYear()}-0${current.getMonth() + 1}-29' AND t.prescription != 'null';`)
        penjualanObatRacikMingguan.push(penjualanObatHari4.length)
        let penjualanObatHari4null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-21' AND '${current.getFullYear()}-0${current.getMonth() + 1}-29' AND t.prescription = 'null';`)
        penjualanObatMingguan.push(penjualanObatHari4null.length)

        let penjualanObatHari5 = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-28' AND '${current.getFullYear()}-0${current.getMonth() + 2}-01' AND t.prescription != 'null';`)
        penjualanObatRacikMingguan.push(penjualanObatHari5.length)
        let penjualanObatHari5null = await dbQuery(`SELECT t.prescription FROM transactions t WHERE t.addDate
        BETWEEN '${current.getFullYear()}-0${current.getMonth() + 1}-28' AND '${current.getFullYear()}-0${current.getMonth() + 2}-01' AND t.prescription = 'null';`)
        penjualanObatMingguan.push(penjualanObatHari5null.length)

        return res.status(200).send({ penjualanObatMingguan, penjualanObatRacikMingguan });
      }
    } catch (error) {
      return next(error)
    }
  },
  getLaporanProduk: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let getTransactionsdetail = await dbQuery(`SELECT productName as nama2, stockType, purchaseQuantity, subTotal, addDate FROM transactionsdetail
        ORDER BY addDate DESC;`);

        let getProduct = await dbQuery(`SELECT productName FROM products;`)
        namaObat = []
        obatTemp = []

        getProduct.map((val, idx) => {
          namaObat.push(val)
        })

        namaObat.forEach(valueObat => {
          valueObat.qty = 0
          valueObat.totalTransaksi = 0

          getTransactionsdetail.forEach(val => {
            if (valueObat.productName == val.nama2) {
              valueObat.qty += val.purchaseQuantity
              valueObat.totalTransaksi += val.subTotal
            }
          })
        })

        // console.log("namaObatttttt", namaObat)
        return res.status(200).send(namaObat);
      }
    } catch (error) {
      return next(error)
    }
  },
  getLaporanUser: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let getUsers = await dbQuery(`SELECT idUser, name, email, phone, addDate FROM users ORDER BY addDate DESC;`);

        let getTransactionsdetail = await dbQuery(`SELECT idUser as idUser2, subTotal FROM transactionsdetail;`)
        dataUser = []
        // obatTemp = []

        getUsers.map((val, idx) => {
          dataUser.push(val)
        })

        dataUser.forEach(valueUser => {
          valueUser.totalTransaksiUser = 0

          getTransactionsdetail.forEach(val => {
            if (valueUser.idUser == val.idUser2) {
              valueUser.totalTransaksiUser += val.subTotal
            }
          })
        })

        // console.log("getUserss", getUsers)
        return res.status(200).send(getUsers);
      }
    } catch (error) {
      return next(error)
    }
  },
  getSearchInvoice: async (req, res, next) => {
    try {
      console.log("search invoice", req.dataUser, req.body)
      if (req.dataUser.idUser) {
        let searchInvoice = await dbQuery(`SELECT * FROM transactions WHERE invoiceNumber LIKE
        '%${req.body.inputInvoice}%' ORDER BY addDate DESC;`);

        let transDetail = await dbQuery(`SELECT * FROM transactionsdetail;`)

        searchInvoice.forEach(valueSearchInvoice => {
          valueSearchInvoice.dateSlice = valueSearchInvoice.addDate.toISOString().slice(0, 10).replace('T', ' ');
          valueSearchInvoice.dYear = valueSearchInvoice.dateSlice.slice(0, 4)
          valueSearchInvoice.dMonth = valueSearchInvoice.dateSlice.slice(5, 7)
          valueSearchInvoice.dDate = valueSearchInvoice.dateSlice.slice(8, 10)
          valueSearchInvoice.dateFE = `${valueSearchInvoice.dDate}-${valueSearchInvoice.dMonth}-${valueSearchInvoice.dYear}`
          valueSearchInvoice.detail = []
          valueSearchInvoice.totalTransaksi = 0


          transDetail.forEach(valueTransDetail => {
            if (valueSearchInvoice.idTransaction == valueTransDetail.idTransaction) {
              valueSearchInvoice.detail.push(valueTransDetail)
              valueSearchInvoice.totalTransaksi += valueTransDetail.subTotal
            }
          })
        })
        console.log("search Invoice", searchInvoice)
        return res.status(200).send(searchInvoice);
      }
    } catch (error) {
      return next(error)
    }
  },
  getSearchProduct: async (req, res, next) => {
    try {
      console.log("req.body.inputProduct", req.body.inputProduct)
      if (req.dataUser.idUser) {
        let getTransactionsdetail = await dbQuery(`SELECT productName as nama2, stockType, purchaseQuantity, subTotal, addDate FROM transactionsdetail
        ORDER BY addDate DESC;`);

        let getProduct = await dbQuery(`SELECT productName FROM products WHERE productName LIKE '%${req.body.inputProduct}%';`)
        namaObat = []
        obatTemp = []

        getProduct.map((val, idx) => {
          namaObat.push(val)
        })

        namaObat.forEach(valueObat => {
          valueObat.qty = 0
          valueObat.totalTransaksi = 0

          getTransactionsdetail.forEach(val => {
            if (valueObat.productName == val.nama2) {
              valueObat.qty += val.purchaseQuantity
              valueObat.totalTransaksi += val.subTotal
            }
          })
        })

        // console.log("namaObatttttt", namaObat)
        return res.status(200).send(namaObat);
      }
    } catch (error) {
      return next(error)
    }
  },
  getSearchUser: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let getUsers = await dbQuery(`SELECT idUser, name, email, phone, addDate FROM users WHERE name LIKE '%${req.body.inputUser}%' ORDER BY addDate DESC;`);

        let getTransactionsdetail = await dbQuery(`SELECT idUser as idUser2, subTotal FROM transactionsdetail;`)
        dataUser = []
        // obatTemp = []

        getUsers.map((val, idx) => {
          dataUser.push(val)
        })

        dataUser.forEach(valueUser => {
          valueUser.totalTransaksiUser = 0

          getTransactionsdetail.forEach(val => {
            if (valueUser.idUser == val.idUser2) {
              valueUser.totalTransaksiUser += val.subTotal
            }
          })
        })

        // console.log("getUserss", getUsers)
        return res.status(200).send(getUsers);
      }
    } catch (error) {
      return next(error)
    }
  },
}