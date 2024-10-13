import { create } from 'zustand';
import { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>((set) => ({
    matchedCardsIds: [],
    flippedCardsIds: [],
    setMatchedCardsIds: (newIds) => set({ matchedCardsIds: newIds }),
    setFlippedCardsIds: (newIds) => set({ flippedCardsIds: newIds }),
    turnsCount: 0,
    setTurnsCount: (turnsCount) => set({ turnsCount }),
    time: 0,
    setTime: (time) => set({ time }),
}));
