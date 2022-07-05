module.exports = {
    getFlashMessage: () => {
        return require('../../strings/flash').tickets.add
    },
    getListOfWorksTypes: async () => {
        const select = await require('../../lib/database/worktype.database').select.all();
        if (select.length == 0) return undefined;
        return select;
    },
    createNewTickets: async (uuid, worktype, description, images) => {
        const insert = await require('../../lib/database/tickets.database').insert(uuid, worktype, description, images);
        if (insert.affectedRows > 0) return true;
        return false;
    }
}