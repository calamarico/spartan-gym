// Dependences
var request = require('request');

// Vars and constants
var SERVER_URL = 'http://ucstb.mca.tid.es/service/',
  CONSUMER_KEY = 'gvp_dev_key',
  CONSUMER_SECRET = 'gvp_dev_secret',
  DEVICE_TYPE = 401,
  TIME_SERVICE = SERVER_URL + 'TimeService.svc/GetTime?deviceType=' +
    DEVICE_TYPE + '&oauth_consumer_key=' + CONSUMER_KEY,
  LOGIN_SERVICE = SERVER_URL + 'AuthenticationService.svc/LoginAnonymous',
  INSTANCE_ID = 30;


// OAuth
// ------------------------------------------------------------------

  $ = {};
  $.isArray = function(obj) {
    return Array.isArray(obj);
  };

  sha1 = {};

    /*
     * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
     * in FIPS PUB 180-1
     * Version 2.1a Copyright Paul Johnston 2000 - 2002.
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for details.
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0,  /* hex output format. 0 - lowercase; 1 - uppercase        */
        b64pad = '=', /* base-64 pad character. '=' for strict RFC compliance   */
        chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

    function hex_sha1(s) {
        return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
    }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function sha1_vm_test() {
        return hex_sha1('abc') === 'a9993e364706816aba3e25717850c26c9cd0d89d';
    }

    /*
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     */
    function core_sha1(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;

        var w = new Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
        var i, j, length;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var olde;
        var t;

        for (i = 0, length = x.length; i < length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            olde = e;

            for (j = 0; j < 80; j++) {
                if (j < 16) {
                    w[j] = x[i + j];
                } else {
                    w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                }
                t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                e = d;
                d = c;
                c = rol(b, 30);
                b = a;
                a = t;
            }
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
            e = safe_add(e, olde);
        }
        return [a, b, c, d, e];
    }

    /*
     * Perform the appropriate triplet combination function for the current
     * iteration
     */
    function sha1_ft(t, b, c, d) {
        if (t < 20) {
            return (b & c) | ((~b) & d);
        }
        if (t < 40) {
            return b ^ c ^ d;
        }
        if (t < 60) {
            return (b & c) | (b & d) | (c & d);
        }
        return b ^ c ^ d;
    }

    /*
     * Determine the appropriate additive constant for the current iteration
     */
    function sha1_kt(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
            (t < 60) ? -1894007588 : -899497514;
    }

    /*
     * Calculate the HMAC-SHA1 of a key and some data
     */
    function core_hmac_sha1(key, data) {
        var i, hash;
        var ipad = new Array(16), opad = new Array(16);
        var bkey = str2binb(key);
        if (bkey.length > 16) {
            bkey = core_sha1(bkey, key.length * chrsz);
        }
        for (i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
        return core_sha1(opad.concat(hash), 512 + 160);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * Convert an 8-bit or 16-bit string to an array of big-endian words
     * In 8-bit function, characters >255 have their hi-byte silently ignored.
     */
    function str2binb(str) {
        var i, len;
        var bin = [];
        var mask = (1 << chrsz) - 1;
        for (i = 0, len = str.length * chrsz; i < len; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
        }
        return bin;
    }

    /*
     * Convert an array of big-endian words to a string
     */
    function binb2str(bin) {
        var i, len;
        var str = '';
        var mask = (1 << chrsz) - 1;

        for (i = 0, len = bin.length * 32; i < len; i += chrsz) {
            str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
        }
        return str;
    }

    /*
     * Convert an array of big-endian words to a hex string.
     */
    function binb2hex(binarray) {
        var i, len;
        var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
        var str = '';
        for (i = 0, len = binarray.length * 4; i < len; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF);
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    /*
     * Convert an array of big-endian words to a base-64 string
     */
    function binb2b64(binarray) {
        var i, j, len;
        var triplet;
        var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var str = '';
        for (i = 0, len = binarray.length * 4; i < len; i += 3) {
            triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) |
                (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) |
                ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);

            for (j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > binarray.length * 32) {
                    str += b64pad;
                } else {
                    str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
        }
        return str;
    }

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    sha1.hex_sha1 = function(s) {
        return hex_sha1(s);
    };

    sha1.b64_sha1 = function(s) {
        return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
    };

    sha1.str_sha1 = function(s) {
        return binb2str(core_sha1(str2binb(s), s.length * chrsz));
    };

    sha1.hex_hmac_sha1 = function(key, data) {
        return binb2hex(core_hmac_sha1(key, data));
    };

    sha1.b64_hmac_sha1 = function(key, data) {
        return binb2b64(core_hmac_sha1(key, data));
    };

    sha1.str_hmac_sha1 = function(key, data) {
        return binb2str(core_hmac_sha1(key, data));
    };

    /*
     * Copyright 2008 Netflix, Inc.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /* Here's some JavaScript software for implementing OAuth.

    This isn't as useful as you might hope.  OAuth is based around
    allowing tools and websites to talk to each other.  However,
    JavaScript running in web browsers is hampered by security
    restrictions that prevent code running on one website from
    accessing data stored or served on another.

    Before you start hacking, make sure you understand the limitations
    posed by cross-domain XMLHttpRequest.

    On the bright side, some platforms use JavaScript as their
    language, but enable the programmer to access other web sites.
    Examples include Google Gadgets, and Microsoft Vista Sidebar.
    For those platforms, this library should come in handy.
*/

    // The HMAC-SHA1 signature method calls b64_hmac_sha1, defined by
    // http://pajhome.org.uk/crypt/md5/sha1.js

    /* An OAuth message is represented as an object like this:
    {method: "GET", action: "http://server.com/path", parameters: ...}

    The parameters may be either a map {name: value, name2: value2}
    or an Array of name-value pairs [[name, value], [name2, value2]].
    The latter representation is more powerful: it supports parameters
    in a specific sequence, or several parameters with the same name;
    for example [["a", 1], ["b", 2], ["a", 3]].

    Parameter names and values are NOT percent-encoded in an object.
    They must be encoded before transmission and decoded after reception.
    For example, this message object:
    {method: "GET", action: "http://server/path", parameters: {p: "x y"}}
    ... can be transmitted as an HTTP request that begins:
    GET /path?p=x%20y HTTP/1.0
    (This isn't a valid OAuth request, since it lacks a signature etc.)
    Note that the object "x y" is transmitted as x%20y.  To encode
    parameters, you can call OAuth.addToURL, OAuth.formEncode or
    OAuth.getAuthorization.

    This message object model harmonizes with the browser object model for
    input elements of an form, whose value property isn't percent encoded.
    The browser encodes each value before transmitting it. For example,
    see consumer.setInputs in example/consumer.js.
 */

    /* This script needs to know what time it is. By default, it uses the local
    clock (new Date), which is apt to be inaccurate in browsers. To do
    better, you can load this script from a URL whose query string contains
    an oauth_timestamp parameter, whose value is a current Unix timestamp.
    For example, when generating the enclosing document using PHP:

    <script src="oauth.js?oauth_timestamp=<?=time()?>" ...

    Another option is to call OAuth.correctTimestamp with a Unix timestamp.
 */

    var OAuth = {};

    OAuth.setProperties = function setProperties(into, from) {
        var key;
        if (into !== null && from !== null) {
            for (key in from) {
                into[key] = from[key];
            }
        }
        return into;
    };

    OAuth.setProperties(OAuth, // utility functions
    {
        percentEncode: function percentEncode(s) {
            var i, len;
            var e;
            if (s === null || typeof s === 'undefined') {
                return '';
            }
            if ($.isArray(s)) {
                e = '';
                for (i = 0, len = s.length; i < len; ++s) {
                    if (e !== '') {
                        e += '&';
                    }
                    e += OAuth.percentEncode(s[i]);
                }
                return e;
            }
            s = encodeURIComponent(s);
            // Now replace the values which encodeURIComponent doesn't do
            // encodeURIComponent ignores: - _ . ! ~ * ' ( )
            // OAuth dictates the only ones you can ignore are: - _ . ~
            // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
            s = s.replace(/\!/g, '%21');
            s = s.replace(/\*/g, '%2A');
            s = s.replace(/\'/g, '%27');
            s = s.replace(/\(/g, '%28');
            s = s.replace(/\)/g, '%29');
            return s;
        },

        decodePercent: function decodePercent(s) {
            if (typeof s === 'string' && s) {
                // Handle application/x-www-form-urlencoded, which is defined by
                // http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
                s = s.replace(/\+/g, ' ');
            }
            return decodeURIComponent(s);
        },

        /** Convert the given parameters to an Array of name-value pairs. */
        getParameterList: function getParameterList(parameters) {
            var list, p;
            if (parameters === null || typeof parameters === 'undefined') {
                return [];
            }
            if (typeof parameters !== 'object') {
                return OAuth.decodeForm(parameters.toString());
            }
            if ($.isArray(parameters)) {
                return parameters;
            } else {
                list = [];
                for (p in parameters) {
                    list.push([p, parameters[p]]);
                }
                return list;
            }
        },

        /** Convert the given parameters to a map from name to value. */
        getParameterMap: function getParameterMap(parameters) {
            var map, key;
            var i, len;
            if (parameters === null || typeof parameters === 'undefined') {
                return {};
            }
            if (typeof parameters !== 'object') {
                return OAuth.getParameterMap(OAuth.decodeForm(parameters.toString()));
            }
            if ($.isArray(parameters)) {
                map = {};
                for (i = 0, len = parameters.length; i < len; ++i) {
                    key = parameters[i][0];
                    if (typeof map[key] === 'undefined') { // first value wins
                        map[key] = parameters[i][1];
                    }
                }
                return map;
            }
            return parameters;
        },

        getParameter: function getParameter(parameters, name) {
            var i, len;
            if ($.isArray(parameters)) {
                for (i = 0, len = parameters.length; i < len; ++i) {
                    if (parameters[i][0] === name) {
                        return parameters[i][1]; // first value wins
                    }
                }
            } else {
                return OAuth.getParameterMap(parameters)[name];
            }
            return null;
        },

        formEncode: function formEncode(parameters) {
            var i, len;
            var form = '', value;
            var list = OAuth.getParameterList(parameters);

            for (i = 0, len = list.length; i < len; ++i) {
                value = list[i][1];
                if (value === null || typeof value === 'undefined') {
                    value = '';
                }
                if (form !== '') {
                    form += '&';
                }
                form += OAuth.percentEncode(list[i][0]);
                form += '=';
                form += OAuth.percentEncode(value);
            }
            return form;
        },

        decodeForm: function decodeForm(form) {
            var i, len;
            var list = [], nvp, equals, name, value;
            var nvps = form.split('&');
            for (i = 0, len = nvps.length; i < len; ++i) {
                nvp = nvps[i];
                if (nvp === '') {
                    continue;
                }
                equals = nvp.indexOf('=');
                if (equals < 0) {
                    name = OAuth.decodePercent(nvp);
                    value = null;
                } else {
                    name = OAuth.decodePercent(nvp.substring(0, equals));
                    value = OAuth.decodePercent(nvp.substring(equals + 1));
                }
                list.push([name, value]);
            }
            return list;
        },

        setParameter: function setParameter(message, name, value) {
            var i, len;
            var parameters = message.parameters;
            if ($.isArray(parameters)) {
                for (i = 0, len = parameters.length; i < len; ++i) {
                    if (parameters[i][0] === name) {
                        if (typeof value === 'undefined') {
                            parameters.splice(i, 1);
                        } else {
                            parameters[i][1] = value;
                            value = undefined;
                        }
                    }
                }
                if (typeof value !== 'undefined') {
                    parameters.push([name, value]);
                }
            } else {
                parameters = OAuth.getParameterMap(parameters);
                parameters[name] = value;
                message.parameters = parameters;
            }
        },

        setParameters: function setParameters(message, parameters) {
            var i, len;
            var list = OAuth.getParameterList(parameters);
            for (i = 0, len = list.length; i < len; ++i) {
                OAuth.setParameter(message, list[i][0], list[i][1]);
            }
        },

        /** Fill in parameters to help construct a request message.
                This function doesn't fill in every parameter.
                The accessor object should be like:
                {consumerKey:'foo', consumerSecret:'bar', accessorSecret:'nurn', token:'krelm', tokenSecret:'blah'}
                The accessorSecret property is optional.
         */
        completeRequest: function completeRequest(message, accessor) {
            if (!message.method) {
                message.method = 'GET';
            }
            var map = OAuth.getParameterMap(message.parameters);
            if (!map.oauth_consumer_key) {
                OAuth.setParameter(message, 'oauth_consumer_key', accessor.consumerKey || '');
            }
            if (!map.oauth_token && accessor.token) {
                OAuth.setParameter(message, 'oauth_token', accessor.token);
            }
            if (!map.oauth_version) {
                OAuth.setParameter(message, 'oauth_version', '1.0');
            }
            if (!map.oauth_timestamp) {
                OAuth.setParameter(message, 'oauth_timestamp', OAuth.timestamp());
            }
            if (!map.oauth_nonce) {
                OAuth.setParameter(message, 'oauth_nonce', OAuth.nonce(6));
            }
            OAuth.SignatureMethod.sign(message, accessor);
        },

        setTimestampAndNonce: function setTimestampAndNonce(message) {
            OAuth.setParameter(message, 'oauth_timestamp', OAuth.timestamp());
            OAuth.setParameter(message, 'oauth_nonce', OAuth.nonce(6));
        },

        addToURL: function addToURL(url, parameters) {
            var toAdd, q, newURL = url;

            if (parameters !== null && typeof parameters !== 'undefined') {
                toAdd = OAuth.formEncode(parameters);
                if (toAdd.length > 0) {
                    q = url.indexOf('?');
                    if (q < 0) {
                        newURL += '?';
                    } else {
                        newURL += '&';
                    }
                    newURL += toAdd;
                }
            }
            return newURL;
        },

        /** Construct the value of the Authorization header for an HTTP request. */
        getAuthorizationHeader: function getAuthorizationHeader(realm, parameters) {
            var header = 'OAuth realm="';
            header += OAuth.percentEncode(realm);
            header += '"';
            var list = OAuth.getParameterList(parameters);
            var parameter, name;
            var i, len;
            for (i = 0, len = list.length; i < len; ++i) {
                parameter = list[i];
                name = parameter[0];
                if (name.indexOf('oauth_') === 0) {
                    header += ',';
                    header += OAuth.percentEncode(name);
                    header += '="';
                    header += OAuth.percentEncode(parameter[1]);
                    header += '"';
                }
            }
            return header;
        },

        /** Correct the time using a parameter from the URL from which the last script was loaded. */
        correctTimestampFromSrc: function correctTimestampFromSrc(parameterName) {
            var scripts, src, q, parameters, t;

            parameterName = parameterName || 'oauth_timestamp';
            scripts = document.getElementsByTagName('script');
            if (!scripts || !scripts.length) {
                return;
            }
            src = scripts[scripts.length - 1].src;
            if (!src) {
                return;
            }
            q = src.indexOf('?');
            if (q < 0) {
                return;
            }
            parameters = OAuth.getParameterMap(OAuth.decodeForm(src.substring(q + 1)));
            t = parameters[parameterName];
            if (!t) {
                return;
            }
            OAuth.correctTimestamp(t);
        },

        /** Generate timestamps starting with the given value. */
        correctTimestamp: function correctTimestamp(timestamp) {
            OAuth.timeCorrectionMsec = (timestamp * 1000) - (new Date()).getTime();
        },

        /** The difference between the correct time and my clock. */
        timeCorrectionMsec: 0,

        timestamp: function timestamp() {
            var t = (new Date()).getTime() + OAuth.timeCorrectionMsec;
            return Math.floor(t / 1000);
        },

        nonce: function nonce(length) {
            var chars = OAuth.nonce.CHARS;
            var result = '', i, rnum;

            for (i = 0; i < length; ++i) {
                rnum = Math.floor(Math.random() * chars.length);
                result += chars.substring(rnum, rnum + 1);
            }
            return result;
        },

        generateOAuthSignedURL: function(httpMethod, serviceURL, parameters, consumerKey, consumerSecret) {
            var timestamp = OAuth.timestamp();
            var nonce = OAuth.nonce(11);
            var tokenSecret = '';
            var message = null;
            var accessor = {consumerSecret: consumerSecret, tokenSecret: tokenSecret};
            var normalizedParameters, signature, resultURL, authorizationHeader;

            //Ponemos este If porque en POST no se mandan los parámetros en las cabeceras HTTP.
            //Por eso hacemos esta distinción
            if (($.isArray(parameters) && parameters.length === 0) || httpMethod === 'POST') {
                message = { method: httpMethod,
                    action: serviceURL,
                    parameters: OAuth.decodeForm('')
                };
            }else {
                message = { method: httpMethod,
                    action: serviceURL,
                    parameters: OAuth.getParameterList(parameters)
                };
            }
            message.parameters.push(['oauth_version', '1.0']);
            message.parameters.push(['oauth_consumer_key', consumerKey]);
            //message.parameters.push(['oauth_token', '']);
            message.parameters.push(['oauth_timestamp', timestamp]);
            message.parameters.push(['oauth_nonce', nonce]);
            message.parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            OAuth.SignatureMethod.sign(message, accessor);

            normalizedParameters = OAuth.SignatureMethod.normalizeParameters(message.parameters);
            //var signatureBaseString = OAuth.SignatureMethod.getBaseString(message);

            signature = OAuth.percentEncode(OAuth.getParameter(message.parameters, 'oauth_signature'));
            resultURL = serviceURL + '?' + normalizedParameters + '&oauth_signature=' + signature;
            authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);
            return resultURL;
        }
    });

    OAuth.nonce.CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    /** Define a constructor function,
            without causing trouble to anyone who was using it as a namespace.
            That is, if parent[name] already existed and had properties,
            copy those properties into the new constructor.
     */
    OAuth.declareClass = function declareClass(parent, name, newConstructor) {
        var key;
        var previous = parent[name];

        parent[name] = newConstructor;
        if (newConstructor && previous) {
            for (key in previous) {
                if (key !== 'prototype') {
                    newConstructor[key] = previous[key];
                }
            }
        }
        return newConstructor;
    };

    /** An abstract algorithm for signing messages. */
    OAuth.declareClass(OAuth, 'SignatureMethod', function OAuthSignatureMethod() {});

    OAuth.setProperties(OAuth.SignatureMethod.prototype, // instance members
    {
        /** Add a signature to the message. */
        sign: function sign(message) {
            var baseString = OAuth.SignatureMethod.getBaseString(message);
            var signature = this.getSignature(baseString);
            OAuth.setParameter(message, 'oauth_signature', signature);
            return signature; // just in case someone's interested
        },

        /** Set the key string for signing. */
        initialize: function initialize(name, accessor) {
            var consumerSecret;
            if (accessor.accessorSecret && name.length > 9 &&
                name.substring(name.length - 9) === '-Accessor')
            {
                consumerSecret = accessor.accessorSecret;

            } else {
                consumerSecret = accessor.consumerSecret;
            }
            this.key = OAuth.percentEncode(consumerSecret);
            this.key += '&';
            this.key += OAuth.percentEncode(accessor.tokenSecret);
        }
    });

    /* SignatureMethod expects an accessor object to be like this:
        {tokenSecret: 'lakjsdflkj...', consumerSecret: 'QOUEWRI..', accessorSecret: 'xcmvzc...'}
        The accessorSecret property is optional.
     */
    // Class members:
    OAuth.setProperties(OAuth.SignatureMethod, // class members
    {
        sign: function sign(message, accessor) {
            var name = OAuth.getParameterMap(message.parameters).oauth_signature_method;
            if (!name) {
                name = 'HMAC-SHA1';
                OAuth.setParameter(message, 'oauth_signature_method', name);
            }
            OAuth.SignatureMethod.newMethod(name, accessor).sign(message);
        },

        /** Instantiate a SignatureMethod for the given method name. */
        newMethod: function newMethod(name, accessor) {
            var method, err, acceptable, r;
            var Impl = OAuth.SignatureMethod.REGISTERED[name];
            if (Impl) {
                method = new Impl();
                method.initialize(name, accessor);
                return method;
            }

            err = new Error('signature_method_rejected');
            acceptable = '';
            for (r in OAuth.SignatureMethod.REGISTERED) {
                if (acceptable !== '') {
                    acceptable += '&';
                }
                acceptable += OAuth.percentEncode(r);
            }
            err.oauth_acceptable_signature_methods = acceptable;
            throw err;
        },

        /** A map from signature method name to constructor. */
        REGISTERED: {},

        /** Subsequently, the given constructor will be used for the named methods.
            The constructor will be called with no parameters.
            The resulting object should usually implement getSignature(baseString).
            You can easily define such a constructor by calling makeSubclass, below.
        */
        registerMethodClass: function registerMethodClass(names, classConstructor) {
            var i, len;
            for (i = 0, len = names.length; i < len; ++i) {
                OAuth.SignatureMethod.REGISTERED[names[i]] = classConstructor;
            }
        },

        /** Create a subclass of OAuth.SignatureMethod, with the given getSignature function. */
        makeSubclass: function makeSubclass(getSignatureFunction) {
            var SuperClass = OAuth.SignatureMethod;
            var subClass = function() {
                SuperClass.call(this);
            };
            subClass.prototype = new SuperClass();
            // Delete instance variables from prototype:
            // delete subclass.prototype... There aren't any.
            subClass.prototype.getSignature = getSignatureFunction;
            subClass.prototype.constructor = subClass;
            return subClass;
        },

        getBaseString: function getBaseString(message) {
            var URL = message.action;
            var q = URL.indexOf('?');
            var parameters, toAdd, i, len;
            if (q < 0) {
                parameters = message.parameters;
            } else {
                // Combine the URL query string with the other parameters:
                parameters = OAuth.decodeForm(URL.substring(q + 1));
                toAdd = OAuth.getParameterList(message.parameters);
                for (i = 0, len = toAdd.length; i < len; ++i) {
                    parameters.push(toAdd[i]);
                }
            }
            return OAuth.percentEncode(message.method.toUpperCase()) +
                '&' + OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(URL)) +
                '&' + OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(parameters));
        },

        normalizeUrl: function normalizeUrl(url) {
            var path, index;
            var uri = OAuth.SignatureMethod.parseUri(url);
            var scheme = uri.protocol.toLowerCase();
            var authority = uri.authority.toLowerCase();
            var dropPort = (scheme === 'http' && uri.port === 80) || (scheme === 'https' && uri.port === 443);
            if (dropPort) {
                // find the last : in the authority
                index = authority.lastIndexOf(':');
                if (index >= 0) {
                    authority = authority.substring(0, index);
                }
            }
            path = uri.path;
            if (!path) {
                path = '/'; // conforms to RFC 2616 section 3.2.2
            }
            // we know that there is no query and no fragment here.
            return scheme + '://' + authority + path;
        },

        parseUri: function parseUri(str) {
            /* This function was adapted from parseUri 1.2.1
                http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
             */
            var o = {key: ['source', 'protocol', 'authority', 'userInfo', 'user',
                'password', 'host', 'port', 'relative', 'path', 'directory', 'file',
                'query', 'anchor'],

                parser: {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/}
            };
            var m = o.parser.strict.exec(str);
            var uri = {};
            var i = 14;
            while (i--) {
                uri[o.key[i]] = m[i] || '';
            }
            return uri;
        },

        normalizeParameters: function normalizeParameters(parameters) {
            var i, len, nvp;
            var sortables, sortable, sorted;
            if (parameters === null || typeof parameters === 'undefined') {
                return '';
            }
            var list = OAuth.getParameterList(parameters);
            sortables = [];

            for (i = 0, len = list.length; i < len; ++i) {
                nvp = list[i];
                if (nvp[0] !== 'oauth_signature') {
                    sortable = OAuth.percentEncode(nvp[0]);
                    sortable += ' '; // because it comes before any character that can appear in a percentEncoded string.
                    sortable += OAuth.percentEncode(nvp[1]);
                    sortables.push([sortable, nvp]);
                }
            }
            sortables.sort(function(a, b) {
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0;
            });
            sorted = [];
            for (i = 0, len = sortables.length; i < len; ++i) {
                sorted.push(sortables[i][1]);
            }
            return OAuth.formEncode(sorted);
        }
    });

    OAuth.SignatureMethod.registerMethodClass(['PLAINTEXT', 'PLAINTEXT-Accessor'],
        OAuth.SignatureMethod.makeSubclass(
            function getSignature(baseString) {
                return this.key;
            }
        )
    );

    OAuth.SignatureMethod.registerMethodClass(['HMAC-SHA1', 'HMAC-SHA1-Accessor'],
        OAuth.SignatureMethod.makeSubclass(
            function getSignature(baseString) {
                return sha1.b64_hmac_sha1(this.key, baseString);
            }
        )
    );

// ------------------------------------------------------------------
console.log('time service');
console.log(TIME_SERVICE);
request(TIME_SERVICE, function(error, response, body) {
  var params = {deviceType: DEVICE_TYPE, instanceId: INSTANCE_ID},
    signedURL;

  // Get Time
  body = JSON.parse(body.toString());
  console.log('\nTime = ' + body.Content);

  // Get signed URL for Login User and its params
  signedURL = OAuth.generateOAuthSignedURL('GET', LOGIN_SERVICE,
    params, CONSUMER_KEY, CONSUMER_SECRET);
  console.log('\nSignedUrl = ' + signedURL);
  //signedURL = signedURL.replace(LOGIN_SERVICE + '?', '');
  params = OAuth.getParameterMap(OAuth.decodeForm(signedURL));

  // Add params that are not included yet
  params.deviceType = DEVICE_TYPE;
  params.instanceId = INSTANCE_ID;
  console.log('\nParams = ' + JSON.stringify(params) + '\n');
  console.log('login service');
  console.log(LOGIN_SERVICE);

  // Make the request
  request(signedURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
});

