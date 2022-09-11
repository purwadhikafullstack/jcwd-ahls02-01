const { dbConf, dbQuery } = require("../Config/database");
const { uploader } = require("../Config/uploader");
const fs = require("fs");

module.exports = {
    userGetAllTransaction: async (req, res, next) => {
        try {
            //* by default ada query untuk pagination
            // console.log("req.query._page", req.query._page);

            //* query untuk sortir
            //^ _sortBy date = "t1.addDate"
            //^ _sortBy invoice = "t1.invoiceNumber"
            // console.log("req.query._sortBy", req.query._sortBy);
            // let sortBy = req.query._sortBy
            // console.log("req.query._order", req.query._order);
            // let _order = req.query._order

            //* query untuk filter
            // console.log("req.query._filterInvoice", req.query._filterInvoice);
            // let filterInvoice = req.query._filterInvoice
            // console.log("req.query._dateGte", req.query._dateGte);
            // let dateGte = req.query._dateGte
            // console.log("req.query._dateLte", req.query._dateLte);
            // let dateLte = req.query._dateLte

            //! COBA FILTER DAN PAGINATION -- MASIH GAGAL
            // let transaction = [];

            // if (sortBy && _order && filterInvoice == "" && dateGte == "" && dateLte == "") {
            //     //! KONDISI 1
            //     //* sortBy ada isinya _order harus ada isinya (sesuai dropdown)
            //     //* semua filter == empty string / falsy

            //     console.log(`KONDISI 1 select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress group by t1.idTransaction order by ${dbConf.escape(sortBy)} ${dbConf.escape(_order)} limit 2 offset ${dbConf.escape((req.query._page - 1) * 2)};`)

            // } else if (sortBy && _order && filterInvoice && dateGte == "" && dateLte == "") {
            //     //! KONDISI 2
            //     //* sortBy ada isinya _order harus ada isinya (sesuai dropdown)
            //     //* filterInvoice ada isinya sisa filternya == empty string / falsy

            //     console.log(`KONDISI 2 select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.invoiceNumber like "%${dbConf.escape(filterInvoice)}%" group by t1.idTransaction order by ${dbConf.escape(sortBy)} ${dbConf.escape(_order)} limit 2 offset ${dbConf.escape((req.query._page - 1) * 2)};`)

            // } else if (sortBy && _order && filterInvoice == "" && dateGte && dateLte) {
            //     //! KONDISI 3
            //     //* sortBy ada isinya _order harus ada isinya (sesuai dropdown)
            //     //* filterInvoice ada isinya sisa filternya == empty string / falsy
            //     console.log(`KONDISI 3 select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.addDate between ${dbConf.escape(dateGte)} and ${dbConf.escape(dateLte)} group by t1.idTransaction order by ${dbConf.escape(sortBy)} ${dbConf.escape(_order)} limit 2 offset ${dbConf.escape((req.query._page - 1) * 2)};`)

            // } else {
            //     //! KONDISI 4
            //     //* by default transaksi di tampilan user tersortir tanggal paling baru ke lama dan terpaginate 2 card per tampilan

            //     console.log(`KONDISI 4 select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress group by t1.idTransaction order by t1.addDate desc limit 2 offset ${dbConf.escape((req.query._page - 1) * 2)};`)

            // }

            // //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            // let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            // console.log(`transactionDetail, ${transactionDetail}`);

            // transaction.forEach((val, idx) => {
            //     val.purchasedProducts = [];
            //     transactionDetail.forEach((valDetail, idxDetail) => {
            //         if (val.idTransaction == valDetail.idTransaction) {
            //             val.purchasedProducts.push(valDetail)
            //         }
            //     })
            // });

            let transaction = await dbQuery(`select t1.idTransaction, t2.idUser, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t2.idUser=${dbConf.escape(req.dataUser.idUser)} group by t1.idTransaction order by t1.addDate desc;`)

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            console.log(`transactionDetail, ${transactionDetail}`);

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
    userGetValidasiResep: async (req, res, next) => {
        //* butuh slot untuk pagination dan filtering
        try {

        } catch (error) {

        }
    },
    userGetMenungguPembayaran: async (req, res, next) => {
        try {
            //* by default transaksi di tampilan user tersortir tanggal paling baru ke lama dan terpaginate 2 card per tampilan
            let transaction = await dbQuery(`select t1.idTransaction, sum(t2.subTotal) as totalSale, t1.prescription, t1.transactionStatus, t1.transferReceipt, t1.invoiceNumber, t1.addDate, t1.freightCost, (sum(t2.subTotal) + t1.freightCost) as totalPayment, a.receiverName, a.address, a.receiverPhone, a.postalCode from transactions t1 left join transactionsdetail t2 on t1.idTransaction = t2.idTransaction left join address a on t1.idAddress = a.idAddress where t1.transactionStatus="Menunggu Pembayaran" group by t1.idTransaction order by t1.addDate desc limit 2 offset ${dbConf.escape((req.query._page - 1) * 2)};`);

            console.log(`transaction, ${transaction}`);

            //* transactionDetail ditarik dan diattach ke transaction sebagai purchasedProducts
            let transactionDetail = await dbQuery(`select t2.idTransactionDetail, t2.idTransaction, t2.idStock, s.idProduct, t2.idUser, t2.productName, t2.productPicture, t2.stockType, s.stockQuantity, t2.purchaseQuantity, t2.priceSale, t2.subTotal from transactionsdetail t2 left join stocks s on t2.idStock = s.idStock;`);

            console.log(`transactionDetail, ${transactionDetail}`);

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
    userGetMenungguKonfirmasi: async (req, res, next) => {
        try {

        } catch (error) {

        }
    },
    addNormalTransaction: async (req, res, next) => {
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
                        addQuery.push(`insert into transactions (idCart, idAddress, prescription, transactionStatus, transferReceipt, invoiceNumber, freightCost) values (${dbConf.escape(valCart)}, ${dbConf.escape(req.body.idAddress)}, ${dbConf.escape(req.body.prescription)}, ${dbConf.escape(req.body.transactionStatus)},${dbConf.escape(req.body.transferReceipt)},${dbConf.escape(initialInvoiceNumber)},${dbConf.escape(req.body.freightCost)});`)
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

                let getNewTransaction = await dbQuery(`select * from transactions where idTransaction in (${newestInsertIdString.substring(0, newestInsertIdString.length-2)});`);

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
    addRecipeTransaction: async (req, res, next) => {
        try {

            if(req.dataUser.idUser){

            }

            return res.status(200).send({ success: true, message: 'Resep berhasil diunggah' });

        } catch (error) {
            return next(error);
        }
    }
}