const controller = {
    notFound: (req, res) => {
        res.render('pages/pageNotFound', require('../lib/helpers/pageConf')(req).pageNotFound);
    }
}

module.exports = controller;