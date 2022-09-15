const { dbConf, dbQuery } = require('../Config/database');

module.exports = {
    getAllCart: async (req, res, next) => {
        try {
            if (req.dataUser.idUser) {
                let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal, c.isActive from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} order by c.addDate desc;`);

                // let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} and c.isActive = "true" order by c.addDate desc;`);

                //* isi getAllCart
                // console.log(`getAllCart`, getAllCart);

                return res.status(200).send(getAllCart);
            }
        } catch (error) {
            return next(error);
        }
    },
    add: async (req, res, next) => {
        try {
            //* isi body
            //? idProduct = 3 >> idStock = 5, cartQuantity pasti 1 karena baru pertama masuk cart
            console.log(`req.body.idProduct`, req.body.idProduct);
            // console.log(`req.body.cartQuantity`, req.body.cartQuantity);

            let cartQuantity = 1

            if (req.dataUser.idUser) {

                let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} and c.isActive = "true";`);

                //* isi getAllCart
                console.log(`getAllCart`, getAllCart);

                let getStock = await dbQuery(`select s.idStock, s.stockQuantity, s.priceSale from stocks s where s.idProduct = ${dbConf.escape(req.body.idProduct)} and s.isMain = "true";`);

                getStock = getStock[0];

                //* isi getStock
                console.log(`getStock`, getStock);
                console.log(`getStock.idStock`, getStock.idStock);
                console.log(`getStock.stockQuantity`, getStock.stockQuantity);
                console.log(`getStock.priceSale`, getStock.priceSale);

                //* kalau idStock belum ditemukan  di getAllCart berarti belum masuk cart saat ini
                if (getAllCart.findIndex(valcart => valcart.idStock != getStock.idStock == -1)) {
                    console.log(`idStock ini baru`);

                    if (cartQuantity <= getStock.stockQuantity) {

                        //^ cek query sebelum ke database
                        console.log(`insert into cart (idUser, idStock, cartQuantity, subTotal) values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(getStock.idStock)}, ${dbConf.escape(cartQuantity)}, ${dbConf.escape(cartQuantity * getStock.priceSale)});`);

                        let addCart = await dbQuery(`insert into cart (idUser, idStock, cartQuantity, subTotal) values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(getStock.idStock)}, ${dbConf.escape(cartQuantity)}, ${dbConf.escape(cartQuantity * getStock.priceSale)});`);

                        return res.status(200).send({ success: true, message: 'Tambah produk baru berhasil' });

                    } else {

                        return res.status(406).send({ success: false, message: 'Jumlah produk yang ingin dibeli melebihi stok yang ada' });

                    }

                } else {
                    console.log(`idStock ini sdh ada di cart jadi harusnya fungsi patch yg jalan`);
                }
            }

        } catch (error) {
            return next(error);
        }
    },
    edit: async (req, res, next) => {
        try {
            //* isi params & body
            //? idProduct = 2 >> idStock = 3 >> sudah ada di cart use 6
            console.log(`req.params.idCart`, req.params.idCart);
            console.log(`req.body.idProduct`, req.body.idProduct);
            console.log(`req.body.cartQuantity`, req.body.cartQuantity);

            if (req.dataUser.idUser) {

                let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} and c.isActive = "true";`);

                //* isi getAllCart
                console.log(`getAllCart`, getAllCart);

                let getStock = await dbQuery(`select s.idStock, s.stockQuantity, s.priceSale from stocks s where s.idProduct = ${dbConf.escape(req.body.idProduct)} and s.isMain = "true";`);

                getStock = getStock[0];

                //* isi getStock
                console.log(`getStock`, getStock);
                console.log(`getStock.idStock`, getStock.idStock);
                console.log(`getStock.stockQuantity`, getStock.stockQuantity);
                console.log(`getStock.priceSale`, getStock.priceSale);

                //* cari idxCart dr cart yg simpan produk yg mau diupdate
                let idxCart = getAllCart.findIndex(valcart => valcart.idStock == getStock.idStock);
                console.log(`idxCart`, idxCart);

                //* ambil data cart yg mau diupdate
                let updatedCart = getAllCart[idxCart];
                console.log(`updatedCart`, updatedCart);

                //* saat jml terbaru lebih besar dr jml di cart sebelumnya
                if (updatedCart.cartQuantity <= req.body.cartQuantity) {
                    if (req.body.cartQuantity <= getStock.stockQuantity) {

                        //^ cek query sebelum ke database
                        console.log(`UPDATE cart SET cartQuantity = ${dbConf.escape(req.body.cartQuantity)}, subTotal = ${dbConf.escape(req.body.cartQuantity * getStock.priceSale)} WHERE idCart = ${dbConf.escape(updatedCart.idCart)};`)

                        let addQuantity = await dbQuery(`UPDATE cart SET cartQuantity = ${dbConf.escape(req.body.cartQuantity)}, subTotal = ${dbConf.escape(req.body.cartQuantity * getStock.priceSale)} WHERE idCart = ${dbConf.escape(updatedCart.idCart)};`)

                        return res.status(200).send({ success: true, message: 'Add quantity di cart berhasil' });

                    } else {

                        return res.status(406).send({ success: false, message: 'Jumlah produk yang ingin dibeli melebihi stok yang ada' });

                    }
                } else {

                    if (req.body.cartQuantity >= 0) {

                        //^ cek query sebelum ke database
                        console.log(`UPDATE cart SET cartQuantity = ${dbConf.escape(req.body.cartQuantity)}, subTotal = ${dbConf.escape(req.body.cartQuantity * getStock.priceSale)} WHERE idCart = ${dbConf.escape(updatedCart.idCart)};`)

                        let decreaseQuantity = await dbQuery(`UPDATE cart SET cartQuantity = ${dbConf.escape(req.body.cartQuantity)}, subTotal = ${dbConf.escape(req.body.cartQuantity * getStock.priceSale)} WHERE idCart = ${dbConf.escape(updatedCart.idCart)};`)

                        return res.status(200).send({ success: true, message: 'Decrease quantity di cart berhasil' });

                    } else {

                        return res.status(406).send({ success: false, message: 'Jumlah produk pada keranjang tidak bisa kurang dari 0' });

                    }
                }
            }

        } catch (error) {
            return next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            //* isi params & body
            //? idProduct = 2 >> idStock = 3 >> sudah ada di cart use 6
            console.log(`req.params.idCart`, req.params.idCart);
            console.log(`req.body.idProduct`, req.body.idProduct);
            console.log(`req.body.cartQuantity`, req.body.cartQuantity);

            if (req.dataUser.idUser) {

                let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} and c.isActive = "true";`);

                //* isi getAllCart
                // console.log(`getAllCart`, getAllCart);

                let getStock = await dbQuery(`select s.idStock, s.stockQuantity, s.priceSale from stocks s where s.idProduct = ${dbConf.escape(req.body.idProduct)} and s.isMain = "true";`);

                getStock = getStock[0];

                //* isi getStock
                // console.log(`getStock`, getStock);
                console.log(`getStock.idStock`, getStock.idStock);
                // console.log(`getStock.stockQuantity`, getStock.stockQuantity);
                // console.log(`getStock.priceSale`, getStock.priceSale);

                //^ cek query stock sebelum ke database
                console.log(`UPDATE stocks SET stockQuantity = ${dbConf.escape(getStock.stockQuantity + req.body.cartQuantity)} WHERE idStock = ${dbConf.escape(getStock.idStock)};`)

                let addStockQuantity = await dbQuery(`UPDATE stocks SET stockQuantity = ${dbConf.escape(getStock.stockQuantity + req.body.cartQuantity)} WHERE idStock = ${dbConf.escape(getStock.idStock)};`)

                //^ cek query cart sebelum ke database
                console.log(`Delete from cart where idCart = ${dbConf.escape(req.params.idCart)};`);

                let deleteCartItem = await dbQuery(`Delete from cart where idCart = ${dbConf.escape(req.params.idCart)};`);

                return res.status(200).send({ success: true, message: 'Delete cart item terpilih berhasil' });

            }

        } catch (error) {
            return next(error);
        }
    },
    checkout: async (req, res, next) => {
        try {
            //* isi params & body
            //? idProduct = 2 >> idStock = 3 >> sudah ada di cart use 6
            console.log(`req.body.arrayIdCart`, req.body.arrayIdCart);

            if (req.dataUser.idUser) {

                if (req.body.arrayIdCart.length > 0) {

                    let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)} and c.isActive = "true";`);

                    //* isi getAllCart
                    console.log(`getAllCart`, getAllCart);

                    let selectedCart = getAllCart.filter((val1) => req.body.arrayIdCart.some((val2) => val1.idCart === val2));

                    //* isi cart yg terseleksi untuk dicheckout
                    console.log(`selectedCart`, selectedCart);

                    let getStock = await dbQuery(`select s.idStock, s.stockQuantity, s.priceSale from stocks s where s.isMain = "true";`);

                    //* isi getStock
                    // console.log(`getStock`, getStock);

                    let inactiveCartQuery = ``
                    if (selectedCart.length > 1) {
                        //* susun query untuk update cart
                        let inactiveCartQuery1 = `UPDATE cart SET isActive = "false" WHERE idCart in (`;
                        let inactiveCartId = ``
                        for (var i = 0; i < selectedCart.length; i++) {
                            inactiveCartId += `${selectedCart[i].idCart}, `
                        }
                        inactiveCartQuery = `${inactiveCartQuery1}${inactiveCartId.substring(0, inactiveCartId.length - 2)});`

                        //^ cek query cart sebelum ke database
                        console.log(`inactiveCartQuery`, inactiveCartQuery);

                    } else if (selectedCart.length == 1) {
                        inactiveCartQuery = `UPDATE cart SET isActive = "false" WHERE idCart = ${selectedCart[0].idCart};`
                    }

                    let inactiveCart = await dbQuery(inactiveCartQuery);

                    //* susun query untuk update stock
                    let selectedStock = getStock.filter((val1) => selectedCart.some((val2) => val1.idStock === val2.idStock));
                    let arrayStockQuery = [];
                    if (selectedCart.length >= 1) {
                        for (var j = 0; j < selectedCart.length; j++) {
                            for (var k = 0; k < selectedStock.length; k++) {

                                if (selectedStock[k].idStock == selectedCart[j].idStock) {

                                    arrayStockQuery.push(`update stocks set stockQuantity = ${dbConf.escape(selectedStock[k].stockQuantity - selectedCart[j].cartQuantity)} where idStock = ${dbConf.escape(selectedStock[k].idStock)};`)

                                }

                                await Promise.all(arrayStockQuery.map(async (valArray) => {
                                    let contents = await dbQuery(valArray);
                                    console.log(`contents`, contents);
                                }));

                            }
                        }

                        return res.status(200).send({ success: true, message: 'Cart item berhasil dicheckout' });

                    }

                } else {

                    return res.status(406).send({ success: false, message: 'Cart item belum ada yang dipilih' });
                }

            }

        } catch (error) {
            return next(error);
        }
    },
    returnStock: async (req, res, next) => {
        try {
            //* isi params & body
            console.log(`req.body.arrayIdCart`, req.body.arrayIdCart);

            if (req.dataUser.idUser) {

                if (req.body.arrayIdCart.length > 0) {

                    let getAllCart = await dbQuery(`select c.idCart, c.idStock, p.productName, p.productPicture, c.cartQuantity, s.stockType, s.priceSale, c.subTotal from cart c left join stocks s on c.idStock = s.idStock left join products p on s.idProduct = p.idProduct where c.idUser = ${dbConf.escape(req.dataUser.idUser)};`);

                    //* isi getAllCart
                    console.log(`getAllCart`, getAllCart);

                    let selectedCart = getAllCart.filter((val1) => req.body.arrayIdCart.every((val2) => val1.idCart === val2));

                    //* isi cart yg terseleksi untuk dicheckout
                    console.log(`selectedCart`, selectedCart);

                    let getStock = await dbQuery(`select s.idStock, s.stockQuantity, s.priceSale from stocks s where s.isMain = "true";`);

                    //* isi getStock
                    // console.log(`getStock`, getStock);

                    //* susun query untuk update cart
                    let activateCartQuery = '';
                    if (selectedCart.length > 1) {
                        let activateCartQuery1 = `UPDATE cart SET isActive = "true" WHERE idCart in (`;
                        let activateCartId = ``
                        for (var i = 0; i < selectedCart.length; i++) {
                            activateCartId += `${selectedCart[i].idCart},`
                        }

                        activateCartQuery = `${activateCartQuery1}${activateCartId.substring(0, activateCartId.length - 2)});`

                        //^ cek query cart sebelum ke database
                        console.log(`activateCartQuery`, activateCartQuery);

                    } else if (selectedCart.length == 1) {
                        activateCartQuery = `UPDATE cart SET isActive = "true" WHERE idCart = ${selectedCart[0].idCart};`
                    }

                    let activateCart = await dbQuery(activateCartQuery);

                    //* susun query untuk update stock
                    let selectedStock = getStock.filter((val1) => selectedCart.some((val2) => val1.idStock === val2.idStock));
                    let arrayStockQuery = [];
                    if (selectedCart.length >= 1) {
                        for (var j = 0; j < selectedCart.length; j++) {
                            for (var k = 0; k < selectedStock.length; k++) {

                                if (selectedStock[k].idStock == selectedCart[j].idStock) {
                                    arrayStockQuery.push(`update stocks set stockQuantity = ${dbConf.escape(selectedStock[k].stockQuantity + selectedCart[j].cartQuantity)} where idStock = ${dbConf.escape(selectedStock[k].idStock)};`)
                                }

                                await Promise.all(arrayStockQuery.map(async (valArray) => {
                                    let contents = await dbQuery(valArray);
                                    console.log(`contents`, contents);
                                }));

                            }
                        }

                        return res.status(200).send({ success: true, message: 'Cart item berhasil direturn' });

                    }

                }
            }

        } catch (error) {
            return next(error);
        }
    },
    getAllMainStock: async (req, res, next) => {
        try {

            let getAllMainStock = await dbQuery(`select * from stocks s where s.isMain="true";`);

            //* isi getAllProduct
            console.log(`getAllMainStock`, getAllMainStock);

            return res.status(200).send(getAllMainStock);

        } catch (error) {
            return next(error);
        }
    }
}