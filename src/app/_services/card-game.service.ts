import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../game';
import { WebsocketService } from './websocket.service';
import { DeckDefinition } from '../deck-definition';
import { PlayerInfo } from '../player-info';
import { GameState } from '../game-state';
import { SendMessageRequestType } from '../send-message-request-type';
import { SendMessageRequest } from '../send-message-request';
import { FullGameResponse } from '../full-game-response';
import { VisibleDeck } from '../visible-deck';
import { PlayDirection } from '../play-direction';
import { MoveState } from '../move-state';
import { MoveStateWithWinnerName } from '../move-state-with-winner-name';

const WEBSERVICE_URL = "wss://pn450px1g3.execute-api.eu-west-2.amazonaws.com/Prod";

@Injectable({
  providedIn: 'root'
})
export class CardGameService {
  private currentGameIdSubject: BehaviorSubject<string>;
  public currentGameId: Observable<string>;
  private currentGameCodeSubject: BehaviorSubject<string>;
  public currentGameCode: Observable<string>;
  private currentUsernameSubject: BehaviorSubject<string>;
  public currentUsername: Observable<string>;
  private currentGameSubject: BehaviorSubject<Game>;
  public currentGame: Observable<Game>;
  private currentGameStateSubject: BehaviorSubject<GameState>;
  public currentGameState: Observable<GameState>;
  private currentPlayerInfoSubject: BehaviorSubject<PlayerInfo>;
  public currentPlayerInfo: Observable<PlayerInfo>;
  private currentAllPlayersSubject: BehaviorSubject<PlayerInfo[]>;
  public currentAllPlayers: Observable<PlayerInfo[]>;
  private currentHandSubject: BehaviorSubject<string[]>;
  public currentHand: Observable<string[]>;
  private currentDecksSubject: BehaviorSubject<VisibleDeck[]>;
  public currentDecks: Observable<VisibleDeck[]>;
  private currentCanUndoMoveSubject: BehaviorSubject<boolean>;
  public currentCanUndoMove: Observable<boolean>;
  private currentMessagesSubject: BehaviorSubject<string[]>;
  public currentMessages: Observable<string[]>;
  private currentPlayerToMoveUsernameSubject: BehaviorSubject<string>;
  public currentPlayerToMoveUsername: Observable<string>;
  private currentPlayDirectionSubject: BehaviorSubject<PlayDirection>;
  public currentPlayDirection: Observable<PlayDirection>;
  private currentMoveStateWithWinnerNameSubject: BehaviorSubject<MoveStateWithWinnerName>;
  public currentMoveStateWithWinnerName: Observable<MoveStateWithWinnerName>;

  public messages: Subject<any>;
  
  constructor(private wsService: WebsocketService) {
    var theStoredCurrentGameCode = sessionStorage.getItem('currentGameCode');
    var theStoredCurrentUsername = sessionStorage.getItem('currentUsername');

    this.currentGameIdSubject = new BehaviorSubject<string>(null);
    this.currentGameId = this.currentGameIdSubject.asObservable();
    this.currentGameCodeSubject = new BehaviorSubject<string>(theStoredCurrentGameCode);
    this.currentGameCode = this.currentGameCodeSubject.asObservable();
    this.currentUsernameSubject = new BehaviorSubject<string>(theStoredCurrentUsername);
    this.currentUsername = this.currentUsernameSubject.asObservable();
    this.currentGameSubject = new BehaviorSubject<Game>(null);
    this.currentGame = this.currentGameSubject.asObservable();
    this.currentGameStateSubject = new BehaviorSubject<GameState>(null);
    this.currentGameState = this.currentGameStateSubject.asObservable();
    this.currentPlayerInfoSubject = new BehaviorSubject<PlayerInfo>(null);
    this.currentPlayerInfo = this.currentPlayerInfoSubject.asObservable();
    this.currentAllPlayersSubject = new BehaviorSubject<PlayerInfo[]>(null);
    this.currentAllPlayers = this.currentAllPlayersSubject.asObservable();
    this.currentHandSubject = new BehaviorSubject<string[]>(null);
    this.currentHand = this.currentHandSubject.asObservable();
    this.currentDecksSubject = new BehaviorSubject<VisibleDeck[]>(null);
    this.currentDecks = this.currentDecksSubject.asObservable();
    this.currentCanUndoMoveSubject = new BehaviorSubject<boolean>(null);
    this.currentCanUndoMove = this.currentCanUndoMoveSubject.asObservable();
    this.currentMessagesSubject = new BehaviorSubject<string[]>(null);
    this.currentMessages = this.currentMessagesSubject.asObservable();
    this.currentPlayerToMoveUsernameSubject = new BehaviorSubject<string>(null);
    this.currentPlayerToMoveUsername = this.currentPlayerToMoveUsernameSubject.asObservable();
    this.currentPlayDirectionSubject = new BehaviorSubject<PlayDirection>(null);
    this.currentPlayDirection = this.currentPlayDirectionSubject.asObservable();
    this.currentMoveStateWithWinnerNameSubject = new BehaviorSubject<MoveStateWithWinnerName>(null);
    this.currentMoveStateWithWinnerName = this.currentMoveStateWithWinnerNameSubject.asObservable();

    this.messages = <Subject<any>>wsService.connect(WEBSERVICE_URL).pipe(map(
      response => {
        return response.data;
      }
    ));
  }

