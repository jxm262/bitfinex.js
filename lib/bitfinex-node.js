'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , secrets = require('../config/secrets')
    , crypto = require('crypto')
    , _ = require('lodash')
    , Joi = require('joi')
    , spice = require('spice')
    , apis = require('./apis');

//TODO: bump out to separate config file?
var root_url = 'https://api.bitfinex.com/v1';

function Bitfinex() {
    this.createApis(apis);
};

function createReq (api){
    return (api.requiresAuth) ? createAuthRequest(api) : createUnauthRequest(api);
};

function createAuthRequest(api) {
    var headers = authHeaders(api.subUrl);     //TODO: refactor this...
    var url = root_url + api.subUrl;

    return function(params) {
    //TODO: validate api.params with params

        request
            .post(url)
            .set(headers)
            .send(params);
    }
};

function createUnauthRequest(api) {
    return function(param) {
        //TODO: validate params
        var url = spice(root_url + api.subUrl, { symbol: param });
        return request
            .get(url);
    }
};

function nonce () {
    return microtime.now();
};

function encodePayload (payload) {
    var json = JSON.stringify(payload);
    return new Buffer(json).toString('base64');
};

function createSignature (encodedPayload) {
    return crypto.createHmac('sha384', secrets.api_secret).update(encodedPayload).digest('hex');
};

function authHeaders (subUrl) {
    var payload = {
        request: '/v1' + subUrl,
        nonce: nonce().toString()
    };

    var encodedPayload = encodePayload(payload);

    return {
        "X-BFX-APIKEY": secrets.api_key,
        "X-BFX-PAYLOAD": encodedPayload,
        "X-BFX-SIGNATURE": createSignature(encodedPayload)
    };
};

//function validate(params) {
//    Joi.validate(impl, apis.newDeposit.params, function(err, val){
//        console.log(err);
//        console.log(val);
//    });
//};

Bitfinex.prototype.createApis = function (apis) {
    _.forEach(apis, function(n, key) {
        Bitfinex.prototype[key] = createReq(n);
    });
};

//Bitfinex.prototype.balances = function () {
//    var subUrl = '/balances';
//    var headers = this.authHeaders(subUrl);
//
//    return request
//        .post(root_url + subUrl)
//        .set(headers);
//};
//
//Bitfinex.prototype.ticker = function (symbol) {
//    var subUrl = '/pubticker/' + symbol;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.stats = function (symbol) {
//    var subUrl = '/stats/' + symbol;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.lendbook = function (currency) {
//    var subUrl = '/lendbook/' + currency;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.orderbook = function (symbol) {
//    var subUrl = '/book/' + symbol;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.trades = function (symbol) {
//    var subUrl = '/trades/' + symbol;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.lends = function (currency) {
//    var subUrl = '/lends/' + currency;
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.symbols = function () {
//    var subUrl = '/symbols';
//    return request.get(root_url + subUrl);
//};
//
//Bitfinex.prototype.symbolsDetails = function () {
//    var subUrl = '/symbols_details';
//    return request.get(root_url + subUrl);
//};
//
///**
// *
// * @param params = {currency: .., method: .., wallet_name: ..}
// * @returns {*}
// */
//Bitfinex.prototype.deposit = function (params) {
//    var subUrl = '/deposit/new';
//    var headers = this.authHeaders(subUrl);
//
//    return request
//        .post(root_url + subUrl)
//        .set(headers)
//        .send(params);
//};
//
///**
// *
// * @param = {symbol: .., amount: .., price: .., exchange: .., side: .., type: .., isHidden: ..}
// * @returns {*}
// */
//Bitfinex.prototype.newOrder = function (params) {
//    var subUrl = '/order/new';
//    var headers = this.authHeaders(subUrl);
//
//    return request
//        .post(root_url + subUrl)
//        .set(headers)
//        .send(params);
//};
//
///**
// *
// * @param paramsArray [ ]
// * @returns {*}
// */
//Bitfinex.prototype.newMultiOrder = function (paramsArray) {
//    var subUrl = '/order/new/multi';
//    var headers = this.authHeaders(subUrl);
//
//    return request
//        .post(root_url + subUrl)
//        .set(headers)
//        .send(paramsArray);
//};
//
//Bitfinex.prototype.cancelOrder = function (param) {
//    var subUrl = '/order/cancel';
//    var headers = this.authHeaders(subUrl);
//
//    return request
//        .post(root_url + subUrl)
//        .set(headers)
//        .send(param);
//};


module.exports = new Bitfinex();
