export enum SendMessageRequestType {
    CreateGame = 'CreateGame',
    JoinGame = 'JoinGame',
    RejoinGame = 'RejoinGame',
    StartGame = 'StartGame',
    PlayCardToDeck = 'PlayCardToDeck',
    TakeCardFromDeck = 'TakeCardFromDeck',
    ShuffleAndMoveCards = 'ShuffleAndMoveCards',
    UndoLastMove = 'UndoLastMove',
    // EndTurn = 'EndTurn',
    SetCardy = 'SetCardy',
    ChooseSuit = 'ChooseSuit',
    RespondToJump = 'RespondToJump',
    SetPlayerTurn = 'SetPlayerTurn',
    ChangePlayerPosition = 'ChangePlayerPosition',
    SendMessageToPlayer = 'SendMessageToPlayer',
    TransferDeck = 'TransferDeck',
    CompleteGame = 'CompleteGame'
}
