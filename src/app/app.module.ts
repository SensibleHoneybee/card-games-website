import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { HandComponent } from './hand/hand.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeckComponent } from './deck/deck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateGameComponent } from './create-game/create-game.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageWindowComponent } from './message-window/message-window.component';
import { PlayersComponent } from './players/players.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { DecksComponent } from './decks/decks.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { RejoinGameComponent } from './rejoin-game/rejoin-game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectSuitDialogComponent } from './select-suit-dialog/select-suit-dialog.component';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CardDetailComponent,
    HandComponent,
    HeaderComponent,
    FooterComponent,
    DeckComponent,
    CreateGameComponent,
    MessageWindowComponent,
    PlayersComponent,
    JoinGameComponent,
    DecksComponent,
    StartScreenComponent,
    RejoinGameComponent,
    SelectSuitDialogComponent,
    WinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [SelectSuitDialogComponent, WinnerDialogComponent]
})
export class AppModule { }
