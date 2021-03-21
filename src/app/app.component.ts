import { Component } from '@angular/core';
import { CardGameService } from './_services/card-game.service';
import { SendMessageResponse } from './send-message-response';
import { SendMessageResponseType } from './send-message-response-type';
import { FullGameResponse } from './full-game-response';
import { PlayerJoinedGameResponse } from './player-joined-game-response';
import { ErrorResponse } from './error-response';
import { Subscription } from 'rxjs';
import { GameCreatedResponse } from './game-created-response';
import { GameState } from './game-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Card Games';
  currentGameId: string;
  currentGameIdSubscription: Subscription;
  currentGameCode: string;
  currentGameCodeSubscription: Subscription;
  currentUsername: string;
  currentUsernameSubscription: Subscription;

  constructor(private cardGameService: CardGameService) {
    this.currentGameIdSubscription = cardGameService.currentGameId.subscribe(gameId => {
      this.currentGameId = gameId;
    });
    this.currentGameCodeSubscription = cardGameService.currentGameCode.subscribe(gameCode => {
      this.currentGameCode = gameCode;
    });
    this.currentUsernameSubscription = cardGameService.currentUsername.subscribe(username => {
      this.currentUsername = username;
    });

    cardGameService.messages.subscribe(msg => {
      var sendMessageResponse = new SendMessageResponse().deserialize(JSON.parse(msg));
      switch (sendMessageResponse.sendMessageResponseType) {
        case SendMessageResponseType.FullGame:
          var fullGameResponse = new FullGameResponse().deserialize(JSON.parse(sendMessageResponse.content));
          if (fullGameResponse.gameCode === this.currentGameCode)
          {
            this.cardGameService.setFullGame(fullGameResponse);
          }
          break;
        case SendMessageResponseType.GameCreated:
          var gameCreatedResponse = new GameCreatedResponse().deserialize(JSON.parse(sendMessageResponse.content));
          if (gameCreatedResponse.gameId === this.currentGameId)
          {
            let game = {
              gameId: gameCreatedResponse.gameId,
              gameName: gameCreatedResponse.gameName,
              gameCode: gameCreatedResponse.gameCode
            };
            this.cardGameService.setGame(game);
            this.cardGameService.setGameState(GameState.Created);
          }
          break;
        case SendMessageResponseType.PlayerJoinedGame:
          var playerJoinedGameResponse = new PlayerJoinedGameResponse().deserialize(JSON.parse(sendMessageResponse.content));
          if (playerJoinedGameResponse.gameCode === this.currentGameCode)
          {
            this.cardGameService.setAllPlayers(playerJoinedGameResponse.allPlayers);
          }
          break;
        case SendMessageResponseType.Error:
          var errorResponse = new ErrorResponse().deserialize(JSON.parse(sendMessageResponse.content));
          if (errorResponse != null) {
            alert('An error occurred: ' + errorResponse.message);
          } else {
            alert('An error occurred with null errorResponse');
          }
          break;
        default:
          // Not interested in other message types
          break;
      }
    });
  }

  ngOnInit() {
    if (this.currentGameCode != null && this.currentUsername != null) {
      // Reload the game information
      this.cardGameService.rejoinGame(this.currentGameCode, this.currentUsername);
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentGameIdSubscription.unsubscribe();
    this.currentGameCodeSubscription.unsubscribe();
    this.currentUsernameSubscription.unsubscribe();
  }
}
