"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    User,
    Briefcase,
    GraduationCap,
    Heart,
    CreditCard,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Edit,
    Download,
    Printer,
} from "lucide-react"
import { PersonalInfoTab } from "./personal-info-tab"
import { EmploymentTab } from "./employment-tab"
import { ProfessionalTab } from "./professional-tab"
import { MedicalTab } from "./medical-tab"
import { FinancialTab } from "./financial-tab"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function EmployeeProfile({ employee }: { employee: any }) {
    const [activeTab, setActiveTab] = useState("personal")

    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
                    <p className="text-muted-foreground">View and manage employee information</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="h-[150px] w-[150px] border-4 border-background shadow-md">
                                    <AvatarImage
                                        src={employee.imgUrl || "/placeholder.svg?height=200&width=200"}
                                        alt={employee.fullName}
                                    />
                                    <AvatarFallback className="text-4xl font-extrabold">
                                        {employee.fullName
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <Badge className="absolute bottom-2 right-2 px-2 py-1">{employee.role}</Badge>
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{employee.fullName}</h2>
                                <p className="text-muted-foreground">{employee.employment.jobTitle}</p>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="hidden md:block" />

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Employee ID</p>
                                    <p className="font-medium">{employee.employment.employeeID}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{employee.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{employee.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Date Joined</p>
                                    <p className="font-medium">{format(new Date(employee.employment.dateOfJoining), "MMM d, yyyy")}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <p className="font-medium">{employee.employment.departmentName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="employment" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="hidden sm:inline">Employment</span>
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span className="hidden sm:inline">Professional</span>
                    </TabsTrigger>
                    <TabsTrigger value="medical" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Medical</span>
                    </TabsTrigger>
                    <TabsTrigger value="financial" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Financial</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoTab employee={employee} />
                </TabsContent>

                <TabsContent value="employment" className="space-y-4">
                    <EmploymentTab employee={employee} />
                </TabsContent>

                <TabsContent value="professional" className="space-y-4">
                    <ProfessionalTab employee={employee} />
                </TabsContent>

                <TabsContent value="medical" className="space-y-4">
                    <MedicalTab employee={employee} />
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                    <FinancialTab employee={employee} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

