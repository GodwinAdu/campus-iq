"use client"

import {
  Users,
  ChevronRight,
  ShoppingBag,
  HandCoins,
  PiggyBank,
  Activity,
  HardDrive,
  NotebookPen,
  UsersRound,
  BookOpenCheck,
  Notebook,
  TimerIcon,
  TvMinimalPlay,
  BookOpenCheckIcon,
  Combine,
  House,
  Library,
  Mail,
  Menu
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
  roleField?: keyof IRole | string;
  isActive?: boolean;
  items?: NavItem[];
}


interface NavMainProps {
  role: IRole | undefined;
  school: ISchool
}

export function NavMain({ role, school }: NavMainProps) {

  const params = useParams();
  const pathname = usePathname();

  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const proPlan = school?.subscriptionPlan?.plan === "pro"



  const { schoolId, userId } = params





  const navMain: (NavItem | false)[] = [
    {
      title: "System Config",
      url: "#",
      icon: HardDrive,
      isActive: true,
      // roleField: "manageSystemConfig",
      items: [
        {
          title: "manage Sessions",
          url: `/${schoolId}/admin/${userId}/system-config/manage-sessions`,
          roleField: "manageSession"
        },
        {
          title: "Manage Roles",
          url: `/${schoolId}/admin/${userId}/system-config/manage-role`,
          roleField: "manageRole"
        },
        {
          title: "Manage Terms",
          url: `/${schoolId}/admin/${userId}/system-config/manage-term`,
          roleField: "manageTerm"
        },
        {
          title: "Manage Time",
          url: `/${schoolId}/admin/${userId}/system-config/manage-time`,
          roleField: "manageTime"
        },
      ],
    },
    {
      title: "Class Management",
      url: "#",
      icon: NotebookPen,
      isActive: true,
      roleField: "classManagement",
      items: [
        {
          title: "Classes",
          url: `/${schoolId}/admin/${userId}/class/manage-classes`,
          roleField: "manageClass"
        },
        {
          title: "Subjects",
          url: `/${schoolId}/admin/${userId}/class/manage-subjects`,
          roleField: "manageSubject"
        },
      ],
    },
    {
      title: "Canteen Management",
      url: "#",
      icon: HandCoins,
      isActive: true,
      // roleField: "attendanceManagement",
      items: [
        {
          title: "Manage Attendance",
          url: `/${schoolId}/admin/${userId}/attendance/manage-attendance`,
          // roleField: "manageAttendance"
        },
        // {
        //   title: "Manage Absent",
        //   url: `/${schoolId}/admin/${userId}/attendance/manage-absent`,
        //   roleField: "manageAbsent"
        // },
      ],
    },
    {
      title: "Student Management",
      url: "#",
      icon: Users,
      roleField: "studentManagement",
      items: [
        {
          title: "Student Type",
          url: `/${schoolId}/admin/${userId}/manage-students/student-type`,
          roleField: "manageStudent"
        },
        {
          title: "Manage Student",
          url: `/${schoolId}/admin/${userId}/manage-students/manage-student`,
          roleField: "manageStudent"
        },
        {
          title: "Manage Parent",
          url: `/${schoolId}/admin/${userId}/manage-students/manage-parent`,
          roleField: "manageStudent"
        },
      ],
    },
    {
      title: "Employees Management",
      url: "#",
      icon: UsersRound,
      roleField: "employeeManagement",
      items: [
        {
          title: "Add Department",
          url: `/${schoolId}/admin/${userId}/manage-employee/add-department`,
          roleField: "manageDepartment"
        },
        {
          title: "Employee List",
          url: `/${schoolId}/admin/${userId}/manage-employee/employee-list`,
          roleField: "manageEmployeeList"
        },
        {
          title: "Add Employee",
          url: `/${schoolId}/admin/${userId}/manage-employee/manage-employees`,
          roleField: "manageEmployee"
        },
      ],
    },
    {
      title: "Manage Attendance",
      url: "#",
      icon: BookOpenCheck,
      roleField: "manageAttendance",
      items: [
        {
          title: "Students",
          url: `/${schoolId}/admin/${userId}/manage-attendance/students`,
          roleField: "manageStudentAttendance"
        },
        {
          title: "Employees",
          url: `/${schoolId}/admin/${userId}/manage-attendance/employees`,
          roleField: "manageEmployeeAttendance",
        }
      ],
    },
    {
      title: "Home Work",
      url: "#",
      icon: Notebook,
      roleField: "homeWork",
      items: [
        {
          title: "List Stock Adjustments",
          url: `/${schoolId}/admin/${userId}/stock-adjustment/list-stock-adjustments`,
          roleField: "listStockAdjustment"
        },
        {
          title: "Add Stock Adjustment",
          url: `/${schoolId}/admin/${userId}/stock-adjustment/add-stock-adjustment`,
          roleField: "manageStockAdjustment"
        }
      ],
    },
    {
      title: "Time Table",
      url: "#",
      icon: TimerIcon,
      roleField: "timetable",
      items: [
        {
          title: "Manage Timetable",
          url: `/${schoolId}/admin/${userId}/manage-timetable/timetable`,
          // roleField: "timetable"
        },
      ],
    },
    proPlan && {
      title: "Virtual Learning",
      url: "#",
      icon: TvMinimalPlay,
      roleField: "onlineLearning",
      items: [
        {
          title: "List Accounts",
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
          roleField: "manageListAccount"
        },
      ],
    },
    proPlan && {
      title: "Exams Management",
      url: "#",
      icon: BookOpenCheckIcon,
      roleField: "examsManagement",
      items: [
        {
          title: "Exams Hall",
          url: `/${schoolId}/admin/${userId}/exam/exams-hall`,
          // roleField: "manageListAccount"
        },
        {
          title: "Distribution",
          url: `/${schoolId}/admin/${userId}/exam/distribution`,
          // roleField: "manageListAccount"
        },
        {
          title: "Exams Setup",
          url: `/${schoolId}/admin/${userId}/exam/exam-setup`,
          // roleField: "manageListAccount"
        },
        {
          title: "Exams Schedule",
          url: `/${schoolId}/admin/${userId}/exam/exam-schedule`,
          // roleField: "manageListAccount"
        },
        {
          title: "Mark Entries",
          url: `/${schoolId}/admin/${userId}/exam/mark-entries`,
          // roleField: "manageListAccount"
        },
        {
          title: "Generate Position",
          url: `/${schoolId}/admin/${userId}/exam/generate-position`,
          // roleField: "manageListAccount"
        },
        {
          title: "Grade Ranges",
          url: `/${schoolId}/admin/${userId}/exam/grade-ranges`,
          // roleField: "manageListAccount"
        },
      ],
    },
    proPlan && {
      title: "Fees Management",
      url: "#",
      icon: HandCoins,
      roleField: "account",
      items: [
        {
          title: "Fees Structure",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-structures`,
          // roleField: "manageListAccount"
        },
        {
          title: "Fees Setup",
          url: `/${schoolId}/admin/${userId}/manage-fees/fine-setup`,
          // roleField: "manageListAccount"
        },
        {
          title: "Fees Payment",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-payment`,
          // roleField: "manageListAccount"
        },
        {
          title: "Fees Reminder",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-reminder`,
          // roleField: "manageListAccount"
        },
      ],
    },
    proPlan && {
      title: "Hr and Payroll",
      url: "#",
      icon: Combine,
      roleField: "account",
      items: [
        {
          title: "Salary Structure",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-structure`,
          // roleField: "manageListAccount"
        },
        {
          title: "Salary Assign",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-assign`,
          // roleField: "manageListAccount"
        },
        {
          title: "Salary Payment",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-payment`,
          // roleField: "manageListAccount"
        },
        {
          title: "Request Salary",
          url: `/${schoolId}/admin/${userId}/hr-payroll/request-salary`,
          // roleField: "manageListAccount"
        },
        {
          title: "Manage Salary Request",
          url: `/${schoolId}/admin/${userId}/hr-payroll/manage-salary-request`,
          // roleField: "manageListAccount"
        },
        {
          title: "Leave Category",
          url: `/${schoolId}/admin/${userId}/hr-payroll/leave-category`,
          // roleField: "manageListAccount"
        },
        {
          title: "Request Leave",
          url: `/${schoolId}/admin/${userId}/hr-payroll/request-leave`,
          // roleField: "manageListAccount"
        },
        {
          title: "Manage Leave",
          url: `/${schoolId}/admin/${userId}/hr-payroll/manage-leave`,
          // roleField: "manageListAccount"
        },
        {
          title: "Awards",
          url: `/${schoolId}/admin/${userId}/hr-payroll/awards`,
          // roleField: "manageListAccount"
        },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: ShoppingBag,
      roleField: "inventory",
      items: [
        {
          title: "Stores",
          url: `/${schoolId}/admin/${userId}/inventory/stores`,
          // roleField: "manageListAccount"
        },
        {
          title: "Category",
          url: `/${schoolId}/admin/${userId}/inventory/category`,
          // roleField: "manageListAccount"
        },
        {
          title: "Products",
          url: `/${schoolId}/admin/${userId}/inventory/products`,
          // roleField: "manageListAccount"
        },
        {
          title: "Suppliers",
          url: `/${schoolId}/admin/${userId}/inventory/suppliers`,
          // roleField: "manageListAccount"
        },
        {
          title: "Purchase", //
          url: `/${schoolId}/admin/${userId}/inventory/purchase`,
          // roleField: "manageListAccount"
        },
        {
          title: "Issue",
          url: `/${schoolId}/admin/${userId}/inventory/issue`,
          // roleField: "manageListAccount"
        },
      ],
    },
    proPlan && {
      title: "Hostel Management",
      url: "#",
      icon: House,
      roleField: "hostelManagement",
      items: [
        {
          title: "Hostel",
          url: `/${schoolId}/admin/${userId}/hostel/manage-hostel`,
          // roleField: "manageListAccount"
        },
        {
          title: "Rooms",
          url: `/${schoolId}/admin/${userId}/hostel/hostel-room`,
          // roleField: "manageListAccount"
        },
        {
          title: "Maintenance",
          url: `/${schoolId}/admin/${userId}/hostel/maintenance`,
          // roleField: "manageListAccount"
        }
      ],
    },
    proPlan && {
      title: "Library Management",
      url: "#",
      icon: Library,
      roleField: "library",
      items: [
        {
          title: "Books",
          url: `/${schoolId}/admin/${userId}/library/manage-books`,
          // roleField: "manageListAccount"
        },
        {
          title: "Issue Books",
          url: `/${schoolId}/admin/${userId}/library/manage-issue-books`,
          // roleField: "manageListAccount"
        },
      ],
    },
    {
      title: "Deposit & Expenses",
      url: "#",
      icon: PiggyBank,
      roleField: "depositAndExpense",
      items: [
        {
          title: "Account Integration",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/`,
          // roleField: "manageListAccount"
        },
        {
          title: "Accounts",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/accounts`,
          // roleField: "manageListAccount"
        },
        {
          title: "New Deposit",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/new-deposits`,
          // roleField: "manageListAccount"
        },
        {
          title: "New Expenses",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/new-expenses`,
          // roleField: "manageListAccount"
        },
        {
          title: "All Transactions",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/all-transactions`,
          // roleField: "manageListAccount"
        },
      ],
    },
    proPlan && {
      title: "Messaging",
      url: "#",
      icon: Mail,
      roleField: "smsAndEmail",
      items: [
        {
          title: "List Accounts",
          url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
          roleField: "manageListAccount"
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Activity,
      roleField: "report",
      items: [
        {
          title: "Student Report",
          url: `/${schoolId}/admin/${userId}/report/profit-lost-report`,
          // roleField: "profitLostReport"
        },
        {
          title: "Financial Reports",
          url: `/${schoolId}/admin/${userId}/report/register-report`,
          // roleField: "registerReport"
        },
        {
          title: "Attendance Reports",
          url: `/${schoolId}/admin/${userId}report//expenses-report`,
          // roleField: "expensesReport"
        }, {
          title: "Hr and payroll Reports",
          url: `/${schoolId}/admin/${userId}/report/product-sell-report`,
          // roleField: "productSellReport"
        }, {
          title: "Inventory Reports",
          url: `/${schoolId}/admin/${userId}/report/product-purchase-report`,
          // roleField: "productPurchaseReport"
        }, {
          title: "Examination Report",
          url: `/${schoolId}/admin/${userId}/report/sell-return-report`,
          // roleField: "sellReturnReport"
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
              isActive(`/${schoolId}/admin/${userId}`) && "bg-primary text-white font-medium"
            )}
          >
            <Link href={`/${schoolId}/admin/${userId}`}
            >
              <Menu className="text-white" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>

        {navMain
          .filter((item): item is NavItem => item !== false)
          .filter(item => !item.roleField || (role && role[item.roleField as keyof IRole]))
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
                    {item.items
                      ?.filter(subItem => !subItem?.roleField || role[subItem?.roleField])
                      .map(subItem => (
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
