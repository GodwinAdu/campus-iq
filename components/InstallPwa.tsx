"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Detect iOS
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        );
        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        // Handle beforeinstallprompt for Android
        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault();
            setDeferredPrompt(event);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    if (isStandalone) {
        return null; // Don't show install prompt if already installed
    }

    return (
        <div className="p-4 border rounded shadow-md bg-white">
            <h3 className="text-lg font-bold">Install App</h3>
            {deferredPrompt && (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                        deferredPrompt.prompt();
                    }}
                >
                    Install Now
                </button>
            )}
            {isIOS && (
                <p className="mt-2 text-gray-600">
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon"> ⎋ </span> and then &quot;Add to Home Screen&quot;
                    <span role="img" aria-label="plus icon"> ➕ </span>.
                </p>
            )}
        </div>
    );
}
