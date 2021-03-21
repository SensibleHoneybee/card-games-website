export interface DeckDefinition {
    id: string;
    initialCardDeck: boolean;
    isFaceUp: boolean;
    canDragToHand: boolean;
    canDropFromHand: boolean;
}