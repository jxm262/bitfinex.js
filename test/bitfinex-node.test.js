var bitfinex = require('../lib/bitfinex-node')
    , chai = require('chai')
    , should = chai.should();

describe('bitfinex', function () {

    it('nonce returns ever increasing number not used more than once', function(){
        var first = bitfinex.nonce();
        var second = bitfinex.nonce();
        second.should.be.above(first);
    });

});
