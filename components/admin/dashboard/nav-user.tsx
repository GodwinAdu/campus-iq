"use client"

import {
  ChevronsUpDown,
  DockIcon,
  Settings,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useParams } from "next/navigation"
import { dayLeft } from "@/lib/utils"
import Link from "next/link"

import { useTourControl } from "@/hooks/use-tour-control"
import { ModeToggle } from "@/components/commons/theme/ModeToggle"
import { RatingDialog } from "./dialog/RatingDialog"
import { PaymentDialog } from "./dialog/paymentDialog"


export function NavUser({ school }: { school: ISchool }) {
  const { isMobile } = useSidebar()
  const params = useParams()

  const {schoolId,userId} = params;
  useTourControl([
    {
      target: '.school-avatar',
      content: 'tesfksjf sf sfs lfsjflks jfsljfslkfs ',
      disableBeacon: true,
    },
  ])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="school-avatar" asChild>
            <SidebarMenuButton
              size="lg"
              className=" data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src='' alt={school.schoolName} />
                <AvatarFallback className="rounded-lg">{school.schoolName.toUpperCase().slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{school.schoolName}</span>
                <span className="truncate text-xs text-red-400 font-extrabold">Expired : {dayLeft(school?.subscriptionPlan?.expiryDate)} days left</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src='' alt={school.schoolName} />
                  <AvatarFallback className="rounded-lg">{school.schoolName.toUpperCase().slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{school.schoolName}</span>
                  <span className="text-primary font-extrabold">{school.subscriptionPlan.plan} plan</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex gap-2 items-center">
                <ModeToggle />
                <p className="font-extrabold">Theme</p>
              </div>
              <Link href={`/${schoolId}/admin/${userId}/school-settings`}>
                <DropdownMenuItem>
                  <Settings />
                  School Settings
                </DropdownMenuItem>
              </Link>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <PaymentDialog school={school} />
              <RatingDialog />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
