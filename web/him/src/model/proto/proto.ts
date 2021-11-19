import { messageTypeRegistry, MessageType } from "../../../typeRegistry";

export const encode = (message: MessageType | any): Uint8Array => {
  const messageType = messageTypeRegistry.get(message.$type)
  return messageType!.encode(message).finish()
}