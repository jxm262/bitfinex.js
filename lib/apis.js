var Joi = require('joi');

function matches(arg) {
    return Joi.any().valid(arg);
};

module.exports = {

    unauthenticated: {

        /**
         * @name Bitfinex#ticker
         * @function
         * @param symbol
         */
        ticker: {
            subUrl: '/pubticker/{:symbol}',      //TODO: add string interpoloation module
            pathParam: 'symbol'
        },

        /**
         * @name Bitfinex#stats
         * @function
         * @param symbol
         */
        stats: {
            subUrl: '/stats/{:symbol}',      //TODO: add string interpoloation module
            pathParam: 'symbol'
        },

        /**
         * @name Bitfinex#lendbook
         * @function
         * @param currency
         */
        lendbook: {
            subUrl: '/lendbook/{:currency}',
            pathParam: 'currency'
        },

        /**
         * @name Bitfinex#orderbook
         * @function
         * @param symbol
         */
        orderbook: {
            subUrl: '/book/{:symbol}',
            pathParam: 'symbol'
        },

        /**
         * @name Bitfinex#trades
         * @function
         * @param symbol
         */
        trades: {
            subUrl: '/trades/{:symbol}',
            pathParam: 'symbol'
        },

        /**
         * @name Bitfinex#lends
         * @function
         * @param currency
         */
        lends: {
            subUrl: '/lends/{:currency}',
            pathParam: 'currency'
        },

        /**
         * @name Bitfinex#symbols
         * @function
         */
        symbols: {
            subUrl: '/symbols'
        },

        /**
         * @name Bitfinex#symbolsDetails
         * @function
         */
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

        /**
         * @name Bitfinex#newOrder
         * @function
         * @param {object} params
         * @param {string} params.symbol
         * @param {integer} params.amount
         * @param {number} params.price
         * @param {string} params.exchange
         * @param {string} params.side
         * @param {string} params.type
         * @param {boolean} params.is_hidden
         */
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

        /**
         * @name Bitfinex#newMultiOrder
         * @function
         * @param {object} params
         * @param {string} params.symbol
         * @param {integer} params.amount
         * @param {number} params.price
         * @param {string} params.exchange
         * @param {string} params.side
         * @param {string} params.type
         */
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

        /**
         * @name Bitfinex#cancelOrder
         * @function
         * @param {object} params
         * @param {string} params.order_id
         */
        cancelOrder: {
            subUrl: '/order/cancel',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },

        /**
         * @name Bitfinex#cancelMultiOrder
         * @function
         * @param {object} params
         * @param {integer[]} params.order_ids
         */
        cancelMultiOrder: {
            subUrl: '/order/cancel/multi',
            params: Joi.object().keys({
                order_ids: Joi.array().items(Joi.number().integer().greater(0).required())
            })
        },

        /**
         * @name Bitfinex#cancelAllOrders
         * @function
         */
        cancelAllOrders: {
            subUrl: '/order/cancel/all'
        },

        /**
         * @name Bitfinex#replaceOrder
         * @function
         * @param {object} params
         * @param {integer} params.order_id
         * @param {string} params.symbol
         * @param {number} params.amount
         * @param {number} params.price
         * @param {string} params.exchange
         * @param {string} params.side
         * @param {string} params.type
         * @param {boolean} params.is_hidden
         */
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

        /**
         * @name Bitfinex#orderStatus
         * @function
         * @param {object} params
         * @param {integer[]} params.order_id
         */
        orderStatus: {
            subUrl: '/order/status',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },

        /**
         * @name Bitfinex#positions
         * @function
         */
        positions: {
            subUrl: '/positions'
        },

        /**
         * @name Bitfinex#claimPosition
         * @function
         * @param {object} params
         * @param {integer} params.order_id
         */
        claimPosition: {
            subUrl: '/position/claim',
            params: Joi.object().keys({
                order_id: Joi.number().integer().greater(0).required()
            })
        },

        /**
         * @name Bitfinex#balanceHistory
         * @function
         * @param {object} params
         * @param {string} params.currency
         * @param {Date} params.since
         * @param {Date} params.until
         * @param {integer} params.limit
         * @param {string} params.wallet
         */
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

        /**
         * @name Bitfinex#movementHistory
         * @function
         * @param {object} params
         * @param {string} params.currency
         * @param {string} params.method
         * @param {date} params.since
         * @param {number} params.until
         * @param {integer} params.limit
         */
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

        /**
         * @name Bitfinex#pastTrades
         * @function
         * @param {object} params
         * @param {string} params.currency
         * @param {string} params.timestamp
         * @param {number} params.limit_trades
         */
        pastTrades: {
            subUrl: '/mytrades',
            params: Joi.object().keys({
                currency: Joi.any().required(),
                timestamp: Joi.any().required(),
                limit_trades: Joi.number().integer().default(50)
            })
        },

        /**
         * @name Bitfinex#newOrder
         * @function
         * @param {object} params
         * @param {string} params.currency
         * @param {amount} params.amount
         * @param {rate} params.rate
         * @param {period} params.period
         * @param {direction} params.direction
         */
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

        /**
         * @name Bitfinex#cancelOffer
         * @function
         * @param {object} params
         * @param {integer} params.offer_id
         */
        cancelOffer: {
            subUrl: '/offer/cancel',
            params: Joi.object().keys({
                offer_id: Joi.number().integer().required()
            })
        },

        /**
         * @name Bitfinex#offerStatus
         * @function
         * @param {object} params
         * @param {integer} params.offer_id
         */
        offerStatus: {
            subUrl: '/offer/status',
            params: Joi.object().keys({
                offer_id: Joi.number().integer().required()
            })
        },

        /**
         * @name Bitfinex#activeOffers
         * @function
         */
        activeOffers: {
            subUrl: '/offers'
        },

        /**
         * @name Bitfinex#activeCredits
         * @function
         */
        activeCredits: {
            subUrl: '/credits'
        },

        /**
         * @name Bitfinex#activeSwaps
         * @function
         */
        activeSwaps: {
            subUrl: '/taken_swaps'
        },

        /**
         * @name Bitfinex#closeSwap
         * @function
         * @param {object} params
         * @param {integer} params.swap_id
         */
        closeSwap: {
            subUrl: '/swap/close',
            params: Joi.object().keys({
                swap_id: Joi.number().integer().required()
            })
        },

        /**
         * @name Bitfinex#walletBalances
         * @function
         * @param {object} params
         * @param {string} params.type
         * @param {string} params.currency
         * @param {number} params.amount
         * @param {number} params.available
         */
        walletBalances: {
            subUrl: '/balances',
            params: Joi.object().keys({
                type: matches(['trading', 'deposit', 'exchange']).required(),
                currency: Joi.string().required(),
                amount: Joi.number().required(),
                available: Joi.number().required()
            })
        },

        /**
         * @name Bitfinex#accountInfo
         * @function
         * @param {object} params
         * @param {string} params.pairs
         * @param {number} params.maker_fees
         * @param {number} params.taker_fees
         */
        accountInfo: {
            subUrl: '/account_infos',
            params: Joi.object().keys({
                pairs: Joi.string().required(),
                maker_fees: Joi.number().required(),
                taker_fees: Joi.number().required()
            })
        },

        /**
         * @param {object} params
         * @param {number} params.margin_balance
         * @param {number} params.unrealized_pl
         * @param {number} params.unrealized_swap
         * @param {number} params.net_value
         * @param {number} params.required_margin
         * @param {Object[]} params.margin_limits
         * @param {string} params.on_pair
         * @param {number} params.initial_margin
         * @param {number} params.tradable_balance
         * @param {number} params.margin_requirements
         */
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
