import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IntroModalProps {
    isOpen: boolean;
    lastOpened: number | null;
    openModal: () => void;
    closeModal: () => void;
    reset: () => void; // Reset the modal state to initial state when closed
}
// Zustand store for modal state
export const useModalStore = create<IntroModalProps>()(
persist(
    (set) => ({
        isOpen: false,
        lastOpened: null,
        openModal: () => set({ isOpen: true, lastOpened: Date.now() }),
        closeModal: () => set({ isOpen: false }),
        reset: () => set({ isOpen: false, lastOpened: null }),
    }),
    {
        name: 'intro-modal-storage', // Key to store in localStorage
    }
),
);