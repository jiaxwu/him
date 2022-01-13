# HIM
HIM是一个即时消息通信系统，主要实现了单聊、群聊等服务

# 消息架构
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f70908d3e2a4c33b205f8a1978189c6~tplv-k3u1fbpfcp-watermark.image?)
- 客户端会和gateway建立WebSocket长连接
- 客户端的消息会通过sender发送到`SendMsgMQ`
- transfer消费`SendMsgMQ`里的消息，进行序列号生成和持久化存储（为了离线消息），并把消息发送到`PushMsgMQ`
- 网关会启动一个消费者消费`PushMsgMQ`里的消息，如果用户在线，则推送给用户（保证实时性）
- 客户端也可以通过short服务同步未收到的消息

**架构主要参考了OpenIM**

# 主要使用技术
主要使用的技术有Go、Gin、Gorm、MySQL、Redis、Kafka、MongoDB、WebSocket等