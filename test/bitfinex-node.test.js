var bitfinex = require('../lib/bitfinex-node')
    , chai = require('chai')
    , should = chai.should();

describe('bitfinex', function () {

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

});
