"use client"

import {
  Users,
  ChevronRight,
  HandCoins,
  NotebookPen,
  UsersRound,
  BookOpenCheck,
  Notebook,
  Mail,
  Menu,
  Book
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon?: React.ComponentType;
  isActive?: boolean;
  items?: NavItem[];
}


interface NavMainProps {
  school: ISchool
}

export function NavMain({ school }: NavMainProps) {

  const params = useParams();
  const pathname = usePathname();

  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const proPlan = school?.subscriptionPlan?.plan === "pro"



  const { schoolId, userId } = params





  const navMain: (NavItem | false)[] = [
    {
      title: "Academics",
      url: "#",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "Courses",
          url: `/${schoolId}/student/${userId}/academics/courses`,
        },
        {
          title: "Assignments",
          url: `/${schoolId}/student/${userId}/academics/assignments`,
        },
        {
          title: "Grades",
          url: `/${schoolId}/student/${userId}/academics/grades`,
        },
        {
          title: "Attendance",
          url: `/${schoolId}/student/${userId}/academics/attendance`,
        },
        {
          title: "Academic Planner",
          url: `/${schoolId}/student/${userId}/academics/academic-planner`,
        },
      ],
    },
    proPlan && {
      title: "Teachers",
      url: "#",
      icon: Mail,
      items: [
        {
          title: "All Teachers",
          url: `/${schoolId}/student/${userId}/teachers/`,
        },
      ],
    },
    {
      title: "Campus Life",
      url: "#",
      icon: NotebookPen,
      isActive: true,
      items: [
        {
          title: "Library Resources",
          url: `/${schoolId}/student/${userId}/campus-life/library-resources`,
        },
        {
          title: "Campus Tour",
          url: `/${schoolId}/student/${userId}/campus-life/campus-tour`,
        },
      ],
    },
    {
      title: "Financial",
      url: "#",
      icon: HandCoins,
      isActive: true,
      items: [
        {
          title: "Fees Payment",
          url: `/${schoolId}/student/${userId}/financial/fees-payment`,
        },
        {
          title: "Canteen",
          url: `/${schoolId}/student/${userId}/financial/canteen`,
        },
        {
          title: "Class Fee",
          url: `/${schoolId}/student/${userId}/financial/class-fee`,
        },
        {
          title: "Transport Fee",
          url: `/${schoolId}/student/${userId}/financial/transport-fee`,
        },
      ],
    },
    {
      title: "Smart Tools",
      url: "#",
      icon: Users,
      items: [
        {
          title: "AI Study Assistant",
          url: `/${schoolId}/student/${userId}/smart-tools/study-assistant`,
        },
        {
          title: "AI Study Planner",
          url: `/${schoolId}/student/${userId}/smart-tools/study-planner`,
        }
      ],
    },
    {
      title: "Learning Resources",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "Gamified Learning",
          url: `/${schoolId}/student/${userId}/learning-resources/gamified-learning`,
        },
      ],
    },
    {
      title: "Supervision",
      url: "#",
      icon: BookOpenCheck,
      items: [
        {
          title: "Hostel",
          url: `/${schoolId}/student/${userId}/supervision/hostel`,
        },
        {
          title: "Transport",
          url: `/${schoolId}/student/${userId}/supervision/transport`,
        }
      ],
    },
    {
      title: "Exams",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "Book List",
          url: `/${schoolId}/student/${userId}/exams/list-examss`,
        },
        {
          title: "Issued Book",
          url: `/${schoolId}/student/${userId}/exams/add-exams`,
        }
      ],
    },
    {
      title: "Library",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "Book List",
          url: `/${schoolId}/student/${userId}/library/list-stock-adjustments`,
        },
        {
          title: "Issued Book",
          url: `/${schoolId}/student/${userId}/stock-adjustment/add-stock-adjustment`,
        }
      ],
    },
    proPlan && {
      title: "Event",
      url: "#",
      icon: Mail,
      items: [
        {
          title: "All Events",
          url: `/${schoolId}/student/${userId}/payment-accounts/list-accounts`,
        },
        {
          title: "Calendar",
          url: `/${schoolId}/student/${userId}/payment-accounts/list-accounts`,
        },
      ],
    },
    
    proPlan && {
      title: "Messaging",
      url: "#",
      icon: Mail,
      // roleField: "message",
      items: [
        {
          title: "Email Message",
          url: `/${schoolId}/student/${userId}/payment-accounts/list-accounts`,
          // roleField: "manageListAccount"
        },
        {
          title: "Forum",
          url: `/${schoolId}/student/${userId}/payment-accounts/list-accounts`,
          // roleField: "manageListAccount"
        },
      ],
    },
  ];
  const isActive = useCallback(
    (url: string) => {
      const dashboardPath = `/${schoolId}/student/${userId}`;

      if (pathname === dashboardPath || pathname === `${dashboardPath}/`) {
        return url === pathname; // Only activate when it exactly matches the dashboard
      }

      return pathname.startsWith(url) && url !== dashboardPath;
    },
    [pathname, schoolId, userId]
  );

  // Automatically open collapsible if an item inside is active
  useEffect(() => {
    navMain.filter((group): group is NavItem => group !== false).forEach((group) => {
      if (group.items?.some((item) => isActive(item.url))) {
        setOpenGroup(group.title);
      }
    });
  }, [pathname]);


  return (

    <SidebarGroup>
      <SidebarGroupLabel>Nav links</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            asChild
            className={cn(
              "transition-colors hover:bg-primary/10 hover:text-primary",
              isActive(`/${schoolId}/student/${userId}`) && "bg-primary text-white font-medium"
            )}
          >
            <Link href={`/${schoolId}/student/${userId}`}
            >
              <Menu className="text-white" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>

        {navMain
          .filter((item): item is NavItem => item !== false)
          .map(item => (
            <Collapsible
              key={item.title}
              open={openGroup === item.title}
              onOpenChange={() =>
                setOpenGroup(prev => (prev === item.title ? null : item.title))
              }
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "transition-colors hover:bg-primary/10 hover:text-primary",
                      item.items?.some(subItem => isActive(subItem.url)) && "bg-primary text-white font-medium"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className={`ml-auto shrink-0 transition-transform duration-200 ${openGroup === item.title ? "rotate-90" : ""}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              "transition-colors hover:text-primary",
                              isActive(subItem.url) &&
                              "bg-primary/10 text-primary font-medium"
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarMenu>
    </SidebarGroup>

  )
}
