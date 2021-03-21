import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Game } from '../game';
import { GameState } from '../game-state';
import { Subscription } from 'rxjs';
import { CardGameService } from '../_services/card-game.service';
import { PlayerInfo } from '../player-info';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectSuitDialogComponent } from '../select-suit-dialog/select-suit-dialog.component';
import { MoveState } from '../move-state';
import { MoveStateWithWinnerName } from '../move-state-with-winner-name';
import { WinnerDialogComponent } from '../winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('openWinner') openWinner:ElementRef;

  currentGameCode: string;
  currentGame: Game;
  currentGameState: GameState;
  currentPlayerInfo: PlayerInfo;
  currentPlayerToMoveUsername: string;
  currentMoveStateWithWinnerName: MoveStateWithWinnerName;
  currentWinnerName: string;
  currentGameCodeSubscription: Subscription;
  currentGameSubscription: Subscription;
  currentGameStateSubscription: Subscription;
  currentPlayerInfoSubscription: Subscription;
  currentPlayerToMoveUsernameSubscription: Subscription;
  currentMoveStateWithWinnerNameSubscription: Subscription;
  currentWinnerNameSubscription: Subscription;
  loading = false;

  constructor(private cardGameService: CardGameService, public dialog: MatDialog) {
    this.currentGameCodeSubscription = this.cardGameService.currentGameCode.subscribe(game => {
      this.currentGameCode = game;
    });
    this.currentGameSubscription = this.cardGameService.currentGame.subscribe(game => {
        this.currentGame = game;
    });
    this.currentGameStateSubscription = this.cardGameService.currentGameState.subscribe(gameState => {
      this.currentGameState = gameState;
    });
    this.currentPlayerInfoSubscription = this.cardGameService.currentPlayerInfo.subscribe(playerInfo => {
      this.currentPlayerInfo = playerInfo;
    });
    this.currentPlayerToMoveUsernameSubscription = this.cardGameService.currentPlayerToMoveUsername.subscribe(username => {
      this.currentPlayerToMoveUsername = username;
    });
    this.currentMoveStateWithWinnerNameSubscription = this.cardGameService.currentMoveStateWithWinnerName.subscribe(moveStateWithWinnerName => {
      this.currentMoveStateWithWinnerName = moveStateWithWinnerName;
      if (moveStateWithWinnerName != null) {
        if (moveStateWithWinnerName.moveState === MoveState.WaitingForSuit && this.isMyTurn) {
            this.openModal.nativeElement.click();
        }
        if (moveStateWithWinnerName.moveState === MoveState.GameWon) {
          this.openWinner.nativeElement.click();
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentGameSubscription.unsubscribe();
    this.currentGameStateSubscription.unsubscribe();
    this.currentPlayerInfoSubscription.unsubscribe();
    this.currentGameCodeSubscription.unsubscribe();
    this.currentPlayerToMoveUsernameSubscription.unsubscribe();
    this.currentMoveStateWithWinnerNameSubscription.unsubscribe();
    this.currentWinnerNameSubscription.unsubscribe();
  }

  startGame() {
    this.loading = true;
    this.cardGameService.startGame(this.currentGameCode, this.currentPlayerInfo.username);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectSuitDialogComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cardGameService.chooseSuit(result);
    });
  }

  openWinnerDialog(): void {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      width: '450px',
      data: {winnerName: this.currentMoveStateWithWinnerName.winnerName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cardGameService.chooseSuit(result);
    });
  }

  get isMyTurn(): boolean {
    if (this.currentPlayerToMoveUsername == null || this.currentPlayerInfo == null) {
      return false;
    }

    return this.currentPlayerInfo.username.toUpperCase() === this.currentPlayerToMoveUsername.toUpperCase();
  }
}