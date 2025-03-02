"use client";

import { useTourControl } from "@/hooks/use-tour-control";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import FullScreenButton from "@/components/commons/FullScreenButton";
import UserDropdown from "@/components/commons/user-dropdown";



const Navbar = ({ user }: { user: IStudent, }) => {


    useTourControl([
        {
            target: '.button-step',
            content: 'Here you can see your key metrics',
            disableBeacon: true,
        },
        {
            target: '.button-2',
            content: 'This chart shows your progress over time',
        },
    ])

    return (
        <header
            className="flex w-full sticky top-0 z-50 bg-background h-16 border-b shrink-0 items-center gap-2 shadow-md transition-[width,height] ease-linear"
        >
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div className=".dashboard-stats flex gap-4 ml-auto items-center pr-10">
                {/* <AcademicDropdown sessions={sessions} /> */}
                <FullScreenButton />
                <UserDropdown
                    email={user?.email}
                    username={user?.fullName}
                    avatarUrl={user?.imgUrl as string}
                    notificationCount={100}
                />
            </div>
        </header>
    );
};

export default Navbar;
