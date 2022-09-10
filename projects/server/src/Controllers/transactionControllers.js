const { dbConf, dbQuery } = require("../Config/database");
const { uploader } = require("../Config/uploader");
const fs = require("fs");

module.exports = {
    userGetValidasiResep: async (req, res, next) => {
        //* butuh slot untuk pagination dan filtering
        try {

        } catch (error) {

        }
    },
    userGetMenungguPembayaran: async (req, res, next) => {
        try {
            console.log("req.query._page", req.query._page);

            // let getData = await dbQuery(`Select p.id, u.username, p.media, p.caption, p.uploadDate, p.editedDate, count(l.postId) as numberOfLikes from posts p left join users u on p.userId = u.id left join likes l on p.id = l.postId where p.status = "active" group by p.id LIMIT 4 OFFSET ${dbConf.escape((req.query._page - 1) * 4)};`);

            return res.status(200).send(getData);

        } catch (error) {

        }
    },
    userGetMenungguKonfirmasi: async (req, res, next) => {
        try {

        } catch (error) {

        }
    }
}