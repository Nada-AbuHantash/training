const _ = require('lodash');
const brcypt = require('bcrypt');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

let msg = { text: '' };

router.get('/', async (_, resp) => {
    msg.text = '';
    resp.render('login', { msg });
});


router.post('/', async (req, res, resp) => {

    req.session.useremail = req.body.email;

    
    let user = await User.findOne({ email: req.body.email })
    if (!user) {

        msg.text = 'invalied email';
        return res.render('login', { msg });
    }


    const isValid = await brcypt.compare(req.body.password, user.password);
    if (!isValid) {

        msg.text = 'invalied  password';
        return res.render('login', { msg });
    }

    return res.render('home');

});
router.get('/home', async (req, resp) => {

    resp.render('home');

});

module.exports = router;