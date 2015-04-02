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
