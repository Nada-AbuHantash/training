const express = require('express');
const users = require('../routes/users');
const upload = require('../routes/upload');
const files = require('../routes/files');
const sessions=require('../startup/sessions');
const error = require('../middleware/error');
const bodyParser = require('body-parser');


module.exports = function (app) {
    // app.use(express.json());
    app.use(sessions);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use('/api/users', users);
    app.use('/api/upload', upload);
    app.use('/api/files', files);
    app.use(error);
}

