"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt(): Promise<void>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect if the app is already installed
        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        // Detect if it's iOS (because iOS doesn't support `beforeinstallprompt`)
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window));

        // Listen for the beforeinstallprompt event (for Windows and Android)
        const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
            event.preventDefault();
            setDeferredPrompt(event);

            // Automatically trigger install prompt after page load
            setTimeout(() => {
                event.prompt();
                event.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User installed the PWA");
                    } else {
                        console.log("User dismissed the install prompt");
                    }
                });
            }, 2000); // Delay 2 seconds to ensure page loads fully
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
        };
    }, []);

    if (isStandalone) return null; // Don't show anything if already installed

    return (
        <div className="fixed bottom-4 left-4 p-3 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-bold">Install App</h3>
            {isIOS && (
                <p className="text-gray-600">
                    On iOS, tap the share button
                    <span role="img" aria-label="share"> ⎋ </span> and select &quot;Add to Home Screen&quot;
                    <span role="img" aria-label="plus"> ➕ </span>.
                </p>
            )}
        </div>
    );
}
