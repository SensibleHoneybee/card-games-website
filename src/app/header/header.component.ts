import { Component, OnInit } from '@angular/core';
import { CardGameService } from '../_services/card-game.service';
import { Subscription } from 'rxjs';
import { Game } from '../game';
import { PlayerInfo } from '../player-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentGame: Game;
  currentPlayerInfo: PlayerInfo;
  currentGameSubscription: Subscription;
  currentPlayerInfoSubscription: Subscription;

  constructor(private cardGameService: CardGameService) { 
    this.currentGameSubscription = this.cardGameService.currentGame.subscribe(game => {
      this.currentGame = game;
    });
    this.currentPlayerInfoSubscription = this.cardGameService.currentPlayerInfo.subscribe(playerInfo => {
      this.currentPlayerInfo = playerInfo;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentGameSubscription.unsubscribe();
    this.currentPlayerInfoSubscription.unsubscribe();
  }

  get isAdmin(): boolean {
    if (this.currentPlayerInfo == null) {
      return false;
    }

    return this.currentPlayerInfo.isAdmin;
  }

  shuffleAndMoveCards() {
    this.cardGameService.shuffleAndMoveCards("2", "1");
  }

  undoLastMove() {
    this.cardGameService.undoLastMove();
  }

}
