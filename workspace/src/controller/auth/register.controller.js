module.exports = {
    getFlashMessage: () => {
        return require('../../strings/flash').auth.register;
    },
    validateFields: (req, res, next) => {
        const { firstname, lastname, gender, email, password, confirm } = req.body;
        const flashMessage = this.getFlashMessage;
        if (
            (firstname != undefined && firstname.length > 0) &&
            (lastname != undefined && lastname.length > 0) &&
            (gender != undefined && gender.length > 0) &&
            (email != undefined && email.length > 0) &&
            (password != undefined && password.length > 0) &&
            (confirm != undefined && confirm.length > 0)
        ) {
            if (gender == 'F' || gender == 'M') {
                if (password.toLowerCase() == confirm.toLowerCase()) {
                    next();
                } else req.flash('full_error', flashMessage().full.error.passwordNotMatch);
            } else req.flash('full_error', flashMessage().full.error.genderNotSelected);
        } else {
            return res.redirect('/auth/register?' +
            'firstname=' + firstname +
            '&lastname=' + lastname +
            '&gender=' + gender +
            '&email=' + email);
        }
    }
}