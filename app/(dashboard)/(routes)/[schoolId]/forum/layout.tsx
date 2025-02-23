import { ModalProvider } from "@/components/forums/providers/modal-provider";
import React from "react";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main >
            <ModalProvider />
            {children}
        </main>
    );
}