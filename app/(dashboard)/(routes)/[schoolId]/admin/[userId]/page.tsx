import { currentUser } from '@/lib/helpers/current-user'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";;
import MonthlySales from '@/components/commons/dashboard/monthly-sales';
import TodayTransactions from '@/components/commons/dashboard/today-transaction';
import TrashItemsCount from '@/components/commons/dashboard/trash-item-count';
import TransactionHistory from '@/components/commons/dashboard/transaction-history';
import RecentTransactions from '@/components/commons/dashboard/recent-transaction';
import InventoryStatus from '@/components/commons/dashboard/inventory-status';
import SalesByCategory from '@/components/commons/dashboard/sale-by-category';
import TopSellingProducts from '@/components/commons/dashboard/top-selling-products';
import { Activity, Bell, BookOpen, Calendar, Car, ChevronDown, Clock, Download, FileText, Filter, HouseIcon, LucideIceCreamBowl, PieChart, Plus, Sparkles, User, UserCheck, Users } from 'lucide-react';
import { totalStudents } from '@/lib/actions/student.actions';
import { countEmployeesExcludingTeachers, totalTeachers } from '@/lib/actions/employee.actions';
import { totalClass } from '@/lib/actions/class.actions';
import { fetchCurrentMonthRevenue, fetchMonthlyRevenues, totalRevenues } from '@/lib/actions/revenue-summary.actions';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LowAttendanceAlerts } from '@/components/admin/dashboard/low-attendance-alert';
import { AiInsights } from '@/components/admin/dashboard/ai-insight';
import { AttendanceChart } from '@/components/admin/dashboard/attendance-chart';
import { CustomizableDashboard } from '@/components/admin/dashboard/customable-dashboard';
import { AdvancedFilters } from '@/components/admin/dashboard/advance-filter';
import { RealtimeMonitor } from '@/components/admin/dashboard/realtime-monitor';
import { NotificationCenter } from '@/components/admin/dashboard/notification-center';
import { PerformanceChart } from '@/components/admin/dashboard/performance-chart';
import { AdmissionsChart } from '@/components/admin/dashboard/admissions-chart';
import { IntegrationHub } from '@/components/admin/dashboard/integration-hub';
import { PredictiveAnalytics } from '@/components/admin/dashboard/predictive-analytics';
import { ResourceUtilization } from '@/components/admin/dashboard/resource-utilization';
import { CalendarView } from '@/components/admin/dashboard/calendar-view';
import { FeeCollectionChart } from '@/components/admin/dashboard/fees-collection-chart';
import { totalExpenses } from '@/lib/actions/expenses.actions';
import { monthlyGroupFeePaymentWithAllClass } from '@/lib/actions/fees-payment.actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';



