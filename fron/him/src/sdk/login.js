import { w3cwebsocket } from "websocket";
import { Buffer } from "buffer";
import { Command, LogicPkt } from "./packet";
import common from "./common";
import protocol from "./protocol";

const loginTimeout = 10 * 1000; // 10秒

const LoginReq = protocol.LoginReq;
const LoginResp = protocol.LoginResp;

const Status = common.Status

export class LoginBody {
  token;
  constructor(token) {
    this.token = token;
  }
}

// 这个方法是进行登录操作
// url: 连接, req: LoginBody
// return: Promise<{ success: boolean, err?: Error, channelId?: string, account?: string, conn: w3cwebsocket }>
export let doLogin = async (url, req) => {
  return new Promise((resolve) => {
    let conn = new w3cwebsocket(url);
    conn.binaryType = "arraybuffer";

    // 设置一个登陆超时器
    let tr = setTimeout(() => {
      clearTimeout(tr);
      resolve({
        success: false,
        err: new Error("timeout"),
        conn: conn,
      });
    }, loginTimeout);

    // 这里其实就是进行login操作
    conn.onopen = () => {
      if (conn.readyState == w3cwebsocket.OPEN) {
        console.log(`doLogin:onopen:进行登录：${req.token}`);
        let pbreq = LoginReq.encode(LoginReq.fromObject(req)).finish();
        let loginpkt = LogicPkt.build(Command.SignIn, pbreq);
        let buf = loginpkt.bytes();
        conn.send(buf);
      }
    };

    // 登录出错的回调
    conn.onerror = (error) => {
      clearTimeout(tr);
      console.log(`doLogin:onerror:登录出错: ${error}`);
      resolve({
        success: false,
        err: error,
        conn: conn,
      });
    };

    // 接收登录结果
    conn.onmessage = (evt) => {
      // 处理收到的非登录结果消息
      if (typeof evt.data === "string") {
        console.log(
          "doLogin:onmessage:收到了意料之外的数据：'" + evt.data + "'"
        );
        return;
      }

      // 处理登录结果
      clearTimeout(tr);
      let buf = Buffer.from(evt.data);
      let loginResp = LogicPkt.from(buf);
      if (loginResp.status != Status.Success) {
        console.log("doLogin:onmessage:登录失败:" + loginResp.status);
        resolve({
          success: false,
          err: new Error(`响应的status是 ${loginResp.status}`),
          conn: conn,
        });
        return;
      }
      let resp = LoginResp.decode(loginResp.payload);
      console.log(`doLogin:onmessage:登录成功：channelId=${resp.channelId}:userId=${resp.userId}`)
      resolve({
        success: true,
        channelId: resp.channelId,
        userId: resp.userId,
        conn: conn,
      });
    };
  });
};
