var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {
    unauthenticated: {
        ticker: {
            subUrl: '/pubticker/{:symbol}'      //TODO: add string interpoloation module
        },
        stats: {
            subUrl: '/stats/{:symbol}'      //TODO: add string interpoloation module
        },
        lendbook: {
            subUrl: '/lendbook/{:currency}'
        },
        orderbook: {
            subUrl: '/book/{:symbol}'
        },
        trades: {
            subUrl: '/trades/{:symbol}'
        },
        lends: {
            subUrl: '/lends/{:currency}'
        },
        symbols: {
            subUrl: '/trades/'
        }
    },
    authenticated: {

        balances: {
            subUrl: '/balances',
            requiresAuth: true
        },
        newDeposit: {
            subUrl: '/deposit/new',
            params: Joi.object().keys({
                currency: matches(['USD', 'CAD']),  //TODO get list of valid currencies
                method: matches('bitcoin'),
                wallet_name: matches(['deposit'])   //TODO get list of valid wallet names
            }),
            requiresAuth: true
        }
    }
};
//Bitfinex.prototype.lends = function (currency) {
//    var subUrl = '/lends/' + currency;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.symbols = function () {
//    var subUrl = '/symbols';
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.symbolsDetails = function () {
//    var subUrl = '/symbols_details';
//    return request.get(root_url + subUrl);
//};
