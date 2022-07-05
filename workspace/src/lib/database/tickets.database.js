/**
 * Sql Structure (tickets)
 *  - idticket: bigint
 *  - idworktype: int
 *  - description: longtext
 */

/**
 * Sql Structure (tickets-images)
 *  - idticket: bigint
 *  - uuid: varchar(255)
 */

const pool = require('../database.module');

module.exports = {
    insert: async (uuid, worktype, description, images) => {
        const insert = await pool.query('INSERT INTO `clothes_designer_db`.`tickets` (`idticket`, `idworktype`, `description`) VALUES (?, ?, ?);', [uuid, worktype, description]);
        if ((insert.affectedRows > 0) && (images.length > 0)) {
            for (i = 0; i < images.length; i++)
                await pool.query('INSERT INTO `clothes_designer_db`.`_tickets-images` (`idticket`, `idimage`) VALUES (?, ?)', [uuid, images[i].uuid]);
        }
        return insert;
    }
}