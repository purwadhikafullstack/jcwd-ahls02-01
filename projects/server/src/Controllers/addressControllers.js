const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  getAddress: async (req, res, next) => {
    try {
      console.log("dataUser getAddress", req.dataUser)
      if (req.dataUser.idUser) {
        let myAddress = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
        console.log("myAddress", myAddress)

        return res.status(200).send(myAddress);
      }
    } catch (error) {
      return next(error)
    }
  },
  addAddress: async (req, res, next) => {
    try {
      console.log("BODY ADD ADDRESS USER", req.body)
      let checkLabel = await dbQuery(`SELECT label FROM address WHERE label = ${dbConf.escape(req.body.label)}
        AND idUser = ${req.dataUser.idUser};`)
      console.log("checkLabel address", checkLabel)
      if (checkLabel.length > 0) {
        let message = 'Label sudah terdaftar, Mohon isi dengan nama lain'
        return res.status(404).send({
          message
        });
      } else {
        // addAddress Secondary
        if (req.body.isDefaultAddress == false) {
          console.log("ADD ADDRESS false")
          let addAddress = await dbQuery(`INSERT INTO address (idUser, receiverName, receiverPhone, address, province, idProvince, city, idCity, postalCode, isDefaultAddress, label)
            values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(req.body.receiverName)}, ${dbConf.escape(req.body.receiverPhone)}, ${dbConf.escape(req.body.address)},
              ${dbConf.escape(req.body.province)}, ${dbConf.escape(req.body.provinceid)}, ${dbConf.escape(req.body.city)}, ${dbConf.escape(req.body.cityid)},
              ${dbConf.escape(req.body.postalCode)}, '${req.body.isDefaultAddress}', ${dbConf.escape(req.body.label)});`);
          console.log("CHECK addAddress", addAddress.insertId)
          if (addAddress.insertId) {
            let myAddress = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("myAddress", myAddress)

            return res.status(200).send(myAddress);
          }
        }
        // addAddress Primary
        else {
          console.log("ADD ADDRESS true")
          let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}'
          AND idUser = ${req.dataUser.idUser};`)
          console.log("checkUtama addAddress", checkUtama[0])
          if (checkUtama[0] == undefined) {
            let addAddress = await dbQuery(`INSERT INTO address (idUser, receiverName, receiverPhone, address, province, idProvince, city, idCity, postalCode, isDefaultAddress, label)
              values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(req.body.receiverName)}, ${dbConf.escape(req.body.receiverPhone)}, ${dbConf.escape(req.body.address)},
                ${dbConf.escape(req.body.province)}, ${dbConf.escape(req.body.provinceid)}, ${dbConf.escape(req.body.city)}, ${dbConf.escape(req.body.cityid)},
                ${dbConf.escape(req.body.postalCode)}, '${req.body.isDefaultAddress}', ${dbConf.escape(req.body.label)});`);
            // console.log("CHECK addAddress", addAddress.insertId)
            if (addAddress.insertId) {
              let myAddress = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("myAddress", myAddress)

              return res.status(200).send(myAddress);
            }
          } else {
            let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false'
            WHERE idAddress=${checkUtama[0].idAddress};`)
            console.log("updateUtama addAddress", updateUtama)

            let addAddress = await dbQuery(`INSERT INTO address (idUser, receiverName, receiverPhone, address, province, idProvince, city, idCity, postalCode, isDefaultAddress, label)
              values (${dbConf.escape(req.dataUser.idUser)}, ${dbConf.escape(req.body.receiverName)}, ${dbConf.escape(req.body.receiverPhone)}, ${dbConf.escape(req.body.address)},
                ${dbConf.escape(req.body.province)}, ${dbConf.escape(req.body.provinceid)}, ${dbConf.escape(req.body.city)}, ${dbConf.escape(req.body.cityid)},
                ${dbConf.escape(req.body.postalCode)}, '${req.body.isDefaultAddress}', ${dbConf.escape(req.body.label)});`);
            console.log("CHECK addAddress", addAddress.insertId)
            if (addAddress.insertId) {
              let myAddress = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("myAddress", myAddress)

              return res.status(200).send(myAddress);
            }
          }
        }
      }
    } catch (err) {
      return next(err)
    }
  },
  editAddress: async (req, res, next) => {
    try {
      console.log("req.dataUsers Edit address", req.dataUser)
      if (req.dataUser.idUser) {
        console.log("req.body Edit", req.body)

        // EDIT UTAMA
        if (req.body.label == '' && req.body.receiverName == '' && req.body.receiverPhone == '' && req.body.address == '' && req.body.postalCode == '') {
          console.log("EDIT UTAMA 1 JALANNN")
          console.log("EDIT UTAMA 2 JALANNN")
          if (req.body.isDefaultAddress == true) {
            console.log("EDIT UTAMA 3 JALANNN")
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit utama undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit utama", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          } else {
            return res.status(401).send({
              success: false,
              message: "Data alamat tidak ada yang berubah"
            })
          }
        }
        // EDIT LABEL
        else if (req.body.receiverName == '' && req.body.receiverPhone == '' && req.body.address == '' && req.body.postalCode == '') {
          let checkLabel = await dbQuery(`SELECT label FROM address WHERE label = ${dbConf.escape(req.body.label)} AND idUser = ${req.dataUser.idUser};`)
          console.log("checkLabel.length", checkLabel.length)

          if (checkLabel.length > 0) {
            let message = 'Label sudah terdaftar, Mohon isi dengan nama lain'
            return res.status(404).send({
              message
            });
          } else {
            if (req.body.isDefaultAddress == false) {
              let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit label", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
              console.log("checkUtama[0]", checkUtama[0])
              if (checkUtama[0] == undefined) {
                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label undefined", resultsEdit)

                return res.status(200).send(resultsEdit);
              } else {
                let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label", resultsEdit)

                return res.status(200).send(resultsEdit);
              }
            }
          }
        }

        // EDIT RECEIVERNAME
        else if (req.body.label == '' && req.body.receiverPhone == '' && req.body.address == '' && req.body.postalCode == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit nama penerima", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit nama penerima undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit nama penerima", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT RECEIVERPHONE
        else if (req.body.label == '' && req.body.receiverName == '' && req.body.address == '' && req.body.postalCode == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET receiverPhone = '${req.body.receiverPhone}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit telfon", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit telfon undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit telfon", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT ADDRESS
        else if (req.body.label == '' && req.body.receiverName == '' && req.body.receiverPhone == '' && req.body.postalCode == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit alamat", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit alamat undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit alamat", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT RECEIVERNAME & RECEIVERPHONE
        else if (req.body.label == '' && req.body.address == '' && req.body.postalCode == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit nama penerima & telfon", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit nama penerima & telfon undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit nama penerima & telfon", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT ADDRESS, PROVINCE, CITY & POSTALCODE
        else if (req.body.label == '' && req.body.receiverName == '' && req.body.receiverPhone == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}', province = '${req.body.province}', idProvince =${req.body.provinceid}, city = '${req.body.city}', idCity =${req.body.cityid}, postalCode = '${req.body.postalCode}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit alamat, provinsi, kota & kode pos", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}', province = '${req.body.province}', idProvince =${req.body.provinceid}, city = '${req.body.city}', idCity =${req.body.cityid}, postalCode = '${req.body.postalCode}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit alamat, provinsi, kota & kode pos undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET address = '${req.body.address}', province = '${req.body.province}', idProvince =${req.body.provinceid}, city = '${req.body.city}', idCity =${req.body.cityid}, postalCode = '${req.body.postalCode}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit alamat, provinsi, kota & kode pos", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT LABEL, RECEIVERNAME & RECEIVERPHONE
        else if (req.body.address == '' && req.body.postalCode == '') {
          let checkLabel = await dbQuery(`SELECT label FROM address WHERE label = ${dbConf.escape(req.body.label)} AND idUser = ${req.dataUser.idUser};`)
          console.log("checkLabel.length", checkLabel.length)

          if (checkLabel.length > 0) {
            let message = 'Label sudah terdaftar, Mohon isi dengan nama lain'
            return res.status(404).send({
              message
            });
          } else {
            if (req.body.isDefaultAddress == false) {
              let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}' WHERE idAddress=${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit label, penerima & telfon", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
              console.log("checkUtama[0]", checkUtama[0])
              if (checkUtama[0] == undefined) {
                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label, penerima & telfon undefined", resultsEdit)

                return res.status(200).send(resultsEdit);
              } else {
                let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label, penerima & telfon", resultsEdit)

                return res.status(200).send(resultsEdit);
              }
            }
          }
        }

        // EDIT RECEIVERNAME, RECEIVERPHONE & ADDRESS
        else if (req.body.label == '' && req.body.postalCode == '') {
          if (req.body.isDefaultAddress == false) {
            let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}' WHERE idAddress=${req.body.idAddress};`)
            let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
            console.log("resultEdit penerima, telfon & alamat", resultsEdit)

            return res.status(200).send(resultsEdit);
          } else {
            let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
            console.log("checkUtama[0]", checkUtama[0])
            if (checkUtama[0] == undefined) {
              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit penerima, telfon & alamat undefined", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

              let edit = await dbQuery(`UPDATE address SET receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit penerima, telfon & alamat", resultsEdit)

              return res.status(200).send(resultsEdit);
            }
          }
        }

        // EDIT LABEL, RECEIVERNAME, RECEIVERPHONE & ADDRESS
        else if (req.body.postalCode == '') {
          let checkLabel = await dbQuery(`SELECT label FROM address WHERE label = ${dbConf.escape(req.body.label)} AND idUser = ${req.dataUser.idUser};`)
          console.log("checkLabel.length", checkLabel.length)

          if (checkLabel.length > 0) {
            let message = 'Label sudah terdaftar, Mohon isi dengan nama lain'
            return res.status(404).send({
              message
            });
          } else {
            if (req.body.isDefaultAddress == false) {
              let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}' WHERE idAddress=${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit label, penerima, telfon & alamat", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
              console.log("checkUtama[0]", checkUtama[0])
              if (checkUtama[0] == undefined) {
                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label, penerima, telfon & alamat undefined", resultsEdit)

                return res.status(200).send(resultsEdit);
              } else {
                let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit label, penerima, telfon & alamat", resultsEdit)

                return res.status(200).send(resultsEdit);
              }
            }
          }
        }

        // EDIT ALL
        else {
          let checkLabel = await dbQuery(`SELECT label FROM address WHERE label = ${dbConf.escape(req.body.label)} AND idUser = ${req.dataUser.idUser};`)
          console.log("checkLabel.length", checkLabel.length)

          if (checkLabel.length > 0) {
            let message = 'Label sudah terdaftar, Mohon isi dengan nama lain'
            return res.status(404).send({
              message
            });
          } else {
            if (req.body.isDefaultAddress == false) {
              let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', province = '${req.body.province}', city = '${req.body.city}', postalCode = '${req.body.postalCode}' WHERE idAddress=${req.body.idAddress};`)
              let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
              console.log("resultEdit ALL", resultsEdit)

              return res.status(200).send(resultsEdit);
            } else {
              let checkUtama = await dbQuery(`SELECT idAddress FROM address WHERE isDefaultAddress = '${req.body.isDefaultAddress}' AND idUser = ${req.dataUser.idUser};`)
              console.log("checkUtama[0]", checkUtama[0])
              if (checkUtama[0] == undefined) {
                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', province = '${req.body.province}', city = '${req.body.city}', postalCode = '${req.body.postalCode}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress=${req.body.idAddress};`)

                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit ALL undefined", resultsEdit)

                return res.status(200).send(resultsEdit);
              } else {
                let updateUtama = await dbQuery(`UPDATE address SET isDefaultAddress= 'false' WHERE idAddress=${checkUtama[0].idAddress};`)

                let edit = await dbQuery(`UPDATE address SET label = '${req.body.label}', receiverName = '${req.body.receiverName}', receiverPhone = '${req.body.receiverPhone}', address = '${req.body.address}', province = '${req.body.province}', city = '${req.body.city}', postalCode = '${req.body.postalCode}', isDefaultAddress = '${req.body.isDefaultAddress}' WHERE idAddress = ${req.body.idAddress};`)
                let resultsEdit = await dbQuery(`Select * FROM address WHERE idUser = ${req.dataUser.idUser};`);
                console.log("resultEdit ALL", resultsEdit)

                return res.status(200).send(resultsEdit);
              }
            }
          }
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "User Not Loggin"
        })
      }
    } catch (error) {
      return next(error)
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      console.log("body delete", req.body)
      // deleteAddress Primary
      if (req.body.isDefaultAddress == true) {
        console.log('delete PRIMARY address');
        let deleteAddress = await dbQuery(`DELETE FROM address WHERE idAddress = ${req.body.idAddress};`);

        let checkDelete = await dbQuery(`SELECT * FROM address WHERE idUser = ${req.dataUser.idUser};`);
        console.log('checkDelete.length =', checkDelete.length);
        if (checkDelete.length > 0) {
          let updateDelete = await dbQuery(`UPDATE address SET isDefaultAddress= 'true'
          WHERE idAddress=${checkDelete[0].idAddress};`)

          let resultDelete = await dbQuery(`SELECT * FROM address WHERE idUser = ${req.dataUser.idUser};`);
          // console.log("resultDelete Address", resultDelete);
          return res.status(200).send(resultDelete)
        } else {
          let resultDelete = await dbQuery(`SELECT * FROM address WHERE idUser = ${req.dataUser.idUser};`);
          // console.log("resultDelete Address", resultDelete);
          return res.status(200).send(resultDelete)
        }
      }
      // deleteAddress Secondary
      else {
        console.log('delete secondary address');
        let deleteAddress = await dbQuery(`DELETE FROM address WHERE idAddress = ${req.body.idAddress};`);

        let resultDelete = await dbQuery(`SELECT * FROM address WHERE idUser = ${req.dataUser.idUser};`);
        // console.log("resultDelete Address", resultDelete);
        return res.status(200).send(resultDelete)
      }
    } catch (error) {
      return next(error)
    }
  }
}