import { Deck } from "../deck";

interface CreateGameRequest {
    gameId: string;
    gameName: string;
    username: string;
    playerName: string;
    decks: Deck[];
    numberOfCardsToDeal: number;
}