const database_tickets = require('../../lib/database/tickets.database');
const database_images = require('../../lib/database/images.database');
const database_worktype = require('../../lib/database/worktype.database');

module.exports = {
    getMyTickets: async (req) => {
        const listTickets = await database_tickets.select.byId(req.user.iduser);
        const listRelation = await database_tickets.select.allImages();
        const listImg = await database_images.select.all();
        const listWorkType = await database_worktype.select.all();
        if (listTickets.length == 0) return undefined;
        const obj = [];
        for (let i = 0; i < listTickets.length; i++) {
            if (listTickets[i].selectedBy != null) continue;
            const images = [];
            for (let j = 0; j < listRelation.length; j++) if (listTickets[i].idticket == listRelation[j].idticket) {
                for (let k = 0; k < listImg.length; k++) if (listRelation[j].idimage == listImg[k].uuid) {
                    images.push({
                        name: listImg[k].name,
                        url: req.user.iduser + '/' + listImg[k].uuid + '.' + listImg[k].extension
                    });
                    break;
                }
            }
            let worktype = undefined;
            for (let j = 0; j < listWorkType.length; j++) if (listTickets[i].idworktype == listWorkType[j].idworktype) worktype = listWorkType[j].name;
            if (images.length == 0) {
                obj.push({
                    idticket: listTickets[i].idticket,
                    worktype,
                    description: listTickets[i].description
                });
            } else {
                obj.push({
                    idticket: listTickets[i].idticket,
                    worktype,
                    description: listTickets[i].description,
                    images
                });
            }
        }
        return obj;
    }
}