'use strict';

exports.mainController = (req, res) => {
    const API_URL = 'https://webdev-task-2-tgywfjjjel.now.sh/places/';

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.render('index');
}