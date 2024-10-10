import { create } from 'zustand';
import { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>((set) => ({
    matchedCards: [],
    setMatchedCards: (matchedCards) => set({ matchedCards }),
    turnsCount: 0,
    setTurnsCount: () => set((state) => ({ turnsCount: state.turnsCount })),
    // setTurnsCount: (turnsCount) => set({ turnsCount }),
    time: 0,
    setTime: (time) => set({ time }),
}));
