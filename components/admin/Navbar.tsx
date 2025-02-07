"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { BarChart4, Package, Users } from "lucide-react";
import FullScreenButton from "../commons/FullScreenButton";
import { useTourControl } from "@/hooks/use-tour-control";


const Navbar = () => {


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

            <div className=".dashboard-stats flex gap-4 ml-auto items-center pr-3">
                <FullScreenButton />

                <Button className="button-step" variant="outline" size="icon">
                    <Users className="h-4 w-4" />
                </Button>
                <Button className="button-2" variant="outline" size="icon">
                    <Package className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                    <BarChart4 className="h-4 w-4" />
                </Button>
                {/* <SettingComponent /> */}

                {/* <UserDropdown
                    email={user?.email}
                    username={user?.fullName}
                    avatarUrl={user?.avatarUrl as string}
                    notificationCount={100}
                /> */}
            </div>
        </header>
    );
};

export default Navbar;