  public get currentGameIdValue(): string { return this.currentGameIdSubject.value; }
  public get currentGameCodeValue(): string { return this.currentGameCodeSubject.value; }
  public get currentUsernameValue(): string { return this.currentUsernameSubject.value; }
  public get currentGameValue(): Game { return this.currentGameSubject.value; }
  public get currentGameStateValue(): GameState { return this.currentGameStateSubject.value; }
  public get currentPlayerInfoValue(): Game { return this.currentGameSubject.value; }
  public get currentAllPlayersValue(): PlayerInfo[] { return this.currentAllPlayersSubject.value; }
  public get currentHandValue(): string[] { return this.currentHandSubject.value; }
  public get currentDecksValue(): VisibleDeck[] { return this.currentDecksSubject.value; }
  public get currentCanUndoMoveValue(): boolean { return this.currentCanUndoMoveSubject.value; }
  public get currentMessagesValue(): string[] { return this.currentMessagesSubject.value; }
  public get currentPlayerToMoveUsernameValue(): string { return this.currentPlayerToMoveUsernameSubject.value; }
  public get currentPlayDirectionValue(): PlayDirection { return this.currentPlayDirectionSubject.value; }
  public get currentMoveStateWithWinnerNameValue(): MoveStateWithWinnerName { return this.currentMoveStateWithWinnerNameSubject.value; }

  createGame(gameId: string, gameName: string, username: string, playerName: string, decks: DeckDefinition[], numberOfCardsToDeal: number) {
    this.currentGameIdSubject.next(gameId);
    this.currentGameCodeSubject.next(null);
    this.currentUsernameSubject.next(username);

    sessionStorage.removeItem('currentGameCode');
    sessionStorage.setItem('currentUsername', username);

    let createGameRequest = {
      gameId: gameId,
      gameName: gameName,
      username: username,
      playerName: playerName,
      decks: decks,
      numberOfCardsToDeal: numberOfCardsToDeal
    };
    let createGameRequestJson = JSON.stringify(createGameRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.CreateGame, content: createGameRequestJson };
    this.messages.next(sendMessageRequest);
  }

  joinGame(gameCode: string, username: string, playerName: string) {
    this.currentGameIdSubject.next(null);
    this.currentGameCodeSubject.next(gameCode);
    this.currentUsernameSubject.next(username);

    sessionStorage.setItem('currentGameCode', gameCode);
    sessionStorage.setItem('currentUsername', username);

    let joinGameRequest = {
      gameCode: gameCode,
      username: username,
      playerName: playerName,
    };
    let joinGameRequestJson = JSON.stringify(joinGameRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.JoinGame, content: joinGameRequestJson };
    this.messages.next(sendMessageRequest);
  }

