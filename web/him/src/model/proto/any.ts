import { Any } from '../../../google/protobuf/any';
import { MessageType } from "../../../typeRegistry";
import { encode } from '@/model/proto/proto'

export const newAny = (message: MessageType | any): Any => {
  const anyMessage = Any.fromJSON({typeUrl: "type.googleapis.com/" + message.$type})
  anyMessage.value = encode(message)
  return anyMessage
}