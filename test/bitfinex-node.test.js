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



});
