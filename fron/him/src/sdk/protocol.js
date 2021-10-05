/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.LoginReq = (function() {

    /**
     * Properties of a LoginReq.
     * @exports ILoginReq
     * @interface ILoginReq
     * @property {string|null} [token] LoginReq token
     */

    /**
     * Constructs a new LoginReq.
     * @exports LoginReq
     * @classdesc Represents a LoginReq.
     * @implements ILoginReq
     * @constructor
     * @param {ILoginReq=} [properties] Properties to set
     */
    function LoginReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LoginReq token.
     * @member {string} token
     * @memberof LoginReq
     * @instance
     */
    LoginReq.prototype.token = "";

    /**
     * Creates a new LoginReq instance using the specified properties.
     * @function create
     * @memberof LoginReq
     * @static
     * @param {ILoginReq=} [properties] Properties to set
     * @returns {LoginReq} LoginReq instance
     */
    LoginReq.create = function create(properties) {
        return new LoginReq(properties);
    };

    /**
     * Encodes the specified LoginReq message. Does not implicitly {@link LoginReq.verify|verify} messages.
     * @function encode
     * @memberof LoginReq
     * @static
     * @param {ILoginReq} message LoginReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
        return writer;
    };

    /**
     * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link LoginReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LoginReq
     * @static
     * @param {ILoginReq} message LoginReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LoginReq message from the specified reader or buffer.
     * @function decode
     * @memberof LoginReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LoginReq} LoginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LoginReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.token = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a LoginReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LoginReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LoginReq} LoginReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LoginReq message.
     * @function verify
     * @memberof LoginReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LoginReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        return null;
    };

    /**
     * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LoginReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LoginReq} LoginReq
     */
    LoginReq.fromObject = function fromObject(object) {
        if (object instanceof $root.LoginReq)
            return object;
        var message = new $root.LoginReq();
        if (object.token != null)
            message.token = String(object.token);
        return message;
    };

    /**
     * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LoginReq
     * @static
     * @param {LoginReq} message LoginReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LoginReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.token = "";
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        return object;
    };

    /**
     * Converts this LoginReq to JSON.
     * @function toJSON
     * @memberof LoginReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LoginReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LoginReq;
})();

$root.LoginResp = (function() {

    /**
     * Properties of a LoginResp.
     * @exports ILoginResp
     * @interface ILoginResp
     * @property {string|null} [channelId] LoginResp channelId
     * @property {Long|null} [userId] LoginResp userId
     */

    /**
     * Constructs a new LoginResp.
     * @exports LoginResp
     * @classdesc Represents a LoginResp.
     * @implements ILoginResp
     * @constructor
     * @param {ILoginResp=} [properties] Properties to set
     */
    function LoginResp(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LoginResp channelId.
     * @member {string} channelId
     * @memberof LoginResp
     * @instance
     */
    LoginResp.prototype.channelId = "";

    /**
     * LoginResp userId.
     * @member {Long} userId
     * @memberof LoginResp
     * @instance
     */
    LoginResp.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new LoginResp instance using the specified properties.
     * @function create
     * @memberof LoginResp
     * @static
     * @param {ILoginResp=} [properties] Properties to set
     * @returns {LoginResp} LoginResp instance
     */
    LoginResp.create = function create(properties) {
        return new LoginResp(properties);
    };

    /**
     * Encodes the specified LoginResp message. Does not implicitly {@link LoginResp.verify|verify} messages.
     * @function encode
     * @memberof LoginResp
     * @static
     * @param {ILoginResp} message LoginResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.channelId);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.userId);
        return writer;
    };

    /**
     * Encodes the specified LoginResp message, length delimited. Does not implicitly {@link LoginResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LoginResp
     * @static
     * @param {ILoginResp} message LoginResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LoginResp message from the specified reader or buffer.
     * @function decode
     * @memberof LoginResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LoginResp} LoginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LoginResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.string();
                break;
            case 2:
                message.userId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a LoginResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LoginResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LoginResp} LoginResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LoginResp message.
     * @function verify
     * @memberof LoginResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LoginResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!$util.isString(message.channelId))
                return "channelId: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                return "userId: integer|Long expected";
        return null;
    };

    /**
     * Creates a LoginResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LoginResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LoginResp} LoginResp
     */
    LoginResp.fromObject = function fromObject(object) {
        if (object instanceof $root.LoginResp)
            return object;
        var message = new $root.LoginResp();
        if (object.channelId != null)
            message.channelId = String(object.channelId);
        if (object.userId != null)
            if ($util.Long)
                (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
            else if (typeof object.userId === "string")
                message.userId = parseInt(object.userId, 10);
            else if (typeof object.userId === "number")
                message.userId = object.userId;
            else if (typeof object.userId === "object")
                message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a LoginResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LoginResp
     * @static
     * @param {LoginResp} message LoginResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LoginResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.channelId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.userId = options.longs === String ? "0" : 0;
        }
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = message.channelId;
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (typeof message.userId === "number")
                object.userId = options.longs === String ? String(message.userId) : message.userId;
            else
                object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
        return object;
    };

    /**
     * Converts this LoginResp to JSON.
     * @function toJSON
     * @memberof LoginResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LoginResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LoginResp;
})();

$root.KickoutNotify = (function() {

    /**
     * Properties of a KickoutNotify.
     * @exports IKickoutNotify
     * @interface IKickoutNotify
     * @property {string|null} [channelId] KickoutNotify channelId
     */

    /**
     * Constructs a new KickoutNotify.
     * @exports KickoutNotify
     * @classdesc Represents a KickoutNotify.
     * @implements IKickoutNotify
     * @constructor
     * @param {IKickoutNotify=} [properties] Properties to set
     */
    function KickoutNotify(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * KickoutNotify channelId.
     * @member {string} channelId
     * @memberof KickoutNotify
     * @instance
     */
    KickoutNotify.prototype.channelId = "";

    /**
     * Creates a new KickoutNotify instance using the specified properties.
     * @function create
     * @memberof KickoutNotify
     * @static
     * @param {IKickoutNotify=} [properties] Properties to set
     * @returns {KickoutNotify} KickoutNotify instance
     */
    KickoutNotify.create = function create(properties) {
        return new KickoutNotify(properties);
    };

    /**
     * Encodes the specified KickoutNotify message. Does not implicitly {@link KickoutNotify.verify|verify} messages.
     * @function encode
     * @memberof KickoutNotify
     * @static
     * @param {IKickoutNotify} message KickoutNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KickoutNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.channelId);
        return writer;
    };

    /**
     * Encodes the specified KickoutNotify message, length delimited. Does not implicitly {@link KickoutNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof KickoutNotify
     * @static
     * @param {IKickoutNotify} message KickoutNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KickoutNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a KickoutNotify message from the specified reader or buffer.
     * @function decode
     * @memberof KickoutNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {KickoutNotify} KickoutNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KickoutNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KickoutNotify();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a KickoutNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof KickoutNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {KickoutNotify} KickoutNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KickoutNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a KickoutNotify message.
     * @function verify
     * @memberof KickoutNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    KickoutNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!$util.isString(message.channelId))
                return "channelId: string expected";
        return null;
    };

    /**
     * Creates a KickoutNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof KickoutNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {KickoutNotify} KickoutNotify
     */
    KickoutNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.KickoutNotify)
            return object;
        var message = new $root.KickoutNotify();
        if (object.channelId != null)
            message.channelId = String(object.channelId);
        return message;
    };

    /**
     * Creates a plain object from a KickoutNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof KickoutNotify
     * @static
     * @param {KickoutNotify} message KickoutNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    KickoutNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.channelId = "";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = message.channelId;
        return object;
    };

    /**
     * Converts this KickoutNotify to JSON.
     * @function toJSON
     * @memberof KickoutNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    KickoutNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return KickoutNotify;
})();

$root.Session = (function() {

    /**
     * Properties of a Session.
     * @exports ISession
     * @interface ISession
     * @property {string|null} [channelId] Session channelId
     * @property {Long|null} [userId] Session userId
     * @property {string|null} [terminal] Session terminal
     */

    /**
     * Constructs a new Session.
     * @exports Session
     * @classdesc Represents a Session.
     * @implements ISession
     * @constructor
     * @param {ISession=} [properties] Properties to set
     */
    function Session(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Session channelId.
     * @member {string} channelId
     * @memberof Session
     * @instance
     */
    Session.prototype.channelId = "";

    /**
     * Session userId.
     * @member {Long} userId
     * @memberof Session
     * @instance
     */
    Session.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Session terminal.
     * @member {string} terminal
     * @memberof Session
     * @instance
     */
    Session.prototype.terminal = "";

    /**
     * Creates a new Session instance using the specified properties.
     * @function create
     * @memberof Session
     * @static
     * @param {ISession=} [properties] Properties to set
     * @returns {Session} Session instance
     */
    Session.create = function create(properties) {
        return new Session(properties);
    };

    /**
     * Encodes the specified Session message. Does not implicitly {@link Session.verify|verify} messages.
     * @function encode
     * @memberof Session
     * @static
     * @param {ISession} message Session message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Session.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.channelId);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.userId);
        if (message.terminal != null && Object.hasOwnProperty.call(message, "terminal"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.terminal);
        return writer;
    };

    /**
     * Encodes the specified Session message, length delimited. Does not implicitly {@link Session.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Session
     * @static
     * @param {ISession} message Session message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Session.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Session message from the specified reader or buffer.
     * @function decode
     * @memberof Session
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Session} Session
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Session.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Session();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.string();
                break;
            case 2:
                message.userId = reader.int64();
                break;
            case 3:
                message.terminal = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Session message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Session
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Session} Session
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Session.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Session message.
     * @function verify
     * @memberof Session
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Session.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!$util.isString(message.channelId))
                return "channelId: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                return "userId: integer|Long expected";
        if (message.terminal != null && message.hasOwnProperty("terminal"))
            if (!$util.isString(message.terminal))
                return "terminal: string expected";
        return null;
    };

    /**
     * Creates a Session message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Session
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Session} Session
     */
    Session.fromObject = function fromObject(object) {
        if (object instanceof $root.Session)
            return object;
        var message = new $root.Session();
        if (object.channelId != null)
            message.channelId = String(object.channelId);
        if (object.userId != null)
            if ($util.Long)
                (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
            else if (typeof object.userId === "string")
                message.userId = parseInt(object.userId, 10);
            else if (typeof object.userId === "number")
                message.userId = object.userId;
            else if (typeof object.userId === "object")
                message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
        if (object.terminal != null)
            message.terminal = String(object.terminal);
        return message;
    };

    /**
     * Creates a plain object from a Session message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Session
     * @static
     * @param {Session} message Session
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Session.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.channelId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.userId = options.longs === String ? "0" : 0;
            object.terminal = "";
        }
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = message.channelId;
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (typeof message.userId === "number")
                object.userId = options.longs === String ? String(message.userId) : message.userId;
            else
                object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
        if (message.terminal != null && message.hasOwnProperty("terminal"))
            object.terminal = message.terminal;
        return object;
    };

    /**
     * Converts this Session to JSON.
     * @function toJSON
     * @memberof Session
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Session.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Session;
})();

$root.Location = (function() {

    /**
     * Properties of a Location.
     * @exports ILocation
     * @interface ILocation
     * @property {string|null} [channelId] Location channelId
     */

    /**
     * Constructs a new Location.
     * @exports Location
     * @classdesc Represents a Location.
     * @implements ILocation
     * @constructor
     * @param {ILocation=} [properties] Properties to set
     */
    function Location(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Location channelId.
     * @member {string} channelId
     * @memberof Location
     * @instance
     */
    Location.prototype.channelId = "";

    /**
     * Creates a new Location instance using the specified properties.
     * @function create
     * @memberof Location
     * @static
     * @param {ILocation=} [properties] Properties to set
     * @returns {Location} Location instance
     */
    Location.create = function create(properties) {
        return new Location(properties);
    };

    /**
     * Encodes the specified Location message. Does not implicitly {@link Location.verify|verify} messages.
     * @function encode
     * @memberof Location
     * @static
     * @param {ILocation} message Location message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Location.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.channelId);
        return writer;
    };

    /**
     * Encodes the specified Location message, length delimited. Does not implicitly {@link Location.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Location
     * @static
     * @param {ILocation} message Location message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Location.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Location message from the specified reader or buffer.
     * @function decode
     * @memberof Location
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Location} Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Location.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Location();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.channelId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Location message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Location
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Location} Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Location.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Location message.
     * @function verify
     * @memberof Location
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Location.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            if (!$util.isString(message.channelId))
                return "channelId: string expected";
        return null;
    };

    /**
     * Creates a Location message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Location
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Location} Location
     */
    Location.fromObject = function fromObject(object) {
        if (object instanceof $root.Location)
            return object;
        var message = new $root.Location();
        if (object.channelId != null)
            message.channelId = String(object.channelId);
        return message;
    };

    /**
     * Creates a plain object from a Location message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Location
     * @static
     * @param {Location} message Location
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Location.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.channelId = "";
        if (message.channelId != null && message.hasOwnProperty("channelId"))
            object.channelId = message.channelId;
        return object;
    };

    /**
     * Converts this Location to JSON.
     * @function toJSON
     * @memberof Location
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Location.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Location;
})();

$root.MessageReq = (function() {

    /**
     * Properties of a MessageReq.
     * @exports IMessageReq
     * @interface IMessageReq
     * @property {number|null} [type] MessageReq type
     * @property {string|null} [body] MessageReq body
     * @property {Long|null} [dest] MessageReq dest
     * @property {string|null} [extra] MessageReq extra
     */

    /**
     * Constructs a new MessageReq.
     * @exports MessageReq
     * @classdesc Represents a MessageReq.
     * @implements IMessageReq
     * @constructor
     * @param {IMessageReq=} [properties] Properties to set
     */
    function MessageReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageReq type.
     * @member {number} type
     * @memberof MessageReq
     * @instance
     */
    MessageReq.prototype.type = 0;

    /**
     * MessageReq body.
     * @member {string} body
     * @memberof MessageReq
     * @instance
     */
    MessageReq.prototype.body = "";

    /**
     * MessageReq dest.
     * @member {Long} dest
     * @memberof MessageReq
     * @instance
     */
    MessageReq.prototype.dest = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageReq extra.
     * @member {string} extra
     * @memberof MessageReq
     * @instance
     */
    MessageReq.prototype.extra = "";

    /**
     * Creates a new MessageReq instance using the specified properties.
     * @function create
     * @memberof MessageReq
     * @static
     * @param {IMessageReq=} [properties] Properties to set
     * @returns {MessageReq} MessageReq instance
     */
    MessageReq.create = function create(properties) {
        return new MessageReq(properties);
    };

    /**
     * Encodes the specified MessageReq message. Does not implicitly {@link MessageReq.verify|verify} messages.
     * @function encode
     * @memberof MessageReq
     * @static
     * @param {IMessageReq} message MessageReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.body);
        if (message.dest != null && Object.hasOwnProperty.call(message, "dest"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.dest);
        if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.extra);
        return writer;
    };

    /**
     * Encodes the specified MessageReq message, length delimited. Does not implicitly {@link MessageReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageReq
     * @static
     * @param {IMessageReq} message MessageReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageReq message from the specified reader or buffer.
     * @function decode
     * @memberof MessageReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageReq} MessageReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.body = reader.string();
                break;
            case 3:
                message.dest = reader.int64();
                break;
            case 4:
                message.extra = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageReq} MessageReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageReq message.
     * @function verify
     * @memberof MessageReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.body != null && message.hasOwnProperty("body"))
            if (!$util.isString(message.body))
                return "body: string expected";
        if (message.dest != null && message.hasOwnProperty("dest"))
            if (!$util.isInteger(message.dest) && !(message.dest && $util.isInteger(message.dest.low) && $util.isInteger(message.dest.high)))
                return "dest: integer|Long expected";
        if (message.extra != null && message.hasOwnProperty("extra"))
            if (!$util.isString(message.extra))
                return "extra: string expected";
        return null;
    };

    /**
     * Creates a MessageReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageReq} MessageReq
     */
    MessageReq.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageReq)
            return object;
        var message = new $root.MessageReq();
        if (object.type != null)
            message.type = object.type | 0;
        if (object.body != null)
            message.body = String(object.body);
        if (object.dest != null)
            if ($util.Long)
                (message.dest = $util.Long.fromValue(object.dest)).unsigned = false;
            else if (typeof object.dest === "string")
                message.dest = parseInt(object.dest, 10);
            else if (typeof object.dest === "number")
                message.dest = object.dest;
            else if (typeof object.dest === "object")
                message.dest = new $util.LongBits(object.dest.low >>> 0, object.dest.high >>> 0).toNumber();
        if (object.extra != null)
            message.extra = String(object.extra);
        return message;
    };

    /**
     * Creates a plain object from a MessageReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageReq
     * @static
     * @param {MessageReq} message MessageReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.body = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.dest = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.dest = options.longs === String ? "0" : 0;
            object.extra = "";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        if (message.dest != null && message.hasOwnProperty("dest"))
            if (typeof message.dest === "number")
                object.dest = options.longs === String ? String(message.dest) : message.dest;
            else
                object.dest = options.longs === String ? $util.Long.prototype.toString.call(message.dest) : options.longs === Number ? new $util.LongBits(message.dest.low >>> 0, message.dest.high >>> 0).toNumber() : message.dest;
        if (message.extra != null && message.hasOwnProperty("extra"))
            object.extra = message.extra;
        return object;
    };

    /**
     * Converts this MessageReq to JSON.
     * @function toJSON
     * @memberof MessageReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageReq;
})();

$root.MessageResp = (function() {

    /**
     * Properties of a MessageResp.
     * @exports IMessageResp
     * @interface IMessageResp
     * @property {Long|null} [messageId] MessageResp messageId
     * @property {Long|null} [sendTime] MessageResp sendTime
     */

    /**
     * Constructs a new MessageResp.
     * @exports MessageResp
     * @classdesc Represents a MessageResp.
     * @implements IMessageResp
     * @constructor
     * @param {IMessageResp=} [properties] Properties to set
     */
    function MessageResp(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageResp messageId.
     * @member {Long} messageId
     * @memberof MessageResp
     * @instance
     */
    MessageResp.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageResp sendTime.
     * @member {Long} sendTime
     * @memberof MessageResp
     * @instance
     */
    MessageResp.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MessageResp instance using the specified properties.
     * @function create
     * @memberof MessageResp
     * @static
     * @param {IMessageResp=} [properties] Properties to set
     * @returns {MessageResp} MessageResp instance
     */
    MessageResp.create = function create(properties) {
        return new MessageResp(properties);
    };

    /**
     * Encodes the specified MessageResp message. Does not implicitly {@link MessageResp.verify|verify} messages.
     * @function encode
     * @memberof MessageResp
     * @static
     * @param {IMessageResp} message MessageResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.sendTime);
        return writer;
    };

    /**
     * Encodes the specified MessageResp message, length delimited. Does not implicitly {@link MessageResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageResp
     * @static
     * @param {IMessageResp} message MessageResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageResp message from the specified reader or buffer.
     * @function decode
     * @memberof MessageResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageResp} MessageResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            case 2:
                message.sendTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageResp} MessageResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageResp message.
     * @function verify
     * @memberof MessageResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                return "sendTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a MessageResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageResp} MessageResp
     */
    MessageResp.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageResp)
            return object;
        var message = new $root.MessageResp();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        if (object.sendTime != null)
            if ($util.Long)
                (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
            else if (typeof object.sendTime === "string")
                message.sendTime = parseInt(object.sendTime, 10);
            else if (typeof object.sendTime === "number")
                message.sendTime = object.sendTime;
            else if (typeof object.sendTime === "object")
                message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MessageResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageResp
     * @static
     * @param {MessageResp} message MessageResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sendTime = options.longs === String ? "0" : 0;
        }
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (typeof message.sendTime === "number")
                object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
            else
                object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
        return object;
    };

    /**
     * Converts this MessageResp to JSON.
     * @function toJSON
     * @memberof MessageResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageResp;
})();

$root.MessagePush = (function() {

    /**
     * Properties of a MessagePush.
     * @exports IMessagePush
     * @interface IMessagePush
     * @property {Long|null} [messageId] MessagePush messageId
     * @property {number|null} [type] MessagePush type
     * @property {string|null} [body] MessagePush body
     * @property {string|null} [extra] MessagePush extra
     * @property {Long|null} [sender] MessagePush sender
     * @property {Long|null} [sendTime] MessagePush sendTime
     */

    /**
     * Constructs a new MessagePush.
     * @exports MessagePush
     * @classdesc Represents a MessagePush.
     * @implements IMessagePush
     * @constructor
     * @param {IMessagePush=} [properties] Properties to set
     */
    function MessagePush(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessagePush messageId.
     * @member {Long} messageId
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessagePush type.
     * @member {number} type
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.type = 0;

    /**
     * MessagePush body.
     * @member {string} body
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.body = "";

    /**
     * MessagePush extra.
     * @member {string} extra
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.extra = "";

    /**
     * MessagePush sender.
     * @member {Long} sender
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.sender = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessagePush sendTime.
     * @member {Long} sendTime
     * @memberof MessagePush
     * @instance
     */
    MessagePush.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MessagePush instance using the specified properties.
     * @function create
     * @memberof MessagePush
     * @static
     * @param {IMessagePush=} [properties] Properties to set
     * @returns {MessagePush} MessagePush instance
     */
    MessagePush.create = function create(properties) {
        return new MessagePush(properties);
    };

    /**
     * Encodes the specified MessagePush message. Does not implicitly {@link MessagePush.verify|verify} messages.
     * @function encode
     * @memberof MessagePush
     * @static
     * @param {IMessagePush} message MessagePush message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessagePush.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.body);
        if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.extra);
        if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.sender);
        if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.sendTime);
        return writer;
    };

    /**
     * Encodes the specified MessagePush message, length delimited. Does not implicitly {@link MessagePush.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessagePush
     * @static
     * @param {IMessagePush} message MessagePush message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessagePush.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessagePush message from the specified reader or buffer.
     * @function decode
     * @memberof MessagePush
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessagePush} MessagePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessagePush.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessagePush();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            case 2:
                message.type = reader.int32();
                break;
            case 3:
                message.body = reader.string();
                break;
            case 4:
                message.extra = reader.string();
                break;
            case 5:
                message.sender = reader.int64();
                break;
            case 6:
                message.sendTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessagePush message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessagePush
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessagePush} MessagePush
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessagePush.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessagePush message.
     * @function verify
     * @memberof MessagePush
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessagePush.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.body != null && message.hasOwnProperty("body"))
            if (!$util.isString(message.body))
                return "body: string expected";
        if (message.extra != null && message.hasOwnProperty("extra"))
            if (!$util.isString(message.extra))
                return "extra: string expected";
        if (message.sender != null && message.hasOwnProperty("sender"))
            if (!$util.isInteger(message.sender) && !(message.sender && $util.isInteger(message.sender.low) && $util.isInteger(message.sender.high)))
                return "sender: integer|Long expected";
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                return "sendTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a MessagePush message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessagePush
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessagePush} MessagePush
     */
    MessagePush.fromObject = function fromObject(object) {
        if (object instanceof $root.MessagePush)
            return object;
        var message = new $root.MessagePush();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        if (object.type != null)
            message.type = object.type | 0;
        if (object.body != null)
            message.body = String(object.body);
        if (object.extra != null)
            message.extra = String(object.extra);
        if (object.sender != null)
            if ($util.Long)
                (message.sender = $util.Long.fromValue(object.sender)).unsigned = false;
            else if (typeof object.sender === "string")
                message.sender = parseInt(object.sender, 10);
            else if (typeof object.sender === "number")
                message.sender = object.sender;
            else if (typeof object.sender === "object")
                message.sender = new $util.LongBits(object.sender.low >>> 0, object.sender.high >>> 0).toNumber();
        if (object.sendTime != null)
            if ($util.Long)
                (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
            else if (typeof object.sendTime === "string")
                message.sendTime = parseInt(object.sendTime, 10);
            else if (typeof object.sendTime === "number")
                message.sendTime = object.sendTime;
            else if (typeof object.sendTime === "object")
                message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MessagePush message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessagePush
     * @static
     * @param {MessagePush} message MessagePush
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessagePush.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
            object.type = 0;
            object.body = "";
            object.extra = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sender = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sender = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sendTime = options.longs === String ? "0" : 0;
        }
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        if (message.extra != null && message.hasOwnProperty("extra"))
            object.extra = message.extra;
        if (message.sender != null && message.hasOwnProperty("sender"))
            if (typeof message.sender === "number")
                object.sender = options.longs === String ? String(message.sender) : message.sender;
            else
                object.sender = options.longs === String ? $util.Long.prototype.toString.call(message.sender) : options.longs === Number ? new $util.LongBits(message.sender.low >>> 0, message.sender.high >>> 0).toNumber() : message.sender;
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (typeof message.sendTime === "number")
                object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
            else
                object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
        return object;
    };

    /**
     * Converts this MessagePush to JSON.
     * @function toJSON
     * @memberof MessagePush
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessagePush.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessagePush;
})();

$root.ErrorResp = (function() {

    /**
     * Properties of an ErrorResp.
     * @exports IErrorResp
     * @interface IErrorResp
     * @property {string|null} [message] ErrorResp message
     */

    /**
     * Constructs a new ErrorResp.
     * @exports ErrorResp
     * @classdesc Represents an ErrorResp.
     * @implements IErrorResp
     * @constructor
     * @param {IErrorResp=} [properties] Properties to set
     */
    function ErrorResp(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ErrorResp message.
     * @member {string} message
     * @memberof ErrorResp
     * @instance
     */
    ErrorResp.prototype.message = "";

    /**
     * Creates a new ErrorResp instance using the specified properties.
     * @function create
     * @memberof ErrorResp
     * @static
     * @param {IErrorResp=} [properties] Properties to set
     * @returns {ErrorResp} ErrorResp instance
     */
    ErrorResp.create = function create(properties) {
        return new ErrorResp(properties);
    };

    /**
     * Encodes the specified ErrorResp message. Does not implicitly {@link ErrorResp.verify|verify} messages.
     * @function encode
     * @memberof ErrorResp
     * @static
     * @param {IErrorResp} message ErrorResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ErrorResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified ErrorResp message, length delimited. Does not implicitly {@link ErrorResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ErrorResp
     * @static
     * @param {IErrorResp} message ErrorResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ErrorResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ErrorResp message from the specified reader or buffer.
     * @function decode
     * @memberof ErrorResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ErrorResp} ErrorResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ErrorResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ErrorResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ErrorResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ErrorResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ErrorResp} ErrorResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ErrorResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ErrorResp message.
     * @function verify
     * @memberof ErrorResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ErrorResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates an ErrorResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ErrorResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ErrorResp} ErrorResp
     */
    ErrorResp.fromObject = function fromObject(object) {
        if (object instanceof $root.ErrorResp)
            return object;
        var message = new $root.ErrorResp();
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from an ErrorResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ErrorResp
     * @static
     * @param {ErrorResp} message ErrorResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ErrorResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.message = "";
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this ErrorResp to JSON.
     * @function toJSON
     * @memberof ErrorResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ErrorResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ErrorResp;
})();

$root.MessageAckReq = (function() {

    /**
     * Properties of a MessageAckReq.
     * @exports IMessageAckReq
     * @interface IMessageAckReq
     * @property {Long|null} [messageId] MessageAckReq messageId
     */

    /**
     * Constructs a new MessageAckReq.
     * @exports MessageAckReq
     * @classdesc Represents a MessageAckReq.
     * @implements IMessageAckReq
     * @constructor
     * @param {IMessageAckReq=} [properties] Properties to set
     */
    function MessageAckReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageAckReq messageId.
     * @member {Long} messageId
     * @memberof MessageAckReq
     * @instance
     */
    MessageAckReq.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MessageAckReq instance using the specified properties.
     * @function create
     * @memberof MessageAckReq
     * @static
     * @param {IMessageAckReq=} [properties] Properties to set
     * @returns {MessageAckReq} MessageAckReq instance
     */
    MessageAckReq.create = function create(properties) {
        return new MessageAckReq(properties);
    };

    /**
     * Encodes the specified MessageAckReq message. Does not implicitly {@link MessageAckReq.verify|verify} messages.
     * @function encode
     * @memberof MessageAckReq
     * @static
     * @param {IMessageAckReq} message MessageAckReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageAckReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        return writer;
    };

    /**
     * Encodes the specified MessageAckReq message, length delimited. Does not implicitly {@link MessageAckReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageAckReq
     * @static
     * @param {IMessageAckReq} message MessageAckReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageAckReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageAckReq message from the specified reader or buffer.
     * @function decode
     * @memberof MessageAckReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageAckReq} MessageAckReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageAckReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageAckReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageAckReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageAckReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageAckReq} MessageAckReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageAckReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageAckReq message.
     * @function verify
     * @memberof MessageAckReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageAckReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        return null;
    };

    /**
     * Creates a MessageAckReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageAckReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageAckReq} MessageAckReq
     */
    MessageAckReq.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageAckReq)
            return object;
        var message = new $root.MessageAckReq();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MessageAckReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageAckReq
     * @static
     * @param {MessageAckReq} message MessageAckReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageAckReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        return object;
    };

    /**
     * Converts this MessageAckReq to JSON.
     * @function toJSON
     * @memberof MessageAckReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageAckReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageAckReq;
})();

$root.GroupCreateReq = (function() {

    /**
     * Properties of a GroupCreateReq.
     * @exports IGroupCreateReq
     * @interface IGroupCreateReq
     * @property {string|null} [name] GroupCreateReq name
     * @property {string|null} [avatar] GroupCreateReq avatar
     * @property {string|null} [introduction] GroupCreateReq introduction
     * @property {string|null} [owner] GroupCreateReq owner
     * @property {Array.<string>|null} [members] GroupCreateReq members
     */

    /**
     * Constructs a new GroupCreateReq.
     * @exports GroupCreateReq
     * @classdesc Represents a GroupCreateReq.
     * @implements IGroupCreateReq
     * @constructor
     * @param {IGroupCreateReq=} [properties] Properties to set
     */
    function GroupCreateReq(properties) {
        this.members = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupCreateReq name.
     * @member {string} name
     * @memberof GroupCreateReq
     * @instance
     */
    GroupCreateReq.prototype.name = "";

    /**
     * GroupCreateReq avatar.
     * @member {string} avatar
     * @memberof GroupCreateReq
     * @instance
     */
    GroupCreateReq.prototype.avatar = "";

    /**
     * GroupCreateReq introduction.
     * @member {string} introduction
     * @memberof GroupCreateReq
     * @instance
     */
    GroupCreateReq.prototype.introduction = "";

    /**
     * GroupCreateReq owner.
     * @member {string} owner
     * @memberof GroupCreateReq
     * @instance
     */
    GroupCreateReq.prototype.owner = "";

    /**
     * GroupCreateReq members.
     * @member {Array.<string>} members
     * @memberof GroupCreateReq
     * @instance
     */
    GroupCreateReq.prototype.members = $util.emptyArray;

    /**
     * Creates a new GroupCreateReq instance using the specified properties.
     * @function create
     * @memberof GroupCreateReq
     * @static
     * @param {IGroupCreateReq=} [properties] Properties to set
     * @returns {GroupCreateReq} GroupCreateReq instance
     */
    GroupCreateReq.create = function create(properties) {
        return new GroupCreateReq(properties);
    };

    /**
     * Encodes the specified GroupCreateReq message. Does not implicitly {@link GroupCreateReq.verify|verify} messages.
     * @function encode
     * @memberof GroupCreateReq
     * @static
     * @param {IGroupCreateReq} message GroupCreateReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.avatar);
        if (message.introduction != null && Object.hasOwnProperty.call(message, "introduction"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.introduction);
        if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.owner);
        if (message.members != null && message.members.length)
            for (var i = 0; i < message.members.length; ++i)
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.members[i]);
        return writer;
    };

    /**
     * Encodes the specified GroupCreateReq message, length delimited. Does not implicitly {@link GroupCreateReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupCreateReq
     * @static
     * @param {IGroupCreateReq} message GroupCreateReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupCreateReq message from the specified reader or buffer.
     * @function decode
     * @memberof GroupCreateReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupCreateReq} GroupCreateReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupCreateReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.avatar = reader.string();
                break;
            case 3:
                message.introduction = reader.string();
                break;
            case 4:
                message.owner = reader.string();
                break;
            case 5:
                if (!(message.members && message.members.length))
                    message.members = [];
                message.members.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupCreateReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupCreateReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupCreateReq} GroupCreateReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupCreateReq message.
     * @function verify
     * @memberof GroupCreateReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupCreateReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.introduction != null && message.hasOwnProperty("introduction"))
            if (!$util.isString(message.introduction))
                return "introduction: string expected";
        if (message.owner != null && message.hasOwnProperty("owner"))
            if (!$util.isString(message.owner))
                return "owner: string expected";
        if (message.members != null && message.hasOwnProperty("members")) {
            if (!Array.isArray(message.members))
                return "members: array expected";
            for (var i = 0; i < message.members.length; ++i)
                if (!$util.isString(message.members[i]))
                    return "members: string[] expected";
        }
        return null;
    };

    /**
     * Creates a GroupCreateReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupCreateReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupCreateReq} GroupCreateReq
     */
    GroupCreateReq.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupCreateReq)
            return object;
        var message = new $root.GroupCreateReq();
        if (object.name != null)
            message.name = String(object.name);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.introduction != null)
            message.introduction = String(object.introduction);
        if (object.owner != null)
            message.owner = String(object.owner);
        if (object.members) {
            if (!Array.isArray(object.members))
                throw TypeError(".GroupCreateReq.members: array expected");
            message.members = [];
            for (var i = 0; i < object.members.length; ++i)
                message.members[i] = String(object.members[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a GroupCreateReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupCreateReq
     * @static
     * @param {GroupCreateReq} message GroupCreateReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupCreateReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.members = [];
        if (options.defaults) {
            object.name = "";
            object.avatar = "";
            object.introduction = "";
            object.owner = "";
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.introduction != null && message.hasOwnProperty("introduction"))
            object.introduction = message.introduction;
        if (message.owner != null && message.hasOwnProperty("owner"))
            object.owner = message.owner;
        if (message.members && message.members.length) {
            object.members = [];
            for (var j = 0; j < message.members.length; ++j)
                object.members[j] = message.members[j];
        }
        return object;
    };

    /**
     * Converts this GroupCreateReq to JSON.
     * @function toJSON
     * @memberof GroupCreateReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupCreateReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupCreateReq;
})();

$root.GroupCreateResp = (function() {

    /**
     * Properties of a GroupCreateResp.
     * @exports IGroupCreateResp
     * @interface IGroupCreateResp
     * @property {string|null} [groupId] GroupCreateResp groupId
     */

    /**
     * Constructs a new GroupCreateResp.
     * @exports GroupCreateResp
     * @classdesc Represents a GroupCreateResp.
     * @implements IGroupCreateResp
     * @constructor
     * @param {IGroupCreateResp=} [properties] Properties to set
     */
    function GroupCreateResp(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupCreateResp groupId.
     * @member {string} groupId
     * @memberof GroupCreateResp
     * @instance
     */
    GroupCreateResp.prototype.groupId = "";

    /**
     * Creates a new GroupCreateResp instance using the specified properties.
     * @function create
     * @memberof GroupCreateResp
     * @static
     * @param {IGroupCreateResp=} [properties] Properties to set
     * @returns {GroupCreateResp} GroupCreateResp instance
     */
    GroupCreateResp.create = function create(properties) {
        return new GroupCreateResp(properties);
    };

    /**
     * Encodes the specified GroupCreateResp message. Does not implicitly {@link GroupCreateResp.verify|verify} messages.
     * @function encode
     * @memberof GroupCreateResp
     * @static
     * @param {IGroupCreateResp} message GroupCreateResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
        return writer;
    };

    /**
     * Encodes the specified GroupCreateResp message, length delimited. Does not implicitly {@link GroupCreateResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupCreateResp
     * @static
     * @param {IGroupCreateResp} message GroupCreateResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupCreateResp message from the specified reader or buffer.
     * @function decode
     * @memberof GroupCreateResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupCreateResp} GroupCreateResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupCreateResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.groupId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupCreateResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupCreateResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupCreateResp} GroupCreateResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupCreateResp message.
     * @function verify
     * @memberof GroupCreateResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupCreateResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        return null;
    };

    /**
     * Creates a GroupCreateResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupCreateResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupCreateResp} GroupCreateResp
     */
    GroupCreateResp.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupCreateResp)
            return object;
        var message = new $root.GroupCreateResp();
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        return message;
    };

    /**
     * Creates a plain object from a GroupCreateResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupCreateResp
     * @static
     * @param {GroupCreateResp} message GroupCreateResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupCreateResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.groupId = "";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        return object;
    };

    /**
     * Converts this GroupCreateResp to JSON.
     * @function toJSON
     * @memberof GroupCreateResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupCreateResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupCreateResp;
})();

$root.GroupCreateNotify = (function() {

    /**
     * Properties of a GroupCreateNotify.
     * @exports IGroupCreateNotify
     * @interface IGroupCreateNotify
     * @property {string|null} [groupId] GroupCreateNotify groupId
     * @property {Array.<string>|null} [members] GroupCreateNotify members
     */

    /**
     * Constructs a new GroupCreateNotify.
     * @exports GroupCreateNotify
     * @classdesc Represents a GroupCreateNotify.
     * @implements IGroupCreateNotify
     * @constructor
     * @param {IGroupCreateNotify=} [properties] Properties to set
     */
    function GroupCreateNotify(properties) {
        this.members = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupCreateNotify groupId.
     * @member {string} groupId
     * @memberof GroupCreateNotify
     * @instance
     */
    GroupCreateNotify.prototype.groupId = "";

    /**
     * GroupCreateNotify members.
     * @member {Array.<string>} members
     * @memberof GroupCreateNotify
     * @instance
     */
    GroupCreateNotify.prototype.members = $util.emptyArray;

    /**
     * Creates a new GroupCreateNotify instance using the specified properties.
     * @function create
     * @memberof GroupCreateNotify
     * @static
     * @param {IGroupCreateNotify=} [properties] Properties to set
     * @returns {GroupCreateNotify} GroupCreateNotify instance
     */
    GroupCreateNotify.create = function create(properties) {
        return new GroupCreateNotify(properties);
    };

    /**
     * Encodes the specified GroupCreateNotify message. Does not implicitly {@link GroupCreateNotify.verify|verify} messages.
     * @function encode
     * @memberof GroupCreateNotify
     * @static
     * @param {IGroupCreateNotify} message GroupCreateNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
        if (message.members != null && message.members.length)
            for (var i = 0; i < message.members.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.members[i]);
        return writer;
    };

    /**
     * Encodes the specified GroupCreateNotify message, length delimited. Does not implicitly {@link GroupCreateNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupCreateNotify
     * @static
     * @param {IGroupCreateNotify} message GroupCreateNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupCreateNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupCreateNotify message from the specified reader or buffer.
     * @function decode
     * @memberof GroupCreateNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupCreateNotify} GroupCreateNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupCreateNotify();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.groupId = reader.string();
                break;
            case 2:
                if (!(message.members && message.members.length))
                    message.members = [];
                message.members.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupCreateNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupCreateNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupCreateNotify} GroupCreateNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupCreateNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupCreateNotify message.
     * @function verify
     * @memberof GroupCreateNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupCreateNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        if (message.members != null && message.hasOwnProperty("members")) {
            if (!Array.isArray(message.members))
                return "members: array expected";
            for (var i = 0; i < message.members.length; ++i)
                if (!$util.isString(message.members[i]))
                    return "members: string[] expected";
        }
        return null;
    };

    /**
     * Creates a GroupCreateNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupCreateNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupCreateNotify} GroupCreateNotify
     */
    GroupCreateNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupCreateNotify)
            return object;
        var message = new $root.GroupCreateNotify();
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        if (object.members) {
            if (!Array.isArray(object.members))
                throw TypeError(".GroupCreateNotify.members: array expected");
            message.members = [];
            for (var i = 0; i < object.members.length; ++i)
                message.members[i] = String(object.members[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a GroupCreateNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupCreateNotify
     * @static
     * @param {GroupCreateNotify} message GroupCreateNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupCreateNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.members = [];
        if (options.defaults)
            object.groupId = "";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        if (message.members && message.members.length) {
            object.members = [];
            for (var j = 0; j < message.members.length; ++j)
                object.members[j] = message.members[j];
        }
        return object;
    };

    /**
     * Converts this GroupCreateNotify to JSON.
     * @function toJSON
     * @memberof GroupCreateNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupCreateNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupCreateNotify;
})();

$root.GroupJoinReq = (function() {

    /**
     * Properties of a GroupJoinReq.
     * @exports IGroupJoinReq
     * @interface IGroupJoinReq
     * @property {string|null} [account] GroupJoinReq account
     * @property {string|null} [groupId] GroupJoinReq groupId
     */

    /**
     * Constructs a new GroupJoinReq.
     * @exports GroupJoinReq
     * @classdesc Represents a GroupJoinReq.
     * @implements IGroupJoinReq
     * @constructor
     * @param {IGroupJoinReq=} [properties] Properties to set
     */
    function GroupJoinReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupJoinReq account.
     * @member {string} account
     * @memberof GroupJoinReq
     * @instance
     */
    GroupJoinReq.prototype.account = "";

    /**
     * GroupJoinReq groupId.
     * @member {string} groupId
     * @memberof GroupJoinReq
     * @instance
     */
    GroupJoinReq.prototype.groupId = "";

    /**
     * Creates a new GroupJoinReq instance using the specified properties.
     * @function create
     * @memberof GroupJoinReq
     * @static
     * @param {IGroupJoinReq=} [properties] Properties to set
     * @returns {GroupJoinReq} GroupJoinReq instance
     */
    GroupJoinReq.create = function create(properties) {
        return new GroupJoinReq(properties);
    };

    /**
     * Encodes the specified GroupJoinReq message. Does not implicitly {@link GroupJoinReq.verify|verify} messages.
     * @function encode
     * @memberof GroupJoinReq
     * @static
     * @param {IGroupJoinReq} message GroupJoinReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupJoinReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.account != null && Object.hasOwnProperty.call(message, "account"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.groupId);
        return writer;
    };

    /**
     * Encodes the specified GroupJoinReq message, length delimited. Does not implicitly {@link GroupJoinReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupJoinReq
     * @static
     * @param {IGroupJoinReq} message GroupJoinReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupJoinReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupJoinReq message from the specified reader or buffer.
     * @function decode
     * @memberof GroupJoinReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupJoinReq} GroupJoinReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupJoinReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupJoinReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.account = reader.string();
                break;
            case 2:
                message.groupId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupJoinReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupJoinReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupJoinReq} GroupJoinReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupJoinReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupJoinReq message.
     * @function verify
     * @memberof GroupJoinReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupJoinReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        return null;
    };

    /**
     * Creates a GroupJoinReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupJoinReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupJoinReq} GroupJoinReq
     */
    GroupJoinReq.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupJoinReq)
            return object;
        var message = new $root.GroupJoinReq();
        if (object.account != null)
            message.account = String(object.account);
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        return message;
    };

    /**
     * Creates a plain object from a GroupJoinReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupJoinReq
     * @static
     * @param {GroupJoinReq} message GroupJoinReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupJoinReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.account = "";
            object.groupId = "";
        }
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        return object;
    };

    /**
     * Converts this GroupJoinReq to JSON.
     * @function toJSON
     * @memberof GroupJoinReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupJoinReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupJoinReq;
})();

$root.GroupQuitReq = (function() {

    /**
     * Properties of a GroupQuitReq.
     * @exports IGroupQuitReq
     * @interface IGroupQuitReq
     * @property {string|null} [account] GroupQuitReq account
     * @property {string|null} [groupId] GroupQuitReq groupId
     */

    /**
     * Constructs a new GroupQuitReq.
     * @exports GroupQuitReq
     * @classdesc Represents a GroupQuitReq.
     * @implements IGroupQuitReq
     * @constructor
     * @param {IGroupQuitReq=} [properties] Properties to set
     */
    function GroupQuitReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupQuitReq account.
     * @member {string} account
     * @memberof GroupQuitReq
     * @instance
     */
    GroupQuitReq.prototype.account = "";

    /**
     * GroupQuitReq groupId.
     * @member {string} groupId
     * @memberof GroupQuitReq
     * @instance
     */
    GroupQuitReq.prototype.groupId = "";

    /**
     * Creates a new GroupQuitReq instance using the specified properties.
     * @function create
     * @memberof GroupQuitReq
     * @static
     * @param {IGroupQuitReq=} [properties] Properties to set
     * @returns {GroupQuitReq} GroupQuitReq instance
     */
    GroupQuitReq.create = function create(properties) {
        return new GroupQuitReq(properties);
    };

    /**
     * Encodes the specified GroupQuitReq message. Does not implicitly {@link GroupQuitReq.verify|verify} messages.
     * @function encode
     * @memberof GroupQuitReq
     * @static
     * @param {IGroupQuitReq} message GroupQuitReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupQuitReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.account != null && Object.hasOwnProperty.call(message, "account"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.groupId);
        return writer;
    };

    /**
     * Encodes the specified GroupQuitReq message, length delimited. Does not implicitly {@link GroupQuitReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupQuitReq
     * @static
     * @param {IGroupQuitReq} message GroupQuitReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupQuitReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupQuitReq message from the specified reader or buffer.
     * @function decode
     * @memberof GroupQuitReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupQuitReq} GroupQuitReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupQuitReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupQuitReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.account = reader.string();
                break;
            case 2:
                message.groupId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupQuitReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupQuitReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupQuitReq} GroupQuitReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupQuitReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupQuitReq message.
     * @function verify
     * @memberof GroupQuitReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupQuitReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        return null;
    };

    /**
     * Creates a GroupQuitReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupQuitReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupQuitReq} GroupQuitReq
     */
    GroupQuitReq.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupQuitReq)
            return object;
        var message = new $root.GroupQuitReq();
        if (object.account != null)
            message.account = String(object.account);
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        return message;
    };

    /**
     * Creates a plain object from a GroupQuitReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupQuitReq
     * @static
     * @param {GroupQuitReq} message GroupQuitReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupQuitReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.account = "";
            object.groupId = "";
        }
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        return object;
    };

    /**
     * Converts this GroupQuitReq to JSON.
     * @function toJSON
     * @memberof GroupQuitReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupQuitReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupQuitReq;
})();

$root.GroupGetReq = (function() {

    /**
     * Properties of a GroupGetReq.
     * @exports IGroupGetReq
     * @interface IGroupGetReq
     * @property {string|null} [groupId] GroupGetReq groupId
     */

    /**
     * Constructs a new GroupGetReq.
     * @exports GroupGetReq
     * @classdesc Represents a GroupGetReq.
     * @implements IGroupGetReq
     * @constructor
     * @param {IGroupGetReq=} [properties] Properties to set
     */
    function GroupGetReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupGetReq groupId.
     * @member {string} groupId
     * @memberof GroupGetReq
     * @instance
     */
    GroupGetReq.prototype.groupId = "";

    /**
     * Creates a new GroupGetReq instance using the specified properties.
     * @function create
     * @memberof GroupGetReq
     * @static
     * @param {IGroupGetReq=} [properties] Properties to set
     * @returns {GroupGetReq} GroupGetReq instance
     */
    GroupGetReq.create = function create(properties) {
        return new GroupGetReq(properties);
    };

    /**
     * Encodes the specified GroupGetReq message. Does not implicitly {@link GroupGetReq.verify|verify} messages.
     * @function encode
     * @memberof GroupGetReq
     * @static
     * @param {IGroupGetReq} message GroupGetReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupGetReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
        return writer;
    };

    /**
     * Encodes the specified GroupGetReq message, length delimited. Does not implicitly {@link GroupGetReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupGetReq
     * @static
     * @param {IGroupGetReq} message GroupGetReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupGetReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupGetReq message from the specified reader or buffer.
     * @function decode
     * @memberof GroupGetReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupGetReq} GroupGetReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupGetReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupGetReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.groupId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupGetReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupGetReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupGetReq} GroupGetReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupGetReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupGetReq message.
     * @function verify
     * @memberof GroupGetReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupGetReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        return null;
    };

    /**
     * Creates a GroupGetReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupGetReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupGetReq} GroupGetReq
     */
    GroupGetReq.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupGetReq)
            return object;
        var message = new $root.GroupGetReq();
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        return message;
    };

    /**
     * Creates a plain object from a GroupGetReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupGetReq
     * @static
     * @param {GroupGetReq} message GroupGetReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupGetReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.groupId = "";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        return object;
    };

    /**
     * Converts this GroupGetReq to JSON.
     * @function toJSON
     * @memberof GroupGetReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupGetReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupGetReq;
})();

$root.Member = (function() {

    /**
     * Properties of a Member.
     * @exports IMember
     * @interface IMember
     * @property {string|null} [account] Member account
     * @property {string|null} [alias] Member alias
     * @property {string|null} [avatar] Member avatar
     * @property {Long|null} [joinTime] Member joinTime
     */

    /**
     * Constructs a new Member.
     * @exports Member
     * @classdesc Represents a Member.
     * @implements IMember
     * @constructor
     * @param {IMember=} [properties] Properties to set
     */
    function Member(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Member account.
     * @member {string} account
     * @memberof Member
     * @instance
     */
    Member.prototype.account = "";

    /**
     * Member alias.
     * @member {string} alias
     * @memberof Member
     * @instance
     */
    Member.prototype.alias = "";

    /**
     * Member avatar.
     * @member {string} avatar
     * @memberof Member
     * @instance
     */
    Member.prototype.avatar = "";

    /**
     * Member joinTime.
     * @member {Long} joinTime
     * @memberof Member
     * @instance
     */
    Member.prototype.joinTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Member instance using the specified properties.
     * @function create
     * @memberof Member
     * @static
     * @param {IMember=} [properties] Properties to set
     * @returns {Member} Member instance
     */
    Member.create = function create(properties) {
        return new Member(properties);
    };

    /**
     * Encodes the specified Member message. Does not implicitly {@link Member.verify|verify} messages.
     * @function encode
     * @memberof Member
     * @static
     * @param {IMember} message Member message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Member.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.account != null && Object.hasOwnProperty.call(message, "account"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
        if (message.alias != null && Object.hasOwnProperty.call(message, "alias"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.alias);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
        if (message.joinTime != null && Object.hasOwnProperty.call(message, "joinTime"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.joinTime);
        return writer;
    };

    /**
     * Encodes the specified Member message, length delimited. Does not implicitly {@link Member.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Member
     * @static
     * @param {IMember} message Member message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Member.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Member message from the specified reader or buffer.
     * @function decode
     * @memberof Member
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Member} Member
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Member.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Member();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.account = reader.string();
                break;
            case 2:
                message.alias = reader.string();
                break;
            case 3:
                message.avatar = reader.string();
                break;
            case 4:
                message.joinTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Member message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Member
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Member} Member
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Member.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Member message.
     * @function verify
     * @memberof Member
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Member.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.alias != null && message.hasOwnProperty("alias"))
            if (!$util.isString(message.alias))
                return "alias: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.joinTime != null && message.hasOwnProperty("joinTime"))
            if (!$util.isInteger(message.joinTime) && !(message.joinTime && $util.isInteger(message.joinTime.low) && $util.isInteger(message.joinTime.high)))
                return "joinTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a Member message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Member
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Member} Member
     */
    Member.fromObject = function fromObject(object) {
        if (object instanceof $root.Member)
            return object;
        var message = new $root.Member();
        if (object.account != null)
            message.account = String(object.account);
        if (object.alias != null)
            message.alias = String(object.alias);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.joinTime != null)
            if ($util.Long)
                (message.joinTime = $util.Long.fromValue(object.joinTime)).unsigned = false;
            else if (typeof object.joinTime === "string")
                message.joinTime = parseInt(object.joinTime, 10);
            else if (typeof object.joinTime === "number")
                message.joinTime = object.joinTime;
            else if (typeof object.joinTime === "object")
                message.joinTime = new $util.LongBits(object.joinTime.low >>> 0, object.joinTime.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Member message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Member
     * @static
     * @param {Member} message Member
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Member.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.account = "";
            object.alias = "";
            object.avatar = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.joinTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.joinTime = options.longs === String ? "0" : 0;
        }
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.alias != null && message.hasOwnProperty("alias"))
            object.alias = message.alias;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.joinTime != null && message.hasOwnProperty("joinTime"))
            if (typeof message.joinTime === "number")
                object.joinTime = options.longs === String ? String(message.joinTime) : message.joinTime;
            else
                object.joinTime = options.longs === String ? $util.Long.prototype.toString.call(message.joinTime) : options.longs === Number ? new $util.LongBits(message.joinTime.low >>> 0, message.joinTime.high >>> 0).toNumber() : message.joinTime;
        return object;
    };

    /**
     * Converts this Member to JSON.
     * @function toJSON
     * @memberof Member
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Member.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Member;
})();

$root.GroupGetResp = (function() {

    /**
     * Properties of a GroupGetResp.
     * @exports IGroupGetResp
     * @interface IGroupGetResp
     * @property {string|null} [id] GroupGetResp id
     * @property {string|null} [name] GroupGetResp name
     * @property {string|null} [avatar] GroupGetResp avatar
     * @property {string|null} [introduction] GroupGetResp introduction
     * @property {string|null} [owner] GroupGetResp owner
     * @property {Array.<IMember>|null} [members] GroupGetResp members
     * @property {Long|null} [createdAt] GroupGetResp createdAt
     */

    /**
     * Constructs a new GroupGetResp.
     * @exports GroupGetResp
     * @classdesc Represents a GroupGetResp.
     * @implements IGroupGetResp
     * @constructor
     * @param {IGroupGetResp=} [properties] Properties to set
     */
    function GroupGetResp(properties) {
        this.members = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupGetResp id.
     * @member {string} id
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.id = "";

    /**
     * GroupGetResp name.
     * @member {string} name
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.name = "";

    /**
     * GroupGetResp avatar.
     * @member {string} avatar
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.avatar = "";

    /**
     * GroupGetResp introduction.
     * @member {string} introduction
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.introduction = "";

    /**
     * GroupGetResp owner.
     * @member {string} owner
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.owner = "";

    /**
     * GroupGetResp members.
     * @member {Array.<IMember>} members
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.members = $util.emptyArray;

    /**
     * GroupGetResp createdAt.
     * @member {Long} createdAt
     * @memberof GroupGetResp
     * @instance
     */
    GroupGetResp.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GroupGetResp instance using the specified properties.
     * @function create
     * @memberof GroupGetResp
     * @static
     * @param {IGroupGetResp=} [properties] Properties to set
     * @returns {GroupGetResp} GroupGetResp instance
     */
    GroupGetResp.create = function create(properties) {
        return new GroupGetResp(properties);
    };

    /**
     * Encodes the specified GroupGetResp message. Does not implicitly {@link GroupGetResp.verify|verify} messages.
     * @function encode
     * @memberof GroupGetResp
     * @static
     * @param {IGroupGetResp} message GroupGetResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupGetResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
        if (message.introduction != null && Object.hasOwnProperty.call(message, "introduction"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.introduction);
        if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.owner);
        if (message.members != null && message.members.length)
            for (var i = 0; i < message.members.length; ++i)
                $root.Member.encode(message.members[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
            writer.uint32(/* id 7, wireType 0 =*/56).int64(message.createdAt);
        return writer;
    };

    /**
     * Encodes the specified GroupGetResp message, length delimited. Does not implicitly {@link GroupGetResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupGetResp
     * @static
     * @param {IGroupGetResp} message GroupGetResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupGetResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupGetResp message from the specified reader or buffer.
     * @function decode
     * @memberof GroupGetResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupGetResp} GroupGetResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupGetResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupGetResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.avatar = reader.string();
                break;
            case 4:
                message.introduction = reader.string();
                break;
            case 5:
                message.owner = reader.string();
                break;
            case 6:
                if (!(message.members && message.members.length))
                    message.members = [];
                message.members.push($root.Member.decode(reader, reader.uint32()));
                break;
            case 7:
                message.createdAt = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupGetResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupGetResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupGetResp} GroupGetResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupGetResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupGetResp message.
     * @function verify
     * @memberof GroupGetResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupGetResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.introduction != null && message.hasOwnProperty("introduction"))
            if (!$util.isString(message.introduction))
                return "introduction: string expected";
        if (message.owner != null && message.hasOwnProperty("owner"))
            if (!$util.isString(message.owner))
                return "owner: string expected";
        if (message.members != null && message.hasOwnProperty("members")) {
            if (!Array.isArray(message.members))
                return "members: array expected";
            for (var i = 0; i < message.members.length; ++i) {
                var error = $root.Member.verify(message.members[i]);
                if (error)
                    return "members." + error;
            }
        }
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                return "createdAt: integer|Long expected";
        return null;
    };

    /**
     * Creates a GroupGetResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupGetResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupGetResp} GroupGetResp
     */
    GroupGetResp.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupGetResp)
            return object;
        var message = new $root.GroupGetResp();
        if (object.id != null)
            message.id = String(object.id);
        if (object.name != null)
            message.name = String(object.name);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.introduction != null)
            message.introduction = String(object.introduction);
        if (object.owner != null)
            message.owner = String(object.owner);
        if (object.members) {
            if (!Array.isArray(object.members))
                throw TypeError(".GroupGetResp.members: array expected");
            message.members = [];
            for (var i = 0; i < object.members.length; ++i) {
                if (typeof object.members[i] !== "object")
                    throw TypeError(".GroupGetResp.members: object expected");
                message.members[i] = $root.Member.fromObject(object.members[i]);
            }
        }
        if (object.createdAt != null)
            if ($util.Long)
                (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
            else if (typeof object.createdAt === "string")
                message.createdAt = parseInt(object.createdAt, 10);
            else if (typeof object.createdAt === "number")
                message.createdAt = object.createdAt;
            else if (typeof object.createdAt === "object")
                message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a GroupGetResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupGetResp
     * @static
     * @param {GroupGetResp} message GroupGetResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupGetResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.members = [];
        if (options.defaults) {
            object.id = "";
            object.name = "";
            object.avatar = "";
            object.introduction = "";
            object.owner = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.createdAt = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.introduction != null && message.hasOwnProperty("introduction"))
            object.introduction = message.introduction;
        if (message.owner != null && message.hasOwnProperty("owner"))
            object.owner = message.owner;
        if (message.members && message.members.length) {
            object.members = [];
            for (var j = 0; j < message.members.length; ++j)
                object.members[j] = $root.Member.toObject(message.members[j], options);
        }
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            if (typeof message.createdAt === "number")
                object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
            else
                object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
        return object;
    };

    /**
     * Converts this GroupGetResp to JSON.
     * @function toJSON
     * @memberof GroupGetResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupGetResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupGetResp;
})();

$root.GroupJoinNotify = (function() {

    /**
     * Properties of a GroupJoinNotify.
     * @exports IGroupJoinNotify
     * @interface IGroupJoinNotify
     * @property {string|null} [groupId] GroupJoinNotify groupId
     * @property {string|null} [account] GroupJoinNotify account
     */

    /**
     * Constructs a new GroupJoinNotify.
     * @exports GroupJoinNotify
     * @classdesc Represents a GroupJoinNotify.
     * @implements IGroupJoinNotify
     * @constructor
     * @param {IGroupJoinNotify=} [properties] Properties to set
     */
    function GroupJoinNotify(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupJoinNotify groupId.
     * @member {string} groupId
     * @memberof GroupJoinNotify
     * @instance
     */
    GroupJoinNotify.prototype.groupId = "";

    /**
     * GroupJoinNotify account.
     * @member {string} account
     * @memberof GroupJoinNotify
     * @instance
     */
    GroupJoinNotify.prototype.account = "";

    /**
     * Creates a new GroupJoinNotify instance using the specified properties.
     * @function create
     * @memberof GroupJoinNotify
     * @static
     * @param {IGroupJoinNotify=} [properties] Properties to set
     * @returns {GroupJoinNotify} GroupJoinNotify instance
     */
    GroupJoinNotify.create = function create(properties) {
        return new GroupJoinNotify(properties);
    };

    /**
     * Encodes the specified GroupJoinNotify message. Does not implicitly {@link GroupJoinNotify.verify|verify} messages.
     * @function encode
     * @memberof GroupJoinNotify
     * @static
     * @param {IGroupJoinNotify} message GroupJoinNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupJoinNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
        if (message.account != null && Object.hasOwnProperty.call(message, "account"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
        return writer;
    };

    /**
     * Encodes the specified GroupJoinNotify message, length delimited. Does not implicitly {@link GroupJoinNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupJoinNotify
     * @static
     * @param {IGroupJoinNotify} message GroupJoinNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupJoinNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupJoinNotify message from the specified reader or buffer.
     * @function decode
     * @memberof GroupJoinNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupJoinNotify} GroupJoinNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupJoinNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupJoinNotify();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.groupId = reader.string();
                break;
            case 2:
                message.account = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupJoinNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupJoinNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupJoinNotify} GroupJoinNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupJoinNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupJoinNotify message.
     * @function verify
     * @memberof GroupJoinNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupJoinNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        return null;
    };

    /**
     * Creates a GroupJoinNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupJoinNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupJoinNotify} GroupJoinNotify
     */
    GroupJoinNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupJoinNotify)
            return object;
        var message = new $root.GroupJoinNotify();
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        if (object.account != null)
            message.account = String(object.account);
        return message;
    };

    /**
     * Creates a plain object from a GroupJoinNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupJoinNotify
     * @static
     * @param {GroupJoinNotify} message GroupJoinNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupJoinNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.groupId = "";
            object.account = "";
        }
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        return object;
    };

    /**
     * Converts this GroupJoinNotify to JSON.
     * @function toJSON
     * @memberof GroupJoinNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupJoinNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupJoinNotify;
})();

$root.GroupQuitNotify = (function() {

    /**
     * Properties of a GroupQuitNotify.
     * @exports IGroupQuitNotify
     * @interface IGroupQuitNotify
     * @property {string|null} [groupId] GroupQuitNotify groupId
     * @property {string|null} [account] GroupQuitNotify account
     */

    /**
     * Constructs a new GroupQuitNotify.
     * @exports GroupQuitNotify
     * @classdesc Represents a GroupQuitNotify.
     * @implements IGroupQuitNotify
     * @constructor
     * @param {IGroupQuitNotify=} [properties] Properties to set
     */
    function GroupQuitNotify(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupQuitNotify groupId.
     * @member {string} groupId
     * @memberof GroupQuitNotify
     * @instance
     */
    GroupQuitNotify.prototype.groupId = "";

    /**
     * GroupQuitNotify account.
     * @member {string} account
     * @memberof GroupQuitNotify
     * @instance
     */
    GroupQuitNotify.prototype.account = "";

    /**
     * Creates a new GroupQuitNotify instance using the specified properties.
     * @function create
     * @memberof GroupQuitNotify
     * @static
     * @param {IGroupQuitNotify=} [properties] Properties to set
     * @returns {GroupQuitNotify} GroupQuitNotify instance
     */
    GroupQuitNotify.create = function create(properties) {
        return new GroupQuitNotify(properties);
    };

    /**
     * Encodes the specified GroupQuitNotify message. Does not implicitly {@link GroupQuitNotify.verify|verify} messages.
     * @function encode
     * @memberof GroupQuitNotify
     * @static
     * @param {IGroupQuitNotify} message GroupQuitNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupQuitNotify.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.groupId);
        if (message.account != null && Object.hasOwnProperty.call(message, "account"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
        return writer;
    };

    /**
     * Encodes the specified GroupQuitNotify message, length delimited. Does not implicitly {@link GroupQuitNotify.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupQuitNotify
     * @static
     * @param {IGroupQuitNotify} message GroupQuitNotify message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupQuitNotify.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupQuitNotify message from the specified reader or buffer.
     * @function decode
     * @memberof GroupQuitNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupQuitNotify} GroupQuitNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupQuitNotify.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupQuitNotify();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.groupId = reader.string();
                break;
            case 2:
                message.account = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupQuitNotify message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupQuitNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupQuitNotify} GroupQuitNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupQuitNotify.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupQuitNotify message.
     * @function verify
     * @memberof GroupQuitNotify
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupQuitNotify.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        return null;
    };

    /**
     * Creates a GroupQuitNotify message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupQuitNotify
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupQuitNotify} GroupQuitNotify
     */
    GroupQuitNotify.fromObject = function fromObject(object) {
        if (object instanceof $root.GroupQuitNotify)
            return object;
        var message = new $root.GroupQuitNotify();
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        if (object.account != null)
            message.account = String(object.account);
        return message;
    };

    /**
     * Creates a plain object from a GroupQuitNotify message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupQuitNotify
     * @static
     * @param {GroupQuitNotify} message GroupQuitNotify
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupQuitNotify.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.groupId = "";
            object.account = "";
        }
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        return object;
    };

    /**
     * Converts this GroupQuitNotify to JSON.
     * @function toJSON
     * @memberof GroupQuitNotify
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupQuitNotify.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GroupQuitNotify;
})();

$root.MessageIndexReq = (function() {

    /**
     * Properties of a MessageIndexReq.
     * @exports IMessageIndexReq
     * @interface IMessageIndexReq
     * @property {Long|null} [messageId] MessageIndexReq messageId
     */

    /**
     * Constructs a new MessageIndexReq.
     * @exports MessageIndexReq
     * @classdesc Represents a MessageIndexReq.
     * @implements IMessageIndexReq
     * @constructor
     * @param {IMessageIndexReq=} [properties] Properties to set
     */
    function MessageIndexReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageIndexReq messageId.
     * @member {Long} messageId
     * @memberof MessageIndexReq
     * @instance
     */
    MessageIndexReq.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MessageIndexReq instance using the specified properties.
     * @function create
     * @memberof MessageIndexReq
     * @static
     * @param {IMessageIndexReq=} [properties] Properties to set
     * @returns {MessageIndexReq} MessageIndexReq instance
     */
    MessageIndexReq.create = function create(properties) {
        return new MessageIndexReq(properties);
    };

    /**
     * Encodes the specified MessageIndexReq message. Does not implicitly {@link MessageIndexReq.verify|verify} messages.
     * @function encode
     * @memberof MessageIndexReq
     * @static
     * @param {IMessageIndexReq} message MessageIndexReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndexReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        return writer;
    };

    /**
     * Encodes the specified MessageIndexReq message, length delimited. Does not implicitly {@link MessageIndexReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageIndexReq
     * @static
     * @param {IMessageIndexReq} message MessageIndexReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndexReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageIndexReq message from the specified reader or buffer.
     * @function decode
     * @memberof MessageIndexReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageIndexReq} MessageIndexReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndexReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageIndexReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageIndexReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageIndexReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageIndexReq} MessageIndexReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndexReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageIndexReq message.
     * @function verify
     * @memberof MessageIndexReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageIndexReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        return null;
    };

    /**
     * Creates a MessageIndexReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageIndexReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageIndexReq} MessageIndexReq
     */
    MessageIndexReq.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageIndexReq)
            return object;
        var message = new $root.MessageIndexReq();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a MessageIndexReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageIndexReq
     * @static
     * @param {MessageIndexReq} message MessageIndexReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageIndexReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        return object;
    };

    /**
     * Converts this MessageIndexReq to JSON.
     * @function toJSON
     * @memberof MessageIndexReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageIndexReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageIndexReq;
})();

$root.MessageIndexResp = (function() {

    /**
     * Properties of a MessageIndexResp.
     * @exports IMessageIndexResp
     * @interface IMessageIndexResp
     * @property {Array.<IMessageIndex>|null} [indexes] MessageIndexResp indexes
     */

    /**
     * Constructs a new MessageIndexResp.
     * @exports MessageIndexResp
     * @classdesc Represents a MessageIndexResp.
     * @implements IMessageIndexResp
     * @constructor
     * @param {IMessageIndexResp=} [properties] Properties to set
     */
    function MessageIndexResp(properties) {
        this.indexes = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageIndexResp indexes.
     * @member {Array.<IMessageIndex>} indexes
     * @memberof MessageIndexResp
     * @instance
     */
    MessageIndexResp.prototype.indexes = $util.emptyArray;

    /**
     * Creates a new MessageIndexResp instance using the specified properties.
     * @function create
     * @memberof MessageIndexResp
     * @static
     * @param {IMessageIndexResp=} [properties] Properties to set
     * @returns {MessageIndexResp} MessageIndexResp instance
     */
    MessageIndexResp.create = function create(properties) {
        return new MessageIndexResp(properties);
    };

    /**
     * Encodes the specified MessageIndexResp message. Does not implicitly {@link MessageIndexResp.verify|verify} messages.
     * @function encode
     * @memberof MessageIndexResp
     * @static
     * @param {IMessageIndexResp} message MessageIndexResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndexResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.indexes != null && message.indexes.length)
            for (var i = 0; i < message.indexes.length; ++i)
                $root.MessageIndex.encode(message.indexes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MessageIndexResp message, length delimited. Does not implicitly {@link MessageIndexResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageIndexResp
     * @static
     * @param {IMessageIndexResp} message MessageIndexResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndexResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageIndexResp message from the specified reader or buffer.
     * @function decode
     * @memberof MessageIndexResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageIndexResp} MessageIndexResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndexResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageIndexResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.indexes && message.indexes.length))
                    message.indexes = [];
                message.indexes.push($root.MessageIndex.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageIndexResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageIndexResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageIndexResp} MessageIndexResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndexResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageIndexResp message.
     * @function verify
     * @memberof MessageIndexResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageIndexResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.indexes != null && message.hasOwnProperty("indexes")) {
            if (!Array.isArray(message.indexes))
                return "indexes: array expected";
            for (var i = 0; i < message.indexes.length; ++i) {
                var error = $root.MessageIndex.verify(message.indexes[i]);
                if (error)
                    return "indexes." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MessageIndexResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageIndexResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageIndexResp} MessageIndexResp
     */
    MessageIndexResp.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageIndexResp)
            return object;
        var message = new $root.MessageIndexResp();
        if (object.indexes) {
            if (!Array.isArray(object.indexes))
                throw TypeError(".MessageIndexResp.indexes: array expected");
            message.indexes = [];
            for (var i = 0; i < object.indexes.length; ++i) {
                if (typeof object.indexes[i] !== "object")
                    throw TypeError(".MessageIndexResp.indexes: object expected");
                message.indexes[i] = $root.MessageIndex.fromObject(object.indexes[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MessageIndexResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageIndexResp
     * @static
     * @param {MessageIndexResp} message MessageIndexResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageIndexResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.indexes = [];
        if (message.indexes && message.indexes.length) {
            object.indexes = [];
            for (var j = 0; j < message.indexes.length; ++j)
                object.indexes[j] = $root.MessageIndex.toObject(message.indexes[j], options);
        }
        return object;
    };

    /**
     * Converts this MessageIndexResp to JSON.
     * @function toJSON
     * @memberof MessageIndexResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageIndexResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageIndexResp;
})();

$root.MessageIndex = (function() {

    /**
     * Properties of a MessageIndex.
     * @exports IMessageIndex
     * @interface IMessageIndex
     * @property {Long|null} [messageId] MessageIndex messageId
     * @property {number|null} [direction] MessageIndex direction
     * @property {Long|null} [sendTime] MessageIndex sendTime
     * @property {Long|null} [userB] MessageIndex userB
     * @property {string|null} [group] MessageIndex group
     */

    /**
     * Constructs a new MessageIndex.
     * @exports MessageIndex
     * @classdesc Represents a MessageIndex.
     * @implements IMessageIndex
     * @constructor
     * @param {IMessageIndex=} [properties] Properties to set
     */
    function MessageIndex(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageIndex messageId.
     * @member {Long} messageId
     * @memberof MessageIndex
     * @instance
     */
    MessageIndex.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageIndex direction.
     * @member {number} direction
     * @memberof MessageIndex
     * @instance
     */
    MessageIndex.prototype.direction = 0;

    /**
     * MessageIndex sendTime.
     * @member {Long} sendTime
     * @memberof MessageIndex
     * @instance
     */
    MessageIndex.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageIndex userB.
     * @member {Long} userB
     * @memberof MessageIndex
     * @instance
     */
    MessageIndex.prototype.userB = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageIndex group.
     * @member {string} group
     * @memberof MessageIndex
     * @instance
     */
    MessageIndex.prototype.group = "";

    /**
     * Creates a new MessageIndex instance using the specified properties.
     * @function create
     * @memberof MessageIndex
     * @static
     * @param {IMessageIndex=} [properties] Properties to set
     * @returns {MessageIndex} MessageIndex instance
     */
    MessageIndex.create = function create(properties) {
        return new MessageIndex(properties);
    };

    /**
     * Encodes the specified MessageIndex message. Does not implicitly {@link MessageIndex.verify|verify} messages.
     * @function encode
     * @memberof MessageIndex
     * @static
     * @param {IMessageIndex} message MessageIndex message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndex.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.direction);
        if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.sendTime);
        if (message.userB != null && Object.hasOwnProperty.call(message, "userB"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.userB);
        if (message.group != null && Object.hasOwnProperty.call(message, "group"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.group);
        return writer;
    };

    /**
     * Encodes the specified MessageIndex message, length delimited. Does not implicitly {@link MessageIndex.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageIndex
     * @static
     * @param {IMessageIndex} message MessageIndex message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageIndex.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageIndex message from the specified reader or buffer.
     * @function decode
     * @memberof MessageIndex
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageIndex} MessageIndex
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndex.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageIndex();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            case 2:
                message.direction = reader.int32();
                break;
            case 3:
                message.sendTime = reader.int64();
                break;
            case 4:
                message.userB = reader.int64();
                break;
            case 5:
                message.group = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageIndex message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageIndex
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageIndex} MessageIndex
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageIndex.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageIndex message.
     * @function verify
     * @memberof MessageIndex
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageIndex.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        if (message.direction != null && message.hasOwnProperty("direction"))
            if (!$util.isInteger(message.direction))
                return "direction: integer expected";
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                return "sendTime: integer|Long expected";
        if (message.userB != null && message.hasOwnProperty("userB"))
            if (!$util.isInteger(message.userB) && !(message.userB && $util.isInteger(message.userB.low) && $util.isInteger(message.userB.high)))
                return "userB: integer|Long expected";
        if (message.group != null && message.hasOwnProperty("group"))
            if (!$util.isString(message.group))
                return "group: string expected";
        return null;
    };

    /**
     * Creates a MessageIndex message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageIndex
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageIndex} MessageIndex
     */
    MessageIndex.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageIndex)
            return object;
        var message = new $root.MessageIndex();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        if (object.direction != null)
            message.direction = object.direction | 0;
        if (object.sendTime != null)
            if ($util.Long)
                (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
            else if (typeof object.sendTime === "string")
                message.sendTime = parseInt(object.sendTime, 10);
            else if (typeof object.sendTime === "number")
                message.sendTime = object.sendTime;
            else if (typeof object.sendTime === "object")
                message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
        if (object.userB != null)
            if ($util.Long)
                (message.userB = $util.Long.fromValue(object.userB)).unsigned = false;
            else if (typeof object.userB === "string")
                message.userB = parseInt(object.userB, 10);
            else if (typeof object.userB === "number")
                message.userB = object.userB;
            else if (typeof object.userB === "object")
                message.userB = new $util.LongBits(object.userB.low >>> 0, object.userB.high >>> 0).toNumber();
        if (object.group != null)
            message.group = String(object.group);
        return message;
    };

    /**
     * Creates a plain object from a MessageIndex message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageIndex
     * @static
     * @param {MessageIndex} message MessageIndex
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageIndex.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
            object.direction = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sendTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.userB = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.userB = options.longs === String ? "0" : 0;
            object.group = "";
        }
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        if (message.direction != null && message.hasOwnProperty("direction"))
            object.direction = message.direction;
        if (message.sendTime != null && message.hasOwnProperty("sendTime"))
            if (typeof message.sendTime === "number")
                object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
            else
                object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
        if (message.userB != null && message.hasOwnProperty("userB"))
            if (typeof message.userB === "number")
                object.userB = options.longs === String ? String(message.userB) : message.userB;
            else
                object.userB = options.longs === String ? $util.Long.prototype.toString.call(message.userB) : options.longs === Number ? new $util.LongBits(message.userB.low >>> 0, message.userB.high >>> 0).toNumber() : message.userB;
        if (message.group != null && message.hasOwnProperty("group"))
            object.group = message.group;
        return object;
    };

    /**
     * Converts this MessageIndex to JSON.
     * @function toJSON
     * @memberof MessageIndex
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageIndex.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageIndex;
})();

$root.MessageContentReq = (function() {

    /**
     * Properties of a MessageContentReq.
     * @exports IMessageContentReq
     * @interface IMessageContentReq
     * @property {Array.<Long>|null} [messageIds] MessageContentReq messageIds
     */

    /**
     * Constructs a new MessageContentReq.
     * @exports MessageContentReq
     * @classdesc Represents a MessageContentReq.
     * @implements IMessageContentReq
     * @constructor
     * @param {IMessageContentReq=} [properties] Properties to set
     */
    function MessageContentReq(properties) {
        this.messageIds = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageContentReq messageIds.
     * @member {Array.<Long>} messageIds
     * @memberof MessageContentReq
     * @instance
     */
    MessageContentReq.prototype.messageIds = $util.emptyArray;

    /**
     * Creates a new MessageContentReq instance using the specified properties.
     * @function create
     * @memberof MessageContentReq
     * @static
     * @param {IMessageContentReq=} [properties] Properties to set
     * @returns {MessageContentReq} MessageContentReq instance
     */
    MessageContentReq.create = function create(properties) {
        return new MessageContentReq(properties);
    };

    /**
     * Encodes the specified MessageContentReq message. Does not implicitly {@link MessageContentReq.verify|verify} messages.
     * @function encode
     * @memberof MessageContentReq
     * @static
     * @param {IMessageContentReq} message MessageContentReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContentReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageIds != null && message.messageIds.length) {
            writer.uint32(/* id 1, wireType 2 =*/10).fork();
            for (var i = 0; i < message.messageIds.length; ++i)
                writer.int64(message.messageIds[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified MessageContentReq message, length delimited. Does not implicitly {@link MessageContentReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageContentReq
     * @static
     * @param {IMessageContentReq} message MessageContentReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContentReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageContentReq message from the specified reader or buffer.
     * @function decode
     * @memberof MessageContentReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageContentReq} MessageContentReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContentReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageContentReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.messageIds && message.messageIds.length))
                    message.messageIds = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.messageIds.push(reader.int64());
                } else
                    message.messageIds.push(reader.int64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageContentReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageContentReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageContentReq} MessageContentReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContentReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageContentReq message.
     * @function verify
     * @memberof MessageContentReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageContentReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageIds != null && message.hasOwnProperty("messageIds")) {
            if (!Array.isArray(message.messageIds))
                return "messageIds: array expected";
            for (var i = 0; i < message.messageIds.length; ++i)
                if (!$util.isInteger(message.messageIds[i]) && !(message.messageIds[i] && $util.isInteger(message.messageIds[i].low) && $util.isInteger(message.messageIds[i].high)))
                    return "messageIds: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a MessageContentReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageContentReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageContentReq} MessageContentReq
     */
    MessageContentReq.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageContentReq)
            return object;
        var message = new $root.MessageContentReq();
        if (object.messageIds) {
            if (!Array.isArray(object.messageIds))
                throw TypeError(".MessageContentReq.messageIds: array expected");
            message.messageIds = [];
            for (var i = 0; i < object.messageIds.length; ++i)
                if ($util.Long)
                    (message.messageIds[i] = $util.Long.fromValue(object.messageIds[i])).unsigned = false;
                else if (typeof object.messageIds[i] === "string")
                    message.messageIds[i] = parseInt(object.messageIds[i], 10);
                else if (typeof object.messageIds[i] === "number")
                    message.messageIds[i] = object.messageIds[i];
                else if (typeof object.messageIds[i] === "object")
                    message.messageIds[i] = new $util.LongBits(object.messageIds[i].low >>> 0, object.messageIds[i].high >>> 0).toNumber();
        }
        return message;
    };

    /**
     * Creates a plain object from a MessageContentReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageContentReq
     * @static
     * @param {MessageContentReq} message MessageContentReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageContentReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.messageIds = [];
        if (message.messageIds && message.messageIds.length) {
            object.messageIds = [];
            for (var j = 0; j < message.messageIds.length; ++j)
                if (typeof message.messageIds[j] === "number")
                    object.messageIds[j] = options.longs === String ? String(message.messageIds[j]) : message.messageIds[j];
                else
                    object.messageIds[j] = options.longs === String ? $util.Long.prototype.toString.call(message.messageIds[j]) : options.longs === Number ? new $util.LongBits(message.messageIds[j].low >>> 0, message.messageIds[j].high >>> 0).toNumber() : message.messageIds[j];
        }
        return object;
    };

    /**
     * Converts this MessageContentReq to JSON.
     * @function toJSON
     * @memberof MessageContentReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageContentReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageContentReq;
})();

$root.MessageContent = (function() {

    /**
     * Properties of a MessageContent.
     * @exports IMessageContent
     * @interface IMessageContent
     * @property {Long|null} [messageId] MessageContent messageId
     * @property {number|null} [type] MessageContent type
     * @property {string|null} [body] MessageContent body
     * @property {string|null} [extra] MessageContent extra
     */

    /**
     * Constructs a new MessageContent.
     * @exports MessageContent
     * @classdesc Represents a MessageContent.
     * @implements IMessageContent
     * @constructor
     * @param {IMessageContent=} [properties] Properties to set
     */
    function MessageContent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageContent messageId.
     * @member {Long} messageId
     * @memberof MessageContent
     * @instance
     */
    MessageContent.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MessageContent type.
     * @member {number} type
     * @memberof MessageContent
     * @instance
     */
    MessageContent.prototype.type = 0;

    /**
     * MessageContent body.
     * @member {string} body
     * @memberof MessageContent
     * @instance
     */
    MessageContent.prototype.body = "";

    /**
     * MessageContent extra.
     * @member {string} extra
     * @memberof MessageContent
     * @instance
     */
    MessageContent.prototype.extra = "";

    /**
     * Creates a new MessageContent instance using the specified properties.
     * @function create
     * @memberof MessageContent
     * @static
     * @param {IMessageContent=} [properties] Properties to set
     * @returns {MessageContent} MessageContent instance
     */
    MessageContent.create = function create(properties) {
        return new MessageContent(properties);
    };

    /**
     * Encodes the specified MessageContent message. Does not implicitly {@link MessageContent.verify|verify} messages.
     * @function encode
     * @memberof MessageContent
     * @static
     * @param {IMessageContent} message MessageContent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.messageId);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.body);
        if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.extra);
        return writer;
    };

    /**
     * Encodes the specified MessageContent message, length delimited. Does not implicitly {@link MessageContent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageContent
     * @static
     * @param {IMessageContent} message MessageContent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageContent message from the specified reader or buffer.
     * @function decode
     * @memberof MessageContent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageContent} MessageContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageContent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int64();
                break;
            case 2:
                message.type = reader.int32();
                break;
            case 3:
                message.body = reader.string();
                break;
            case 4:
                message.extra = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageContent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageContent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageContent} MessageContent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageContent message.
     * @function verify
     * @memberof MessageContent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageContent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                return "messageId: integer|Long expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.body != null && message.hasOwnProperty("body"))
            if (!$util.isString(message.body))
                return "body: string expected";
        if (message.extra != null && message.hasOwnProperty("extra"))
            if (!$util.isString(message.extra))
                return "extra: string expected";
        return null;
    };

    /**
     * Creates a MessageContent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageContent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageContent} MessageContent
     */
    MessageContent.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageContent)
            return object;
        var message = new $root.MessageContent();
        if (object.messageId != null)
            if ($util.Long)
                (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
            else if (typeof object.messageId === "string")
                message.messageId = parseInt(object.messageId, 10);
            else if (typeof object.messageId === "number")
                message.messageId = object.messageId;
            else if (typeof object.messageId === "object")
                message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
        if (object.type != null)
            message.type = object.type | 0;
        if (object.body != null)
            message.body = String(object.body);
        if (object.extra != null)
            message.extra = String(object.extra);
        return message;
    };

    /**
     * Creates a plain object from a MessageContent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageContent
     * @static
     * @param {MessageContent} message MessageContent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageContent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.messageId = options.longs === String ? "0" : 0;
            object.type = 0;
            object.body = "";
            object.extra = "";
        }
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (typeof message.messageId === "number")
                object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
            else
                object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        if (message.extra != null && message.hasOwnProperty("extra"))
            object.extra = message.extra;
        return object;
    };

    /**
     * Converts this MessageContent to JSON.
     * @function toJSON
     * @memberof MessageContent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageContent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageContent;
})();

$root.MessageContentResp = (function() {

    /**
     * Properties of a MessageContentResp.
     * @exports IMessageContentResp
     * @interface IMessageContentResp
     * @property {Array.<IMessageContent>|null} [contents] MessageContentResp contents
     */

    /**
     * Constructs a new MessageContentResp.
     * @exports MessageContentResp
     * @classdesc Represents a MessageContentResp.
     * @implements IMessageContentResp
     * @constructor
     * @param {IMessageContentResp=} [properties] Properties to set
     */
    function MessageContentResp(properties) {
        this.contents = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageContentResp contents.
     * @member {Array.<IMessageContent>} contents
     * @memberof MessageContentResp
     * @instance
     */
    MessageContentResp.prototype.contents = $util.emptyArray;

    /**
     * Creates a new MessageContentResp instance using the specified properties.
     * @function create
     * @memberof MessageContentResp
     * @static
     * @param {IMessageContentResp=} [properties] Properties to set
     * @returns {MessageContentResp} MessageContentResp instance
     */
    MessageContentResp.create = function create(properties) {
        return new MessageContentResp(properties);
    };

    /**
     * Encodes the specified MessageContentResp message. Does not implicitly {@link MessageContentResp.verify|verify} messages.
     * @function encode
     * @memberof MessageContentResp
     * @static
     * @param {IMessageContentResp} message MessageContentResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContentResp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.contents != null && message.contents.length)
            for (var i = 0; i < message.contents.length; ++i)
                $root.MessageContent.encode(message.contents[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MessageContentResp message, length delimited. Does not implicitly {@link MessageContentResp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageContentResp
     * @static
     * @param {IMessageContentResp} message MessageContentResp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageContentResp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageContentResp message from the specified reader or buffer.
     * @function decode
     * @memberof MessageContentResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageContentResp} MessageContentResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContentResp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageContentResp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.contents && message.contents.length))
                    message.contents = [];
                message.contents.push($root.MessageContent.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageContentResp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageContentResp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageContentResp} MessageContentResp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageContentResp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageContentResp message.
     * @function verify
     * @memberof MessageContentResp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageContentResp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.contents != null && message.hasOwnProperty("contents")) {
            if (!Array.isArray(message.contents))
                return "contents: array expected";
            for (var i = 0; i < message.contents.length; ++i) {
                var error = $root.MessageContent.verify(message.contents[i]);
                if (error)
                    return "contents." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MessageContentResp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageContentResp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageContentResp} MessageContentResp
     */
    MessageContentResp.fromObject = function fromObject(object) {
        if (object instanceof $root.MessageContentResp)
            return object;
        var message = new $root.MessageContentResp();
        if (object.contents) {
            if (!Array.isArray(object.contents))
                throw TypeError(".MessageContentResp.contents: array expected");
            message.contents = [];
            for (var i = 0; i < object.contents.length; ++i) {
                if (typeof object.contents[i] !== "object")
                    throw TypeError(".MessageContentResp.contents: object expected");
                message.contents[i] = $root.MessageContent.fromObject(object.contents[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MessageContentResp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageContentResp
     * @static
     * @param {MessageContentResp} message MessageContentResp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageContentResp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.contents = [];
        if (message.contents && message.contents.length) {
            object.contents = [];
            for (var j = 0; j < message.contents.length; ++j)
                object.contents[j] = $root.MessageContent.toObject(message.contents[j], options);
        }
        return object;
    };

    /**
     * Converts this MessageContentResp to JSON.
     * @function toJSON
     * @memberof MessageContentResp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageContentResp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MessageContentResp;
})();

$root.TokenSession = (function() {

    /**
     * Properties of a TokenSession.
     * @exports ITokenSession
     * @interface ITokenSession
     * @property {Long|null} [userId] TokenSession userId
     * @property {string|null} [terminal] TokenSession terminal
     */

    /**
     * Constructs a new TokenSession.
     * @exports TokenSession
     * @classdesc Represents a TokenSession.
     * @implements ITokenSession
     * @constructor
     * @param {ITokenSession=} [properties] Properties to set
     */
    function TokenSession(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TokenSession userId.
     * @member {Long} userId
     * @memberof TokenSession
     * @instance
     */
    TokenSession.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * TokenSession terminal.
     * @member {string} terminal
     * @memberof TokenSession
     * @instance
     */
    TokenSession.prototype.terminal = "";

    /**
     * Creates a new TokenSession instance using the specified properties.
     * @function create
     * @memberof TokenSession
     * @static
     * @param {ITokenSession=} [properties] Properties to set
     * @returns {TokenSession} TokenSession instance
     */
    TokenSession.create = function create(properties) {
        return new TokenSession(properties);
    };

    /**
     * Encodes the specified TokenSession message. Does not implicitly {@link TokenSession.verify|verify} messages.
     * @function encode
     * @memberof TokenSession
     * @static
     * @param {ITokenSession} message TokenSession message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TokenSession.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.userId);
        if (message.terminal != null && Object.hasOwnProperty.call(message, "terminal"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.terminal);
        return writer;
    };

    /**
     * Encodes the specified TokenSession message, length delimited. Does not implicitly {@link TokenSession.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TokenSession
     * @static
     * @param {ITokenSession} message TokenSession message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TokenSession.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TokenSession message from the specified reader or buffer.
     * @function decode
     * @memberof TokenSession
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TokenSession} TokenSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TokenSession.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TokenSession();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int64();
                break;
            case 2:
                message.terminal = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TokenSession message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TokenSession
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TokenSession} TokenSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TokenSession.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TokenSession message.
     * @function verify
     * @memberof TokenSession
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TokenSession.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                return "userId: integer|Long expected";
        if (message.terminal != null && message.hasOwnProperty("terminal"))
            if (!$util.isString(message.terminal))
                return "terminal: string expected";
        return null;
    };

    /**
     * Creates a TokenSession message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TokenSession
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TokenSession} TokenSession
     */
    TokenSession.fromObject = function fromObject(object) {
        if (object instanceof $root.TokenSession)
            return object;
        var message = new $root.TokenSession();
        if (object.userId != null)
            if ($util.Long)
                (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
            else if (typeof object.userId === "string")
                message.userId = parseInt(object.userId, 10);
            else if (typeof object.userId === "number")
                message.userId = object.userId;
            else if (typeof object.userId === "object")
                message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
        if (object.terminal != null)
            message.terminal = String(object.terminal);
        return message;
    };

    /**
     * Creates a plain object from a TokenSession message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TokenSession
     * @static
     * @param {TokenSession} message TokenSession
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TokenSession.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.userId = options.longs === String ? "0" : 0;
            object.terminal = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (typeof message.userId === "number")
                object.userId = options.longs === String ? String(message.userId) : message.userId;
            else
                object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
        if (message.terminal != null && message.hasOwnProperty("terminal"))
            object.terminal = message.terminal;
        return object;
    };

    /**
     * Converts this TokenSession to JSON.
     * @function toJSON
     * @memberof TokenSession
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TokenSession.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TokenSession;
})();

module.exports = $root;
