const pool = require('../../database');

module.exports = {
    insert: async (firstname, lastname, gender, email, password) => {
        const result = await pool.query(
            'INSERT INTO `clothes_designer_db`.`users` (`firstname`, `lastname`, `gender`, `email`, `password`) VALUES (?, ?, ?, ?, ?);',
            [firstname, lastname, gender, email, password]
        );
        return result;
    },
    select: {
        all: async () => {
            const result = await pool.query('SELECT * FROM clothes_designer_db.users');
            return result;
        },
        byId: async (iduser) => {
            const result = await pool.query('SELECT * FROM clothes_designer_db.users WHERE iduser = ?;', [iduser]);
            return result;
        },
        byEmail: async (email) => {
            const result = await pool.query('SELECT * FROM clothes_designer_db.users WHERE email = ?;', [email]);
            return result;
        }
    },
    update: {
        
    }
}