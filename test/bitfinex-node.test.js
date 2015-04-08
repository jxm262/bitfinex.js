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

    before(function() {
        bitfinex = new Bitfinex('fakeTestKey', 'fakeTestSecret');
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
                isHidden: true
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
                var params = {order_id: 1};

                bitfinex.cancelMultiOrder(params).should.have.property('then');
                postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/cancel/multi');
                sendSpy.should.have.been.calledWith(params);
            });
        });

        describe('cancelAllOrders function', function () {
            it('returns promise called with post(/order/cancel/all) with passed in valid params', function () {
                var postSpy = sandbox.spy(request, 'post');
                var sendSpy = sandbox.spy(request.Request.prototype, 'send');

                bitfinex.cancellAllOrders().should.have.property('then');
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

        describe('walletBalances function', function () {
            it('returns promise called with post(url) and set(headers)', function () {
                var postSpy = sandbox.spy(request, 'post');
                var setSpy = sandbox.spy(request.Request.prototype, 'send');

                bitfinex.walletBalances().should.have.property('then');
                postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/balances');
                setSpy.should.have.been.called;
            });
        });

    });

});
