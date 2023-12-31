// customerRoutes.js
const express = require('express');
const router = express.Router();

const customer = require('./routes/customer/customerAuthRoute')
const contact = require('./routes/customer/contactRoutes')
const bankDetails = require('./routes/customer/bankDetailsRoutes')
const upiDetails = require('./routes/customer/upiDetailsRoutes')
const bid = require('./routes/customer/bidRoutes')
const deposite = require('./routes/customer/depositeRoutes')
const withdraw = require('./routes/customer/withdrawRoutes')
const result = require('./routes/customer/resultRoutes')
// Use customerRoutes for all routes under '/public/customers'

module.exports = function (app){
    app.use('/api/public/customer', customer);
    app.use('/api/public/contact', contact);
    app.use('/api/public/bank-account', bankDetails);
    app.use('/api/public/upi-account', upiDetails);
    app.use('/api/public/bid', bid);
    app.use('/api/public/deposite', deposite);
    app.use('/api/public/withdraw', withdraw);
    app.use('/api/public/result', result);
}

