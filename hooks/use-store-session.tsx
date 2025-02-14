import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface SessionState {
    activeSession: ISession | null;
    setActiveSession: (Session: ISession) => void;
}

const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            activeSession: null,
            setActiveSession: (session) => set({ activeSession: session }),
        }),
        {
            name: "session-storage", // Key to store in localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useSessionStore;