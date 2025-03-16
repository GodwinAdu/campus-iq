"use client"
import { useEffect, useState } from "react";

const InstallPWA = () => {
    // const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            const evt = event as Event & { prompt: () => void };
            evt.prompt();
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    return null;
};

export default InstallPWA;
