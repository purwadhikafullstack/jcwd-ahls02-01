const multer = require('multer');

// fs untuk mengecek lokasi penyimpanan data
const fs = require('fs')

module.exports = {
  uploader: (directory, fileNamePrefix) => {
    // mendefine lokasi penyimpanan utama
    let defaultDir = './Public'

    // konfigurasi multer
    // diskStorage untuk menyimpan file
    // destination untuk tujuan file
    const storageUploader = multer.diskStorage({
      destination: (req, file, cb) => {
        // menentukan lokasi file
        const pathDir = directory ? defaultDir + directory : defaultDir;

        // melakukan pemeriksaan pathDir sudah ada atau belum
        if (fs.existsSync(pathDir)) {
          // jika directory ada, maka akan langsung simpan file
          console.log(`Directory ${pathDir} exist`);
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, err => cb(err, pathDir));
          console.log(`Success Created ${pathDir}`);
        }
      },
      filename: (req, file, cb) => {
        // membaca tipe data file
        let ext = file.originalname.split('.');

        // membuat filename baru
        let filename = fileNamePrefix + Date.now() + '.' + ext[ext.length - 1];

        cb(null, filename);
      }
    });

    const fileFilter = (req, file, cb) => {
      // regex = reguler extention
      const extFilter = /\.(jpg|png|webp|svg|jpeg)/;

      if (!file.originalname.toLowerCase().match(extFilter)) {
        return cb(new Error('Your file ext are denied', false))
      }

      cb(null, true);
    }

    return multer({ storage: storageUploader, fileFilter });
  }
}