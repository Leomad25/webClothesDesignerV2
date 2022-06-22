/**
 * Sql Structure
 *  - iduser: bigint()
 *  - firstname: varchar(255)
 *  - lastname: varchar(255)
 *  - gender: varchar(1)
 *  - email: varchar(255)
 *  - password: varchar(255)
 *  - active: boolean()
 */

const pool = require('../../database');

module.exports = {
    insert: {
        perData: async (firstname, lastname, gender, email, password) => {
            return await pool.query('INSERT INTO `clothes_designer_db`.`users` (`firstname`, `lastname`, `gender`, `email`, `password`) VALUES (?, ?, ?, ?, ?);', [firstname, lastname, gender, email, password]);
        },
        perObj: async (obj) => {
            return await pool.query('INSERT INTO `clothes_designer_db`.`users` SET ?', [obj]);
        }
    },
    select: {
        all: async () => {
            return await pool.query('SELECT * FROM clothes_designer_db.users');
        },
        byId: async (iduser) => {
            return await pool.query('SELECT * FROM clothes_designer_db.users WHERE iduser = ?;', [iduser]);
        },
        byEmail: async (email) => {
            return await pool.query('SELECT * FROM clothes_designer_db.users WHERE email = ?;', [email]);
        }
    },
    update: {
        
    }
}