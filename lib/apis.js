var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {
    unauthenticated: {

        /**
         * @name Bitfinex#ticker
         * @function
         * @param {string} symbol
         */
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

        /**
         * @name Bitfinex#newDeposit
         * @function
         * @param {object} params
         * @param {string} params.currency
         * @param {string} params.method
         * @param {string} params.wallet_name
         */
        newDeposit: {
            subUrl: '/deposit/new',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']).required(),  //TODO get list of valid currencies
                method: matches(['bitcoin', 'litecoin', 'darkcoin']).required(),
                wallet_name: matches(['trading', 'exchange', 'deposit']).required()
            })
        },
        newOrder: {
            subUrl: '/order/new',
            params: Joi.object().keys({
                symbol: Joi.any().required(),          //TODO look into if you should valdiate this (also used above)
                amount: Joi.number().integer().greater(0).required(),
                price: Joi.number().greater(0).required(),
                exchange: matches('bitfinex').required(),
                side: matches(['buy', 'sell']).required(),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill']).required(),
                is_hidden: Joi.boolean().default(false)
            })
        },
        newMultiOrder: {
            subUrl: '/order/new/multi',
            params: Joi.array().items(Joi.object().keys({
                symbol: Joi.any().required(),
                amount: Joi.number().integer().greater(0).required(),
                price: Joi.number().greater(0).required(),
                exchange: matches('bitfinex').required(),
                side: matches(['buy', 'sell']).required(),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill']).required()
            }))
        },
        cancelOrder: {
            subUrl: '/order/cancel',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },
        cancelMultiOrder: {
            subUrl: '/order/cancel/multi',
            params: Joi.object().keys({
                order_ids: Joi.array().items(Joi.number().integer().greater(0).required())
            })
        },
        cancelAllOrders: {
            subUrl: '/order/cancel/all'
        },
        replaceOrder: {
            subUrl: '/order/cancel/replace',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required(),
                symbol: Joi.any().required(),
                amount: Joi.number().greater(0).required(),
                price: Joi.number().greater(0).required(),
                exchange: matches('bitfinex').required(),
                side: matches(['buy', 'sell']).required(),
                type: matches(['market', 'limit', 'stop', 'trailing-stop', 'fill-or-kill', 'exchange market', 'exchange limit', 'exchange stop', 'exchange trailing-stop', 'exchange fill-or-kill']).required(),
                is_hidden: Joi.boolean().default(false)
            })
        },
        orderStatus: {
            subUrl: '/order/status',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },
        positions: {
            subUrl: '/positions'
        },
        claimPosition: {
            subUrl: '/position/claim',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },
        balanceHistory: {
            subUrl: '/history',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']).required(),
                since: Joi.any(),   //TODO validate the timestamp, need to test with bitfinex actual results
                until: Joi.any(),   //TODO: validate the time
                limit: Joi.number().integer().greater(0).default(500),
                wallet: matches(['trading', 'exchange', 'deposit'])
            })
        },
        movementsHistory: {
            subUrl: '/history/movements',
            params: Joi.object().keys({
                currency: matches(['BTC', 'LTC', 'DRK']).required(),
                method: matches(['bitcoin', 'litecoin', 'darkcoin', 'wire', 'egopay']),
                since: Joi.any(),
                until: Joi.number(),
                limit: Joi.number().integer().greater(0).default(500)
            })
        },
        pastTrades: {
            subUrl: '/mytrades',
            params: Joi.object().keys({
                currency: Joi.any().required(),
                timestamp: Joi.any().required(),
                limit_trades: Joi.number().integer().default(50)
            })
        },
        newOffer: {
            subUrl: '/offer/new',
            params: Joi.object().keys({
                currency: Joi.any().required(),
                amount: Joi.number().required(),
                rate: Joi.number().required(),
                period: Joi.number().integer().required(),
                direction: matches(['lend', 'loan']).required()
            })
        },
        cancelOffer: {
            subUrl: '/offer/cancel',
            params: Joi.object().keys({
                offer_id: Joi.number().integer().required()
            })
        },
        offerStatus: {
            subUrl: '/offer/status',
            params: Joi.object().keys({
                offer_id: Joi.number().integer().required()
            })
        },
        activeOffers: {
            subUrl: '/offers'
        },
        activeCredits: {
            subUrl: '/credits'
        },
        activeSwaps: {
            subUrl: '/taken_swaps'
        },
        closeSwap: {
            subUrl: '/swap/close',
            params: Joi.object().keys({
                swap_id: Joi.number().integer().required()
            })
        },
        walletBalances: {
            subUrl: '/balances',
            params: Joi.object().keys({
                type: matches(['trading', 'deposit', 'exchange']).required(),
                currency: Joi.string().required(),
                amount: Joi.number().required(),
                available: Joi.number().required()
            })
        },
        accountInfo: {
            subUrl: '/account_infos',
            params: Joi.object().keys({
                pairs: Joi.string().required(),
                maker_fees: Joi.number().required(),
                taker_fees: Joi.number().required()
            })
        },
        marginInfo: {
            subUrl: '/margin_infos',
            params: Joi.object().keys({
                margin_balance: Joi.number().required(),
                unrealized_pl: Joi.number(),
                unrealized_swap: Joi.number().required(),
                net_value: Joi.number().required(),
                required_margin: Joi.number().required(),
                margin_limits: Joi.any().required(),       //TODO validate is array, check which values allowed (not documented in api docs)
                on_pair: Joi.string().required(),
                initial_margin: Joi.number().required(),
                tradable_balance: Joi.number().required(),
                margin_requirements: Joi.number().required()
            })
        }
    }
};
