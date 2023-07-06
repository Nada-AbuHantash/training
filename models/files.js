const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    uniqueName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    filePath: {
        type: String,
        required: true
      },
    mimetype: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    size: {
        type: Number,
        max: 500000,
        required: true,

    }

});

const File = mongoose.model('File', fileSchema);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
      
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// exports.validateFile = validateFile;
exports.File = File;
// exports.storage = storage;
exports.upload = upload;