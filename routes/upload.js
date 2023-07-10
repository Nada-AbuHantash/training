const { File } = require('../models/files');
const upload = require('../middleware/upload');
const validation = require('../middleware/validation');
const express = require('express');
const path = require('path');
const router = express.Router();


let msg = { text: ''};

router.get('/', async (_, resp) => {
  msg.text = '';
  resp.render('upload', { msg });
});


router.post('/', [upload.single('file'),validation] , async (req, res, resp) => {

  const { filename, mimetype, size } = req.file;
  uniqueName = filename;
  
  const filePath = path.join('C:\\Users\\anas1\\vscode-nodejs\\Task#1\\uploads', filename);

  const file = new File({
    originalname: req.file.originalname,
    uniqueName: uniqueName,
    filePath: filePath,
    mimetype: mimetype,
    size: size
  });

  await file.save();

  msg.text = 'File uploaded successfully';
  res.render('upload', { msg });
  
});


module.exports = router;