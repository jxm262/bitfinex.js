var bitfinex = require('../lib/bitfinex-node')
    , request = require('blueagent')
    , sinon = require('sinon')
    , chai = require('chai')
    , sinonChai = require('sinon-chai')
    , should = chai.should();

chai.use(sinonChai);

describe('bitfinex', function () {

    var sandbox;    //to clean up stubs on each test

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    describe('nonce', function () {
        it('returns ever increasing number not used more than once', function () {
            var first = bitfinex.nonce();
            var second = bitfinex.nonce();
            second.should.be.above(first);
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('encodePayload(payload)', function () {
        it('returns stringified json encoded as base 64', function () {
            var payload = {hello: 'world'};
            bitfinex.encodePayload(payload).should.equal('eyJoZWxsbyI6IndvcmxkIn0=');
        })
    });

    describe('balances function', function () {
        it('returns promise called with post(url) and set(headers)', function () {
            var headers = {header_key: 'some_val'};
            var postSpy = sandbox.spy(request, 'post');
            var setSpy = sandbox.spy(request.Request.prototype, 'set');

            sandbox.stub(bitfinex, 'authHeaders').returns(headers);

            bitfinex.balances().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/balances');
            setSpy.should.have.been.calledWith(headers);
        });
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

    describe('deposit function', function () {
        it('returns promise called with post(/deposit/new) with passed in currency, method, walletName', function () {
            var getSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');
            var params = {currency: 'usd', method: 'bitcoin', wallet_name: 'deposit'};

            bitfinex.deposit(params).should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/deposit/new');
            sendSpy.should.have.been.calledWith(params);
        });
    });

    describe('newOrder function', function () {
        it('returns promise called with post(/order/new) with passed in valid params', function () {
            var getSpy = sandbox.spy(request, 'post');
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
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/new');
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

            var getSpy = sandbox.spy(request, 'post');
            var sendSpy = sandbox.spy(request.Request.prototype, 'send');

            bitfinex.newMultiOrder(params).should.have.property('then');
            getSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/order/new/multi');
            sendSpy.should.have.been.calledWith(params);
        });
    });

});
