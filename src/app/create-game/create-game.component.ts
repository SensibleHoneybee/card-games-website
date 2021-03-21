import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardGameService } from '../_services/card-game.service';
import { DEFAULT_DECKS } from '../default-decks';
import { SendMessageResponse } from '../send-message-response';
import { SendMessageResponseType } from '../send-message-response-type';
import { Game } from '../game';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { GameCreatedResponse } from '../game-created-response';
import { ErrorResponse } from '../error-response';
import { GameState } from '../game-state';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  gameId: string;
  currentGame: Game;
  currentGameSubscription: Subscription;
  currentGameCodeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cardGameService: CardGameService) {
      // Check if there's already a game
      if (this.cardGameService.currentGameValue) { 
        if(confirm("Are you sure to want to quit the game " + this.cardGameService.currentGameValue.gameName)) {
          this.cardGameService.leaveGame();
        }
      }

      this.currentGameSubscription = this.cardGameService.currentGame.subscribe(game => {
        this.currentGame = game;
      });
      this.currentGameCodeSubscription = this.cardGameService.currentGameCode.subscribe(gameCode => {
        if (gameCode != null) {
          // Updated game code means navigate away from this screen
          this.router.navigate(['/']);
        }
      });
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        gameName: ['My Game', Validators.required],  
        username: ['', Validators.required],  
        yourName: ['', Validators.required],
        numberOfCardsToDeal: ['4', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentGameSubscription.unsubscribe();
      this.currentGameCodeSubscription.unsubscribe();
    }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.gameId = uuidv4();
    this.loading = true;
    this.cardGameService.createGame(this.gameId, this.f.gameName.value, this.f.username.value, this.f.yourName.value, DEFAULT_DECKS, this.f.numberOfCardsToDeal.value);

    var playerInfo = { username: this.f.username.value, playerName: this.f.yourName.value, isAdmin: true, cardy: false, winner: false, cardCount: 0 };
    this.cardGameService.setPlayerInfo(playerInfo);
  }
}