const Joi = require('joi');
const brcypt = require('bcrypt');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res, resp) => {
 
   
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('the email already exite');


    const isValid = await brcypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('invalied email or password');

    req.session.useremail = req.body.email;
    
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(token); 

});


module.exports = router;