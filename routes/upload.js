const { File } = require('../models/files');
const upload = require('../middleware/upload');
const express = require('express');
const path = require('path');
const router = express.Router();

let msg = {
  text: ''
};

router.get('/', async (_, resp) => {
  msg.text = '';

  resp.render('upload', { msg });
});


router.post('/', upload.single('file'), async (req, res, resp) => {


  if (!req.file) {
    msg.text = 'No file uploaded';

    return res.render('upload', { msg });

  }

  if (req.file.size > 500000) {
    msg.text = 'File size exceeds the limit';

    return res.render('upload', { msg });
    
  }
  if (!req.file.mimetype.startsWith('text/') && req.file.mimetype !== 'application/pdf') {
    msg.text = 'Invalid file type';

    return res.render('upload', { msg });
   
  }

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



  // res.status(200).send('File uploaded successfully');

  res.render('upload', { msg });
});


module.exports = router;