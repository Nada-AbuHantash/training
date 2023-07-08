const { File, upload } = require('../models/files');
const express = require('express');

const router = express.Router();
let msg = {
    text: '',
  

};

router.get('/', async (req, resp) => {
    
    msg.status = 0;
   
    return resp.render('search', { msg });

});


router.get('/:filename', async (req, res) => {
   
    const originalname = req.query.filename;

    const file = await File.findOne({ originalname: { $regex: String(originalname) } });
    if (!file) {

        msg.text = 'File not found';
       
        return res.render('search', { msg });
    }
    
    msg.text = `this is the path ${file.filePath}`;
    msg.status = 200;
    return res.render('search', { msg });


});

router.delete('/:filename', async (req, res) => {
    const originalname = req.query.filename;

    const file = await File.findOneAndDelete({ originalname: { $regex: String(originalname) } });
    if (!file) {
        msg.text = 'File not found frome delete';
     
        return res.render('search', { msg }); 
    }
    // return res.status(404).send('File not found');

    // res.status(200).json({ message: 'File deleted successfully' });
    msg.text = 'File deleted successfully';
   
    return res.render('search', { msg }); 


});
module.exports = router;