var Bitfinex = require('../lib/bitfinex-node')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should();

chai.use(sinonChai);

describe('bitfinex', function () {

    var sandbox;    //to clean up stubs on each test
    var bitfinex;

    before(function () {
        bitfinex = new Bitfinex({key: 'fakeTestKey', secret: 'fakeTestSecret'});
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('ticker function', function () {
        it('returns promise called with get(/pubticker) with passed in symbol', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.ticker('btcusd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/pubticker/btcusd');
        });
    });

    describe('stats function', function () {
        it('returns promise called with get(/stats) with passed in symbol', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.stats('btcusd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/stats/btcusd');
        });
    });

    describe('lendbook function', function () {
        it('returns promise called with get(/lendbook) with passed in currency', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.lendbook('usd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/lendbook/usd');
        });
    });

    describe('orderbook function', function () {
        it('returns promise called with get(/book) with passed in symbol', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.orderbook('btcusd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/book/btcusd');
        });
    });

    describe('trades function', function () {
        it('returns promise called with get(/trades) with passed in symbol', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.trades('btcusd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/trades/btcusd');
        });
    });

    describe('lends function', function () {
        it('returns promise called with get(/lends) with passed in currency', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.lends('usd').should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/lends/usd');
        });
    });

    describe('symbols function', function () {
        it('returns promise called with get(/symbols)', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.symbols().should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/symbols');
        });
    });

    describe('symbolsDetails function', function () {
        it('returns promise called with get(/symbols_details)', function () {
            var getSpy = sandbox.spy(request, 'get');

            bitfinex.symbolsDetails().should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/symbols_details');
        });
    });

    describe('newDeposit function', function () {
        it('returns promise called with post(/deposit/new) with passed in currency, method, wallet_name', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {currency: 'BTC', method: 'bitcoin', wallet_name: 'deposit'};

            bitfinex.newDeposit(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/deposit/new');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('newOrder function', function () {
        it('returns promise called with post(/order/new) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                symbol: 'btcusd',
                amount: 100,
                price: 280.9,
                exchange: 'bitfinex',
                side: 'buy',
                type: 'exchange limit',
                is_hidden: true
            }

            bitfinex.newOrder(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/new');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('newMultiOrder function', function () {
        it('returns promise called with post(/order/new) with passed in valid params', function () {
            var params = [
                {
                    symbol: 'btcusd',
                    amount: 20,
                    price: 300.9,
                    exchange: 'bitfinex',
                    side: 'sell',
                    type: 'exchange limit'
                },
                {
                    symbol: 'btcusd',
                    amount: 20,
                    price: 300.9,
                    exchange: 'bitfinex',
                    side: 'buy',
                    type: 'exchange limit'
                }];

            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.newMultiOrder(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/new/multi');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('cancelOrder function', function () {
        it('returns promise called with post(/order/cancel) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {order_id: 1};

            bitfinex.cancelOrder(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/cancel');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('cancelMultiOrder function', function () {
        it('returns promise called with post(/order/cancel/multi) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {order_ids: [1]};

            bitfinex.cancelMultiOrder(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/cancel/multi');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('cancelAllOrders function', function () {
        it('returns promise called with post(/order/cancel/all) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.cancelAllOrders().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/cancel/all');
            sendSpy.should.have.been.called;
        });
    });

    describe('replaceOrder function', function () {
        it('returns promise called with post(/order/cancel/replace) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                order_id: 1,
                symbol: 'btcusd',
                amount: 1,
                price: 1,
                exchange: 'bitfinex',
                side: 'buy',
                type: 'market',
                is_hidden: true
            };

            bitfinex.replaceOrder(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/cancel/replace');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('orderStatus function', function () {
        it('returns promise called with post(/order/status) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {order_id: 1};

            bitfinex.orderStatus(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/status');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('positions function', function () {
        it('returns promise called with post(/order/status) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.positions().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/positions');
            sendSpy.should.have.been.called;
        });
    });

    describe('claimPosition function', function () {
        it('returns promise called with post(/position/claim) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {order_id: 1};

            bitfinex.claimPosition(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/position/claim');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('balanceHistory function', function () {
        it('returns promise called with post(/history) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                currency: 'BTC',
                since: (new Date().getTime()),
                until: (new Date().getTime() + 10),
                limit: 1,
                wallet: 'deposit'
            };

            bitfinex.balanceHistory(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/history');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('movementsHistory function', function () {
        it('returns promise called with post(/history/movements) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                currency: 'BTC',
                method: 'bitcoin',
                since: (new Date().getTime()),
                until: (new Date().getTime() + 10),
                limit: 1
            };

            bitfinex.movementsHistory(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/history/movements');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('pastTrades function', function () {
        it('returns promise called with post(/mytrades) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                currency: 'BTC',
                timestamp: (new Date().getTime()),
                limit_trades: 1
            };

            bitfinex.pastTrades(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/mytrades');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('pastTrades function', function () {
        it('returns promise called with post(/mytrades) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                currency: 'BTC',
                timestamp: (new Date().getTime()),
                limit_trades: 1
            };

            bitfinex.pastTrades(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/mytrades');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('newOffer function', function () {
        it('returns promise called with post(/offer/new) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                currency: 'BTC',
                amount: (new Date().getTime()),
                rate: 1,
                period: 1,
                direction: 'lend'
            };

            bitfinex.newOffer(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/offer/new');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('cancelOffer function', function () {
        it('returns promise called with post(/offer/cancel) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {offer_id: 1};

            bitfinex.cancelOffer(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/offer/cancel');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('offerStatus function', function () {
        it('returns promise called with post(/offer/status) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {offer_id: 1};

            bitfinex.offerStatus(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/offer/status');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('activeOffers function', function () {
        it('returns promise called with post(/offers) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.activeOffers().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/offers');
            sendSpy.should.have.been.called;
        });
    });

    describe('activeCredits function', function () {
        it('returns promise called with post(/credits) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.activeCredits().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/credits');
            sendSpy.should.have.been.called;
        });
    });

    describe('activeSwaps function', function () {
        it('returns promise called with post(/taken_swaps) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.activeSwaps().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/taken_swaps');
            sendSpy.should.have.been.called;
        });
    });

    describe('closeSwap function', function () {
        it('returns promise called with post(/swap/close) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {swap_id: 1};

            bitfinex.closeSwap(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/swap/close');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('walletBalances function', function () {
        it('returns promise called with post(url) and set(headers)', function () {
            var postSpy = sandbox.spy(request, 'post');
            var setSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.walletBalances().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/balances');
            setSpy.should.have.been.called;
        });
    });

    describe('accountInfo function', function () {
        it('returns promise called with post(/account_infos) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                pairs: 'some_pair',
                maker_fees: 1,
                taker_fees: 1
            };

            bitfinex.accountInfo(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/account_infos');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('marginInfo function', function () {
        it('returns promise called with post(/margin_infos) with passed in valid params', function () {
            var postSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {
                margin_balance: 1,
                unrealized_pl: 1,
                unrealized_swap: 1,
                net_value: 1,
                required_margin: 1,
                margin_limits: 1,
                on_pair: '1',
                initial_margin: 1,
                tradable_balance: 1,
                margin_requirements: 1
            };

            bitfinex.marginInfo(params).should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/margin_infos');
            sendSpy.should.have.been.calledWith(params);
        });
    });


});
