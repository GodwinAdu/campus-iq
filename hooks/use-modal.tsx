"use client"

import { create } from "zustand"

type ModalType = "settings" | "invite" | "help" | "notifications" | "documents" | "mood" | "activity" | "behavior"

interface ModalStore {
    type: ModalType | null
    isOpen: boolean
    onOpen: (type: ModalType) => void
    onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false, type: null }),
}))

export const useModal = () => {
    const store = useModalStore()

    return {
        type: store.type,
        isOpen: store.isOpen,
        openModal: (type: ModalType) => {
            store.onOpen(type)
        },
        closeModal: () => {
            store.onClose()
        },
    }
}