  rejoinGame(gameCode: string, username: string) {
    this.currentGameIdSubject.next(null);
    this.currentGameCodeSubject.next(gameCode);
    this.currentUsernameSubject.next(username);

    sessionStorage.setItem('currentGameCode', gameCode);
    sessionStorage.setItem('currentUsername', username);

    let rejoinGameRequest = {
      gameCode: gameCode,
      username: username
    };
    let rejoinGameRequestJson = JSON.stringify(rejoinGameRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.RejoinGame, content: rejoinGameRequestJson };
    this.messages.next(sendMessageRequest);
  }

  startGame(gameCode: string, username: string) {
    let startGameRequest = {
      gameCode: gameCode,
      username: username
    };
    let startGameRequestJson = JSON.stringify(startGameRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.StartGame, content: startGameRequestJson };
    this.messages.next(sendMessageRequest);
  }

  playCardToDeck(card: string) {
    let playCardToDeckRequest = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,
      card: card
    };
    let playCardToDeckRequestJson = JSON.stringify(playCardToDeckRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.PlayCardToDeck, content: playCardToDeckRequestJson };
    this.messages.next(sendMessageRequest);
  }

  takeCardFromDeck(deckId: string) {
    let takeCardFromDeckRequest = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,  
      deckId: deckId
    };
    let takeCardFromDeckRequestJson = JSON.stringify(takeCardFromDeckRequest);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.TakeCardFromDeck, content: takeCardFromDeckRequestJson };
    this.messages.next(sendMessageRequest);
  }

  shuffleAndMoveCards(fromDeckId: string, toDeckId: string) {
    let shuffleAndMoveCards = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,  
      fromDeckId: fromDeckId,
      toDeckId: toDeckId
    };
    let shuffleAndMoveCardsJson = JSON.stringify(shuffleAndMoveCards);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.ShuffleAndMoveCards, content: shuffleAndMoveCardsJson };
    this.messages.next(sendMessageRequest);
  }

  undoLastMove() {
    let undoMove = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,  
    };
    let undoMoveJson = JSON.stringify(undoMove);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.UndoLastMove, content: undoMoveJson };
    this.messages.next(sendMessageRequest);
  }

  // endTurn(reverseDirection: boolean, jumpPlayer: boolean, cardy: boolean, finished: boolean) {
  //   let endTurn = {
  //     gameCode: this.currentGameCodeValue,
  //     username: this.currentUsernameValue,
  //     reverseDirection: reverseDirection,
  //     jumpPlayer: jumpPlayer,
  //     cardy: cardy,
  //     finished: finished
  //   };
  //   let endTurnJson = JSON.stringify(endTurn);
    
  //   var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.EndTurn, content: endTurnJson };
  //   this.messages.next(sendMessageRequest);
  // }

  setCardy(cardy: boolean) {
    let theObj = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,
      cardy: cardy
    };
    let theObjJson = JSON.stringify(theObj);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.SetCardy, content: theObjJson };
    this.messages.next(sendMessageRequest);
  }

  chooseSuit(suit: string) {
    let chooseSuit = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,
      suit: suit
    };
    let chooseSuitJson = JSON.stringify(chooseSuit);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.ChooseSuit, content: chooseSuitJson };
    this.messages.next(sendMessageRequest);
  }

  respondToJump(blockJump: boolean) {
    let respondToJump = {
      gameCode: this.currentGameCodeValue,
      username: this.currentUsernameValue,
      blockJump: blockJump
    };
    let respondToJumpJson = JSON.stringify(respondToJump);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.RespondToJump, content: respondToJumpJson };
    this.messages.next(sendMessageRequest);
  }

  setPlayerTurn(playerToSetUsername: string, playDirection: PlayDirection) {
    let setPlayerTurn = {
      gameCode: this.currentGameCodeValue,
      requestPlayerUsername: this.currentUsernameValue,  
      playerToSetUsername: playerToSetUsername,
      playDirection: playDirection
    };
    let setPlayerTurnJson = JSON.stringify(setPlayerTurn);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.SetPlayerTurn, content: setPlayerTurnJson };
    this.messages.next(sendMessageRequest);
  }

  changePlayerPosition(playerToSetUsername: string, playDirection: PlayDirection) {
    let changePlayerPosition = {
      gameCode: this.currentGameCodeValue,
      requestPlayerUsername: this.currentUsernameValue,  
      playerToSetUsername: playerToSetUsername,
      playDirection: playDirection
    };
    let changePlayerPositionJson = JSON.stringify(changePlayerPosition);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.ChangePlayerPosition, content: changePlayerPositionJson };
    this.messages.next(sendMessageRequest);
  }

  sendMessageToPlayer(playerToMessageUsername: string, message: string) {
    let sendMessageToPlayer = {
      gameCode: this.currentGameCodeValue,
      requestPlayerUsername: this.currentUsernameValue,  
      playerToMessageUsername: playerToMessageUsername,
      message: message
    };
    let sendMessageToPlayerJson = JSON.stringify(sendMessageToPlayer);
    
    var sendMessageRequest:SendMessageRequest = { sendMessageRequestType: SendMessageRequestType.SendMessageToPlayer, content: sendMessageToPlayerJson };
    this.messages.next(sendMessageRequest);
  }

  leaveGame() {
      // remove user from local storage to log user out
      sessionStorage.removeItem('currentGameCode');
      sessionStorage.removeItem('currentUsername');
      this.currentGameSubject.next(null);
      this.currentGameStateSubject.next(null);
      this.currentPlayerInfoSubject.next(null);
      this.currentAllPlayersSubject.next(null);
      this.currentHandSubject.next(null);
      this.currentDecksSubject.next(null);
      this.currentCanUndoMoveSubject.next(null);
      this.currentMessagesSubject.next(null);
      this.currentPlayerToMoveUsernameSubject.next(null);
      this.currentPlayDirectionSubject.next(null);
      this.currentMoveStateWithWinnerNameSubject.next(null);
  }

  setGame(game: Game) {
      sessionStorage.setItem('currentGameCode', game.gameCode);
      this.currentGameSubject.next(game);
      this.currentGameCodeSubject.next(game.gameCode);
      this.currentGameIdSubject.next(game.gameId);
  }

  setGameState(gameState: GameState) {
    this.currentGameStateSubject.next(gameState);
  }

  setPlayerInfo(playerInfo: PlayerInfo) {
    this.currentPlayerInfoSubject.next(playerInfo);
  }

  setAllPlayers(players: PlayerInfo[]) {
    this.currentAllPlayersSubject.next(players);
  }

  setHand(cards: string[]) {
    this.currentHandSubject.next(cards);
  }

  setDecks(decks: VisibleDeck[]) {
    this.currentDecksSubject.next(decks);
  }

  setCanUndoMove(canUndo: boolean) {
    this.currentCanUndoMoveSubject.next(canUndo);
  }

  setMessages(messages: string[]) {
    this.currentMessagesSubject.next(messages);
  }

  setPlayerToMoveUsername(username: string) {
    this.currentPlayerToMoveUsernameSubject.next(username);
  }

  setPlayDirection(playDirection: PlayDirection) {
    this.currentPlayDirectionSubject.next(playDirection);
  }

  setMoveStateWithWinnerName(moveState: MoveState, winnerName: string) {
    var moveStateWithWinnerName = { moveState: moveState, winnerName: winnerName };
    this.currentMoveStateWithWinnerNameSubject.next(moveStateWithWinnerName);
  }

  setFullGame(fullGameResponse: FullGameResponse) {
    let game = {
      gameId: fullGameResponse.gameId,
      gameName: fullGameResponse.gameName,
      gameCode: fullGameResponse.gameCode
    };
    this.setGame(game);              
    this.setGameState(fullGameResponse.gameState);
    this.setPlayerInfo(fullGameResponse.playerInfo);
    this.setAllPlayers(fullGameResponse.allPlayers);
    this.setHand(fullGameResponse.hand);
    this.setDecks(fullGameResponse.decks);
    this.setCanUndoMove(fullGameResponse.moveCanBeUndone);
    this.setDecks(fullGameResponse.decks);
    this.setMessages(fullGameResponse.messages);
    this.setPlayerToMoveUsername(fullGameResponse.playerToMoveUsername);
    this.setPlayDirection(fullGameResponse.playDirection);
    this.setMoveStateWithWinnerName(fullGameResponse.moveState, fullGameResponse.winnerName);
  }
}