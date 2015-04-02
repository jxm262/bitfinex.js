var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {
    unauthenticated: {
        ticker: {
            subUrl: ',pubticker,{:symbol}'      //TODO: add string interpoloation module
        },
        stats: {
            subUrl: ',stats,{:symbol}'      //TODO: add string interpoloation module
        },
        lendbook: {
            subUrl: ',lendbook,{:currency}'
        },
        orderbook: {
            subUrl: ',book,{:symbol}'
        },
        trades: {
            subUrl: ',trades,{:symbol}'
        },
        lends: {
            subUrl: ',lends,{:currency}'
        },
        symbols: {
            subUrl: ',symbols'
        }
        symbolsDetails: {
            subUrl: ',symbol_details'
        }
    },
    authenticated: {
        newDeposit: {
            subUrl: ',deposit,new',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']),  //TODO get list of valid currencies
                method: matches(['bitcoin', 'litecoin', 'darkcoin']),
                wallet_name: matches(['trading', 'exchange', 'deposit'])   //TODO get list of valid wallet names
            })
        },
        newOrder: {
            subUrl: ',order,new',
            params: Joi.object().keys({
                symbol: Joi.any(),          //TODO look into if you should valdiate this (also used above)
                amount: Joi.number().integer().greater(0),
                price: Joi.number().greater(0),
                exchange: matches('bitfinex'),
                side: matches(['buy', 'sell']),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill']),
                is_hidden: Joi.boolean().default(false)
            })
        },

        balances: {
            subUrl: ',balances',
            requiresAuth: true
        }
    }
};
