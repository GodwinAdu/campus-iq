import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Clock, Users } from "lucide-react"

export function EmploymentTab({ employee }: { employee: IEmployee }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-primary" />
                        Employment Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Employee ID</dt>
                            <dd className="mt-1">{employee?.employment?.employeeID}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Job Title</dt>
                            <dd className="mt-1">{employee.employment?.jobTitle}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Department</dt>
                            <dd className="mt-1">{employee?.employment?.departmentId}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Date of Joining</dt>
                            <dd className="mt-1">{format(new Date(employee?.employment?.dateOfJoining), "MMMM d, yyyy")}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Work Schedule</dt>
                            <dd className="mt-1">
                                <Badge
                                    variant="outline"
                                    className={
                                        employee.employment.workSchedule === "Full-time"
                                            ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                                            : "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
                                    }
                                >
                                    {employee?.employment?.workSchedule}
                                </Badge>
                            </dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Users className="mr-2 h-5 w-5 text-primary" />
                        Classes Assigned
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">The employee is assigned to the following classes:</p>
                        <div className="grid grid-cols-1 gap-2">
                            {employee?.employment?.classIds?.map((className: string, index: number) => (
                                <div key={index} className="flex items-center p-2 rounded-md border">
                                    <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                                    <span>{className}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-primary" />
                        Employment Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative border-l border-muted pl-6 ml-3">
                        <div className="mb-10 relative">
                            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-primary bg-background flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                            </div>
                            <div className="mb-2">
                                <time className="text-sm font-normal leading-none text-muted-foreground">
                                    {format(new Date(employee?.employment?.dateOfJoining), "MMMM yyyy")} - Present
                                </time>
                                <h3 className="text-lg font-semibold">{employee?.employment?.jobTitle}</h3>
                            </div>
                            <p className="text-base font-normal text-muted-foreground">
                                Working at {employee?.employment?.departmentName}
                            </p>
                        </div>

                        {employee?.professionalDetails?.previousEmployment.map((job: any, index: number) => (
                            <div key={index} className="mb-10 relative">
                                <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-muted bg-background flex items-center justify-center">
                                    <div className="h-3 w-3 rounded-full bg-muted"></div>
                                </div>
                                <div className="mb-2">
                                    <time className="text-sm font-normal leading-none text-muted-foreground">{job.duration}</time>
                                    <h3 className="text-lg font-semibold">{job.position}</h3>
                                </div>
                                <p className="text-base font-normal text-muted-foreground">Worked at {job.school}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

