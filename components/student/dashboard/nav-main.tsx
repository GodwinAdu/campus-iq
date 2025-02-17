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
  role: IRole | undefined;
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
          url: `/${schoolId}/admin/${userId}/system-config/manage-sessions`,
        },
        {
          title: "Assignments",
          url: `/${schoolId}/admin/${userId}/system-config/manage-role`,
        },
        {
          title: "Grades",
          url: `/${schoolId}/admin/${userId}/system-config/manage-term`,
        },
        {
          title: "Attendance",
          url: `/${schoolId}/admin/${userId}/system-config/manage-term`,
        },
        {
          title: "Academic Planner",
          url: `/${schoolId}/admin/${userId}/system-config/manage-term`,
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
          url: `/${schoolId}/admin/${userId}/class/manage-classes`,
        },
        {
          title: "Campus Tour",
          url: `/${schoolId}/admin/${userId}/class/manage-subjects`,
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
          url: `/${schoolId}/admin/${userId}/attendance/manage-attendance`,
        },
        {
          title: "Canteen",
          url: `/${schoolId}/admin/${userId}/attendance/manage-attendance`,
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
          url: `/${schoolId}/admin/${userId}/manage-students/student-type`,
        },
        {
          title: "AI Study Planner",
          url: `/${schoolId}/admin/${userId}/manage-students/manage-student`,
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
          url: `/${schoolId}/admin/${userId}/manage-employee/add-department`,
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
          url: `/${schoolId}/admin/${userId}/manage-attendance/students`,
        },
        {
          title: "Transport",
          url: `/${schoolId}/admin/${userId}/manage-attendance/employees`,
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
          url: `/${schoolId}/admin/${userId}/stock-adjustment/list-stock-adjustments`,
        },
        {
          title: "Issued Book",
          url: `/${schoolId}/admin/${userId}/stock-adjustment/add-stock-adjustment`,
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
          url: `/${schoolId}/admin/${userId}/stock-adjustment/list-stock-adjustments`,
        },
        {
          title: "Issued Book",
          url: `/${schoolId}/admin/${userId}/stock-adjustment/add-stock-adjustment`,
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
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
        },
        {
          title: "Calendar",
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
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
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
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
          title: "List Accounts",
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
          // roleField: "manageListAccount"
        },
      ],
    },
  ];
  const isActive = useCallback(
    (url: string) => {
      const dashboardPath = `/${schoolId}/admin/${userId}`;

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
  }, [pathname,]);


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
