module.exports = {
    getFlashMessage: () => {
        return require('../../strings/flash').auth.register;
    },
    registerNewUser: (req, res, flashMessage) => {
        const { firstname, lastname, gender, email, password } = req.body;
    }
}