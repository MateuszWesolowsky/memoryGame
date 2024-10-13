export type GameStore = {
    matchedCardsIds: string[];
    setMatchedCardsIds: (newId: string[]) => void;
    flippedCardsIds: string[];
    setFlippedCardsIds: (newId: string[]) => void;
    turnsCount: number;
    setTurnsCount: (newCount: number) => void;
    time: number;
    setTime: (newTime: number) => void;
};
