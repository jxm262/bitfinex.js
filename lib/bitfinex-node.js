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
    var subUrl = '/balances';
    var headers = this.authHeaders(subUrl);

    return request
        .post(root_url + subUrl)
        .set(headers);
};

Bitfinex.prototype.ticker = function (symbol) {
    var subUrl = '/pubticker/' + symbol;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.stats = function (symbol) {
    var subUrl = '/stats/' + symbol;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.lendbook = function (currency) {
    var subUrl = '/lendbook/' + currency;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.orderbook = function (symbol) {
    var subUrl = '/book/' + symbol;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.trades = function (symbol) {
    var subUrl = '/trades/' + symbol;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.lends = function (currency) {
    var subUrl = '/lends/' + currency;
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.symbols = function () {
    var subUrl = '/symbols';
    return request.get(root_url + subUrl);
};

Bitfinex.prototype.symbolsDetails = function () {
    var subUrl = '/symbols_details';
    return request.get(root_url + subUrl);
};

/**
 *
 * @param params = {currency: .., method: .., wallet_name: ..}
 * @returns {*}
 */
Bitfinex.prototype.deposit = function (params) {
    var subUrl = '/deposit/new';
    var headers = this.authHeaders(subUrl);

    return request
        .post(root_url + subUrl)
        .set(headers)
        .send(params);
};

Bitfinex.prototype.newOrder = function (symbol, amount, price, exchange, side, type, isHidden) {
    var subUrl = '/order/new';
    var headers = this.authHeaders(subUrl);

    var params = {
        symbol: symbol,
        amount: amount,
        price: price,
        exchange: exchange,
        side: side,
        type: type,
        isHidden: isHidden
    };

    return request
        .post(root_url + subUrl)
        .set(headers)
        .send(params);
};

Bitfinex.prototype.newMultiOrder = function (symbol, amount, price, exchange, side, type) {
    var subUrl = '/order/new/multi';
    var headers = this.authHeaders(subUrl);

    var params = {
        symbol: symbol,
        amount: amount,
        price: price,
        exchange: exchange,
        side: side,
        type: type,
        isHidden: isHidden
    };

    return request
        .post(root_url + subUrl)
        .set(headers)
        .send(params);
};

module.exports = new Bitfinex();
