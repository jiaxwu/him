
【OpenIM原创】uni-app使用之 初始化OpenIM SDK

###### ***\*写在前面\****

**Open-IM是由前微信技术专家打造的**开源**的即时通讯组件。Open-IM包括IM服务端和客户端SDK，实现了高性能、轻量级、易扩展等重要特性。开发者通过集成Open-IM组件，并私有化部署服务端，可以将即时通讯、实时网络能力快速集成到自身应用中，并确保业务数据的安全性和私密性。**

**创始团队来自前微信高级架构师、IM/WebRTC专家团队，我们致力于用开源技术创造服务价值，打造轻量级、高可用的IM架构，开发者只需简单调用 SDK，即可在应用内构建多种即时通讯及实时音视频互动场景。**

**IM作为核心业务数据，安全的重要性毋庸置疑，OpenIM开源以及私有化部署让企业能更放心使用。**

**如今IM云服务商收费高企，如何让企业低成本、安全、可靠接入IM服务，是OpenIM的历史使命，也是我们前进的方向。**

![img](https://pic3.zhimg.com/80/v2-93c39bf1abd2e4e6e86d85640ecaf04e_720w.png)

###### **了解更多原创文章：**

[**【OpenIM原创】开源OpenIM：轻量、高效、实时、可靠、低成本的消息模型**](https://forum.rentsoft.cn/thread/1)

[**【OpenIM原创】C/C++调用golang函数，golang回调C/C++函数**](https://forum.rentsoft.cn/thread/36)

[**【OpenIM原创】简单轻松入门 一文讲解WebRTC实现1对1音视频通信原理**](https://forum.rentsoft.cn/thread/4)

[**【OpenIM扩展】OpenIM服务发现和负载均衡golang插件：gRPC接入etcdv3**](https://forum.rentsoft.cn/thread/2)

[**【开源OpenIM】高性能、可伸缩、易扩展的即时通讯架构**](https://forum.rentsoft.cn/thread/3)

##### ***\*如果您有兴趣可以在文章结尾了解到更多关于我们的信息，期待着与您的交流合作。\****

**初始化SDK的listener（OnInitSDKListener）回调是在调用login方法后才开始进行。**

```
  // Initialize SDK
    OpenIM.iMManager
      ..initSDK(
        platform: Platform.isAndroid ? IMPlatform.android : IMPlatform.ios,
        ipApi: '',
        ipWs: '',
        dbPath: '',
        listener: OnInitSDKListener(
          onConnecting: () {},
          onConnectFailed: (code, error) {},
          onConnectSuccess: () {},
          onKickedOffline: () {},
          onUserSigExpired: () {},
          onSelfInfoUpdated: (user) {},
        ),
      )
 
      // Add message listener (remove when not in use)
      ..messageManager.addAdvancedMsgListener(OnAdvancedMsgListener(
        onRecvMessageRevoked: (msgId) {},
        onRecvC2CReadReceipt: (list) {},
        onRecvNewMessage: (msg) {},
      ))
 
      // Set up message sending progress listener
      ..messageManager.setMsgSendProgressListener(OnMsgSendProgressListener(
        onProgress: (msgId, progress) {},
      ))
 
      // Set up friend relationship listener
      ..friendshipManager.setFriendshipListener(OnFriendshipListener(
        onBlackListAdd: (u) {},
        onBlackListDeleted: (u) {},
        onFriendApplicationListAccept: (u) {},
        onFriendApplicationListAdded: (u) {},
        onFriendApplicationListDeleted: (u) {},
        onFriendApplicationListReject: (u) {},
        onFriendInfoChanged: (u) {},
        onFriendListAdded: (u) {},
        onFriendListDeleted: (u) {},
      ))
 
      // Set up conversation listener
      ..conversationManager.setConversationListener(OnConversationListener(
        onConversationChanged: (list) {},
        onNewConversation: (list) {},
        onTotalUnreadMessageCountChanged: (count) {},
        onSyncServerFailed: () {},
        onSyncServerFinish: () {},
        onSyncServerStart: () {},
      ))
 
      // Set up group listener
      ..groupManager.setGroupListener(OnGroupListener(
        onApplicationProcessed: (groupId, opUser, agreeOrReject, opReason) {},
        onGroupCreated: (groupId) {},
        onGroupInfoChanged: (groupId, info) {},
        onMemberEnter: (groupId, list) {},
        onMemberInvited: (groupId, opUser, list) {},
        onMemberKicked: (groupId, opUser, list) {},
        onMemberLeave: (groupId, info) {},
        onReceiveJoinApplication: (groupId, info, opReason) {},
      ));
```

- **初始化监听回调事件**

| **event**              | **说明**          |
| ---------------------- | ----------------- |
| **onConnectFailed**    | **连接失败**      |
| **onConnectSuccess**   | **连接成功**      |
| **onConnecting**       | **连接中**        |
| **onKickedOffline**    | **被踢下线**      |
| **onSelfInfoUpdated**  | **修改个人信息**  |
| **onUserTokenExpired** | **账号token过期** |

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

***\*OpenIM github开源地址：\****

https://github.com/OpenIMSDK/Open-IM-Server

***\*OpenIM官网 ：\****[https://www.rentsoft.cn](https://www.rentsoft.cn/)

**我们致力于通过开源模式，为全球企业/开发者提供简单、易用、高效的IM服务和实时音视频通讯能力，帮助开发者降低项目的开发成本，并让开发者掌控业务的核心数据。**

官方答疑