const fs = require('fs');
let msg = { text: ''};

module.exports=(req,res,next)=>{
    
  if (!req.file) {
    msg.text = 'No file uploaded';
    return res.render('upload', { msg });

  }
 
  if (req.file.size > 500000) {
    fs.unlink(req.file.path, (err) => {});
    msg.text = 'File size exceeds the limit';
    return res.render('upload', { msg });
  }
  if (!req.file.mimetype.startsWith('text/') && req.file.mimetype !== 'application/pdf') {
    fs.unlink(req.file.path, (err) => {});
    msg.text = 'Invalid file type';

    return res.render('upload', { msg });
   
  }
  next();
}