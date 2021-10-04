/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  pkt: {
    options: {
      go_package: "./pkt"
    },
    nested: {
      Status: {
        values: {
          Success: 0,
          NoDestination: 100,
          InvalidPacketBody: 101,
          InvalidCommand: 103,
          Unauthorized: 105,
          SystemException: 300,
          NotImplemented: 301,
          SessionNotFound: 404
        }
      },
      MetaType: {
        values: {
          int: 0,
          string: 1,
          float: 2
        }
      },
      ContentType: {
        values: {
          Protobuf: 0,
          Json: 1
        }
      },
      Flag: {
        values: {
          Request: 0,
          Response: 1,
          Push: 2
        }
      },
      Meta: {
        fields: {
          key: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          },
          type: {
            type: "MetaType",
            id: 3
          }
        }
      },
      Header: {
        fields: {
          command: {
            type: "string",
            id: 1
          },
          sequence: {
            type: "uint32",
            id: 2
          },
          flag: {
            type: "Flag",
            id: 3
          },
          status: {
            type: "Status",
            id: 4
          }
        }
      },
      InnerHandshakeReq: {
        fields: {
          ServiceId: {
            type: "string",
            id: 1
          }
        }
      },
      InnerHandshakeResponse: {
        fields: {
          Code: {
            type: "uint32",
            id: 1
          },
          Error: {
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;