const page = async () => {

  const [
    user,
    teachers,
    monthlyRevenues,
    total,
    monthRevenue,
    students,
    employees,
    classes,
    expenses,
    monthlyFees,
  ] = await Promise.all([
    currentUser(),
    totalTeachers(),
    fetchMonthlyRevenues(),
    totalRevenues(),
    fetchCurrentMonthRevenue(),
    totalStudents(),
    countEmployeesExcludingTeachers(),
    totalClass(),
    totalExpenses(),
    monthlyGroupFeePaymentWithAllClass()
  ]);

  console.log(monthlyFees, "Monthly Fees");

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-muted-foreground font-bold">{`Welcome back, ${user?.fullName}. Here's what's happening today.`}</p>
          </div>
          <div className="flex items-center gap-2">
            <CustomizableDashboard />
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              April 2025
              <ChevronDown className="h-4 w-4" />
            </Button>
            <AdvancedFilters />
          </div>
        </div>

        <RealtimeMonitor />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employees}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">+12</span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">+12</span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teachers}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">+3</span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classes}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">Same as last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenues</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{total}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">+12</span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Month Sales</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthRevenue}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">+3</span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{expenses}</div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">Same as last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">Same as last month</span>
                  </div>
                </CardContent>
              </Card>

            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,430</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">92%</span>
                    <span className="text-xs text-muted-foreground">of total fees</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Canteen Collection</CardTitle>
                  <LucideIceCreamBowl className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,430</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">92%</span>
                    <span className="text-xs text-muted-foreground">of total fees</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transport Collection</CardTitle>
                  <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,430</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">92%</span>
                    <span className="text-xs text-muted-foreground">of total fees</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes Collection</CardTitle>
                  <HouseIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$128,430</div>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500 mr-1">92%</span>
                    <span className="text-xs text-muted-foreground">of total fees</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <MonthlySales monthlyRevenues={monthlyRevenues} />

            <AiInsights />
              {/* <RealTimeUpdates /> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TodayTransactions />
          <TrashItemsCount />
          <TransactionHistory />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <RecentTransactions />
          <InventoryStatus />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <SalesByCategory />
          <TopSellingProducts />
        </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Today&apos;s Attendance Summary</CardTitle>
                  <CardDescription>April 7, 2025 • Real-time data</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceChart />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground">Present: 92%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-muted-foreground">Late: 5%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-muted-foreground">Absent: 3%</span>
                  </div>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Notices & Announcements</CardTitle>
                    <CardDescription>Latest updates from the administration</CardDescription>
                  </div>
                  <NotificationCenter />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Annual Sports Day Announcement</p>
                        <p className="text-sm text-muted-foreground">
                          The annual sports day will be held on May 15th. All students are required to participate.
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Parent-Teacher Meeting Schedule</p>
                        <p className="text-sm text-muted-foreground">
                          Parent-teacher meetings for grades 9-12 will be held on April 12th from 9 AM to 3 PM.
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Yesterday</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Curriculum Update for Science Classes</p>
                        <p className="text-sm text-muted-foreground">
                          New laboratory equipment has arrived. Science teachers are requested to update their lesson
                          plans.
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Announcements
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="">
              <Card className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Upcoming Events & Exams</CardTitle>
                    <CardDescription>Schedule for the next 30 days</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/10 text-center">
                        <span className="text-xs font-medium">APR</span>
                        <span className="text-sm font-bold">12</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                        <p className="text-xs text-muted-foreground">9:00 AM - 3:00 PM • Main Hall</p>
                      </div>
                      <Badge className="ml-auto">Event</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/10 text-center">
                        <span className="text-xs font-medium">APR</span>
                        <span className="text-sm font-bold">15</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Mid-Term Exams Begin</p>
                        <p className="text-xs text-muted-foreground">All Grades • 8:30 AM - 12:30 PM</p>
                      </div>
                      <Badge variant="destructive" className="ml-auto">
                        Exam
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/10 text-center">
                        <span className="text-xs font-medium">APR</span>
                        <span className="text-sm font-bold">22</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Science Exhibition</p>
                        <p className="text-xs text-muted-foreground">10:00 AM - 4:00 PM • Science Block</p>
                      </div>
                      <Badge className="ml-auto">Event</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/10 text-center">
                        <span className="text-xs font-medium">MAY</span>
                        <span className="text-sm font-bold">01</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Labor Day</p>
                        <p className="text-xs text-muted-foreground">School Closed</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Holiday
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-primary/10 text-center">
                        <span className="text-xs font-medium">MAY</span>
                        <span className="text-sm font-bold">15</span>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">Annual Sports Day</p>
                        <p className="text-xs text-muted-foreground">8:00 AM - 5:00 PM • Sports Ground</p>
                      </div>
                      <Badge className="ml-auto">Event</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Fee Collection Summary</CardTitle>
                    <CardDescription>Current academic year</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View by Quarter</DropdownMenuItem>
                      <DropdownMenuItem>View by Month</DropdownMenuItem>
                      <DropdownMenuItem>View by Grade</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <FeeCollectionChart data={monthlyFees.chartData} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Collected</p>
                    <p className="text-2xl font-bold">{monthlyFees?.totalCollected}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold">{monthlyFees?.totalPending}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Newly Registered Students</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        width="40"
                        height="40"
                        alt="Student"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Emma Thompson</p>
                        <p className="text-xs text-muted-foreground">Grade 9A • Joined Apr 5</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View profile</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        width="40"
                        height="40"
                        alt="Student"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">James Wilson</p>
                        <p className="text-xs text-muted-foreground">Grade 7B • Joined Apr 3</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View profile</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        width="40"
                        height="40"
                        alt="Student"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Sophia Martinez</p>
                        <p className="text-xs text-muted-foreground">Grade 10C • Joined Mar 30</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View profile</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        width="40"
                        height="40"
                        alt="Student"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Ethan Johnson</p>
                        <p className="text-xs text-muted-foreground">Grade 8A • Joined Mar 28</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View profile</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        width="40"
                        height="40"
                        alt="Student"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Olivia Brown</p>
                        <p className="text-xs text-muted-foreground">Grade 11B • Joined Mar 25</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View profile</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All New Students
                  </Button>
                </CardFooter>
              </Card>
              <Card className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Low Attendance Alerts</CardTitle>
                    <CardDescription>Students with attendance below 75%</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI Monitored
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>All Grades</DropdownMenuItem>
                        <DropdownMenuItem>Below 70%</DropdownMenuItem>
                        <DropdownMenuItem>Below 60%</DropdownMenuItem>
                        <DropdownMenuItem>Chronic Absenteeism</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Export List</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <LowAttendanceAlerts />
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full">
                    Generate Attendance Report
                  </Button>
                  <div className="w-full bg-muted/50 p-2 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      AI monitoring has identified 12 students requiring intervention. 3 new cases since last week.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Performance by Class</CardTitle>
                  <CardDescription>Average scores across all subjects</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <PerformanceChart />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Admissions</CardTitle>
                  <CardDescription>New student registrations</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <AdmissionsChart />
                </CardContent>
              </Card>
            </div>
            <IntegrationHub />
          </TabsContent>
          <TabsContent value="predictions" className="space-y-4">
            <PredictiveAnalytics />
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <ResourceUtilization />
          </TabsContent>
        </Tabs>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>School Calendar</CardTitle>
              <CardDescription>Upcoming events, exams, and holidays</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <Plus className="h-5 w-5" />
                  <span>Add Student</span>
                </Link>
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <Plus className="h-5 w-5" />
                  <span>Add Teacher</span>
                </Link>
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <FileText className="h-5 w-5" />
                  <span>Mark Attendance</span>
                </Link>
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <Bell className="h-5 w-5" />
                  <span>Send Announcement</span>
                </Link>
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <PieChart className="h-5 w-5" />
                  <span>Upload Results</span>
                </Link>
                <Link href="/" className={cn(buttonVariants(),"h-20 flex-col gap-1")}>
                  <Sparkles className="h-5 w-5" />
                  <span>AI Assistant</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}


export default page