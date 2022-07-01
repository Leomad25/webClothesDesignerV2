/**
 * Sql Structure
 *  - iduser: bigint
 *  - key: varchar(255)
 *  - createdate: datetime
 *  - attempts: tinyint
 */

 const pool = require('../../database');

 module.exports = {
    insert: async (id, key, datetime) => {
        return await pool.query('INSERT INTO `clothes_designer_db`.`activations` (`iduser`, `key`, `createdate`) VALUES (?, ?, ?);', [id, key, datetime]);
    },
    select: async (id) => {
        return await pool.query('SELECT * FROM clothes_designer_db.activations WHERE iduser = ?;', [id]);
    },
    update: {
        addAttempt: async (attempt, id) => {
            return await pool.query('UPDATE `clothes_designer_db`.`activations` SET `attempts` = ? WHERE (`iduser` = ?);', [attempt, id])
        }
    },
    delete: async (id) => {
        return await pool.query('DELETE FROM `clothes_designer_db`.`activations` WHERE (`iduser` = ?);', [id]);
    }
 }