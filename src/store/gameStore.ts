import { create } from 'zustand';
import { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>((set) => ({
    matchedCards: [],
    setMatchedCards: (matchedCards) => set({ matchedCards }),
    turnsCount: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    setTurnsCount: (turnsCount) => set({ turnsCount }),
    time: 0,
    setTime: (time) => set({ time }),
}));
