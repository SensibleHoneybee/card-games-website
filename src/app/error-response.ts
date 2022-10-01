import { Deserializable } from "./_helpers/deserializable";

export class ErrorResponse implements Deserializable<ErrorResponse> {
    message: string;

    deserialize(input) {
        this.message = input.Message;
        return this;
    }
}