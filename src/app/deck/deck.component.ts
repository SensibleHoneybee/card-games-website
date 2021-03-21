import { Component, OnInit, Input } from '@angular/core';
import { VisibleDeck } from '../visible-deck';
import { CardGameService } from '../_services/card-game.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() deck1: VisibleDeck;
  @Input() deck2: VisibleDeck;

  constructor(private cardGameService: CardGameService) {
  }

  ngOnInit() {
  }
  
  takeCardFromDeck1() {
    if (!this.deck1.canDragToHand) {
      alert('You are not allowed to take a card from that deck!');
      return;
    }
    
    this.cardGameService.takeCardFromDeck(this.deck1.id);
  }

  takeCardFromDeck2() {
    if (!this.deck2.canDragToHand) {
      alert('You are not allowed to take a card from that deck!');
      return;
    }
    
    this.cardGameService.takeCardFromDeck(this.deck2.id);
  }

  drop(event: CdkDragDrop<string[]>) {
    var card = event.item.data;
    if (card != null) {
      this.cardGameService.playCardToDeck(card);
    }
  }

}
