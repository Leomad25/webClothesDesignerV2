/**
 * Sql Structure
 *  - idworktype: int
 *  - name: varchar(255)
 */

const  pool = require('../database.module');

module.exports = {
    insert: async (name) => { return await pool.query('INSERT INTO `clothes_designer_db`.`worktype` (`name`) VALUES (?);', [name]); },
    select: {
        all: async () => { return await pool.query('SELECT * FROM clothes_designer_db.worktype;')},
        byName: async (name) => { return await pool.query('SELECT * FROM clothes_designer_db.worktype WHERE (`name` = ?);', [name])}
    },
    delete: async (id) => { return await pool.query('DELETE FROM `clothes_designer_db`.`worktype` WHERE (`idworktype` = ?);', [id])},
    update: async (id, name) => { return await pool.query('UPDATE `clothes_designer_db`.`worktype` SET `name` = ? WHERE (`idworktype` = ?);', [name, id])}
}