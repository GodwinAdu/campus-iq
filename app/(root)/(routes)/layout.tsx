
import AdvancedNavbar from "@/components/AdvancedNavbar";
import AdvancedFooter from "@/components/AdvancedFooter";
import { AIChatbot } from "@/components/AIChatbot";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
   

    return (
        <>
        <AdvancedNavbar />
        {children}
        <AdvancedFooter />
        <AIChatbot />
        </>
    );
}
