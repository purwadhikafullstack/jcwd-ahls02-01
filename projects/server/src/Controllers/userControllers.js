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
}