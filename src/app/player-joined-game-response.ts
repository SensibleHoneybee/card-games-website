import { PlayerInfo } from './player-info';
import { Deserializable } from './_helpers/deserializable';

export class PlayerJoinedGameResponse implements Deserializable<PlayerJoinedGameResponse> {
    gameCode: string;
    allPlayers: PlayerInfo[];

    deserialize(input) {
        this.gameCode = input.GameCode;
        this.allPlayers = input.AllPlayers.map(
            function (playerInfo) {
                return { username: playerInfo.Username, playerName: playerInfo.PlayerName, isAdmin: playerInfo.IsAdmin }
            });
        return this;
    }
}