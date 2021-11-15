# 防止消息重复发送解决方案

情景：用户发送消息，没有收到响应（可能因为某些网络问题），但是服务器已经收到消息，并发送了响应，这时候用户可能会再次发送，造成消息重复发送。

解决方案：客户端给每条用户发送的消息加上一个唯一标识，这样服务端对相同唯一标识的消息不重复处理即可解决。配合ACK机制，可以保证消息的可靠并且不重复。

# 防止消息丢失解决方案

情景：在某些情况下，推送给用户的消息，因为网络原因，可能会导致用户没有收到消息，造成消息丢失。

解决方案：在消息推送给用户时，把消息加入ACK表，并送入重发队列延迟推送，如果用户正常收到消息，会回复ACK消息，服务器标记消息已经被ACK。在消费重发队列的消息时，判断ACK表里消息是否已经被ACK，如果没有被ACK，再次发送消息。

用户下线后，未ACK消息不删除，等待下次用户上线，把该用户的未ACK消息加入重发队列，重新发送。



带来的问题：消息可能重复推送，解决办法很简单，客户端对消息进行去重处理，重复的消息直接丢掉。

# 