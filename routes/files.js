const { File } = require('../models/files');
const express = require('express');
const fs = require('fs');
const auth = require('../middleware/auth');
const router = express.Router();



router.get('/:filename',auth, async (req, res) => {
    const originalname = req.params.filename;

    const file = await File.findOne({ originalname: { $regex: String(originalname) } })
    .and({ email:req.session.useremail });

    if (!file)  return res.status(404).send("File not found");
    
    const pathfiles = 'C:\\Users\\anas1\\vscode-nodejs\\Task#1\\uploads';

    fs.readdir(pathfiles, (err, files) => {
        if (err)  return res.status(500).send(`Error reading directory: ${err}`);

        files.forEach((files) => {
            if (files.includes(file.uniqueName)) {
                return res.status(200).send(`this is the path ${file.filePath}`);
            }
        });
    })

});

router.delete('/:filename',auth,async (req, res) => {

    const originalname = req.params.filename;

    const file = await File.findOneAndDelete({ originalname: { $regex: String(originalname) } })
    .and({  email:req.session.useremail });

    if (!file)  return res.status(404).send("File not found");

    fs.unlink(file.filePath, (err) => {
        if (err)  return res.status(500).send(`Error reading directory: ${err}`);

       return res.status(200).send("File deleted successfully");
    });

});

module.exports = router;