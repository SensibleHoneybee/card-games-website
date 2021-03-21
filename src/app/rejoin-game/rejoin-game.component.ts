import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardGameService } from '../_services/card-game.service';
import { Game } from '../game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rejoin-game',
  templateUrl: './rejoin-game.component.html',
  styleUrls: ['./rejoin-game.component.css']
})
export class RejoinGameComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  gameCode: string;
  currentGame: Game;
  currentGameSubscription: Subscription;
  currentGameIdSubscription: Subscription;

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
      this.currentGameIdSubscription = this.cardGameService.currentGameId.subscribe(gameId => {
        if (gameId != null) {
          // Updated game ID means navigate away from this screen
          this.router.navigate(['/']);
        }
      });
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          gameCode: ['', Validators.required],  
          username: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentGameSubscription.unsubscribe();
      this.currentGameIdSubscription.unsubscribe();
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.gameCode = this.f.gameCode.value;
    this.loading = true;
    this.cardGameService.rejoinGame(this.f.gameCode.value, this.f.username.value);
  }
}