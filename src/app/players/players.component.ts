import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardGameService } from '../_services/card-game.service';
import { PlayerInfo } from '../player-info';
import { PlayDirection } from '../play-direction';
import { GameState } from '../game-state';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  currentPlayerInfo: PlayerInfo;
  currentPlayerInfoSubscription: Subscription;
  currentAllPlayers: PlayerInfo[];
  currentAllPlayersSubscription: Subscription;
  currentPlayerToMoveUsername: string;
  currentPlayerToMoveUsernameSubscription: Subscription;
  currentPlayDirection: PlayDirection;
  currentPlayDirectionSubscription: Subscription;
  currentGameState: GameState;
  currentGameStateSubscription: Subscription;

  constructor(private cardGameService: CardGameService) { 
    this.currentPlayerInfoSubscription = this.cardGameService.currentPlayerInfo.subscribe(playerInfo => {
      this.currentPlayerInfo = playerInfo;
    });
    this.currentAllPlayersSubscription = this.cardGameService.currentAllPlayers.subscribe(players => {
      this.currentAllPlayers = players;
    });
    this.currentPlayerToMoveUsernameSubscription = this.cardGameService.currentPlayerToMoveUsername.subscribe(username => {
      this.currentPlayerToMoveUsername = username;
    });
    this.currentPlayDirectionSubscription = this.cardGameService.currentPlayDirection.subscribe(playDirection => {
      this.currentPlayDirection = playDirection;
    });
    this.currentGameStateSubscription = this.cardGameService.currentGameState.subscribe(gameState => {
      this.currentGameState = gameState;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentPlayerInfoSubscription.unsubscribe();
    this.currentAllPlayersSubscription.unsubscribe();
    this.currentPlayerToMoveUsernameSubscription.unsubscribe();
    this.currentPlayDirectionSubscription.unsubscribe();
    this.currentGameStateSubscription.unsubscribe();
  }

  messagePlayer(player: PlayerInfo) {
    var msg = prompt('What is your message for ' + player.playerName + '?', '');

    if (msg != null) {
      this.cardGameService.sendMessageToPlayer(player.username, msg);
    }
  }

  setNextPlayer(player: PlayerInfo, up: boolean) {
    var playDirection = up ? PlayDirection.Up : PlayDirection.Down;
    this.cardGameService.setPlayerTurn(player.username, playDirection);
  }

  changePlayerPosition(player: PlayerInfo, up: boolean) {
    var playDirection = up ? PlayDirection.Up : PlayDirection.Down;
    this.cardGameService.changePlayerPosition(player.username, playDirection);
  }

  isMe(player: PlayerInfo): boolean {
    if (this.currentPlayerInfo == null) {
      return false;
    }

    return player.username.toUpperCase() === this.currentPlayerInfo.username.toUpperCase();
  }

  isPlayerTurn(player: PlayerInfo): boolean {
    if (this.currentPlayerToMoveUsername == null) {
      return false;
    }
    
    return player.username.toUpperCase() === this.currentPlayerToMoveUsername.toUpperCase();
  }

  isPlayerTurnUp(player: PlayerInfo): boolean {
    return this.isPlayerTurn(player) && this.currentPlayDirection === PlayDirection.Up;
  }

  isPlayerTurnDown(player: PlayerInfo): boolean {
    return this.isPlayerTurn(player) && this.currentPlayDirection === PlayDirection.Down;
  }

  canMovePlayerUp(player: PlayerInfo): boolean {
    if (this.currentGameState !== GameState.Created || this.currentAllPlayers == null || this.currentAllPlayers.length === 0) {
      return false;
    }

    return player !== this.currentAllPlayers[0];
  }

  canMovePlayerDown(player: PlayerInfo): boolean {
    if (this.currentGameState !== GameState.Created || this.currentAllPlayers == null || this.currentAllPlayers.length === 0) {
      return false;
    }

    return player !== this.currentAllPlayers[this.currentAllPlayers.length - 1];
  }

  get gameIsStarted(): boolean {
    return this.currentGameState === GameState.Started;
  }

  get isAdmin(): boolean {
    if (this.currentPlayerInfo == null) {
      return false;
    }

    return this.currentPlayerInfo.isAdmin;
  }

}
