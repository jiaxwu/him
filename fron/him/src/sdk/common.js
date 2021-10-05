/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Status enum.
 * @exports Status
 * @enum {number}
 * @property {number} Success=0 Success value
 * @property {number} NoDestination=100 NoDestination value
 * @property {number} InvalidPacketBody=101 InvalidPacketBody value
 * @property {number} InvalidCommand=103 InvalidCommand value
 * @property {number} Unauthorized=105 Unauthorized value
 * @property {number} SystemException=300 SystemException value
 * @property {number} NotImplemented=301 NotImplemented value
 * @property {number} SessionNotFound=404 SessionNotFound value
 */
$root.Status = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Success"] = 0;
    values[valuesById[100] = "NoDestination"] = 100;
    values[valuesById[101] = "InvalidPacketBody"] = 101;
    values[valuesById[103] = "InvalidCommand"] = 103;
    values[valuesById[105] = "Unauthorized"] = 105;
    values[valuesById[300] = "SystemException"] = 300;
    values[valuesById[301] = "NotImplemented"] = 301;
    values[valuesById[404] = "SessionNotFound"] = 404;
    return values;
})();

/**
 * MetaType enum.
 * @exports MetaType
 * @enum {number}
 * @property {number} int=0 int value
 * @property {number} string=1 string value
 * @property {number} float=2 float value
 */
$root.MetaType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "int"] = 0;
    values[valuesById[1] = "string"] = 1;
    values[valuesById[2] = "float"] = 2;
    return values;
})();

/**
 * ContentType enum.
 * @exports ContentType
 * @enum {number}
 * @property {number} Protobuf=0 Protobuf value
 * @property {number} Json=1 Json value
 */
$root.ContentType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Protobuf"] = 0;
    values[valuesById[1] = "Json"] = 1;
    return values;
})();

/**
 * Flag enum.
 * @exports Flag
 * @enum {number}
 * @property {number} Request=0 Request value
 * @property {number} Response=1 Response value
 * @property {number} Push=2 Push value
 */
$root.Flag = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "Request"] = 0;
    values[valuesById[1] = "Response"] = 1;
    values[valuesById[2] = "Push"] = 2;
    return values;
})();

