'use strict';

var request = require('superagent')
    , microtime = require('microtime');


function Bitfinex() {

};

Bitfinex.prototype.nonce = function () {
    return microtime.now();
};

Bitfinex.prototype.encodePayload = function (payload) {
    var json = JSON.stringify(payload);
    return new Buffer(json).toString('base64')
};

module.exports = new Bitfinex();
