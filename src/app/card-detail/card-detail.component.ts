import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  @Input() card: string;
  @Input() hasCard: boolean;
  @Input() isFaceUp: boolean;

  constructor() { }

  ngOnInit() {
  }

  get rank() {
    if (!this.card) {
      return '';
    }
    return this.card.slice(0, -1);
  }

  get suitSymbol() {
    switch (this.card.slice(-1)) {
      case "C":
        return "♣";
      case "D":
        return "♦";
      case "H":
        return "♥";
      case "S":
        return "♠";
      default:
        throw("Unknown suit: " + this.card.slice(-1));
    }
  }

  get suitIsRed() {
    switch (this.card.slice(-1)) {
      case "D":
      case "H":
        return true;
      default:
        return false;
    }
  }

}