$root.Meta = (function() {

    /**
     * Properties of a Meta.
     * @exports IMeta
     * @interface IMeta
     * @property {string|null} [key] Meta key
     * @property {string|null} [value] Meta value
     * @property {MetaType|null} [type] Meta type
     */

    /**
     * Constructs a new Meta.
     * @exports Meta
     * @classdesc Represents a Meta.
     * @implements IMeta
     * @constructor
     * @param {IMeta=} [properties] Properties to set
     */
    function Meta(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Meta key.
     * @member {string} key
     * @memberof Meta
     * @instance
     */
    Meta.prototype.key = "";

    /**
     * Meta value.
     * @member {string} value
     * @memberof Meta
     * @instance
     */
    Meta.prototype.value = "";

    /**
     * Meta type.
     * @member {MetaType} type
     * @memberof Meta
     * @instance
     */
    Meta.prototype.type = 0;

    /**
     * Creates a new Meta instance using the specified properties.
     * @function create
     * @memberof Meta
     * @static
     * @param {IMeta=} [properties] Properties to set
     * @returns {Meta} Meta instance
     */
    Meta.create = function create(properties) {
        return new Meta(properties);
    };

    /**
     * Encodes the specified Meta message. Does not implicitly {@link Meta.verify|verify} messages.
     * @function encode
     * @memberof Meta
     * @static
     * @param {IMeta} message Meta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meta.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
        return writer;
    };

    /**
     * Encodes the specified Meta message, length delimited. Does not implicitly {@link Meta.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Meta
     * @static
     * @param {IMeta} message Meta message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Meta.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Meta message from the specified reader or buffer.
     * @function decode
     * @memberof Meta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Meta} Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meta.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Meta();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.key = reader.string();
                break;
            case 2:
                message.value = reader.string();
                break;
            case 3:
                message.type = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Meta message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Meta
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Meta} Meta
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Meta.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Meta message.
     * @function verify
     * @memberof Meta
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Meta.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.key != null && message.hasOwnProperty("key"))
            if (!$util.isString(message.key))
                return "key: string expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isString(message.value))
                return "value: string expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a Meta message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Meta
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Meta} Meta
     */
    Meta.fromObject = function fromObject(object) {
        if (object instanceof $root.Meta)
            return object;
        var message = new $root.Meta();
        if (object.key != null)
            message.key = String(object.key);
        if (object.value != null)
            message.value = String(object.value);
        switch (object.type) {
        case "int":
        case 0:
            message.type = 0;
            break;
        case "string":
        case 1:
            message.type = 1;
            break;
        case "float":
        case 2:
            message.type = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Meta message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Meta
     * @static
     * @param {Meta} message Meta
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Meta.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.key = "";
            object.value = "";
            object.type = options.enums === String ? "int" : 0;
        }
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = message.key;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.MetaType[message.type] : message.type;
        return object;
    };

    /**
     * Converts this Meta to JSON.
     * @function toJSON
     * @memberof Meta
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Meta.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Meta;
})();

$root.Header = (function() {

    /**
     * Properties of a Header.
     * @exports IHeader
     * @interface IHeader
     * @property {string|null} [command] Header command
     * @property {number|null} [sequence] Header sequence
     * @property {Flag|null} [flag] Header flag
     * @property {Status|null} [status] Header status
     */

    /**
     * Constructs a new Header.
     * @exports Header
     * @classdesc Represents a Header.
     * @implements IHeader
     * @constructor
     * @param {IHeader=} [properties] Properties to set
     */
    function Header(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Header command.
     * @member {string} command
     * @memberof Header
     * @instance
     */
    Header.prototype.command = "";

    /**
     * Header sequence.
     * @member {number} sequence
     * @memberof Header
     * @instance
     */
    Header.prototype.sequence = 0;

    /**
     * Header flag.
     * @member {Flag} flag
     * @memberof Header
     * @instance
     */
    Header.prototype.flag = 0;

    /**
     * Header status.
     * @member {Status} status
     * @memberof Header
     * @instance
     */
    Header.prototype.status = 0;

    /**
     * Creates a new Header instance using the specified properties.
     * @function create
     * @memberof Header
     * @static
     * @param {IHeader=} [properties] Properties to set
     * @returns {Header} Header instance
     */
    Header.create = function create(properties) {
        return new Header(properties);
    };

    /**
     * Encodes the specified Header message. Does not implicitly {@link Header.verify|verify} messages.
     * @function encode
     * @memberof Header
     * @static
     * @param {IHeader} message Header message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Header.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.command != null && Object.hasOwnProperty.call(message, "command"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.command);
        if (message.sequence != null && Object.hasOwnProperty.call(message, "sequence"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.sequence);
        if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.flag);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
        return writer;
    };

    /**
     * Encodes the specified Header message, length delimited. Does not implicitly {@link Header.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Header
     * @static
     * @param {IHeader} message Header message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Header.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Header message from the specified reader or buffer.
     * @function decode
     * @memberof Header
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Header} Header
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Header.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Header();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.command = reader.string();
                break;
            case 2:
                message.sequence = reader.uint32();
                break;
            case 3:
                message.flag = reader.int32();
                break;
            case 4:
                message.status = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Header message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Header
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Header} Header
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Header.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Header message.
     * @function verify
     * @memberof Header
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Header.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.command != null && message.hasOwnProperty("command"))
            if (!$util.isString(message.command))
                return "command: string expected";
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            if (!$util.isInteger(message.sequence))
                return "sequence: integer expected";
        if (message.flag != null && message.hasOwnProperty("flag"))
            switch (message.flag) {
            default:
                return "flag: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 100:
            case 101:
            case 103:
            case 105:
            case 300:
            case 301:
            case 404:
                break;
            }
        return null;
    };

    /**
     * Creates a Header message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Header
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Header} Header
     */
    Header.fromObject = function fromObject(object) {
        if (object instanceof $root.Header)
            return object;
        var message = new $root.Header();
        if (object.command != null)
            message.command = String(object.command);
        if (object.sequence != null)
            message.sequence = object.sequence >>> 0;
        switch (object.flag) {
        case "Request":
        case 0:
            message.flag = 0;
            break;
        case "Response":
        case 1:
            message.flag = 1;
            break;
        case "Push":
        case 2:
            message.flag = 2;
            break;
        }
        switch (object.status) {
        case "Success":
        case 0:
            message.status = 0;
            break;
        case "NoDestination":
        case 100:
            message.status = 100;
            break;
        case "InvalidPacketBody":
        case 101:
            message.status = 101;
            break;
        case "InvalidCommand":
        case 103:
            message.status = 103;
            break;
        case "Unauthorized":
        case 105:
            message.status = 105;
            break;
        case "SystemException":
        case 300:
            message.status = 300;
            break;
        case "NotImplemented":
        case 301:
            message.status = 301;
            break;
        case "SessionNotFound":
        case 404:
            message.status = 404;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a Header message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Header
     * @static
     * @param {Header} message Header
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Header.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.command = "";
            object.sequence = 0;
            object.flag = options.enums === String ? "Request" : 0;
            object.status = options.enums === String ? "Success" : 0;
        }
        if (message.command != null && message.hasOwnProperty("command"))
            object.command = message.command;
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            object.sequence = message.sequence;
        if (message.flag != null && message.hasOwnProperty("flag"))
            object.flag = options.enums === String ? $root.Flag[message.flag] : message.flag;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.Status[message.status] : message.status;
        return object;
    };

    /**
     * Converts this Header to JSON.
     * @function toJSON
     * @memberof Header
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Header.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Header;
})();

$root.InnerHandshakeReq = (function() {

    /**
     * Properties of an InnerHandshakeReq.
     * @exports IInnerHandshakeReq
     * @interface IInnerHandshakeReq
     * @property {string|null} [ServiceId] InnerHandshakeReq ServiceId
     */

    /**
     * Constructs a new InnerHandshakeReq.
     * @exports InnerHandshakeReq
     * @classdesc Represents an InnerHandshakeReq.
     * @implements IInnerHandshakeReq
     * @constructor
     * @param {IInnerHandshakeReq=} [properties] Properties to set
     */
    function InnerHandshakeReq(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * InnerHandshakeReq ServiceId.
     * @member {string} ServiceId
     * @memberof InnerHandshakeReq
     * @instance
     */
    InnerHandshakeReq.prototype.ServiceId = "";

    /**
     * Creates a new InnerHandshakeReq instance using the specified properties.
     * @function create
     * @memberof InnerHandshakeReq
     * @static
     * @param {IInnerHandshakeReq=} [properties] Properties to set
     * @returns {InnerHandshakeReq} InnerHandshakeReq instance
     */
    InnerHandshakeReq.create = function create(properties) {
        return new InnerHandshakeReq(properties);
    };

    /**
     * Encodes the specified InnerHandshakeReq message. Does not implicitly {@link InnerHandshakeReq.verify|verify} messages.
     * @function encode
     * @memberof InnerHandshakeReq
     * @static
     * @param {IInnerHandshakeReq} message InnerHandshakeReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InnerHandshakeReq.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ServiceId != null && Object.hasOwnProperty.call(message, "ServiceId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.ServiceId);
        return writer;
    };

    /**
     * Encodes the specified InnerHandshakeReq message, length delimited. Does not implicitly {@link InnerHandshakeReq.verify|verify} messages.
     * @function encodeDelimited
     * @memberof InnerHandshakeReq
     * @static
     * @param {IInnerHandshakeReq} message InnerHandshakeReq message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InnerHandshakeReq.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an InnerHandshakeReq message from the specified reader or buffer.
     * @function decode
     * @memberof InnerHandshakeReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {InnerHandshakeReq} InnerHandshakeReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InnerHandshakeReq.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InnerHandshakeReq();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.ServiceId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an InnerHandshakeReq message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof InnerHandshakeReq
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {InnerHandshakeReq} InnerHandshakeReq
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InnerHandshakeReq.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an InnerHandshakeReq message.
     * @function verify
     * @memberof InnerHandshakeReq
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    InnerHandshakeReq.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ServiceId != null && message.hasOwnProperty("ServiceId"))
            if (!$util.isString(message.ServiceId))
                return "ServiceId: string expected";
        return null;
    };

    /**
     * Creates an InnerHandshakeReq message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof InnerHandshakeReq
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {InnerHandshakeReq} InnerHandshakeReq
     */
    InnerHandshakeReq.fromObject = function fromObject(object) {
        if (object instanceof $root.InnerHandshakeReq)
            return object;
        var message = new $root.InnerHandshakeReq();
        if (object.ServiceId != null)
            message.ServiceId = String(object.ServiceId);
        return message;
    };

    /**
     * Creates a plain object from an InnerHandshakeReq message. Also converts values to other types if specified.
     * @function toObject
     * @memberof InnerHandshakeReq
     * @static
     * @param {InnerHandshakeReq} message InnerHandshakeReq
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    InnerHandshakeReq.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.ServiceId = "";
        if (message.ServiceId != null && message.hasOwnProperty("ServiceId"))
            object.ServiceId = message.ServiceId;
        return object;
    };

    /**
     * Converts this InnerHandshakeReq to JSON.
     * @function toJSON
     * @memberof InnerHandshakeReq
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    InnerHandshakeReq.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return InnerHandshakeReq;
})();

$root.InnerHandshakeResponse = (function() {

    /**
     * Properties of an InnerHandshakeResponse.
     * @exports IInnerHandshakeResponse
     * @interface IInnerHandshakeResponse
     * @property {number|null} [Code] InnerHandshakeResponse Code
     * @property {string|null} [Error] InnerHandshakeResponse Error
     */

    /**
     * Constructs a new InnerHandshakeResponse.
     * @exports InnerHandshakeResponse
     * @classdesc Represents an InnerHandshakeResponse.
     * @implements IInnerHandshakeResponse
     * @constructor
     * @param {IInnerHandshakeResponse=} [properties] Properties to set
     */
    function InnerHandshakeResponse(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * InnerHandshakeResponse Code.
     * @member {number} Code
     * @memberof InnerHandshakeResponse
     * @instance
     */
    InnerHandshakeResponse.prototype.Code = 0;

    /**
     * InnerHandshakeResponse Error.
     * @member {string} Error
     * @memberof InnerHandshakeResponse
     * @instance
     */
    InnerHandshakeResponse.prototype.Error = "";

    /**
     * Creates a new InnerHandshakeResponse instance using the specified properties.
     * @function create
     * @memberof InnerHandshakeResponse
     * @static
     * @param {IInnerHandshakeResponse=} [properties] Properties to set
     * @returns {InnerHandshakeResponse} InnerHandshakeResponse instance
     */
    InnerHandshakeResponse.create = function create(properties) {
        return new InnerHandshakeResponse(properties);
    };

    /**
     * Encodes the specified InnerHandshakeResponse message. Does not implicitly {@link InnerHandshakeResponse.verify|verify} messages.
     * @function encode
     * @memberof InnerHandshakeResponse
     * @static
     * @param {IInnerHandshakeResponse} message InnerHandshakeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InnerHandshakeResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.Code != null && Object.hasOwnProperty.call(message, "Code"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Code);
        if (message.Error != null && Object.hasOwnProperty.call(message, "Error"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Error);
        return writer;
    };

    /**
     * Encodes the specified InnerHandshakeResponse message, length delimited. Does not implicitly {@link InnerHandshakeResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof InnerHandshakeResponse
     * @static
     * @param {IInnerHandshakeResponse} message InnerHandshakeResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InnerHandshakeResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an InnerHandshakeResponse message from the specified reader or buffer.
     * @function decode
     * @memberof InnerHandshakeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {InnerHandshakeResponse} InnerHandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InnerHandshakeResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InnerHandshakeResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.Code = reader.uint32();
                break;
            case 2:
                message.Error = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an InnerHandshakeResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof InnerHandshakeResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {InnerHandshakeResponse} InnerHandshakeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InnerHandshakeResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an InnerHandshakeResponse message.
     * @function verify
     * @memberof InnerHandshakeResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    InnerHandshakeResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.Code != null && message.hasOwnProperty("Code"))
            if (!$util.isInteger(message.Code))
                return "Code: integer expected";
        if (message.Error != null && message.hasOwnProperty("Error"))
            if (!$util.isString(message.Error))
                return "Error: string expected";
        return null;
    };

    /**
     * Creates an InnerHandshakeResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof InnerHandshakeResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {InnerHandshakeResponse} InnerHandshakeResponse
     */
    InnerHandshakeResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.InnerHandshakeResponse)
            return object;
        var message = new $root.InnerHandshakeResponse();
        if (object.Code != null)
            message.Code = object.Code >>> 0;
        if (object.Error != null)
            message.Error = String(object.Error);
        return message;
    };

    /**
     * Creates a plain object from an InnerHandshakeResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof InnerHandshakeResponse
     * @static
     * @param {InnerHandshakeResponse} message InnerHandshakeResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    InnerHandshakeResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.Code = 0;
            object.Error = "";
        }
        if (message.Code != null && message.hasOwnProperty("Code"))
            object.Code = message.Code;
        if (message.Error != null && message.hasOwnProperty("Error"))
            object.Error = message.Error;
        return object;
    };

    /**
     * Converts this InnerHandshakeResponse to JSON.
     * @function toJSON
     * @memberof InnerHandshakeResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    InnerHandshakeResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return InnerHandshakeResponse;
})();

module.exports = $root;
