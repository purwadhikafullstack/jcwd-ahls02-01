const { dbConf, dbQuery } = require("../Config/database");
const { uploader } = require("../Config/uploader");
const fs = require("fs");

module.exports = {
    userGetAllTransaction: async (req, res, next) => { //* USER GET ALL TRANSACTION
        try {

            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser=${dbConf.escape(req.dataUser.idUser)} group by t1.idTransaction order by t1.addDate desc;`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);

        } catch (error) {
            return next(error);
        }
    },
    userGetValidasiResep: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterValidasiResep: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetMenungguPembayaran: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterMenungguPembayaran: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetMenungguKonfirmasi: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterMenungguKonfirmasi: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetDiproses: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterDiproses: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Diproses" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetDikirim: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterDikirim: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dikirim" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetPesananDikonfirmasi: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterPesananDikonfirmasi: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Pesanan Dikonfirmasi" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userGetDibatalkan: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    userFilterDibatalkan: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idUser = ${dbConf.escape(req.dataUser.idUser)} and t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    addNormalTransaction: async (req, res, next) => { //* USER ADD TRANSACTION FROM CART
        try {
            console.log(`arrayIdCart`, req.body.arrayIdCart);
            console.log(`idAddress`, req.body.idAddress);
            console.log(`prescription`, req.body.prescription);
            console.log(`transactionStatus`, req.body.transactionStatus);
            console.log(`transferReceipt`, req.body.transferReceipt);
            console.log(`freightCost`, req.body.freightCost);

            let currentDate = new Date();

            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            console.log(`typeofmonth`, typeof (month))
            month = month.toString().length < 2 ? "0" + month.toString() : month.toString()
            console.log(`newmonth`, month);
            let day = currentDate.getDate();

            let getTransaction = await dbQuery(`select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress group by t1.idTransaction;`)

            let docNoInNumber = Math.max(...getTransaction.map((item) => item.idTransaction));
            docNoInNumber++;
            console.log(`docNoInNumber`, docNoInNumber);
            let initialInvoiceNumber = `INV/${year}${month}${day}/STN/${docNoInNumber.toString()}`

            if (req.dataUser.idUser) {
                let addQuery = [];
                if (req.body.arrayIdCart.length >= 1) {
                    req.body.arrayIdCart.forEach((valCart, idxCart) => {
                        addQuery.push(`insert into transactions (idUser, idCart, idAddress, prescription, transactionStatus, transferReceipt, invoiceNumber, freightCost) values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(valCart)}, ${dbConf.escape(req.body.idAddress)}, ${dbConf.escape(req.body.prescription)}, ${dbConf.escape(req.body.transactionStatus)},${dbConf.escape(req.body.transferReceipt)},${dbConf.escape(initialInvoiceNumber)},${dbConf.escape(req.body.freightCost)});`)
                    })

                }

                let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal, c.isActive from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} order by c.addDate desc;`);

                let contents1
                let newestInsertId = [];
                await Promise.all(addQuery.map(async (valArray) => {
                    contents1 = await dbQuery(valArray);
                    console.log(`contents1`, contents1.insertId);
                    newestInsertId.push(contents1.insertId)
                }));
                console.log(`addQuery`, addQuery);
                console.log(`newestInsertId`, newestInsertId);

                let newestInsertIdString = ``;
                newestInsertId.forEach(valNewIdTransaction1 => {
                    newestInsertIdString += `${valNewIdTransaction1}, `
                })

                let getNewTransaction = await dbQuery(`select * from transactions where idTransaction in (${newestInsertIdString.substring(0, newestInsertIdString.length - 2)});`);

                console.log(`getNewTransaction query ===>`, getNewTransaction);

                let addDetailQuery = [];
                if (getNewTransaction.length >= 1) {
                    getNewTransaction.forEach((valNewTransaction) => {
                        getAllCart.forEach((valAllCart) => {
                            if (valNewTransaction.idCart == valAllCart.idCart) {

                                console.log(`addDetailQuery belum diisi IdCart itu`);

                                addDetailQuery.push(`insert into transactionsdetail (idTransaction, idStock, idUser, productName, productPicture, stockType, purchaseQuantity, priceSale, subTotal) values (${dbConf.escape(valNewTransaction.idTransaction)}, ${dbConf.escape(valAllCart.idStock)}, ${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(valAllCart.productName)},${dbConf.escape(valAllCart.productPicture)},${dbConf.escape(valAllCart.stockType)},${dbConf.escape(valAllCart.cartQuantity)},${dbConf.escape(valAllCart.priceSale)},${dbConf.escape(valAllCart.subTotal)});`)

                            }
                        })

                    })
                }

                let contents3
                await Promise.all(addDetailQuery.map(async (valArrayDetail) => {
                    contents3 = await dbQuery(valArrayDetail);
                }));

                console.log(`addDetailQuery`, addDetailQuery);
            }

            return res.status(200).send({ success: true, message: 'Cart berhasil dicheckout' });

        } catch (error) {
            return next(error);
        }
    },
    addRecipeTransaction: async (req, res, next) => { //* USER ADD TRANSACTION FROM RECIPE
        try {

            if (req.dataUser.idUser) {

                const uploadFile = uploader('/Resep', `RESEP-DOKTER`).array('resepPicture', 1);

                uploadFile(req, res, async (error) => {
                    try {

                        let currentDate = new Date();

                        let year = currentDate.getFullYear();
                        let month = currentDate.getMonth() + 1;
                        console.log(`typeofmonth`, typeof (month))
                        month = month.toString().length < 2 ? "0" + month.toString() : month.toString()
                        console.log(`newmonth`, month);
                        let day = currentDate.getDate();

                        let getTransaction = await dbQuery(`select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress group by t1.idTransaction;`)

                        let docNoInNumber = Math.max(...getTransaction.map((item) => item.idTransaction));
                        docNoInNumber++;
                        console.log(`docNoInNumber`, docNoInNumber);
                        let initialInvoiceNumber = `INV/${year}${month}${day}/RCK/${docNoInNumber.toString()}`

                        console.log(`isi body saat ngemulter resep`, req.body);
                        console.log(`isi req.files multer resep`, req.files);

                        let media = req.files[0].filename;
                        let { idAddress, freightCost } = JSON.parse(req.body.data);

                        //* arrayIdCart = 0
                        //* transactionStatus = "Validasi Resep"
                        //* transferReceipt = "null"
                        let insertResepTransaction = await dbQuery(`INSERT INTO transactions (idUser, idCart, idAddress, prescription, transactionStatus, transferReceipt, invoiceNumber, freightCost) VALUES (${dbConf.escape(req.dataUser.idUser)}, 0, ${dbConf.escape(idAddress)}, ${dbConf.escape(`/Resep/${media}`)}, "Menunggu Diproses Penjual", "null", ${dbConf.escape(initialInvoiceNumber)}, ${dbConf.escape(freightCost)});`);

                        return res.status(200).send({ success: true, message: 'Resep berhasil diunggah' });

                    } catch (error) {
                        req.files.forEach(val => fs.unlinkSync(`./Public/Resep/${val.filename}`));
                        return next(error);
                    }

                })

            }
        } catch (error) {
            return next(error);
        }
    },
    addBuktiBayar: async (req, res, next) => { //* USER ADD BUKTI BAYAR
        try {

            if (req.dataUser.idUser) {
                const uploadFile = uploader('/BuktiBayar', `BUKTI-BAYAR`).array('buktiPicture', 1);

                uploadFile(req, res, async (error) => {
                    try {

                        console.log(`isi body saat ngemulter resep`, req.body);
                        console.log(`isi req.files multer resep`, req.files);

                        let media = req.files[0].filename;
                        let { idTransaction } = JSON.parse(req.body.data);

                        let insertResepTransaction = await dbQuery(`update transactions set transactionStatus = "Menunggu Konfirmasi", transferReceipt = ${dbConf.escape(`/BuktiBayar/${media}`)} where idTransaction = ${dbConf.escape(idTransaction)};`);

                        return res.status(200).send({ success: true, message: 'Bukti bayar berhasil diunggah' });

                    } catch (error) {
                        req.files.forEach(val => fs.unlinkSync(`./Public/BuktiBayar/${val.filename}`));
                        return next(error);
                    }
                })
            }
        } catch (error) {
            return next(error);
        }
    },
    adminGetAllTransaction: async (req, res, next) => { //* ADMIN GET ALL TRANSACTION
        try {

            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress group by t1.idTransaction order by t1.addDate asc;`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);

        } catch (error) {
            return next(error);
        }
    },
    adminGetValidasiResep: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterValidasiResep: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Diproses Penjual" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetMenungguPembayaran: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterMenungguPembayaran: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Pembayaran" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetMenungguKonfirmasi: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterMenungguKonfirmasi: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Menunggu Konfirmasi" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetDiproses: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterDiproses: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Diproses" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetDikirim: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterDikirim: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dikirim" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetDibatalkan: async (req, res, next) => { //! PAGINATION DONE
        try {
            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by t1.addDate desc limit 3 offset ${dbConf.escape((req.query._page - 1) * 3)};`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminFilterDibatalkan: async (req, res, next) => { //! FILTER AND SORT DONE
        //* butuh slot untuk pagination dan filtering
        try {
            //* query untuk sortir
            // ^ _sortBy date = "t1.addDate"
            // ^ _sortBy invoice = "t1.invoiceNumber"
            console.log("req.query._sortBy", req.query._sortBy);
            console.log("req.query._order", req.query._order);

            //* query untuk filter
            console.log("req.query._filterInvoice", req.query._filterInvoice);
            console.log("req.query._dateGte", req.query._dateGte);
            console.log("req.query._dateLte", req.query._dateLte);

            let { _sortBy, _order, _filterInvoice, _dateGte, _dateLte } = req.query;
            console.log("_sortBy", _sortBy);
            console.log("_order", _order);
            console.log("_filterInvoice", _filterInvoice);
            console.log("_dateGte", _dateGte);
            console.log("_dateLte", _dateLte);

            let transaction = [];
            if (_sortBy && _order) {
                if (_filterInvoice) {
                    if (_dateGte && _dateLte) {
                        console.log(`===FILTER CONDITION 1 SORT, INV, DATE===`, `select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    } else {
                        console.log(`===FILTER CONDITION 2 SORT, INV===`);

                        transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction order by ${_sortBy} ${_order};`)

                    }
                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 3 SORT, DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction order by ${_sortBy} ${_order};`)

                } else {

                    console.log(`===FILTER CONDITION 4 SORT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by ${_sortBy} ${_order};`)

                }

            } else {
                if (_dateGte && _dateLte && _filterInvoice) {

                    console.log(`===FILTER CONDITION 5 DATE INV ===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_dateGte && _dateLte) {

                    console.log(`===FILTER CONDITION 6 DATE===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.addDate between ${dbConf.escape(_dateGte)} and ${dbConf.escape(_dateLte)} group by t1.idTransaction;`)

                } else if (_filterInvoice) {

                    console.log(`===FILTER CONDITION 7 INV===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                    console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" and t1.invoiceNumber like '%${_filterInvoice}%' group by t1.idTransaction;`)

                } else {

                    console.log(`===FILTER CONDITION 8 DEFAULT===`);

                    transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus = "Dibatalkan" group by t1.idTransaction order by t1.addDate desc;`)
                }
            }

            console.log(`isi transaction`, transaction);

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // // console.log(`transactionDetail, ${transactionDetail}`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction);
        } catch (error) {
            return next(error);
        }
    },
    adminGetDetailRecipe: async (req, res, next) => { //* ADMIN GET DETAIL RECIPE
        try {

            console.log(`req.query.id di adminGetDetailRecipe`, req.query.id);

            let transaction = await dbQuery(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idTransaction = ${req.query.id} group by t1.idTransaction;`)

            console.log(`select t1.idTransaction, t1.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, date_format(t1.addDate, '%Y-%m-%d %H:%i:%S') as addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.idTransaction = ${req.query.id} group by t1.idTransaction;`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            transaction.forEach((val, idx) => {
                val.purchasedProducts = [];
                transactionDetail.forEach((valDetail, idxDetail) => {
                    if (val.idTransaction == valDetail.idTransaction) {
                        val.purchasedProducts.push(valDetail)
                    }
                })
            });

            return res.status(200).send(transaction[0]);

        } catch (error) {
            return next(error);
        }
    },
    adminGetAllProduct: async (req, res, next) => { //* ADMIN GET SEMUA LIST PRODUK SERTA STOKNYA
        try {

            let productList = await dbQuery(`select p.idProduct, p.productName, p.productPicture, p.convertedQuantity, s.idStock, s.stockType, s.stockQuantity, s.priceSale, s.isMain from products p left join stocks s on p.idProduct = s.idProduct where p.isDeleted = false;`)

            return res.status(200).send(productList);

        } catch (error) {
            return next(error);
        }
    },
    adminAddTransactionDetailForRecipe: async (req, res, next) => { //* ADMIN EDIT DETAIL RECIPE
        try {

            console.log(`req.body.idTransaction`, req.body.idTransaction)
            console.log(`req.body.idUser`, req.body.idUser)
            console.log(`req.body.selectMeds`, req.body.selectedMeds)

            let { idTransaction, idUser, selectedMeds } = req.body;

            let addDetailQuery = [];
            if (selectedMeds.length >= 1) {
                selectedMeds.forEach((valueNewTransaction) => {
                    console.log(`insert into transactionsdetail (idTransaction, idStock, idUser, productName, productPicture, stockType, purchaseQuantity, priceSale, subTotal) values (${idTransaction},${valueNewTransaction.idStock},${idUser},${dbConf.escape(valueNewTransaction.productName)},${dbConf.escape(valueNewTransaction.productPicture)},${dbConf.escape(valueNewTransaction.stockType)},${valueNewTransaction.purchaseQuantity},${valueNewTransaction.priceSale},${valueNewTransaction.subTotal})`);

                    addDetailQuery.push(`insert into transactionsdetail (idTransaction, idStock, idUser, productName, productPicture, stockType, purchaseQuantity, priceSale, subTotal) values (${idTransaction},${valueNewTransaction.idStock},${idUser},${dbConf.escape(valueNewTransaction.productName)},${dbConf.escape(valueNewTransaction.productPicture)},${dbConf.escape(valueNewTransaction.stockType)},${valueNewTransaction.purchaseQuantity},${valueNewTransaction.priceSale},${valueNewTransaction.subTotal});`)
                })
            }
            let contents1
            await Promise.all(addDetailQuery.map(async (valArrayDetail) => {
                contents1 = await dbQuery(valArrayDetail);
            }));

            // let addDetailQuery = [];
            //     if (getNewTransaction.length >= 1) {
            //         getNewTransaction.forEach((valNewTransaction) => {
            //             getAllCart.forEach((valAllCart) => {
            //                 if (valNewTransaction.idCart == valAllCart.idCart) {

            //                     console.log(`addDetailQuery belum diisi IdCart itu`);

            //                     addDetailQuery.push(`insert into transactionsdetail (idTransaction, idStock, idUser, productName, productPicture, stockType, purchaseQuantity, priceSale, subTotal) values (${dbConf.escape(valNewTransaction.idTransaction)}, ${dbConf.escape(valAllCart.idStock)}, ${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(valAllCart.productName)},${dbConf.escape(valAllCart.productPicture)},${dbConf.escape(valAllCart.stockType)},${dbConf.escape(valAllCart.cartQuantity)},${dbConf.escape(valAllCart.priceSale)},${dbConf.escape(valAllCart.subTotal)});`)

            //                 }
            //             })

            //         })
            //     }

            //     let contents3
            //     await Promise.all(addDetailQuery.map(async (valArrayDetail) => {
            //         contents3 = await dbQuery(valArrayDetail);
            //     }));

            //     console.log(`addDetailQuery`, addDetailQuery);
            return res.status(200).send({ success: true, message:`add transactionsdetail berhasil` });
        } catch (error) {
            return next(error);
        }
    },
}