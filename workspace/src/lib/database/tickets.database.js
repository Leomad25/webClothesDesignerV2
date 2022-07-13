/**
 * Sql Structure (tickets)
 *  - idticket: bigint
 *  - idworktype: int
 *  - description: longtext
 */

/**
 * Sql Structure (_tickets-images)
 *  - idticket: bigint
 *  - uuid: varchar(255)
 */

const pool = require('../database.module');

module.exports = {
    insert: async (uuid, iduser, worktype, description, images) => {
        const insert = await pool.query('INSERT INTO `clothes_designer_db`.`tickets` (`idticket`, `iduser`, `idworktype`, `description`) VALUES (?, ?, ?, ?);', [uuid, iduser, worktype, description]);
        if ((insert.affectedRows > 0) && (images.length > 0)) {
            for (i = 0; i < images.length; i++)
                await pool.query('INSERT INTO `clothes_designer_db`.`_tickets-images` (`idticket`, `idimage`) VALUES (?, ?)', [uuid, images[i].uuid]);
        }
        return insert;
    },
    select: {
        all: async () => { return pool.query('SELECT * FROM clothes_designer_db.tickets;'); },
        byId: async (id) => { return pool.query('SELECT * FROM clothes_designer_db.tickets WHERE `iduser` = ?;', [id])},
        notSelected: async () => { return pool.query('SELECT * FROM clothes_designer_db.tickets WHERE `selectedBy` IS NULL;'); },
        areSelected: async () => { return pool.query('SELECT * FROM clothes_designer_db.tickets WHERE `selectedBy` IS NOT NULL;'); },
        selectedBy: async (id) => { return pool.query('SELECT * FROM clothes_designer_db.tickets WHERE `selectedBy` = ?;', [id]); },
        allImages: async () => { return pool.query('SELECT * FROM clothes_designer_db.`_tickets-images`;'); },
        imagesById: async (id) => { return pool.query('SELECT * FROM clothes_designer_db.`_tickets-images` WHERE `idticket` = ?;', [id]); }
    }
}