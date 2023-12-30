// backendRoutes.js

const manageMarket = require('./routes/backend/manageMarketRoute');
const gameRate = require('./routes/backend/gameRateRoutes');
const admin = require('./routes/backend/adminAuthRoute')
const bid = require('./routes/backend/bidRoutes')
const dashboard = require('./routes/backend/dashboardRoutes')
const customer = require('./routes/backend/customerRoutes')
const deposite = require('./routes/backend/depositeRoutes')
const withdraw = require('./routes/backend/withdrawRoutes')
// Use customerRoutes for all routes under '/customers'

module.exports = function (app){
    app.use('/api/market', manageMarket);
    app.use('/api/admin', admin);
    app.use('/api/game-rates', gameRate);
    app.use('/api/bid', bid);
    app.use('/api/dashboard', dashboard);
    app.use('/api/customer', customer)
    app.use('/api/deposite', deposite)
    app.use('/api/withdraw', withdraw)
}

