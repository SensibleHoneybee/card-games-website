import { DeckDefinition } from './deck-definition';

export const DEFAULT_DECKS: DeckDefinition[] = [
  { id: "1", initialCardDeck: true, isFaceUp: false, canDragToHand: true, canDropFromHand: false },
  { id: "2", initialCardDeck: false, isFaceUp: true, canDragToHand: false, canDropFromHand: true }
];