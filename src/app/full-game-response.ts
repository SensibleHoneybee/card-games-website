import { GameState } from './game-state';
import { PlayerInfo } from './player-info';
import { VisibleDeck } from './visible-deck';
import { PlayDirection } from './play-direction';
import { MoveState } from './move-state';
import { Deserializable } from './_helpers/deserializable';

export class FullGameResponse implements Deserializable<FullGameResponse> {
    gameId: string;
    gameCode: string;
    gameName: string;
    gameState: GameState;
    playerInfo: PlayerInfo;
    allPlayers: PlayerInfo[];
    hand: string[];
    decks: VisibleDeck[];
    moveCanBeUndone: boolean;
    messages: string[];
    playerToMoveUsername: string;
    playDirection: PlayDirection;
    moveState: MoveState;
    winnerName: string;

    deserialize(input) {
        this.gameId = input.GameId;
        this.gameCode = input.GameCode;
        this.gameName = input.GameName;
        this.gameState = input.GameState;
        this.playerInfo = { username: input.PlayerInfo.Username, playerName: input.PlayerInfo.PlayerName, isAdmin: input.PlayerInfo.IsAdmin, cardy: input.PlayerInfo.Cardy, winner: input.PlayerInfo.Winner, cardCount: input.PlayerInfo.CardCount };
        this.allPlayers = input.AllPlayers.map(
            function (playerInfo) {
                return { username: playerInfo.Username, playerName: playerInfo.PlayerName, isAdmin: playerInfo.IsAdmin, cardy: playerInfo.Cardy, winner: playerInfo.Winner, cardCount: playerInfo.CardCount }
            });
        this.hand = input.Hand;
        this.decks = input.Decks.map(
            function (deck) {
                return {
                    id: deck.Id, hasCards: deck.HasCards, topCard: deck.TopCard, isFaceUp: deck.IsFaceUp,
                    canDragToHand: deck.CanDragToHand, canDropFromHand: deck.CanDropFromHand
                }
            });
        this.moveCanBeUndone = input.MoveCanBeUndone;
        this.messages = input.Messages;
        this.playerToMoveUsername = input.PlayerToMoveUsername;
        this.playDirection = input.PlayDirection;
        this.moveState = input.MoveState;
        this.winnerName = input.WinnerName;
        return this;
    }
}