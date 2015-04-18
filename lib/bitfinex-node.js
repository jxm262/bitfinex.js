'use strict';

var request = require('blueagent')
    , microtime = require('microtime')
    , crypto = require('crypto')
    , _ = require('lodash')
    , Joi = require('joi')
    , spice = require('spice')
    , apis = require('./apis');

var root_url = 'https://api.bitfinex.com/v1';

function Bitfinex(auth) {
    var self = this;
    this._key = auth.key;
    this._secret = auth.secret;
    this.createApis(apis);
};

function nonce () {
    return microtime.now().toString();
};

function encodePayload (payload) {
    var json = JSON.stringify(payload);
    return new Buffer(json).toString('base64');
};

function createSignature (encodedPayload, secret) {
    return crypto.createHmac('sha384', secret).update(encodedPayload).digest('hex');
};

function createAuthRequest(api) {
    var self = this;
    return function (params) {
        var result = (api.params !== undefined) ? Joi.validate(params, api.params) : {};

        if (result.error) {
            throw Error(result);
        }

        if ((!self._key) || (!self._secret)) {
            throw Error('Must provide auth key / secret. Provided key: {_key} / secret: {_secret}', {
                key: self._key,
                secret: self._secret
            });
        }

        var url = root_url + api.subUrl;
        var payload = {
            request: '/v1' + api.subUrl,
            nonce: nonce()
        };

        var encodedPayload = encodePayload(payload);
        var signature  = createSignature(encodedPayload, self._secret);

        var headers = {
            "X-BFX-APIKEY": self._key,
            "X-BFX-PAYLOAD": encodedPayload,
            "X-BFX-SIGNATURE": signature
        };

        return request
            .post(url)
            .set(headers)
            .send(params);
    };
};

function createUnauthRequest(api) {
    return function(param) {
        var pathParam = {};
        pathParam[api.pathParam] = param;

        var url = spice(root_url + api.subUrl, pathParam);
        return request
            .get(url);
    }
};

Bitfinex.prototype.createApis = function (apis) {
    var self = this;

    _.forEach(apis.unauthenticated, function(api, key) {
        Bitfinex.prototype[key] = createUnauthRequest.call(self, api);
    });

    _.forEach(apis.authenticated, function(api, key) {
        Bitfinex.prototype[key] = createAuthRequest.call(self, api);
    });
};

module.exports = function(auth) {
    auth = auth || {};
    return new Bitfinex(auth);
};
