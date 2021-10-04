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
      LoginReq: {
        fields: {
          token: {
            type: "string",
            id: 1
          }
        }
      },
      LoginResp: {
        fields: {
          channelId: {
            type: "string",
            id: 1
          },
          userId: {
            type: "int64",
            id: 2
          }
        }
      },
      KickoutNotify: {
        fields: {
          channelId: {
            type: "string",
            id: 1
          }
        }
      },
      Session: {
        fields: {
          channelId: {
            type: "string",
            id: 1
          },
          userId: {
            type: "int64",
            id: 2
          },
          terminal: {
            type: "string",
            id: 3
          }
        }
      },
      Location: {
        fields: {
          channelId: {
            type: "string",
            id: 1
          }
        }
      },
      MessageReq: {
        fields: {
          type: {
            type: "int32",
            id: 1
          },
          body: {
            type: "string",
            id: 2
          },
          dest: {
            type: "int64",
            id: 3
          },
          extra: {
            type: "string",
            id: 4
          }
        }
      },
      MessageResp: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          },
          sendTime: {
            type: "int64",
            id: 2
          }
        }
      },
      MessagePush: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          },
          type: {
            type: "int32",
            id: 2
          },
          body: {
            type: "string",
            id: 3
          },
          extra: {
            type: "string",
            id: 4
          },
          sender: {
            type: "int64",
            id: 5
          },
          sendTime: {
            type: "int64",
            id: 6
          }
        }
      },
      ErrorResp: {
        fields: {
          message: {
            type: "string",
            id: 1
          }
        }
      },
      MessageAckReq: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          }
        }
      },
      GroupCreateReq: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          avatar: {
            type: "string",
            id: 2
          },
          introduction: {
            type: "string",
            id: 3
          },
          owner: {
            type: "string",
            id: 4
          },
          members: {
            rule: "repeated",
            type: "string",
            id: 5
          }
        }
      },
      GroupCreateResp: {
        fields: {
          groupId: {
            type: "string",
            id: 1
          }
        }
      },
      GroupCreateNotify: {
        fields: {
          groupId: {
            type: "string",
            id: 1
          },
          members: {
            rule: "repeated",
            type: "string",
            id: 2
          }
        }
      },
      GroupJoinReq: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          groupId: {
            type: "string",
            id: 2
          }
        }
      },
      GroupQuitReq: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          groupId: {
            type: "string",
            id: 2
          }
        }
      },
      GroupGetReq: {
        fields: {
          groupId: {
            type: "string",
            id: 1
          }
        }
      },
      Member: {
        fields: {
          account: {
            type: "string",
            id: 1
          },
          alias: {
            type: "string",
            id: 2
          },
          avatar: {
            type: "string",
            id: 3
          },
          joinTime: {
            type: "int64",
            id: 4
          }
        }
      },
      GroupGetResp: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          avatar: {
            type: "string",
            id: 3
          },
          introduction: {
            type: "string",
            id: 4
          },
          owner: {
            type: "string",
            id: 5
          },
          members: {
            rule: "repeated",
            type: "Member",
            id: 6
          },
          createdAt: {
            type: "int64",
            id: 7
          }
        }
      },
      GroupJoinNotify: {
        fields: {
          groupId: {
            type: "string",
            id: 1
          },
          account: {
            type: "string",
            id: 2
          }
        }
      },
      GroupQuitNotify: {
        fields: {
          groupId: {
            type: "string",
            id: 1
          },
          account: {
            type: "string",
            id: 2
          }
        }
      },
      MessageIndexReq: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          }
        }
      },
      MessageIndexResp: {
        fields: {
          indexes: {
            rule: "repeated",
            type: "MessageIndex",
            id: 1
          }
        }
      },
      MessageIndex: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          },
          direction: {
            type: "int32",
            id: 2
          },
          sendTime: {
            type: "int64",
            id: 3
          },
          userB: {
            type: "int64",
            id: 4
          },
          group: {
            type: "string",
            id: 5
          }
        }
      },
      MessageContentReq: {
        fields: {
          messageIds: {
            rule: "repeated",
            type: "int64",
            id: 1
          }
        }
      },
      MessageContent: {
        fields: {
          messageId: {
            type: "int64",
            id: 1
          },
          type: {
            type: "int32",
            id: 2
          },
          body: {
            type: "string",
            id: 3
          },
          extra: {
            type: "string",
            id: 4
          }
        }
      },
      MessageContentResp: {
        fields: {
          contents: {
            rule: "repeated",
            type: "MessageContent",
            id: 1
          }
        }
      },
      TokenSession: {
        fields: {
          userId: {
            type: "int64",
            id: 1
          },
          terminal: {
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;
