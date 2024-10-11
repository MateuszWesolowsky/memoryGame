import { CardType } from '../types/types';

export type GameStore = {
    matchedCardsId: CardType[];
    setMatchedCardsId: (id: CardType[]) => void;
    turnsCount: number;
    setTurnsCount: (newCount: number) => void;
    time: number;
    setTime: (newTime: number) => void;
};
