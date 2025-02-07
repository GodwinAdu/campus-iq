"use client";

import { ChevronsUpDown, School, ShoppingCart } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useParams, useRouter } from "next/navigation"; // For dynamic navigation
import { useTourControl } from "@/hooks/use-tour-control";

export function TeamSwitcher({ store }: { store: IStore }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const params = useParams();

  useTourControl([
    {
      target: '.team-switcher',
      content: 'Hello this is where to switch between branches ',
      disableBeacon: true,
    },
  ]);





  return (
    <SidebarMenu>
      <SidebarMenuItem>


      </SidebarMenuItem>
    </SidebarMenu>
  );
}
