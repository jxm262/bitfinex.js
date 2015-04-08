var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {
    unauthenticated: {
        ticker: {
            subUrl: '/pubticker/{:symbol}',      //TODO: add string interpoloation module
            pathParam: 'symbol'
        },
        stats: {
            subUrl: '/stats/{:symbol}',      //TODO: add string interpoloation module
            pathParam: 'symbol'
        },
        lendbook: {
            subUrl: '/lendbook/{:currency}',
            pathParam: 'currency'
        },
        orderbook: {
            subUrl: '/book/{:symbol}',
            pathParam: 'symbol'
        },
        trades: {
            subUrl: '/trades/{:symbol}',
            pathParam: 'symbol'
        },
        lends: {
            subUrl: '/lends/{:currency}',
            pathParam: 'currency'
        },
        symbols: {
            subUrl: '/symbols'
        },
        symbolsDetails: {
            subUrl: '/symbols_details'
        }
    },
    authenticated: {
        newDeposit: {
            subUrl: '/deposit/new',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']),  //TODO get list of valid currencies
                method: matches(['bitcoin', 'litecoin', 'darkcoin']),
                wallet_name: matches(['trading', 'exchange', 'deposit'])
            })
        },
        newOrder: {
            subUrl: '/order/new',
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
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        cancelMultiOrder: {
            subUrl: '/order/cancel/multi',
            params: Joi.object().keys({
                order_ids: Joi.array().items(Joi.number().integer().greater(0))
            })
        },
        cancellAllOrders: {
            subUrl: '/order/cancel/all'
        },
        replaceOrder: {
            subUrl: '/order/cancel/replace',
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
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        positions: {
            subUrl: '/positions',
        },
        claimPosition: {
            subUrl: '/position/claim',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0)
            })
        },
        balanceHistory: {
            subUrl: '/history',
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
            params: Joi.object().keys({
                currency: Joi.any(),
                timestamp: Joi.any(),
                limit_trades: Joi.number().integer().optional().default(50)
            })
        },
        newOffer: {
            subUrl: '/offer/new',
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
            params: Joi.object().keys({
                offer_id: Joi.number().integer()
            })
        },
        offerStatus: {
            subUrl: '/offer/status',
            params: Joi.object().keys({
                offer_id: Joi.number().integer()
            })
        },
        activeOffers: {
            subUrl: '/offers',
        },
        activeCredits: {
            subUrl: '/credits',
        },
        activeSwaps: {
            subUrl: '/taken_swaps',
        },
        closeSwap: {
            subUrl: '/swap/close',
            params: Joi.object().keys({
                swap_id: Joi.number().integer()
            })
        },
        walletBalances: {
            subUrl: '/balances',
            params: Joi.object().keys({
                type: matches(['trading', 'deposit', 'exchange']),
                currency: Joi.string(),
                amount: Joi.number(),
                available: Joi.number()
            })
        },
        accountInfo: {
            subUrl: '/account_infos',
            params: Joi.object().keys({
                pairs: Joi.string(),
                maker_fees: Joi.number(),
                taker_fees: Joi.number()
            })
        },
        marginInfo: {
            subUrl: '/margin_infos',
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
