import { Deserializable } from "./_helpers/deserializable";

export class GameCreatedResponse implements Deserializable<GameCreatedResponse> {
    gameId: string;
    gameCode: string;
    gameName: string;

    deserialize(input) {
        this.gameId = input.GameId;
        this.gameCode = input.GameCode;
        this.gameName = input.GameName;
        return this;
    }
}