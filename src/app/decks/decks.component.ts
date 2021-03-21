import { Component, OnInit, Input } from '@angular/core';
import { CardGameService } from '../_services/card-game.service';
import { Subscription } from 'rxjs';
import { PairOfDecks } from '../pair-of-decks';
import { PlayerInfo } from '../player-info';
import { MoveState } from '../move-state';
import { MoveStateWithWinnerName } from '../move-state-with-winner-name';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  pairedUpDecks: PairOfDecks[];
  currentDecksSubscription: Subscription;
  currentPlayerInfo: PlayerInfo;
  currentPlayerInfoSubscription: Subscription;
  currentPlayerToMoveUsername: string;
  currentPlayerToMoveUsernameSubscription: Subscription;
  currentMoveStateWithWinnerName: MoveStateWithWinnerName;
  currentMoveStateWithWinnerNameSubscription: Subscription;
  currentHand: string[];
  currentHandSubscription: Subscription;

  // reverseChecked: boolean;
  // jumpChecked: boolean;
  // cardyChecked: boolean;
  // finishGameChecked: boolean;

  constructor(private cardGameService: CardGameService) { 
    this.currentDecksSubscription = this.cardGameService.currentDecks.subscribe(decks => {
      var i;
      this.pairedUpDecks = [];
      for (i = 0; i < decks.length; i+=2) {
        let pairOfDecks: PairOfDecks = { deck1: decks[i], deck2: i+1 < decks.length ? decks[i+1] : null };
        this.pairedUpDecks.push(pairOfDecks);
      }
    });
    this.currentPlayerInfoSubscription = this.cardGameService.currentPlayerInfo.subscribe(playerInfo => {
      this.currentPlayerInfo = playerInfo;
    });
    this.currentPlayerToMoveUsernameSubscription = this.cardGameService.currentPlayerToMoveUsername.subscribe(username => {
      this.currentPlayerToMoveUsername = username;
    });
    this.currentMoveStateWithWinnerNameSubscription = this.cardGameService.currentMoveStateWithWinnerName.subscribe(b => {
      this.currentMoveStateWithWinnerName = b;
    });
    this.currentHandSubscription = this.cardGameService.currentHand.subscribe(cards => {
      this.currentHand = cards;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentDecksSubscription.unsubscribe();
    this.currentPlayerInfoSubscription.unsubscribe();
    this.currentPlayerToMoveUsernameSubscription.unsubscribe();
    this.currentMoveStateWithWinnerNameSubscription.unsubscribe();
    this.currentHandSubscription.unsubscribe();
  }

  takeCardFromDeck1() {
    if (this.pairedUpDecks.length === 0) {
      alert('No decks');
    }

    if (!this.pairedUpDecks[0].deck1.canDragToHand) {
      alert('You are not allowed to take a card from that deck!');
      return;
    }
    
    this.cardGameService.takeCardFromDeck(this.pairedUpDecks[0].deck1.id);
  }

  // endTurn() {
  //   this.cardGameService.endTurn(this.reverseChecked, this.jumpChecked, this.cardyChecked, this.finishGameChecked);
  //   this.reverseChecked = false;
  //   this.jumpChecked = false;
  //   this.cardyChecked = false;
  //   this.finishGameChecked = false;
  // }

  setCardy(cardy: boolean) {
    this.cardGameService.setCardy(cardy);
  }

  chooseSuit(suit: string) {
    this.cardGameService.chooseSuit(suit);
  }

  respondToJump(blockJump: boolean) {
    this.cardGameService.respondToJump(blockJump);
  }

  get isMyTurn(): boolean {
    if (this.currentPlayerToMoveUsername == null || this.currentPlayerInfo == null || this.currentMoveStateWithWinnerName == null) {
      return false;
    }

    return this.currentPlayerInfo.username.toUpperCase() === this.currentPlayerToMoveUsername.toUpperCase()
      && this.currentMoveStateWithWinnerName.moveState !== MoveState.JumpWasPlayed
      && this.currentMoveStateWithWinnerName.moveState !== MoveState.GameWon;
  }

  get inJumpedMode(): boolean {
    if (this.currentPlayerToMoveUsername == null || this.currentPlayerInfo == null || this.currentMoveStateWithWinnerName == null) {
      return false;
    }

    return this.currentPlayerInfo.username.toUpperCase() === this.currentPlayerToMoveUsername.toUpperCase()
      && this.currentMoveStateWithWinnerName.moveState === MoveState.JumpWasPlayed;
  }

  get isCardy(): boolean {
    if (this.currentPlayerInfo == null) {
      return false;
    }

    return this.currentPlayerInfo.cardy;
  }

}
