module.exports = {
    getListOfWorksTypes: async () => {
        const select = await require('../../lib/database/worktype.database').select.all();
        if (select.length == 0) return undefined;
        return select;
    }
}