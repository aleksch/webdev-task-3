'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { mainController } = require('./controllers/mainController');

const app = express();


const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);
app.use(express.static(publicDir));

app.get('/', mainController);

app.listen(8082, () => {
    console.info('Open http://localhost:8080/');
});

module.exports = app;
