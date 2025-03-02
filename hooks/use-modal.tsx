"use client";

import { create } from "zustand";

type ModalType = "settings" | "invite" | "help" | "notifications" | "documents" | "mood" | "activity" | "behavior";

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    modalData: IStudent | null; // Store the selected student's data
    onOpen: (type: ModalType, data?: any) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    modalData: null,
    onOpen: (type, data = null) => set({ isOpen: true, type, modalData: data }),
    onClose: () => set({ isOpen: false, type: null, modalData: null }),
}));

export const useModal = () => {
    const store = useModalStore();

    return {
        type: store.type,
        isOpen: store.isOpen,
        modalData: store.modalData, // Access modal data
        openModal: (type: ModalType, data?: IStudent) => {
            store.onOpen(type, data);
        },
        closeModal: () => {
            store.onClose();
        },
    };
};
