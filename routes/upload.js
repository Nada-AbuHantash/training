const { File, upload } = require('../models/files');
const express = require('express');
const path = require('path');
const router = express.Router();

let msg = {
  text: '',
  status: 0

};
router.get('/', async (_, resp) => {
  msg.status = 0;
  msg.text = '';
  resp.render('upload', { msg });
});


router.post('/', upload.single('file'), async (req, res, resp) => {


  if (!req.file) {
    msg.text = 'No file uploaded';
    msg.status = 400;
    // return res.status(400).send({ error: 'No file uploaded' });
   return res.render('upload', { msg });

  }

  if (req.file.size > 500000) {
    msg.text = 'File size exceeds the limit';
    msg.status = 400;
    return res.render('upload', { msg });
    // return res.status(400).send({ error: 'File size exceeds the limit' });
  }
  if (!req.file.mimetype.startsWith('text/') && req.file.mimetype!=='application/pdf') {
    msg.text = 'Invalid file type';
    msg.status = 400;
   return res.render('upload', { msg });
    // return res.status(400).send({ error: 'Invalid file type' });
  }

  const { filename, mimetype, size } = req.file;

  uniqueName = filename;
  const filePath = path.join('C:\\Users\\anas1\\vscode-nodejs\\Task#1\\uploads', filename);



  const file = new File({
    originalname:req.file.originalname,
    uniqueName: uniqueName,
    filePath:filePath,
    mimetype: mimetype,
    size: size
  });

  await file.save();

  msg.text = 'File uploaded successfully';
  msg.status = 200;


  // res.status(200).send('File uploaded successfully');

  res.render('upload', { msg });
});


// router.get('/login', async (_, resp) => {
//   resp.render('login');
// });


// router.post('/login', async (req, res, resp) => {

//   console.log(req.body.email);
//   let user = await User.findOne({ email: req.body.email })
//   if (!user) return res.status(400).send('invalied email ');

//   const isValid = await brcypt.compare(req.body.password, user.password);
//   if (!isValid) return res.status(400).send('invalied  password');

//   res.redirect('/api/upload');

// });
module.exports = router;