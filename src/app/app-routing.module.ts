import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ActivateGameGuard } from './_helpers/activate-game-guard';
import { JoinGameComponent } from './join-game/join-game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { RejoinGameComponent } from './rejoin-game/rejoin-game.component';

const routes: Routes = [
  { path: '', component: GameComponent, canActivate: [ActivateGameGuard] },
  { path: 'start-screen', component: StartScreenComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'join-game', component: JoinGameComponent },
  { path: 'rejoin-game', component: RejoinGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
