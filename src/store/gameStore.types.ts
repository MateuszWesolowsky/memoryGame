import { CardType } from '../types/types';

export type GameStore = {
    matchedCards: CardType[];
    setMatchedCards: (newCards: CardType[]) => void;
    turnsCount: number;
    setTurnsCount: (newCount: number) => void;
    time: number;
    setTime: (newTime: number) => void;
};
