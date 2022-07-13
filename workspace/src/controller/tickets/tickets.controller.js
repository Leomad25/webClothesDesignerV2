const database_tickets = require('../../lib/database/tickets.database');
const database_images = require('../../lib/database/images.database');

module.exports = {
    getMyTickets: async (req) => {
        const listTickets = await database_tickets.select.byId(req.user.id);
        const listImg = await database_images.select.all();
        if (listTickets.length == 0) return undefined;
        const obj = [];
        console.log(listTickets);
        console.log(listImg);
        return obj;
    }
}