const _ = require('lodash');
const brcypt = require('bcrypt');
const { User, validate } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let msg = {
    text: '',
    status: 0

};
router.get('/', async (_, resp) => {
    msg.status = 0;
    msg.text = '';
    resp.render('login', { msg });
});


router.post('/', async (req, res, resp) => {

    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        msg.text = 'invalied email';
        msg.status = 400;
        return res.render('login', { msg });
    }
    //    return res.status(400).send('invalied email ');

    const isValid = await brcypt.compare(req.body.password, user.password);
    if (!isValid) {
        msg.text = 'invalied  password';
        msg.status = 400;
        return res.render('login', { msg });
    }
    // return res.status(400).send('invalied  password');

    return res.render('home');

});

// router.post('/', async (req, res) => {

//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({ email: req.body.email })
//     if (user) return res.status(400).send('the email already exite');

//     user = new User(
//         _.pick(req.body, ['name', 'email', 'password'])
//     );

//     const salt = await brcypt.genSalt(10);
//     user.password = await brcypt.hash(user.password, salt);
//     await user.save();
//     const token = user.generateAuthToken();
//     res.header('x-auth-token',token).send(
//         _.pick(user, ['name', 'email', '_id'])

//     );

//   ;
// });
module.exports = router;