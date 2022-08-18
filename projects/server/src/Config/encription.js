const jwt = require('jsonwebtoken');
const Crypto = require('crypto')
const { dbConf, dbQuery } = require("../Config/database");

module.exports = {
  hashPassword: (pass) => {
    return Crypto.createHmac("sha256", "medhika").update(pass).digest("hex");
  },
  // payload mengirim data apa saja yang akan dijadikan token
  createToken: (payload, time = "24h") => {
    let token = jwt.sign(payload, "medhika", {
      expiresIn: time
    })

    return token;
  },
  readToken: async (req, res, next) => {
    console.log("read token", req.token);
    let checkToken = await dbQuery(`SELECT token FROM tokenlist`)
    console.log("check token", checkToken[0]);
    if (checkToken[0] == undefined) {
      jwt.verify(req.token, "medhika", (err, decode) => {
        if (err) {
          res.status(401).send({
            message: "Users Not Authentication"
          })
        }
        req.dataUser = decode;
        // console.log("check token nya undefined", req.dataUser);

        next();
      })
    } else {
      // console.log('req.token!', req.token);
      // console.log('checkToken!', checkToken[0].tokens);
      if (req.token == checkToken[0].token) {
        jwt.verify(req.token, "medhika", (err, decode) => {
          if (err) {
            res.status(401).send({
              message: "Users Authentication"
            })
          }
          req.dataUser = decode;

          next();
        })
      } else {
        let message = "token not found!"
        return res.status(404).send({
          message
        });
      }
    }
  }
}