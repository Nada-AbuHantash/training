const { File, upload } = require('../models/files');
const express = require('express');
// const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
    const file = await File.find().sort('name');
   res.status(200).send(file);
  });

router.get('/:filename', async (req, res) => {
    const originalname = req.params.filename;
    
    const file = await File.findOne({ originalname: { $regex: String(originalname) } });
    if (!file) return res.status(404).send('File not found');

    res.sendFile(file.filePath);


});
router.get('/', async (req, res) => {
    const file = await File.find().sort('name');
   res.status(200).send(file);
  });

router.delete('/:filename', async (req, res) => {
    const originalname = req.params.filename;
    
    const file = await File.findOneAndDelete({ originalname: { $regex: String(originalname) } });
    if (!file) return res.status(404).send('File not found');

    res.sendFile(file.filePath);


});
module.exports = router;