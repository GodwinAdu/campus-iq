
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { currentUser } from "@/lib/helpers/current-user";
import { TourProvider } from "@/lib/context/TourContext";
import TourLayout from "@/provider/TourLayout";
import AppSidebarMain from "@/components/admin/dashboard/app-sidebar-main";
import Navbar from "@/components/admin/Navbar";
import { getAllSessions } from "@/lib/actions/session.actions";
import { ModalProvider } from "@/components/admin/modals/modal-provider";
import IntroModal from "@/components/commons/IntroModal";
import { Announcements } from "@/components/commons/Anouncements";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = (await currentUser()) ?? null;
    const sessions = await getAllSessions() ?? [];

    return (
        <TourProvider>
            <TourLayout>
                <SidebarProvider className="sidebar">
                    <AppSidebarMain />
                    <SidebarInset >
                        <Navbar sessions={sessions} user={user} />
                        <div className="relative scrollbar-hide">
                            <div id="main-content" className="py-4 px-4 overflow-hidden scrollbar-hide">
                                {/* <IntroModal /> */}
                                <ModalProvider />
                                <Announcements  />
                                {children}
                                {/* <UseCheckStoreExpired /> */}
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </TourLayout>
        </TourProvider>
    );
}
