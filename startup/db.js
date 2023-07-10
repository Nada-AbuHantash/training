const mongoose = require('mongoose');
const config= require('config');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

module.exports = function () {
    const db=config.get('db');
    mongoose.connect(db,{ useUnifiedTopology: true,useNewUrlParser: true })
        .then(() => console.log(`Connected to ${db}...`))
        const store = new MongoDBStore({
            uri: db,
            collection: 'sessions' 
          });

           
}