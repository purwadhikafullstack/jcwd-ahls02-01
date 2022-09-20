const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
// const util = require("util");
// const query = db.dbQuery;
const { transporter } = require("../Config/nodemailer");
const { uploader } = require("../Config/uploader");
const fs = require("fs");
const productUserController = require("./Randy/productUsercontroller");

module.exports = {
  ...productUserController,
  register: async (req, res, next) => {
    try {
      let checkEmail = await dbQuery(
        `SELECT email FROM users WHERE email = ${dbConf.escape(
          req.body.email
        )};`
      );
      // console.log("alert 3", checkEmail.length)
      if (checkEmail.length > 0) {
        let message = "email sudah terdaftar !";
        return res.status(404).send({
          message,
        });
      } else {
        console.log(
          "nama",
          req.body.name,
          "email",
          req.body.email,
          "pswd",
          req.body.password,
          "role",
          req.body.role,
          "phone",
          req.body.phone,
          "isVerified",
          req.body.isVerified
        );
        let resultsRegister =
          await dbQuery(`INSERT INTO users (name, email, password, role, phone, profilePicture, isVerified)
          values (${dbConf.escape(req.body.name)}, ${dbConf.escape(
            req.body.email
          )},
          ${dbConf.escape(hashPassword(req.body.password))}, ${dbConf.escape(
            req.body.role
          )}, ${dbConf.escape(req.body.phone)}, ${dbConf.escape(
            req.body.profilePicture
          )}
            , ${dbConf.escape(req.body.isVerified)});`);
        // console.log("CHECK", resultsRegister.insertId)
        if (resultsRegister.insertId) {
          let resultsLogin = await dbQuery(
            `Select * FROM users WHERE idUser =${resultsRegister.insertId};`
          );
          console.log("resultsLogin", resultsLogin);
          if (resultsLogin.length == 1) {
            let {
              idUser,
              name,
              email,
              password,
              role,
              phone,
              profilePicture,
              addDate,
              isVerified,
            } = resultsLogin[0];
            let token = createToken({ idUser, addDate, isVerified }, "1h");
            let mytoken = await dbQuery(`INSERT INTO tokenlist (idUser, token)
                values (${dbConf.escape(
              resultsLogin[0].idUser
            )}, ${dbConf.escape(token)});`);
            console.log("TOKEN", token);

            // Mengirimkan Email untuk Verifikasi
            await transporter.sendMail({
              from: "Admin Medhika",
              to: email,
              subject: "Verifikasi Email Akun Medhika",
              html: `<div class="es-wrapper-color">
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="esd-email-paddings" valign="top">
                      <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p20" align="left" style="border-radius: 10px 10px 0px 0px; background-color: #de1b51;" bgcolor="#4c8aa7" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tr>
                                          <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center" >
                                            <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 1px; border-collapse: separate;" >
                                              <tbody>
                                                <tr>
                                                  <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #FFFFFF; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                    <h2>medhika</h2>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="es-content" cellspacing="0" cellpadding="0" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-content-body" style="border-left: 1px solid #de1b51; border-right: 1px solid #de1b51; background-color: #ffffff;"
                                width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p30t es-p20r es-p20l" align="center" bgcolor="#ffffff" style="background-color: #ffffff" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tbody>
                                          <tr>
                                            <td width="558" align="center" class="esd-container-frame" >
                                              <table cellpadding="0" cellspacing="0" width="100%" >
                                                <tbody>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #333333; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                      <h2> Hallo, Selamat Datang <br/>${req.body.name} !</h2>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" >
                                                      <img src="https://img.freepik.com/free-vector/email-campaign-concept-illustration_114360-1633.jpg?w=1380&t=st=1661592502~exp=1661593102~hmac=6fa57b78ac55779ce62545794bc63cd48ec8b02c160f0e470b17dd190cfe63ac" style="display: block; margin-bottom: 20px; margin-left: 10px;" width="370" />
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="es-m-p0r esd-container-frame" width="558" valign="top" align="center" >
                                              <table width="100%" cellspacing="0" cellpadding="0" >
                                                <tbody>
                                                  <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td align="center" style="font-family: sans-serif; font-size: 15px; border-radius: 8px;" bgcolor="#586BB1">
                                                        <a href="${process.env.FE_URL}/verification/${token}" target="_blank" style="font-size: 20px; font-family: sans-serif; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 2px; display: inline-block;">Verifikasi Akun</a>
                                                      </td>
                                                    </tr>
                                                </table>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-p10t es-p20b es-p40r es-p40l" style="color: #333333; font-family: sans-serif; font-size: 15px;" >
                                                      <p style="margin-top: 30px; margin-bottom: 30px;">
                                                        dengan verifikasi akun memudahkan anda untuk transaksi di Medhika Apotek Online. Tombol verifikasi ini hanya berlaku selama 1 jam.
                                                      </p>
                                                      <br/>
                                                    </td>
                                                  </tr>
                                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center" >
                                                  <tbody>
                                                    <tr>
                                                      <td class="esd-stripe" align="center">
                                                        <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                                          <tbody>
                                                            <tr>
                                                              <td class="esd-structure es-p25t es-p25b es-p20r es-p20l" align="center" style="border-radius: 0px 0px 10px 10px; background-color: #de1b51; color: #FFFFFF; font-family: sans-serif; font-size: 12px;">
                                                              <p>Group 1 Final Project - JCWDAHLS01</p>
                                                              <table align="center" cellpadding="0" cellspacing="0" width="100%" >
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>`
            })
            return res.status(200).send({ ...resultsLogin[0], token });
          }
        }
      }
    } catch (err) {
      return next(err);
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      if (req.dataUser.idUser) {
        let resultsLogin = await dbQuery(
          `Select idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified FROM users where idUser=${req.dataUser.idUser};`
        );
        console.log("resultsLogin keep =>", resultsLogin[0]);
        if (resultsLogin[0].birthDate == null) {
          console.log("resultsLogin[0].birthDate == kosong ")

          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, isVerified })
          return res.status(200).send({ ...resultsLogin[0], token });
        } else {
          console.log("resultsLogin[0].birthDate == ada ")

          // let checkToken = await dbQuery(`SELECT token FROM tokenlist where idUser=${resultsLogin[0].idUser};`)
          let birthDateFE = resultsLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, isVerified })
          return res.status(200).send({ ...resultsLogin[0], birthDateFE, token });
        }
      } else {
        return res.status(401).send({
          success: false,
          message: "Token expired",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  verified: async (req, res, next) => {
    try {
      if (req.dataUser) {
        let update = await dbQuery(`UPDATE users SET isVerified='verified'
        WHERE idUser=${req.dataUser.idUser};`);
        let resultsLogin =
          await dbQuery(`Select idUser, name, email, role, phone, profilePicture, addDate, isVerified FROM users
        WHERE idUser = ${req.dataUser.idUser};`);

        console.log("resultsLogin verified", resultsLogin);
        let {
          idUser,
          name,
          email,
          password,
          role,
          phone,
          profilePicture,
          addDate,
          isVerified,
        } = resultsLogin[0];
        let token = createToken({ idUser, addDate, isVerified });
        let mytoken =
          await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
        WHERE idUser = ${req.dataUser.idUser};`);
        console.log("token verified", token);
        // console.log("mytoken verified", mytoken)
        return res.status(200).send({ ...resultsLogin[0], token });
        // return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
    } catch (error) {
      return next(error);
    }
  },
  reverified: async (req, res, next) => {
    try {
      console.log("check dataUser.name", req.dataUser.name);
      console.log("check dataUser Reverif", req.dataUser);
      if (req.dataUser) {
        let resultsLogin = await dbQuery(`Select * FROM users
        WHERE idUser = ${req.dataUser.idUser};`);

        let {
          idUser,
          name,
          email,
          password,
          role,
          phone,
          profilePicture,
          addDate,
          isVerified,
        } = resultsLogin[0];
        let token = createToken({ idUser, addDate, isVerified }, "1h");
        console.log("resultLogin reverified", resultsLogin);
        console.log("token reverified", token);
        let mytoken =
          await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
        WHERE idUser = ${req.dataUser.idUser};`);
        // let checkToken = await dbQuery(`SELECT tokens FROM mytoken`)
        // console.log("checkToken", checkToken[0].tokens)

        await transporter.sendMail({
          from: "Admin Medhika",
          to: email,
          subject: "Verifikasi Ulang Email Akun Medhika",
          html: `<div class="es-wrapper-color">
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="esd-email-paddings" valign="top">
                      <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p20" align="left" style="border-radius: 10px 10px 0px 0px; background-color: #de1b51;" bgcolor="#4c8aa7" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tr>
                                          <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center" >
                                            <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 1px; border-collapse: separate;" >
                                              <tbody>
                                                <tr>
                                                  <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #FFFFFF; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                    <h2>medhika</h2>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="es-content" cellspacing="0" cellpadding="0" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-content-body" style="border-left: 1px solid #de1b51; border-right: 1px solid #de1b51; background-color: #ffffff;"
                                width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p30t es-p20r es-p20l" align="center" bgcolor="#ffffff" style="background-color: #ffffff" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tbody>
                                          <tr>
                                            <td width="558" align="center" class="esd-container-frame" >
                                              <table cellpadding="0" cellspacing="0" width="100%" >
                                                <tbody>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #333333; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                      <h2> Hallo, Selamat Datang <br/>${resultsLogin[0].name} !</h2>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" >
                                                      <img src="https://img.freepik.com/free-vector/email-campaign-concept-illustration_114360-1633.jpg?w=1380&t=st=1661592502~exp=1661593102~hmac=6fa57b78ac55779ce62545794bc63cd48ec8b02c160f0e470b17dd190cfe63ac" style="display: block; margin-bottom: 20px; margin-left: 10px;" width="370" />
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="es-m-p0r esd-container-frame" width="558" valign="top" align="center" >
                                              <table width="100%" cellspacing="0" cellpadding="0" >
                                                <tbody>
                                                  <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td align="center" style="font-family: sans-serif; font-size: 15px; border-radius: 8px;" bgcolor="#586BB1">
                                                        <a href="${process.env.FE_URL}/verification/${token}" target="_blank" style="font-size: 20px; font-family: sans-serif; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 2px; display: inline-block;">Verifikasi Akun</a>
                                                      </td>
                                                    </tr>
                                                </table>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-p10t es-p20b es-p40r es-p40l" style="color: #333333; font-family: sans-serif; font-size: 15px;" >
                                                      <p style="margin-top: 30px; margin-bottom: 30px;">
                                                        dengan verifikasi akun memudahkan anda untuk transaksi di Medhika Apotek Online. Tombol verifikasi ini hanya berlaku selama 1 jam.
                                                      </p>
                                                      <br/>
                                                    </td>
                                                  </tr>
                                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center" >
                                                  <tbody>
                                                    <tr>
                                                      <td class="esd-stripe" align="center">
                                                        <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                                          <tbody>
                                                            <tr>
                                                              <td class="esd-structure es-p25t es-p25b es-p20r es-p20l" align="center" style="border-radius: 0px 0px 10px 10px; background-color: #de1b51; color: #FFFFFF; font-family: sans-serif; font-size: 12px;">
                                                              <p>Group 1 Final Project - JCWDAHLS01</p>
                                                              <table align="center" cellpadding="0" cellspacing="0" width="100%" >
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>`
        })
        return res.status(200).send({ ...resultsLogin[0], token });
        // success: true,
        // message: "Reverification email link delivered"
        // })
      }
    } catch (error) {
      return next(error)
    }
  },
  getTokens: async (req, res, next) => {
    try {
      let checkToken = await dbQuery(`SELECT token FROM tokenlist where idUser=${req.dataUser.idUser};`)
      console.log("1 ==>", checkToken[0].token)
      console.log("2 ==>", req.dataUser)
      console.log("3 ==>", req.body)
      if (req.body.token == checkToken[0].token) {
        return res.status(200).send({
          success: true,
          message: "token valid"
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "invalid token"
        });
      }
    } catch (error) {
      return next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      console.log("coba admin", req.body);
      let emailLogin =
        await dbQuery(`SELECT idUser, name, email, password, role, gender, birthDate, profilePicture, addDate, isVerified FROM users WHERE email LIKE
      '%${req.body.email}%' and password LIKE '%${hashPassword(
          req.body.password
        )}%';`);
      console.log("emailLogin Login", emailLogin[0]);
      if (emailLogin[0].role == "admin") {
        console.log("login admin oke");

        let {
          idUser,
          name,
          email,
          role,
          phone,
          gender,
          birthDate,
          profilePicture,
          addDate,
        } = emailLogin[0];
        let token = createToken({ idUser, email, role, addDate });

        return res.status(200).send({ ...emailLogin[0], token });
      } else {
        console.log("login user");
        if (req.body.email != emailLogin[0].email) {
          let message = "incorrect email";
          return res.status(404).send({
            message,
          });
        } else if (hashPassword(req.body.password) != emailLogin[0].password) {
          let message = "incorrect password";
          return res.status(404).send({
            message,
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
            if (emailLogin[0].birthDate == null) {
              // generate token
              console.log("isVerified yang verified == null")
              let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = emailLogin[0]
              let token = createToken({ idUser, email, role, addDate, isVerified })

              return res.status(200).send({ ...emailLogin[0], token });
            } else {
              // generate token
              console.log("isVerified yang verified")
              let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = emailLogin[0]
              let birthDateFE = emailLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
              let token = createToken({ idUser, email, role, addDate, isVerified })
              console.log("birthDateFE Login", birthDateFE)

              return res.status(200).send({ ...emailLogin[0], birthDateFE, token });
            }
            // }
          } else {
            res.status(404).send({
              success: false,
              message: "User Not Found",
            });
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  },
  change: async (req, res, next) => {
    try {
      console.log("Password Lama", req.body.oldPassword);
      console.log("Password Baru", req.body.newPassword);
      console.log("dataUser changePassword", req.dataUser.idUser);
      let checkPassword = await dbQuery(
        `SELECT * FROM users WHERE idUser = ${req.dataUser.idUser};`
      );
      console.log(
        "CHECK",
        checkPassword[0].password == hashPassword(req.body.oldPassword)
      );
      if (checkPassword[0].password == hashPassword(req.body.oldPassword)) {
        let changePassword =
          await dbQuery(`UPDATE users SET password=${dbConf.escape(
            hashPassword(req.body.newPassword)
          )}
        WHERE idUser=${req.dataUser.idUser};`);

        if (checkPassword[0].birthDate == null) {
          // generate token

          console.log("CHECKPASSWORD", checkPassword[0])
          let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = checkPassword[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })

          return res.status(200).send({ ...checkPassword[0], token });
        } else {
          // generate token

          console.log("CHECKPASSWORD", checkPassword[0])
          let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = checkPassword[0]
          let birthDateFE = checkPassword[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
          let token = createToken({ idUser, email, role, addDate, isVerified })

          return res.status(200).send({ ...checkPassword[0], birthDateFE, token });;
        }

      }
      else {
        let message = "Old Password tidak sesuai / salah"
        return res.status(404).send({
          message,
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  forgot: async (req, res, next) => {
    try {
      let forgot = await dbQuery(`Select * FROM users WHERE email = '${req.body.email}';`);
      console.log("req.body forgot", forgot[0])
      // console.log("hash", hashPassword(req.body.password))

      if (forgot[0].email) {
        let { idUser, name, email, password, role, phone, profilePicture, addDate, isVerified } = forgot[0]
        let token = createToken({ idUser, role, addDate, isVerified }, "1h")
        console.log("tokenForgot", token)
        let mytoken = await dbQuery(`UPDATE tokenlist SET token = ${dbConf.escape(token)}
          WHERE idUser = ${forgot[0].idUser};`);
        // console.log("myToken", mytoken)
        if (mytoken) {

          // }
          let checkToken = await dbQuery(
            `SELECT * FROM tokenlist WHERE idUser = ${forgot[0].idUser};`
          );
          console.log("checkToken", checkToken);
          console.log("BOOLEAN", token == checkToken[0].token);
          if (token == checkToken[0].token) {
            await transporter.sendMail({
              from: "Admin Medhika",
              to: email,
              subject: "Verifikasi Ubah Password Akun Medhika",
              html: `<div class="es-wrapper-color">
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="esd-email-paddings" valign="top">
                      <table cellpadding="0" cellspacing="0" class="esd-header-popover es-header" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p20" align="left" style="border-radius: 10px 10px 0px 0px; background-color: #de1b51;" bgcolor="#4c8aa7" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tr>
                                          <td width="560" class="es-m-p0r esd-container-frame" valign="top" align="center" >
                                            <table cellpadding="0" cellspacing="0" width="100%" style="border-radius: 1px; border-collapse: separate;" >
                                              <tbody>
                                                <tr>
                                                  <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #FFFFFF; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                    <h2>medhika</h2>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="es-content" cellspacing="0" cellpadding="0" align="center" >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table class="es-content-body" style="border-left: 1px solid #de1b51; border-right: 1px solid #de1b51; background-color: #ffffff;"
                                width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" >
                                <tbody>
                                  <tr>
                                    <td class="esd-structure es-p30t es-p20r es-p20l" align="center" bgcolor="#ffffff" style="background-color: #ffffff" >
                                      <table cellpadding="0" cellspacing="0" width="100%" >
                                        <tbody>
                                          <tr>
                                            <td width="558" align="center" class="esd-container-frame" >
                                              <table cellpadding="0" cellspacing="0" width="100%" >
                                                <tbody>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-m-txt-c es-p30t es-p20b" style="color: #333333; font-family: sans-serif; font-size: 20px; letter-spacing: 2px;">
                                                      <h2> Hallo, ${forgot[0].name}</h2>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" >
                                                      <img src="https://img.freepik.com/free-vector/email-campaign-concept-illustration_114360-1633.jpg?w=1380&t=st=1661592502~exp=1661593102~hmac=6fa57b78ac55779ce62545794bc63cd48ec8b02c160f0e470b17dd190cfe63ac" style="display: block; margin-bottom: 20px; margin-left: 10px;" width="370" />
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="es-m-p0r esd-container-frame" width="558" valign="top" align="center" >
                                              <table width="100%" cellspacing="0" cellpadding="0" >
                                                <tbody>
                                                  <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                      <td align="center" style="font-family: sans-serif; font-size: 15px; border-radius: 8px;" bgcolor="#586BB1">
                                                        <a href="${process.env.FE_URL}/resetPassword/${token}" target="_blank" style="font-size: 20px; font-family: sans-serif; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 2px; display: inline-block;">Reset Password</a>
                                                      </td>
                                                    </tr>
                                                </table>
                                                  <tr>
                                                    <td align="center" class="esd-block-text es-p10t es-p20b es-p40r es-p40l" style="color: #333333; font-family: sans-serif; font-size: 15px;" >
                                                      <p style="margin-top: 30px; margin-bottom: 30px;">
                                                        Dengan reset password anda dapat login di medhika dengan password baru. Tombol reset password ini hanya berlaku selama 1 jam.
                                                      </p>
                                                      <br/>
                                                    </td>
                                                  </tr>
                                                <table cellpadding="0" cellspacing="0" class="es-footer" align="center" >
                                                  <tbody>
                                                    <tr>
                                                      <td class="esd-stripe" align="center">
                                                        <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent" >
                                                          <tbody>
                                                            <tr>
                                                              <td class="esd-structure es-p25t es-p25b es-p20r es-p20l" align="center" style="border-radius: 0px 0px 10px 10px; background-color: #de1b51; color: #FFFFFF; font-family: sans-serif; font-size: 12px;">
                                                              <p>Group 1 Final Project - JCWDAHLS01</p>
                                                              <table align="center" cellpadding="0" cellspacing="0" width="100%" >
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>`
            })
            return res.status(200).send({ ...forgot[0], token });
          }
        }
        // console.log("TOKEN", token)
        // Mengirimkan Email untuk Verifikasi
      } else {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  reset: async (req, res, next) => {
    try {
      console.log("req.body resetPass", req.body.newPassword);
      console.log("dataUser reset", req.dataUser);
      if (req.dataUser.idUser) {
        let resetPassword =
          await dbQuery(`UPDATE users SET password=${dbConf.escape(
            hashPassword(req.body.newPassword)
          )}
        WHERE idUser=${req.dataUser.idUser};`);
        let check = await dbQuery(
          `SELECT token FROM tokenlist WHERE idUser = ${req.dataUser.idUser};`
        );
        console.log("CHECK", check);
        let {
          idUser,
          name,
          email,
          password,
          role,
          phone,
          profilePicture,
          addDate,
          isVerified,
        } = check[0];
        let token = createToken({ idUser, addDate, isVerified });
        return res.status(200).send({ ...check[0], token });
      }
    } catch (error) {
      return next(error);
    }
  },
  edit: async (req, res) => {
    console.log("req.dataUsers Edit", req.dataUser);
    if (req.dataUser.idUser) {
      if (req.body.name == '' && req.body.email == '' && req.body.gender == '' && req.body.birthDate == '') {
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
            isVerified FROM users WHERE idUser = ${req.dataUser.idUser};`);
        console.log("edit email", resultsLogin[0])

        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
      // EDIT EMAIL
      else if (req.body.name == '' && req.body.gender == '' && req.body.birthDate == '') {
        let checkEmail = await dbQuery(`SELECT email FROM users WHERE email = '${req.body.email}'; `)
        if (checkEmail.length > 0) {
          console.log("alert 1");
          let message = "Email already used";
          return res.status(404).send({
            message,
          });
        } else {
          let edit = await dbQuery(
            `UPDATE users SET email = '${req.body.email}' WHERE idUser=${req.dataUser.idUser};`
          );
          let resultsLogin =
            await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
            isVerified FROM users WHERE idUser = ${req.dataUser.idUser};`);
          console.log("edit email", resultsLogin[0])
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })
          return res.status(200).send({ ...resultsLogin[0], token, success: true });
        }
      }
      // EDIT NAME
      else if (req.body.email == '' && req.body.gender == '' && req.body.birthDate == '') {
        let edit = await dbQuery(`UPDATE users SET name='${req.body.name}' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
        isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit name", resultsLogin[0])
        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
      // EDIT GENDER
      else if (req.body.name == '' && req.body.email == '' && req.body.birthDate == '') {
        let edit = await dbQuery(`UPDATE users SET gender='${req.body.gender}' WHERE idUser=${req.dataUser.idUser};`)
        let resultsLogin = await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
        isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit gender", resultsLogin[0])
        let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
        let token = createToken({ idUser, email, role, addDate, isVerified })
        return res.status(200).send({ ...resultsLogin[0], token, success: true });
      }
      // EDIT BIRTHDATE
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
      // EDIT GENDER & BIRTHDATE
      else if (req.body.name == '' && req.body.email == '') {
        let edit = await dbQuery(`UPDATE users SET gender ='${req.body.gender}',
          birthDate = '${req.body.birthDate} 10:00:00' WHERE idUser=${req.dataUser.idUser};`);
        let resultsLogin =
          await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
          isVerified FROM users WHERE idUser = ${req.dataUser.idUser}`);
        console.log("edit gender & birthDate", resultsLogin[0]);
        if (resultsLogin[0].idUser == req.dataUser.idUser) {
          let birthDateFE = resultsLogin[0].birthDate.toISOString().slice(0, 10).replace('T', ' ')
          let { idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate, isVerified } = resultsLogin[0]
          let token = createToken({ idUser, email, role, addDate, isVerified })
          console.log("kirim token gender birthdate")
          return res.status(200).send({ ...resultsLogin[0], birthDateFE, token });
        }
      }
      // EDIT ALL
      else {
        let checkEmail = await dbQuery(`SELECT email FROM users WHERE email = '${req.body.email}'; `)
        if (checkEmail.length > 0) {
          console.log("alert 1");
          let message = "Email already used";
          return res.status(404).send({
            message,
          });
        } else {
          let edit =
            await dbQuery(`UPDATE users SET name='${req.body.name}', email='${req.body.email}',
            gender = '${req.body.gender}', birthDate='${req.body.birthDate}' WHERE idUser=${req.dataUser.idUser};`);
          let resultsLogin =
            await dbQuery(`Select idUser, name, email, role, phone, gender, birthDate, profilePicture, addDate,
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
  profilePicture: (req, res) => {
    // console.log('profilePicture')
    const uploadFile = uploader('/Profile', 'PROFILE-PICTURE-').array('Profile', 5)

    uploadFile(req, res, async (error) => {
      try {
        // upload file data harus menggunakan jason stringfy (merubah object jadi string) dan json parse
        console.log('dataUser.iduser', req.dataUser.idUser)
        if (req.dataUser.idUser) {
          console.log('req body upload', req.body);
          console.log('pengecekan file', req.files);
          console.log('pengecekan size file', req.files[0].size <= 1000000);
          if (req.files[0].size <= 1000000) {
            let { idUserLogin } = JSON.parse(req.body.data);

            let imgData = req.files.map(val => {
              return `${dbConf.escape(`${process.env.PORT_URL}/Profile/${val.filename}`)}`;
            })
            console.log("imgData", imgData.join(','))

            let edit = await dbQuery(`UPDATE users SET profilePicture=${imgData.join(',')}
            WHERE idUser = ${req.dataUser.idUser};`)
            let resultsLogin = await dbQuery(`Select * FROM users
            WHERE idUser = ${req.dataUser.idUser};`);

            let { idUser, name, email, role, phone, gender, birthDate, profilePicture, isVerified } = resultsLogin[0]
            let token = createToken({ idUser, name, email, role, isVerified })
            return res.status(200).send({ ...resultsLogin[0], token, success: true });
          } else {
            console.log("masuk else profile pict size")
            return res.status(401).send({
              success: false,
              message: "Profile Picture Max Size 1MB"
            })
          }
        } else {
          return res.status(401).send({
            success: false,
            message: "Token expired"
          })
        }
      } catch (error) {
        req.files.forEach(val => fs.unlinkSync(`./Public/`))
        console.log(error)
      }
    })
  }
}