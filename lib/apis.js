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
        },
        pastTrades: {
            subUrl: '/mytrades',
            type: 'POST',
            params: Joi.object().keys({
                currency: Joi.any(),
                timestamp: Joi.any(),
                limit_trades: Joi.number().integer().optional().default(50)
            })
        },
        newOffer: {
            subUrl: '/offer/new',
            type: 'POST',
            params: Joi.object().keys({
                currency: Joi.any(),
                amount: Joi.number(),
                rate: Joi.number(),
                period: Joi.number().integer(),
                direction: matches(['lend', 'loan'])
            })
        },
        cancelOffer: {
            subUrl: '/offer/cancel',
            type: 'POST',
            params: Joi.object().keys({
                offer_id: Joi.number().integer()
            })
        },
        offerStatus: {
            subUrl: '/offer/status',
            type: 'POST',
            params: Joi.object().keys({
                offer_id: Joi.number().integer()
            })
        },
        activeOffers: {
            subUrl: '/offers',
            type: 'POST'
        },
        activeCredits: {
            subUrl: '/credits',
            type: 'POST'
        },
        activeSwaps: {
            subUrl: '/taken_swaps',
            type: 'POST'
        },
        closeSwap: {
            subUrl: '/swap/close',
            type: 'POST',
            params: Joi.object().keys({
                swap_id: Joi.number().integer()
            })
        },
        walletBalances: {
            subUrl: '/balances',
            type: 'POST',
            params: Joi.object().keys({
                type: matches(['trading', 'deposit', 'exchange']),
                currency: Joi.string(),
                amount: Joi.number(),
                available: Joi.number()
            })
        },
        accountInfo: {
            subUrl: '/account_infos',
            type: 'POST',
            params: Joi.object().keys({
                pairs: Joi.string(),
                maker_fees: Joi.number(),
                taker_fees: Joi.number()
            })
        },
        marginInfo: {
            subUrl: '/margin_infos',
            type: 'POST',
            params: Joi.object().keys({
                margin_balance: Joi.number(),
                unrealized_pl: Joi.number(),
                unrealized_swap: Joi.number(),
                net_value: Joi.number(),
                required_margin: Joi.number(),
                margin_limits: Joi.any(),       //TODO validate is array, check which values allowed (not documented in api docs)
                on_pair: Joi.string(),
                initial_margin: Joi.number(),
                tradable_balance: Joi.number(),
                margin_requirements: Joi.number()
            })
        }
    }
};
