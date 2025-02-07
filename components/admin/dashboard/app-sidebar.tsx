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
  store: {name:string}, // Replace `any` with the specific type if you know it
  userRole: IRole
}

export function AppSidebar(props: AppSidebarProps) {
  const { store,  userRole, ...rest } = props;

  return (
    <Sidebar collapsible="icon" {...rest}>
      <SidebarHeader>
        <TeamSwitcher store={store}  />
      </SidebarHeader>
      <SidebarContent>
        <SideContent role={userRole} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser store={store} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}