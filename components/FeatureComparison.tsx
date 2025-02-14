import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"

const FeatureComparison = () => {
  const features = [
    { name: "Student Information Management", free: true, pro: true, enterprise: true },
    { name: "Attendance Tracking", free: true, pro: true, enterprise: true },
    { name: "Grade Management", free: true, pro: true, enterprise: true },
    { name: "Parent-Teacher Communication", free: false, pro: true, enterprise: true },
    { name: "Timetable Management", free: false, pro: true, enterprise: true },
    { name: "Financial Tracking", free: false, pro: false, enterprise: true },
    { name: "AI-powered Insights", free: false, pro: false, enterprise: true },
    { name: "API Access", free: false, pro: false, enterprise: true },
    { name: "24/7 Support", free: false, pro: false, enterprise: true },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Feature Comparison</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Feature</TableHead>
            <TableHead>Free</TableHead>
            <TableHead>Pro</TableHead>
            <TableHead>Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell>
                {feature.free ? <Check className="text-green-500" /> : <X className="text-red-500" />}
              </TableCell>
              <TableCell>
                {feature.pro ? <Check className="text-green-500" /> : <X className="text-red-500" />}
              </TableCell>
              <TableCell>
                {feature.enterprise ? <Check className="text-green-500" /> : <X className="text-red-500" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default FeatureComparison

