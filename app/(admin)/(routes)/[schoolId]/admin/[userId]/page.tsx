import { currentUser } from '@/lib/helpers/current-user'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";;
import { Separator } from '@/components/ui/separator';
import MetricsGrid from '@/components/commons/dashboard/metric-grid';
import MonthlySales from '@/components/commons/dashboard/monthly-sales';
import TodayTransactions from '@/components/commons/dashboard/today-transaction';
import TrashItemsCount from '@/components/commons/dashboard/trash-item-count';
import TransactionHistory from '@/components/commons/dashboard/transaction-history';
import RecentTransactions from '@/components/commons/dashboard/recent-transaction';
import InventoryStatus from '@/components/commons/dashboard/inventory-status';
import SalesByCategory from '@/components/commons/dashboard/sale-by-category';
import TopSellingProducts from '@/components/commons/dashboard/top-selling-products';
import DailySalesTrend from '@/components/commons/dashboard/daily-sales-trend';
import EmployeePerformance from '@/components/commons/dashboard/employee-performance';
import { Calendar, House, UserCheck, Users } from 'lucide-react';


const page = async () => {
  const user = await currentUser()

  return (
    <>
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between items-center p-6 shadow-lg">
        <div>
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <p className="text-gray-600">School Annual Function - March 10</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-5 h-5 mr-2" /> View Calendar
        </Button>
      </Card>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <Users className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold">0</span>
          </CardContent>
        </Card>



        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <UserCheck className="w-10 h-10 text-purple-500" />
            <span className="text-2xl font-bold">0</span>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <Users className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold">0</span>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Class Room</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <House className="w-10 h-10 text-red-500" />
            <span className="text-2xl font-bold">0</span>
          </CardContent>
        </Card>



        {/* <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <ClipboardList className="w-10 h-10 text-yellow-500" />
            <span className="text-2xl font-bold">24 Pending</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <UserCheck className="w-10 h-10 text-purple-500" />
            <span className="text-2xl font-bold">45</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <Settings className="w-10 h-10 text-gray-500" />
            <Button variant="outline">Manage</Button>
          </CardContent>
        </Card> */}

      </div>

      <Separator />
      <div className="space-y-4">
        <MetricsGrid />
        <MonthlySales />
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
        <div className="grid gap-6 md:grid-cols-2">
          {/* <CustomerDemographics /> */}
          <DailySalesTrend />
        </div>
        <EmployeePerformance />
        {/* <PredictiveAnalytics />
     <HeatmapAnalysis /> */}
      </div>
    </>
  );
}


export default page