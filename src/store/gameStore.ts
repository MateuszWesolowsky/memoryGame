import { create } from 'zustand';
import { GameStore } from './gameStore.types';

export const useGameStore = create<GameStore>((set) => ({
    matchedCardsId: [],

    setMatchedCardsId: (id) =>
        set((state) => ({
            matchedCardsId: Array.isArray(id)
                ? id
                : [...state.matchedCardsId, id],
        })),

    flippedCardsIds: [],
    setFlippedCardsIds: (id) =>
        set((state) => ({
            flippedCardsIds: Array.isArray(id)
                ? id
                : [...state.flippedCardsIds, id],
        })),
    turnsCount: 0,
    setTurnsCount: (turnsCount) => set({ turnsCount }),
    time: 0,
    setTime: (time) => set({ time }),
}));
