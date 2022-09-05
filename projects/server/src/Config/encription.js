const jwt = require('jsonwebtoken');
const Crypto = require('crypto')
const { dbConf, dbQuery } = require("../Config/database");

module.exports = {
  hashPassword: (pass) => {
    return Crypto.createHmac("sha256", process.env.JWT_PASS).update(pass).digest("hex");
  },
  // payload mengirim data apa saja yang akan dijadikan token
  createToken: (payload) => {
    let token = jwt.sign(payload, process.env.JWT_PASS, {
      expiresIn: "12h"
    })

    return token;
  },
  readToken: async (req, res, next) => {
    console.log('req.token!!', req.token);
    // console.log('checkToken!', checkToken[0].token);
    if (req.token) {
      jwt.verify(req.token, process.env.JWT_PASS, (err, decode) => {
        if (err) {
          res.status(401).send({
            message: `Users Authentication ${err}`
          })
          
        }
        else{
          req.dataUser = decode;

          next();
        }
      
      })
    } else {
      let message = "token not found!"
      return res.status(404).send({
        message
      });
    }
    // }
  }
}