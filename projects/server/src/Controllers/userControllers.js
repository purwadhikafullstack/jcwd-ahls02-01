const { dbConf, dbQuery } = require("../Config/database");
const { hashPassword, createToken } = require("../Config/encription");
const { transporter } = require("../Config/nodemailer");
const { uploader } = require('../Config/uploader');
const { fs } = require('../Config/uploader');

module.exports = {
  register: async (req, res, next) => {
    try {
      console.log("nama", req.body.name, "email", req.body.email, "pswd", req.body.password, "role", req.body.role, "phone", req.body.nomorHandphone, "status", req.body.status)
      let resultsRegister = await dbQuery(`INSERT INTO users (name, email, password, role, phone, profile_picture, status)
        values (${dbConf.escape(req.body.name)}, ${dbConf.escape(req.body.email)},
        ${dbConf.escape(hashPassword(req.body.password))}, ${dbConf.escape(req.body.role)}, ${dbConf.escape(req.body.nomorHandphone)}, ${dbConf.escape(req.body.profilepict)}
          , ${dbConf.escape(req.body.status)});`);
      // console.log("CHECK", resultsRegister.insertId)
      if (resultsRegister.insertId) {
        let resultsLogin = await dbQuery(`Select * FROM users WHERE iduser =${resultsRegister.insertId};`);
        console.log("resultsLogin", resultsLogin)
        if (resultsLogin.length == 1) {

          let { iduser, name, email, password, role, phone, profile_picture, add_date, status } = resultsLogin[0]
          let token = createToken({ iduser, add_date, status }, "1h")
          let mytoken = await dbQuery(`INSERT INTO tokenlist (token)
              values (${dbConf.escape(token)});`);
          console.log("TOKEN", token)
          return res.status(200).send({ ...resultsLogin[0], token });
        }
      }
    } catch (err) {
      return next(err)
    }
  },
}