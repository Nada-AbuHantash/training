const fs = require('fs');

module.exports=(req,res,next)=>{
    
  if (!req.file) {
    
    return res.status(400).send("No file uploaded");

  }
 
  if (req.file.size > 500000) {
    fs.unlink(req.file.path, (err) => {});
    return res.status(400).send("File size exceeds the limit");

  }
  if (!req.file.mimetype.startsWith('text/') && req.file.mimetype !== 'application/pdf') {
    fs.unlink(req.file.path, (err) => {});

    return res.status(400).send("Invalid file type");

  }
  next();
}