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
  BookOpenCheckIcon,
  Combine,
  House,
  Library,
  Mail,
  CookingPot,
  Menu,
  HistoryIcon,
  Trash,
  LucideReceiptText,
  CalendarPlus
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
      title: "Dashboard",
      url: `/${schoolId}/admin/${userId}`,
      icon: Menu,
      isActive: false,

    },
 ,   // {
    //   title: "Admission Portal",
    //   url: `/${schoolId}/admin/${userId}/admissions`,
    //   icon:ListCheck,
    //   isActive: false,

    // },
    {
      title: "Events",
      url: `/${schoolId}/admin/${userId}/events`,
      icon:CalendarPlus,
      isActive: false,

    },
    {
      title: "Front Desk",
      url: "#",
      icon: LucideReceiptText,
      isActive: true,
      roleField: "systemConfig",
      items: [
        // {
        //   title: "Admission",
        //   url: `/${schoolId}/admin/${userId}/front-desk/admission`,
        //   roleField: "manageSession"
        // },
        {
          title: "Postal Records",
          url: `/${schoolId}/admin/${userId}/front-desk/postal-records`,
          roleField: "manageSession"
        },
        {
          title: "Call Logs",
          url: `/${schoolId}/admin/${userId}/front-desk/call-logs`,
          roleField: "manageSession"
        },
        {
          title: "Visitor Logs",
          url: `/${schoolId}/admin/${userId}/front-desk/visitor-logs`,
          roleField: "manageSession"
        },
        {
          title: "Complaints",
          url: `/${schoolId}/admin/${userId}/front-desk/complaints`,
          roleField: "manageSession"
        },
      ],
    },
    {
      title: "System Config",
      url: "#",
      icon: HardDrive,
      isActive: true,
      roleField: "systemConfig",
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
        // {
        //   title: "Audit Logs",
        //   url: `/${schoolId}/admin/${userId}/system-config/manage-term`,
        //   roleField: "manageTerm"
        // },
      ],
    },
    {
      title: "Academics & Learning",
      url: "#",
      icon: NotebookPen,
      isActive: true,
      roleField: "classManagement",
      items: [
        // {
        //   title: "Assignments",
        //   url: `/${schoolId}/admin/${userId}/class/assignment`,
        //   roleField: "manageClass"
        // },
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
        {
          title: "Timetable",
          url: `/${schoolId}/admin/${userId}/class/timetable`,
          roleField: "manageSubject"
        },
        {
          title: "Daily Class Fees",
          url: `/${schoolId}/admin/${userId}/class/class-fees`,
          roleField: "manageClass"
        },
        // {
        //   title: "Promote Student",
        //   url: `/${schoolId}/admin/${userId}/class/promotion`,
        //   roleField: "manageSubject"
        // },
      ],
    },
    {
      title: "Canteen Management",
      url: "#",
      icon: CookingPot,
      isActive: true,
      roleField: "canteenManagement",
      items: [
        {
          title: "Assign Meal",
          url: `/${schoolId}/admin/${userId}/canteen/assign-meal`,
          // roleField: "manageAttendance"
        },
        {
          title: "Meal Plan",
          url: `/${schoolId}/admin/${userId}/canteen/meal-plan`,
          // roleField: "manageAttendance"
        },
        {
          title: "Meal Schedule",
          url: `/${schoolId}/admin/${userId}/canteen/meal-schedule`,
          // roleField: "manageAttendance"
        },
        {
          title: "Meal Timetable",
          url: `/${schoolId}/admin/${userId}/canteen/meal-timetable`,
          // roleField: "manageAttendance"
        },
        {
          title: "Payment",
          url: `/${schoolId}/admin/${userId}/canteen/payment`,
          // roleField: "manageAttendance"
        },
      ],
    },
    {
      title: "Student Wellbeing",
      url: "#",
      icon: Users,
      roleField: "studentManagement",
      items: [
        // {
        //   title: "Assistant Manager",
        //   url: `/${schoolId}/admin/${userId}/student-wellbeing/assistant`,
        //   roleField: "manageStudent"
        // },
        // {
        //   title: "Social Support",
        //   url: `/${schoolId}/admin/${userId}/student-wellbeing/social-support`,
        //   roleField: "manageStudent"
        // },
        {
          title: "Add Wellbeing",
          url: `/${schoolId}/admin/${userId}/student-wellbeing/wellbeing`,
          roleField: "manageStudent"
        }
      ],
    },
    {
      title: "Student Management",
      url: "#",
      icon: Users,
      roleField: "studentManagement",
      items: [
        {
          title: "Add Bulk Students",
          url: `/${schoolId}/admin/${userId}/manage-students/bulk-students`,
          roleField: "manageStudent"
        },
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
          roleField: "manageEmployee",
        },
        {
          title: "Employee List",
          url: `/${schoolId}/admin/${userId}/manage-employee/employee-list`,
          roleField: "manageEmployee"
        },
        {
          title: "Add Employee",
          url: `/${schoolId}/admin/${userId}/manage-employee/manage-employees`,
          roleField: "manageEmployee"
        },
      ],
    },
    // proPlan && {
    //   title: "Virtual Learning",
    //   url: "#",
    //   icon: TvMinimalPlay,
    //   roleField: "onlineLearning",
    //   items: [
    //     {
    //       title: "List Accounts",
    //       url: `/${schoolId}/admin/${userId}/payment-accounts/list-accounts`,
    //       roleField: "manageListAccount"
    //     },
    //   ],
    // },
    proPlan && {
      title: "Exams Management",
      url: "#",
      icon: BookOpenCheckIcon,
      roleField: "examsManagement",
      items: [
        {
          title: "Exams Hall",
          url: `/${schoolId}/admin/${userId}/exam/exams-hall`,
          roleField: "manageExam"
        },
        {
          title: "Distribution",
          url: `/${schoolId}/admin/${userId}/exam/distribution`,
          roleField: "manageExam"
        },
        {
          title: "Exams Setup",
          url: `/${schoolId}/admin/${userId}/exam/exam-setup`,
          roleField: "manageExam"
        },
        {
          title: "Exams Schedule",
          url: `/${schoolId}/admin/${userId}/exam/exam-schedule`,
          roleField: "manageExam"
        },
        {
          title: "Mark Entries",
          url: `/${schoolId}/admin/${userId}/exam/mark-entries`,
          roleField: "manageExam"
        },
        {
          title: "Generate Position",
          url: `/${schoolId}/admin/${userId}/exam/generate-position`,
          roleField: "manageExam"
        },
        {
          title: "Grade Ranges",
          url: `/${schoolId}/admin/${userId}/exam/grade-ranges`,
          roleField: "manageExam"
        },
      ],
    },
    proPlan && {
      title: "Fees Management",
      url: "#",
      icon: HandCoins,
      roleField: "feesManagement",
      items: [
        {
          title: "Fees Structure",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-structures`,
          roleField: "manageFees"
        },
        {
          title: "Fees Setup",
          url: `/${schoolId}/admin/${userId}/manage-fees/fine-setup`,
          roleField: "manageFees"
        },
        {
          title: "Fees Payment",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-payment`,
          roleField: "manageFees"
        },
        {
          title: "Fees Reminder",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-reminder`,
          roleField: "manageFees"
        },
        {
          title: "Invoice",
          url: `/${schoolId}/admin/${userId}/manage-fees/fees-reminder`,
          roleField: "manageFees"
        },
      ],
    },
    proPlan && {
      title: "Hr and Payroll",
      url: "#",
      icon: Combine,
      roleField: "hrManagement",
      items: [
        {
          title: "Salary Structure",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-structure`,
          roleField: "manageHr"
        },
        {
          title: "Salary Assign",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-assign`,
          roleField: "manageHr"
        },
        {
          title: "Salary Payment",
          url: `/${schoolId}/admin/${userId}/hr-payroll/salary-payment`,
          roleField: "manageHr"
        },
        // {
        //   title: "Request Salary",
        //   url: `/${schoolId}/admin/${userId}/hr-payroll/request-salary`,
        //   roleField: "manageRequestSalary",
        // },
        // {
        //   title: "Manage Salary Request",
        //   url: `/${schoolId}/admin/${userId}/hr-payroll/manage-salary-request`,
        //   roleField: "manageHr"
        // },
        {
          title: "Leave Category",
          url: `/${schoolId}/admin/${userId}/hr-payroll/leave-category`,
          roleField: "manageLeaveCategory",
        },
        // {
        //   title: "Request Leave",
        //   url: `/${schoolId}/admin/${userId}/hr-payroll/request-leave`,
        //   roleField: "manageRequestLeave",
        // },
        // {
        //   title: "Manage Leave",
        //   url: `/${schoolId}/admin/${userId}/hr-payroll/manage-leave`,
        //   roleField: "manageHr"
        // },
        {
          title: "Awards",
          url: `/${schoolId}/admin/${userId}/hr-payroll/awards`,
          roleField: "manageHr"
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
          roleField: "manageInventory",
        },
        {
          title: "Category",
          url: `/${schoolId}/admin/${userId}/inventory/category`,
          roleField: "manageInventory",
        },
        {
          title: "Products",
          url: `/${schoolId}/admin/${userId}/inventory/products`,
          roleField: "manageInventory",
        },
        {
          title: "Suppliers",
          url: `/${schoolId}/admin/${userId}/inventory/suppliers`,
          roleField: "manageInventory",
        },
        {
          title: "Purchase", //
          url: `/${schoolId}/admin/${userId}/inventory/purchase`,
          roleField: "manageInventory",
        },
        {
          title: "Issue",
          url: `/${schoolId}/admin/${userId}/inventory/issue`,
          roleField: "manageInventory",
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
          roleField: "manageHostel"
        },
        {
          title: "Rooms",
          url: `/${schoolId}/admin/${userId}/hostel/hostel-room`,
          roleField: "manageHostel"
        },
        {
          title: "Maintenance",
          url: `/${schoolId}/admin/${userId}/hostel/maintenance`,
          roleField: "manageHostel"
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
          roleField: "manageLibrary",
        },
        {
          title: "Issue Books",
          url: `/${schoolId}/admin/${userId}/library/manage-issue-books`,
          roleField: "manageLibrary",
        },
      ],
    },
    // proPlan && {
    //   title: "Health Records",
    //   url: "#",
    //   icon: HospitalIcon,
    //   roleField: "library",
    //   items: [
    //     {
    //       title: "Books",
    //       url: `/${schoolId}/admin/${userId}/library/manage-books`,
    //       roleField: "manageHealth"
    //     },
    //     {
    //       title: "Issue Books",
    //       url: `/${schoolId}/admin/${userId}/library/manage-issue-books`,
    //       roleField: "manageHealth"
    //     },
    //   ],
    // },
    {
      title: "Deposit & Expenses",
      url: "#",
      icon: PiggyBank,
      roleField: "depositAndExpense",
      items: [
        {
          title: "Account Integration",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/`,
          roleField: "manageAccount"
        },
        {
          title: "Accounts",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/accounts`,
          roleField: "manageAccount"
        },
        {
          title: "New Deposit",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/new-deposits`,
          roleField: "manageAccount"
        },
        {
          title: "New Expenses",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/new-expenses`,
          roleField: "manageAccount"
        },
        {
          title: "All Transactions",
          url: `/${schoolId}/admin/${userId}/deposit-expenses/all-transactions`,
          roleField: "manageAccount"
        },
      ],
    },
    proPlan && {
      title: "Messaging Hub",
      url: "#",
      icon:Mail,
      roleField: "message",
      items: [
        {
          title: "Bulk Emails",
          url: `/${schoolId}/admin/${userId}/messaging/bulk-email`,
          roleField: "message",
        },
        {
          title: "Email Message",
          url: `/${schoolId}/admin/${userId}/messaging/email`,
          roleField: "message",
        },
        {
          title: "Forums",
          url: `/${schoolId}/forum`,
          roleField: "message",
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
          title: "Balance Sheet",
          url: `/${schoolId}/admin/${userId}/reports/balance-sheet`,
          roleField: "studentReport"
        },
        {
          title: "Trial Balance",
          url: `/${schoolId}/admin/${userId}/reports/trial-balance`,
          roleField: "studentReport"
        },
        {
          title: "Student Report",
          url: `/${schoolId}/admin/${userId}/reports/student-report`,
          roleField: "studentReport"
        },
        {
          title: "Financial Reports",
          url: `/${schoolId}/admin/${userId}/reports/register-report`,
          // roleField: "registerReport"
        },
        {
          title: "Attendance Reports",
          url: `/${schoolId}/admin/${userId}reports/expenses-report`,
          // roleField: "expensesReport"
        }, {
          title: "Hr and payroll Reports",
          url: `/${schoolId}/admin/${userId}/reports/product-sell-report`,
          // roleField: "productSellReport"
        }, {
          title: "Inventory Reports",
          url: `/${schoolId}/admin/${userId}/reports/product-purchase-report`,
          // roleField: "productPurchaseReport"
        }, {
          title: "Examination Report",
          url: `/${schoolId}/admin/${userId}/reports/sell-return-report`,
          // roleField: "sellReturnReport"
        },
      ],
    },
    {
      title: "History",
      url: `/${schoolId}/admin/${userId}/history`,
      icon: HistoryIcon,
      isActive: false,
    },
    {
      title: "Trash",
      url: `/${schoolId}/admin/${userId}/trash`,
      icon: Trash,
      isActive: false,
    }

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
        {navMain
          .filter((item): item is NavItem => item !== false)
          .filter((item) => !item.roleField || (role && role[item.roleField as keyof IRole]))
          .map((item) =>
            item.items ? (
              <Collapsible
                key={item.title}
                open={openGroup === item.title}
                onOpenChange={() => setOpenGroup((prev) => (prev === item.title ? null : item.title))}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "transition-colors hover:bg-primary/10 hover:text-primary",
                        item.items?.some((subItem) => isActive(subItem.url)) && "bg-primary text-white font-medium",
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight
                        className={`ml-auto shrink-0 transition-transform duration-200 ${openGroup === item.title ? "rotate-90" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items
                        ?.filter((subItem) => !subItem?.roleField || (role && role[subItem?.roleField as keyof IRole]))
                        .map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "transition-colors hover:text-primary",
                                isActive(subItem.url) && "bg-primary/10 text-primary font-medium",
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
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "transition-colors hover:bg-primary/10 hover:text-primary",
                    isActive(item.url) && "bg-primary text-white font-medium",
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
      </SidebarMenu>
    </SidebarGroup>

  )
}
