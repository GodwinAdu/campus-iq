import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingCart, Package, TrendingUp, BarChart } from 'lucide-react'

const metrics = [
  {
    title: 'Total Revenue',
    value: '00',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Sales',
    value: '00',
    change: '+12.5% from last month',
    icon: ShoppingCart,
  },
  {
    title: 'Active Products',
    value: '342',
    change: '+8.1% from last month',
    icon: Package,
  },
  {
    title: 'Conversion Rate',
    value: '2.4%',
    change: '+4.3% from last month',
    icon: TrendingUp,
  },
  {
    title: "Today's Sales",
    value: '$1,429.99',
    change: '+18.2% from yesterday',
    icon: BarChart,
  },
]

export default function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

      <Card className="bg-primary/5 border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0.00}</div>
          {/* <p className="text-xs text-muted-foreground">{metric.change}</p> */}
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0.00}</div>
          {/* <p className="text-xs text-muted-foreground">{metric.change}</p> */}
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0.00}</div>
          {/* <p className="text-xs text-muted-foreground">{metric.change}</p> */}
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0.00}</div>
          {/* <p className="text-xs text-muted-foreground">{metric.change}</p> */}
        </CardContent>
      </Card>
      <Card className="bg-primary/5 border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{0.00}</div>
          {/* <p className="text-xs text-muted-foreground">{metric.change}</p> */}
        </CardContent>
      </Card>

    </div>
  )
}

