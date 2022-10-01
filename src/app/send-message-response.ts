import { Deserializable } from "./_helpers/deserializable";

export class SendMessageResponse implements Deserializable<SendMessageResponse> {
    sendMessageResponseType: string;
    content: string

    deserialize(input) {
        this.sendMessageResponseType = input.SendMessageResponseType;
        this.content = input.Content;
        return this;
    }
}