const controller = {
    notFound: (req, res) => {
        res.render('pages/pageNotFound', require('../lib/helpers/pageConf').pageNotFound);
    }
}

module.exports = controller;