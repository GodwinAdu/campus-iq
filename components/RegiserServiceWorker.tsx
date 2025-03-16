"use client";
import { useEffect } from "react";

export default function RegisterServiceWorker() {
    useEffect(() => {
        if (
            process.env.NODE_ENV !== "development" && // Prevents 404 in dev mode
            "serviceWorker" in navigator
        ) {
            navigator.serviceWorker.register("/sw.js").then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            }).catch((err) => {
                console.error("Service Worker registration failed:", err);
            });
        }
    }, []);

    return null;
}
