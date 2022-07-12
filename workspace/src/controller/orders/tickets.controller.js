module.exports = {
    getListOfWorksTypes: async () => {
        const select = await require('../../lib/database/worktype.database').select.all();
        if (select.length == 0) return undefined;
        return select;
    },
    getTicketsList: async (req) => {
        const obj = {}
        const database = require('../../lib/database/tickets.database');
        obj.available = await database.select.notSelected();
        if (obj.available.length == 0) obj.available = undefined;
        obj.requested = await database.select.selectedBy(req.user.iduser);
        if (obj.requested.length == 0) obj.requested = undefined;
        return obj;
    },
    getImagesOfTickets: async (list) => {
        const images = await require('../../lib/database/tickets.database').select.allImages();
        const imagesInfo = await require('../../lib/database/images.database').select.all();
        for (let i = 0; i < list.length; i++) {
            let pack = [];
            for (let j = 0; j < images.length; j++) {
                if (list[i].idticket == images[j].idticket) {
                    let extension = '';
                    for (let k = 0; k < imagesInfo.length; k++) {
                        if (images[j].idimage == imagesInfo[k].uuid) {
                            extension = '.' + imagesInfo[k].extension;
                            break;
                        }
                    }
                    pack.push(images[j].idimage + extension);
                }
            }
            if (pack.length == 0) pack = undefined;
            list[i].images = pack;
        }
    }
}