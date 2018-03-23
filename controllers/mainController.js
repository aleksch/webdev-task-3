'use strict';

exports.mainController = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.render('index');
};
