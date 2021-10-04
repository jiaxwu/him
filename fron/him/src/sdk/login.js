import { w3cwebsocket } from "websocket";
import { Buffer } from "buffer";
import { Command, LogicPkt } from "./packet";
import common from "./common";
import protocol from "./protocol";

const loginTimeout = 10 * 1000; // 10秒

const LoginReq = protocol.lookupType("pkt.LoginReq");
const LoginResp = protocol.lookupType("pkt.LoginResp");

const Status = {
  Success: common.lookupEnum("pkt.Status").values.Success,
};

export class LoginBody {
  token;
  constructor(token) {
    this.token = token;
  }
}

// url 连接
// req LoginBody
// Promise<{ success: boolean, err?: Error, channelId?: string, account?: string, conn: w3cwebsocket }>
export let doLogin = async (url, req) => {
  return new Promise((resolve) => {
    let conn = new w3cwebsocket(url);
    conn.binaryType = "arraybuffer";

    // 设置一个登陆超时器
    let tr = setTimeout(() => {
      clearTimeout(tr);
      resolve({ success: false, err: new Error("timeout"), conn: conn });
    }, loginTimeout);

    conn.onopen = () => {
      if (conn.readyState == w3cwebsocket.OPEN) {
        console.info(`connection established, send ${req}`);
        // send handshake request
        let pbreq = LoginReq.encode(LoginReq.fromObject(req)).finish();
        let loginpkt = LogicPkt.build(Command.SignIn, pbreq);
        let buf = loginpkt.bytes();
        console.debug(`dologin send [${buf.join(",")}]`);
        conn.send(buf);
      }
    };
    conn.onerror = (error) => {
      clearTimeout(tr);
      console.warn(error);
      resolve({ success: false, err: error, conn: conn });
    };

    conn.onmessage = (evt) => {
      if (typeof evt.data === "string") {
        console.warn("Received: '" + evt.data + "'");
        return;
      }
      clearTimeout(tr);
      // wating for login response
      let buf = Buffer.from(evt.data);
      let loginResp = LogicPkt.from(buf);
      if (loginResp.status != Status.Success) {
        console.error("Login failed: " + loginResp.status);
        resolve({
          success: false,
          err: new Error(`response status is ${loginResp.status}`),
          conn: conn,
        });
        return;
      }
      let resp = LoginResp.decode(loginResp.payload);
      resolve({
        success: true,
        channelId: resp.channelId,
        account: resp.account,
        conn: conn,
      });
    };
  });
};
