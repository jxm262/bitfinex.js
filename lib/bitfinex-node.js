'use strict';

var request = require('superagent')
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

Bitfinex.prototype.balances = function (done) {
    var payload = {
        request: '/v1/balances',
        nonce: this.nonce().toString()
    };

    var encodedPayload = this.encodePayload(payload);

    var headers = {
        "X-BFX-APIKEY": secrets.api_key,
        "X-BFX-PAYLOAD": encodedPayload,
        "X-BFX-SIGNATURE": this.createSignature(encodedPayload)
    };

    request.post('https://api.bitfinex.com/v1/balances').set(headers).end(function (err, resp) {
        if(err){
            console.log(err);
        }
        else {
            console.log(resp);
        }
        done();
    });


    //
    //var encodedPayload = encodedPayload(payload);
    //return crypto.createHmac('sha384', secrets.api_secret).update(encodedPayload).digest('hex');
};
//
//var headers = {
//    "X-BFX-APIKEY" : api_key,
//    "X-BFX-PAYLOAD" : payload,
//    "X-BFX-SIGNATURE" : signature
//};


module.exports = new Bitfinex();
