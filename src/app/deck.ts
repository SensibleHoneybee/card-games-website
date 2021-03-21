export interface Deck {
    id: string;
    cards: string[];
    isFaceUp: boolean;
    initialCardDeck: boolean;
    canDragToHand: boolean;
    canDropFromHand: boolean;
}