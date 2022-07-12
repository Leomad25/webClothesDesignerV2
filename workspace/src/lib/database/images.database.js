/**
* Sql Structure
*  - uuid: varchar(255)
*  - name: varchar(255)
*  - extension: varchar(5)
*  - iduser: bigint
*/

const { all } = require('../../router/pages/orders/tickets.router');
const pool = require('../database.module');

module.exports = {
    insert: async (uuid, name, extension, iduser) => { return await pool.query('INSERT INTO `clothes_designer_db`.`images` (`uuid`, `name`, `extension`, `iduser`) VALUES (?, ?, ?, ?);', [uuid, name, extension, iduser]); },
    select: {
        all: async () => { return await pool.query('SELECT * FROM `clothes_designer_db`.`images`;') },
        byUuid: async (uuid) => { return await pool.query('SELECT * FROM `clothes_designer_db`.`images` WHERE (`uuid` = ?);', [uuid]); }
    },
    delete: async (uuid) => { return await pool.query('DELETE FROM `clothes_designer_db`.`images` WHERE (`uuid` = ?);', [uuid])}
}