const { File } = require('../models/files');
const { User} = require('../models/users');
const upload = require('../middleware/upload');
const validation = require('../middleware/validation');
const express = require('express');
const path = require('path');
const router = express.Router();




router.post('/:email', [upload.single('file'),validation] , async (req, res, resp) => {

  const { filename, mimetype, size } = req.file;
  uniqueName = filename;
  
  const filePath = path.join('C:\\Users\\anas1\\vscode-nodejs\\Task#1\\uploads', filename);

  const file = new File({
    email: req.params.email,
    originalname: req.file.originalname,
    uniqueName: uniqueName,
    filePath: filePath,
    mimetype: mimetype,
    size: size
  });

  await file.save();

 return res.status(200).send("File uploaded successfully");
  
});


module.exports = router;