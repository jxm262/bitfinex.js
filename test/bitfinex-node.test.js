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

    describe('encodePayload(payload)', function(){
        it('returns stringified json encoded as base 64', function(){
            var payload = {hello: 'world'};
            bitfinex.encodePayload(payload).should.equal('eyJoZWxsbyI6IndvcmxkIn0=');
        })
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('balances', function(){
        it('returns promise called with post(url) and set(headers)', function(){
            var headers = {header_key: 'some_val'};
            var postSpy = sandbox.spy(request, 'post');
            var setSpy = sandbox.spy(request.Request.prototype, 'set');

            sandbox.stub(bitfinex, 'authHeaders').returns(headers);

            bitfinex.balances().should.have.property('then');
            postSpy.should.have.been.calledWith('https://api.bitfinex.com/v1/balances');
            setSpy.should.have.been.calledWith(headers);
        });

    });
});
