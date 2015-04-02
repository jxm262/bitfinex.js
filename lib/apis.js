module.exports = {
    ticker: {
        subUrl: '/pubticker/{:symbol}',      //TODO: add string interpoloation module
        requiresAuth: false
    },
    balances: {
        subUrl: '/balances',
        requiresAuth: true
    },
    newDeposit: {
        subUrl: '/deposit/new',
        params: ['currency', 'method', 'wallet_name'],  //TODO: add Joi validation
        requiresAuth: true
    }
};
