var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {
    unauthenticated: {
        ticker: {
            subUrl: '/pubticker/{:symbol}',      //TODO: add string interpoloation module
            type: 'GET'
        },
        stats: {
            subUrl: '/stats/{:symbol}',      //TODO: add string interpoloation module
            type: 'GET'
        },
        lendbook: {
            subUrl: '/lendbook/{:currency}',
            type: 'GET'
        },
        orderbook: {
            subUrl: '/book/{:symbol}',
            type: 'GET'
        },
        trades: {
            subUrl: '/trades/{:symbol}',
            type: 'GET'
        },
        lends: {
            subUrl: '/lends/{:currency}',
            type: 'GET'
        },
        symbols: {
            subUrl: '/symbols',
            type: 'GET'
        },
        symbolsDetails: {
            subUrl: '/symbol_details',
            type: 'GET'
        }
    },
    authenticated: {
        newDeposit: {
            subUrl: '/deposit/new',
            type: 'POST',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']),  //TODO get list of valid currencies
                method: matches(['bitcoin', 'litecoin', 'darkcoin']),
                wallet_name: matches(['trading', 'exchange', 'deposit'])
            })
        },
        newOrder: {
            subUrl: '/order/new',
            type: 'POST',
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
        newMultiOrder: {
            subUrl: '/order/new/multi',
            type: 'POST',
            params: Joi.array().items(Joi.object().keys({
                symbol: Joi.any(),
                amount: Joi.number().integer().greater(0),
                price: Joi.number().greater(0),
                exchange: matches('bitfinex'),
                side: matches(['buy', 'sell']),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill'])
            }))
        },
        cancelOrder: {
            subUrl: '/order/cancel',
            type: 'POST',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        cancelMultiOrder: {
            subUrl: '/order/cancel/multi',
            type: 'POST',
            params: Joi.object().keys({
                order_ids: Joi.array().items(Joi.number().integer().greater(0))
            })
        },
        cancellAllOrders: {
            subUrl: '/order/cancel/all',
            type: 'GET'
        },
        replaceOrder: {
            subUrl: '/order/cancel/replace',
            type: 'POST',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0),
                symbol: Joi.any(),
                amount: Joi.number().greater(0),
                price: Joi.number().greater(0),
                exchange: matches('bitfinex'),
                side: matches(['buy', 'sell']),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill']),
                is_hidden: Joi.boolean().default(false)
            })
        },
        orderStatus: {
            subUrl: '/order/status',
            type: 'POST',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        positions: {
            subUrl: '/positions',
            type: 'POST'
        },
        claimPosition: {
            subUrl: '/position/claim',
            type: 'POST',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        balanceHistory: {
            subUrl: '/history',
            type: 'POST',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']),
                since: Joi.any().optional(),   //TODO validate the timestamp, need to test with bitfinex actual results
                until: Joi.any().optional(),   //TODO: validate the time
                limit: Joi.number().integer().greater(0).default(500),
                wallet: matches(['trading', 'exchange', 'deposit']).optional()
            })
        },
        movementsHistory: {
            subUrl: '/history/movements',
            type: 'POST',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']),
                method: matches(['bitcoin', 'litecoin', 'darkcoin', 'wire', 'egopay']).optional(),
                since: Joi.any().optional(),
                until: Joi.any().optional(),
                limit: Joi.number().integer().greater(0).default(500)
            })
        }
    }
};
