const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const url = {
    tickets: path.join(__dirname, '../uploads/tickets/').toString()
}

const database = {
    images: require('./database/images.database')
}

module.exports = {
    tickets: multer({storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const mimetype = file.mimetype.split('/');
            const filename = uuid.v4();
            file.uuid = filename;
            database.images.insert(filename, file.originalname, mimetype[mimetype.length - 1], req.user.iduser);
            cb(null, filename + '.' + mimetype[mimetype.length - 1]);
        },
        destination: (req, file, cb) => {
            if (!fs.existsSync(url.tickets + req.user.iduser)) fs.mkdirSync(url.tickets + req.user.iduser, { recursive: true });
            cb(null, url.tickets + req.user.iduser);
        }
    })})
}