const { File, upload } = require('../models/files');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
let msg = {

    text: '',
};

router.get('/', async (req, resp) => {

    msg.text = '';
    return resp.render('search', { msg });

});


router.get('/:filename', async (req, res) => {

    const originalname = req.query.filename;

    const file = await File.findOne({ originalname: { $regex: String(originalname) } });
    if (!file) {

        msg.text = 'File not found';
        return res.render('search', { msg });
    }
    const pathfiles = 'C:\\Users\\anas1\\vscode-nodejs\\Task#1\\uploads';

    fs.readdir(pathfiles, (err, files) => {
        if (err) {
            msg.text = `Error reading directory: ${err}`;
            return res.render('search', { msg });
        }

        files.forEach((files) => {
            if (files.includes(file.uniqueName)) {

                msg.text = `this is the path ${file.filePath}`;
                return res.render('search', { msg });
            }
        });
    })

});

router.get('/delete/:filname', async (req, res) => {
    const originalname = req.query.filename;

    const file = await File.findOneAndDelete({ originalname: { $regex: String(originalname) } });
    if (!file) {

        msg = { text: 'File not found ' };
        return res.render('search', { msg });

    }
    fs.unlink(file.filePath, (err) => {
        if (err) {

            msg = { text: `Error deleting file: ${err}` };
            return res.render('search', { msg });
        }

        msg = { text: 'File deleted successfully' };
        return res.render('search', { msg });

    });

});

module.exports = router;