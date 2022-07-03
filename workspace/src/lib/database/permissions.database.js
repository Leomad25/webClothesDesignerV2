/**
 * Sql Structure
 *  - iduser: bigint
 *  - tag: varchar(45)
 *  - level: tinyint
 *  - blocked: boolean
 */

const pool = require('../database.module');

module.exports = {
    insert: async (id, tag, level) => {
        return await pool.query('INSERT INTO `clothes_designer_db`.`permissions` (`iduser`, `tag`, `level`) VALUES (?, ?, ?);', [id, tag, level]);
    },
    select: async (id) => {
        return await pool.query('SELECT * FROM clothes_designer_db.permissions WHERE iduser = ?;', [id]);
    },
    delete: async (id) => {
        return await pool.query('DELETE FROM `clothes_designer_db`.`permissions` WHERE (`iduser` = ?);', [id]);
    },
    update: {
        all: async (id, tag, level, block) => {
            return await pool.query('UPDATE `clothes_designer_db`.`permissions` SET `tag` = ?, `level` = ?, `blocked` = ? WHERE (`iduser` = ?)', [tag, level, block, id]);
        },
        tag: async (id, tag) => {
            return await pool.query('UPDATE `clothes_designer_db`.`permissions` SET `tag` = ? WHERE (`iduser` = ?);', [tag, id]);
        },
        level: async (id, level) => {
            return await pool.query('UPDATE `clothes_designer_db`.`permissions` SET `level` = ? WHERE (`iduser` = ?);', [level, id]);
        },
        block: async (id, block) => {
            return await pool.query('UPDATE `clothes_designer_db`.`permissions` SET `blocked` = ? WHERE (`iduser` = ?);', [block, id]);
        }
    }
}