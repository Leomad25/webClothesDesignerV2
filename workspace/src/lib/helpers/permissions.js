const database = require('../database/permissions.database')

module.exports = {
    isHigherThan: async (req, level) => {
        const select = await database.select(req.user.iduser);
        if (select.length > 0 && select[0].level >= level) return true;
        return false;
    }
}