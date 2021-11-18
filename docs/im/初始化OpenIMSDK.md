https://forum.rentsoft.cn/thread/56

【OpenIM原创】uni-app使用之 初始化会话 消息 好友 监听器

***\*写在前面\****

**Open-IM是由前微信技术专家打造的** ***\*开源\**** **的即时通讯组件。Open-IM包括IM服务端和客户端SDK，实现了高性能、轻量级、易扩展等重要特性。开发者通过集成Open-IM组件，并私有化部署服务端，可以将即时通讯、实时网络能力快速集成到自身应用中，并确保业务数据的安全性和私密性。**

##### **了解更多原创文章：**

[**【OpenIM原创】开源OpenIM：轻量、高效、实时、可靠、低成本的消息模型**](https://forum.rentsoft.cn/thread/1)

[**【OpenIM原创】C/C++调用golang函数，golang回调C/C++函数**](https://forum.rentsoft.cn/thread/36)

[**【OpenIM原创】简单轻松入门 一文讲解WebRTC实现1对1音视频通信原理**](https://forum.rentsoft.cn/thread/4)

[**【OpenIM扩展】OpenIM服务发现和负载均衡golang插件：gRPC接入etcdv3**](https://forum.rentsoft.cn/thread/2)

[**【开源OpenIM】高性能、可伸缩、易扩展的即时通讯架构**](https://forum.rentsoft.cn/thread/3)

##### ***\*如果您有兴趣可以在文章结尾了解到更多关于我们的信息，期待着与您的交流合作。\****

**在初始化SDK前需要先初始化部分全局监听器，初始化成功后可在合适的时机通过globalEvent对相关回调进行监听。**

```
// 会话监听
this.$openSdk.setConversationListener();
// 消息状态监听
this.$openSdk.addAdvancedMsgListener();
// 群组监听
this.$openSdk.setGroupListener()
// 好友监听
this.$openSdk.setFriendListener();
```

- **会话监听回调列表**

| **event**                            | **说明**             |
| ------------------------------------ | -------------------- |
| **onConversationChanged**            | **会话列表改变**     |
| **onNewConversation**                | **新会话**           |
| **onSyncServerFailed**               | **-**                |
| **onSyncServerFinish**               | **-**                |
| **onSyncServerStart**                | **-**                |
| **onTotalUnreadMessageCountChanged** | **消息未读总数改变** |

- **消息状态监听回调列表**

| **event**                | **说明**             |
| ------------------------ | -------------------- |
| **onRecvNewMessage**     | **接收到新消息**     |
| **onRecvMessageRevoked** | **其他用户撤回通知** |
| **onRecvC2CReadReceipt** | **对方实时已读通知** |

- **群组监听回调列表**

| **event**                    | **说明**           |
| ---------------------------- | ------------------ |
| **onApplicationProcessed**   | **入群申请被处理** |
| **onGroupCreated**           | **群组创建**       |
| **onGroupInfoChanged**       | **群组信息改变**   |
| **onMemberEnter**            | **新成员加入群组** |
| **onMemberInvited**          | **邀请成员加入**   |
| **onMemberKicked**           | **踢出成员**       |
| **onMemberLeave**            | **成员退群**       |
| **onReceiveJoinApplication** | **收到入群申请**   |

- **好友监听回调列表**

| **event**                          | **说明**             |
| ---------------------------------- | -------------------- |
| **onBlackListAdd**                 | **添加黑名单**       |
| **onBlackListDeleted**             | **移除黑名单**       |
| **onFriendApplicationListAccept**  | **接受好友请求**     |
| **onFriendApplicationListAdded**   | **好友请求列表增加** |
| **onFriendApplicationListDeleted** | **好友请求列表减少** |
| **onFriendApplicationListReject**  | **拒绝好友请求**     |
| **onFriendInfoChanged**            | **好友信息更新**     |
| **onFriendListAdded**              | **好友列表增加**     |
| **onFriendListDeleted**            | **好友列表减少**     |

# **2. 初始化OpenIMSDK**

```
const config = {
    platform: 1,    //平台类型
    ipApi: "http://1.14.194.38:10000",    //api域名地址
    ipWs: "ws://1.14.194.38:17778",    //websocket地址
    /**
    * ps:上述配置适合于通过ip访问  若通过域名且配置了https证书请使用如下配置方式
    * ipApi: "https://open-im.rentsoft.cn",
    * ipWs: "wss://open-im.rentsoft.cn/wss",
    */
    dbDir,    //SDK数据存放目录
}
//返回值为布尔值告知是否初始化成功
this.flag = this.$openSdk.initSDK(config);
```

- dbDir为SDK初始化目录绝对路径，可通过H5+API获取

  ```
  plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
      fs.root.getDirectory(
          "user", {
              create: true,
          },
          (entry) => {
              //初始化SDK
              ...
          },
          (error) => {
              console.log(error);
          }
      );
  });
  ```

#### **初始化SDK成功后会设置一个网络连接状态的回调监听，但回调在调用登录之后才会进行返回。**

- **初始化监听回调事件**

| **event**              | **说明**          |
| ---------------------- | ----------------- |
| **initStatus**         | **初始化状态**    |
| **onConnectFailed**    | **连接失败**      |
| **onConnectSuccess**   | **连接成功**      |
| **onConnecting**       | **连接中**        |
| **onKickedOffline**    | **被踢下线**      |
| **onSelfInfoUpdated**  | **修改个人信息**  |
| **onUserTokenExpired** | **账号token过期** |

***\*OpenIM github开源地址：\****

https://github.com/OpenIMSDK/Open-IM-Server

***\*OpenIM官网 ：\**** [https://www.rentsoft.cn](https://www.rentsoft.cn/)

***\*OpenIM官方论坛：\**** [https://forum.rentsoft.cn](https://forum.rentsoft.cn/)

***\*我们致力于通过开源模式，为全球企业/开发者提供简单、易用、高效的IM服务和实时音视频通讯能力，帮助开发者降低项目的开发成本，并让开发者掌控业务的核心数据。\****

***\*IM作为核心业务数据，安全的重要性毋庸置疑，OpenIM开源以及私有化部署让企业能更放心使用。\****

***\*如今IM云服务商收费高企，如何让企业低成本、安全、可靠接入IM服务，是OpenIM的历史使命，也是我们前进的方向。\****

***如您有技术上面的高见欢迎留言沟通方便的话我拉您进我们的交流群，用户也可与我们的技术人员谈讨使用方面的难题以及见解*** 