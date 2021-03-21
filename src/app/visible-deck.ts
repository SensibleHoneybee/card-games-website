export interface VisibleDeck {
    id: string;
    hasCards: boolean;
    topCard: string[];
    isFaceUp: boolean;
    canDragToHand: boolean;
    canDropFromHand: boolean;
}