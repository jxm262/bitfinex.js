'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , secrets = require('../config/secrets')
    , crypto = require('crypto');


function Bitfinex() {

};

//TODO: bump out to separate config file?
var root_url = 'https://api.bitfinex.com/v1';

Bitfinex.prototype.nonce = function () {
    return microtime.now();
};

Bitfinex.prototype.encodePayload = function (payload) {
    var json = JSON.stringify(payload);
    return new Buffer(json).toString('base64');
};

Bitfinex.prototype.createSignature = function (encodedPayload) {
    return crypto.createHmac('sha384', secrets.api_secret).update(encodedPayload).digest('hex');
};

Bitfinex.prototype.authHeaders = function (subUrl) {
    var payload = {
        request: '/v1' + subUrl,
        nonce: this.nonce().toString()
    };

    var encodedPayload = this.encodePayload(payload);

    return {
        "X-BFX-APIKEY": secrets.api_key,
        "X-BFX-PAYLOAD": encodedPayload,
        "X-BFX-SIGNATURE": this.createSignature(encodedPayload)
    };
};

Bitfinex.prototype.balances = function () {
    var headers = this.authHeaders('/balances');

    return request.post('https://api.bitfinex.com/v1/balances')
        .set(headers);
};


module.exports = new Bitfinex();
