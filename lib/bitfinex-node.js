'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , crypto = require('crypto')
    , _ = require('lodash')
    , Joi = require('joi')
    , spice = require('spice')
    , apis = require('./apis');

//TODO: bump out to separate config file?
var root_url = 'https://api.bitfinex.com/v1';

function Bitfinex(key, secret) {
    this._key = key;
    this._secret = secret;
    this.createApis(apis);
};

function createReq(api) {
    return (api.requiresAuth) ? createAuthRequest(api) : createUnauthRequest(api);
};

function createAuthRequest(subUrl) {
    return function (params) {
        var url = root_url + subUrl;
        var headers = authHeaders(subUrl);

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

Bitfinex.prototype.createApis = function (apis) {
    //_.forEach(apis.unauthenticated, function(n, key) {
    //    Bitfinex.prototype[key] = createUnauthRequest(n);
    //});

    _.forEach(apis.authenticated, function(n, key) {
        Bitfinex.prototype[key] = createAuthRequest(n);
    });
};


module.exports = Bitfinex;
