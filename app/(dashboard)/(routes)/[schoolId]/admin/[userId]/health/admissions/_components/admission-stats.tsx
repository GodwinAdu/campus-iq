import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BedIcon, CheckCircle2, ArrowUpRight, AlertCircle } from "lucide-react"

export function AdmissionStats() {
    // In a real application, this would fetch data from an API
    const stats = {
        currentAdmissions: 12,
        dischargedToday: 3,
        referrals: 2,
        followUps: 8,
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Admissions</CardTitle>
                    <BedIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.currentAdmissions}</div>
                    <p className="text-xs text-muted-foreground">Students currently in clinic</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Discharged Today</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.dischargedToday}</div>
                    <p className="text-xs text-muted-foreground">Students released today</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.referrals}</div>
                    <p className="text-xs text-muted-foreground">Referred to external care</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Follow-ups Required</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.followUps}</div>
                    <p className="text-xs text-muted-foreground">Pending follow-up visits</p>
                </CardContent>
            </Card>
        </div>
    )
}

