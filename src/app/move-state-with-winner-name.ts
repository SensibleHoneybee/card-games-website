import { MoveState } from './move-state';

export interface MoveStateWithWinnerName {
    moveState: MoveState;
    winnerName: string;
}