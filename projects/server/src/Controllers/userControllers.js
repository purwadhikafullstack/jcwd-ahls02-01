const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  register: async (req, res, next) => {
    try {
      let checkEmail = await dbQuery(`SELECT email FROM users WHERE email = ${dbConf.escape(req.body.email)};`)
      // console.log("alert 3", checkEmail.length)
      if (checkEmail.length > 0) {
        let message = "email sudah terdaftar !"
        return res.status(404).send({
          message
        });
      } else {
        console.log("nama", req.body.name, "email", req.body.email, "pswd", req.body.password, "role", req.body.role, "phone", req.body.phone, "isVerified", req.body.isVerified)
        let resultsRegister = await dbQuery(`INSERT INTO users (name, email, password, role, phone, profilePicture, isVerified)
          values (${dbConf.escape(req.body.name)}, ${dbConf.escape(req.body.email)},
          ${dbConf.escape(hashPassword(req.body.password))}, ${dbConf.escape(req.body.role)}, ${dbConf.escape(req.body.phone)}, ${dbConf.escape(req.body.profilePicture)}
            , ${dbConf.escape(req.body.isVerified)});`);
        // console.log("CHECK", resultsRegister.insertId)
        if (resultsRegister.insertId) {
          let resultsLogin = await dbQuery(`Select * FROM users WHERE idUser =${resultsRegister.insertId};`);
          console.log("resultsLogin", resultsLogin)
          if (resultsLogin.length == 1) {

            let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = resultsLogin[0]
            let token = createToken({ idUser, addDate, isVerified }, "1h")
            let mytoken = await dbQuery(`INSERT INTO tokenlist (idUser, token)
                values (${dbConf.escape(resultsLogin[0].idUser)}, ${dbConf.escape(token)});`);
            console.log("TOKEN", token)

            // Mengirimkan Email untuk Verifikasi
            await transporter.sendMail({
              from: "Admin Medhika",
              to: email,
              subject: "Verifikasi Email Akun Medhika",
              html: `<div style="background-color: #f6f8fc">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#DE1B51" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>                    
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#DE1B51" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" class="shadow" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hello, ${req.body.name} !</h1>
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Tekan tombol untuk verifikasi akun medhika anda.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#586BB1">
                                                    <a href="http://localhost:3000/verification/${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #586BB1; display: inline-block;">Verifikasi Akun</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 0px 30px 50px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">tombol verifikasi hanya aktif selama 1 jam</p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;"></p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #FFFFFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">www.medhika.com</p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>`
            })
            return res.status(200).send({ ...resultsLogin[0], token });
          }
        }
      }
    } catch (err) {
      return next(err)
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified FROM users where idUser=${req.dataUser.idUser};`);
        console.log("resultsLogin keep =>", resultsLogin[0])
        console.log("resultsLogin keep length =>", resultsLogin.length)

        if (resultsLogin.length == 1) {
          console.log("resultsLogin.length == 1")
          let checkToken = await dbQuery(`SELECT token FROM tokenlist where idUser=${resultsLogin[0].idUser};`)
          // let birthDateFE = resultsLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified } = resultsLogin[0]
          // console.log("token keepLogin undefined", resultsLogin[0]);
          // if (checkToken.length == 1) {

          let token = checkToken[0].token
          return res.status(200).send({ ...resultsLogin[0], token });
          // }
        }
        else {
         return res.status(404).send({
            success: false,
            message: "User not Found"
          })
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired"
        })
      }
    } catch (error) {
      return next(error)
    }
  },
  verified: async (req, res, next) => {
    try {
      if (req.dataUser) {
        let update = await dbQuery(`UPDATE users SET isVerified='verified'
        WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, profilePicture, addDate, isVerified FROM users
        WHERE idUser = ${req.dataUser.idUser};`);

        console.log("resultsLogin verified", resultsLogin)
        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, addDate, isVerified })
        let mytoken = await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
        WHERE idUser = ${req.dataUser.idUser};`);
        console.log("token verified", token)
        // console.log("mytoken verified", mytoken)
        return res.status(200).send({ ...resultsLogin[0], token });
        // return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
    } catch (error) {
      return next(error)
    }
  },
  reverified: async (req, res, next) => {
    try {
      console.log("check dataUser.name", req.dataUser.name);
      console.log("check dataUser Reverif", req.dataUser);
      if (req.dataUser) {
        let resultsLogin = await dbQuery(`Select * FROM users
        WHERE idUser = ${req.dataUser.idUser};`);

        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = resultsLogin[0];
        let token = createToken({ idUser, addDate, isVerified }, "1h")
        console.log("resultLogin reverified", resultsLogin)
        console.log("token reverified", token)
        let mytoken = await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
        WHERE idUser = ${req.dataUser.idUser};`);
        // let checkToken = await dbQuery(`SELECT tokens FROM mytoken`)
        // console.log("checkToken", checkToken[0].tokens)

        await transporter.sendMail({
          from: "Admin Medhika",
          to: email,
          subject: "Verifikasi Ulang Email Akun Medhika",
          html: `<div style="background-color: #f6f8fc">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#DE1B51" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>                    
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#DE1B51" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" class="shadow" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                  <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hello, ${resultsLogin[0].name} !</h1>
                              </td>
                          </tr>
                      </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Tekan tombol untuk verifikasi akun medhika anda.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="center">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#586BB1">
                                                    <a href="http://localhost:3000/verification/${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #586BB1; display: inline-block;">Verifikasi Akun</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 0px 30px 50px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">tombol verifikasi hanya aktif selama 1 jam</p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;"></p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #FFFFFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                <p style="margin: 0;">www.medhika.com</p>
                            </td>
                        </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>`
        })
        return res.status(200).send({ ...resultsLogin[0], token });
        // success: true,
        // message: "Reverification email link delivered"
        // })
      }
    } catch (err) {
      return next(err)
    }
  },
  login: async (req, res, next) => {
    try {
      console.log("coba admin", req.body)
      let emailLogin = await dbQuery(`SELECT idUser, name, email, password, role, gender, birthDate, profilePicture, addDate, isVerified FROM users WHERE email LIKE
      '%${req.body.email}%' and password LIKE '%${hashPassword(req.body.password)}%';`);
      console.log("emailLogin Login", emailLogin[0])
      if (emailLogin[0].role == "admin") {
        console.log("login admin oke")

        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate } = emailLogin[0]
        let token = createToken({ idUser, email, role, addDate })

        return res.status(200).send({ ...emailLogin[0], token });
      } else {
        console.log("login user")
        if (req.body.email != emailLogin[0].email) {
          let message = "incorrect email"
          return res.status(404).send({
            message
          });
        } else if (hashPassword(req.body.password) != emailLogin[0].password) {
          let message = "incorrect password"
          return res.status(404).send({
            message
          });
        } else {
          if (emailLogin[0].isVerified == "unverified") {
            // generate token
            let checkToken = await dbQuery(`SELECT token FROM tokenlist WHERE idUser = ${emailLogin[0].idUser};`)
            console.log("isVerified yang Unverified")
            let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = emailLogin[0]
            let token = checkToken[0].token

            return res.status(200).send({ ...emailLogin[0], token });
          } else if (emailLogin[0].isVerified == "verified") {
            // generate token
            console.log("isVerified yang verified")
            // let birthDateFE = emailLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
            let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = emailLogin[0]
            let token = createToken({ idUser, email, role, addDate, isVerified })

            return res.status(200).send({ ...emailLogin[0], token });
          } else {
            res.status(404).send({
              success: false,
              message: "User Not Found"
            })
          }
        }
      }
    } catch (error) {
      return next(error)
    }
  },
  change: async (req, res, next) => {
    try {
      console.log("Password Lama", req.body.oldPassword)
      console.log("Password Baru", req.body.newPassword)
      console.log("dataUser changePassword", req.dataUser.idUser)
      let checkPassword = await dbQuery(`SELECT * FROM users WHERE idUser = ${req.dataUser.idUser};`)
      console.log("CHECK", checkPassword[0].password == hashPassword(req.body.oldPassword))
      if (checkPassword[0].password == hashPassword(req.body.oldPassword)) {
        let changePassword = await dbQuery(`UPDATE users SET password=${dbConf.escape(hashPassword(req.body.newPassword))}
        WHERE idUser=${req.dataUser.idUser};`);
        let change = await dbQuery(`SELECT token FROM tokenlist WHERE idUser = ${req.dataUser.idUser};`)
        console.log("CHECKPASSWORD", checkPassword[0])
        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = checkPassword[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...checkPassword[0], token });
      }
      else {
        let message = "Old Password tidak sesuai / salah"
        return res.status(404).send({
          message
        });
      }
    } catch (error) {
      return next(error)
    }
  },
  forgot: async (req, res, next) => {
    try {
      let forgot = await dbQuery(`Select * FROM users WHERE email = '${req.body.email}';`);
      // console.log("req.body forgot", forgot)
      // console.log("hash", hashPassword(req.body.password))

      if (forgot[0].email) {
        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = forgot[0]
        let token = createToken({ idUser, addDate, isVerified }, "1h")
        console.log("tokenForgot", token)
        let mytoken = await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
          WHERE idUser = ${forgot[0].idUser};`);
        // console.log("myToken", mytoken)
        if (mytoken) {

          // }
          let checkToken = await dbQuery(`SELECT * FROM tokenlist WHERE idUser = ${forgot[0].idUser};`)
          console.log("checkToken", checkToken)
          console.log("BOOLEAN", token == checkToken[0].token)
          if (token == checkToken[0].token) {

            await transporter.sendMail({
              from: "Admin Medhika",
              to: email,
              subject: "Verifikasi Ubah Password Akun Medhika",
              html: `<div style="background-color: #f6f8fc">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td bgcolor="#DE1B51" align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>                    
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#DE1B51" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" class="shadow" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hello, ${forgot[0].name} !</h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#f6f8fc" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Tekan tombol link ini untuk ubah password akun medhika anda.</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="center">
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                              <table border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td align="center" style="border-radius: 3px;" bgcolor="#586BB1">
                                                      <a href="http://localhost:3000/resetPassword/${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #586BB1; display: inline-block;">Link Ubah Password</a></td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="center" style="padding: 0px 30px 50px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">link ubah password hanya aktif selama 1 jam</p>
                              </td>
                          </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                              <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #333333; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                  <p style="margin: 0;"></p>
                              </td>
                          </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#f6f8fc" align="center" style="padding: 0px 0px 0px 0px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                              <td bgcolor="#f6f8fc" align="center" style="padding: 0px 30px 30px 30px; color: #FFFFFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                  <p style="margin: 0;">www.medhika.com</p>
                              </td>
                          </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>`
            })
            return res.status(200).send({ ...forgot[0], ...checkToken[0], token });
          }
        }
        // console.log("TOKEN", token)
        // Mengirimkan Email untuk Verifikasi
      } else {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
    } catch (error) {
      return next(error)
    }
  },
  reset: async (req, res, next) => {
    try {
      console.log("req.body resetPass", req.body.newPassword)
      console.log("dataUser reset", req.dataUser)
      if (req.dataUser.idUser) {
        let resetPassword = await dbQuery(`UPDATE users SET password=${dbConf.escape(hashPassword(req.body.newPassword))}
        WHERE idUser=${req.dataUser.idUser};`);
        let check = await dbQuery(`SELECT token FROM tokenlist WHERE idUser = ${req.dataUser.idUser};`)
        console.log("CHECK", check)
        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = check[0]
        let token = createToken({ idUser, addDate, isVerified })
        return res.status(200).send({ ...check[0], token });
      }
    } catch (error) {
      return next(error)
    }
  },
  edit: async (req, res) => {
    console.log("req.dataUsers Edit", req.dataUser)
    if (req.dataUser.idUser) {
      // console.log("req.body Edit", req.body)
      if (req.body.name == '' && req.body.gender == '' && req.body.birthDate == '') {
        let checkEmail = await dbQuery(`SELECT email FROM users WHERE email = '${req.body.email}'; `)
        if (checkEmail.length > 0) {
          console.log("alert 1")
          let message = "Email already used"
          return res.status(404).send({
            message
          });
        } else {
          let edit = await dbQuery(`UPDATE users SET email = '${req.body.email}' WHERE idUser=${req.dataUser.idUser};`)
          let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
            isVerified FROM users WHERE idUser = ${req.dataUser.idUser};`);
          console.log("edit email", resultsLogin[0])
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })
          return res.status(200).send({ ...resultsLogin[0], token, success: true });
        }
      }
      else if (req.body.email == '' && req.body.gender == '' && req.body.birthDate == '') {
        let edit = await dbQuery(`UPDATE users SET name='${req.body.name}' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
        isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit name", resultsLogin[0])
        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
      else if (req.body.name == '' && req.body.email == '' && req.body.birthDate == '') {
        let edit = await dbQuery(`UPDATE users SET gender='${req.body.gender}' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
        isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit gender", resultsLogin[0])
        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
      else if (req.body.name == '' && req.body.email == '' && req.body.gender == '') {
        let edit = await dbQuery(`UPDATE users SET birthDate ='${req.body.birthDate} 10:00:00' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
        isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit birthDate", resultsLogin[0])
        let birthDateFE = resultsLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], birthDateFE, token, success: true });
      }
      else if (req.body.name == '' && req.body.email == '') {
        let edit = await dbQuery(`UPDATE users SET gender ='${req.body.gender}',
          birthDate = '${req.body.birthDate} 10:00:00' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
          isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit gender & birthDate", resultsLogin[0])
        if (resultsLogin[0].idUser == req.dataUser.idUser) {
          let birthDateFE = resultsLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })
          console.log("kirim token gender birthdate")
          return res.status(200).send({ ...resultsLogin[0], birthDateFE, token });
        }
      }
      else {
        let checkEmail = await dbQuery(`SELECT email FROM users WHERE email = '${req.body.email}'; `)
        if (checkEmail.length > 0) {
          console.log("alert 1")
          let message = "Email already used"
          return res.status(404).send({
            message
          });
        } else {
          let edit = await dbQuery(`UPDATE users SET name='${req.body.name}', email='${req.body.email}',
            gender = '${req.body.gender}', birthDate='${req.body.birthDate}' WHERE idUser=${req.dataUser.idUser};`)
          let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
            isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
          console.log("edit birthDate", resultsLogin[0])
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })
          return res.status(200).send({ ...resultsLogin[0], token, success: true });
        }
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "Token expired"
      })
    }
  },
}