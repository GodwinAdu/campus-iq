"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavUser } from "./nav-user"
import SideContent from "./sidebar"



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  school: ISchool, // Replace `any` with the specific type if you know it
  userRole: IRole,
  user:IEmployee
}

export function AppSidebar(props: AppSidebarProps) {
  const { school,user,  userRole, ...rest } = props;

  return (
    <Sidebar collapsible="icon" {...rest}>
      <SidebarHeader>
        <TeamSwitcher user={user}  />
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide">
        <SideContent school={school} role={userRole?.permissions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser school={school} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}