import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "openCoin"
  | "deleteMessage";

interface ModalData {
  server?: { id: string; name: string }; // Replace with a more specific type
  channel?: { id: string; name: string }; // Replace with a more specific type
  channelType?: "text" | "voice" | "video";
  apiUrl?: string;
  query?: Record<string, string | number | boolean>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  resetModal: () => void;  // Reset function for modal
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,

  // When opening a modal
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),

  // When closing a modal
  onClose: () => set({ type: null, data: {}, isOpen: false }),

  // Reset the modal state
  resetModal: () => set({ type: null, data: {}, isOpen: false })
}));
