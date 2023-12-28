// backendRoutes.js
const express = require('express');
const router = express.Router();

const manageMarket = require('./routes/backend/manageMarketRoute');
const gameRate = require('./routes/backend/gameRateRoutes');
const admin = require('./routes/backend/adminAuthRoute')
const bid = require('./routes/backend/bidRoutes')
// Use customerRoutes for all routes under '/customers'

module.exports = function (app){
    app.use('/api/market', manageMarket);
    app.use('/api/admin', admin);
    app.use('/api/game-rates', gameRate);
    app.use('/api/bid', bid);
}

