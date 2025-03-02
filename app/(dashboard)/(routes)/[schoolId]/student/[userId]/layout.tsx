
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { TourProvider } from "@/lib/context/TourContext";
import TourLayout from "@/provider/TourLayout";
import { getAllSessions } from "@/lib/actions/session.actions";
import AppSidebarMain from "@/components/student/dashboard/app-sidebar-main";
import Navbar from "@/components/student/dashboard/nav-bar";
import { currentStudent } from "@/lib/helpers/current-student";
import { currentUser } from "@/lib/helpers/current-user";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = (await currentUser()) ?? null;
    console.log(user);
    // const sessions = await getAllSessions() ?? [];

    return (
        <TourProvider>
            <TourLayout>
                <SidebarProvider>
                    <AppSidebarMain />
                    <SidebarInset>
                        <Navbar  user={user} />
                        <div className="relative">
                            <div id="main-content" className="py-4 px-4 overflow-hidden">
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
