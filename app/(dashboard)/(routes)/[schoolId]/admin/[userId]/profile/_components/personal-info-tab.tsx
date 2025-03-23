import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, MapPin, UserCircle, AlertCircle } from "lucide-react"

export function PersonalInfoTab({ employee }: { employee: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <User className="mr-2 h-5 w-5 text-primary" />
                        Basic Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                            <dd className="mt-1">{employee?.fullName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Username</dt>
                            <dd className="mt-1">{employee?.username}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                            <dd className="mt-1">{employee?.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                            <dd className="mt-1">{employee?.phone}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                            {/* <dd className="mt-1">{format(new Date(employee??.dob), "MMMM d, yyyy")}</dd> */}
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                            <dd className="mt-1">{employee?.gender}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Religion</dt>
                            <dd className="mt-1">{employee?.religion}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Marital Status</dt>
                            <dd className="mt-1">{employee?.maritalStatus}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-primary" />
                        Address Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Current Address</dt>
                            <dd className="mt-1">{employee?.currentAddress}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Permanent Address</dt>
                            <dd className="mt-1">{employee?.permanentAddress}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Street</dt>
                            <dd className="mt-1">{employee?.addresses.street}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">City</dt>
                                <dd className="mt-1">{employee?.addresses?.city}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">State</dt>
                                <dd className="mt-1">{employee?.addresses?.state}</dd>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Zip Code</dt>
                                <dd className="mt-1">{employee?.addresses.zipCode}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">Country</dt>
                                <dd className="mt-1">{employee?.addresses.country}</dd>
                            </div>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                        Emergency Contact
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                            <dd className="mt-1">{employee?.emergencyContact?.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Relationship</dt>
                            <dd className="mt-1">{employee?.emergencyContact?.relationship}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                            <dd className="mt-1">{employee?.emergencyContact?.phone}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <UserCircle className="mr-2 h-5 w-5 text-primary" />
                        Identification
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">ID Card Type</dt>
                                <dd className="mt-1">{employee?.identification?.idCardType}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">ID Card Number</dt>
                                <dd className="mt-1">{employee?.identification?.idCard}</dd>
                            </div>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Social Security Number</dt>
                            <dd className="mt-1">{employee?.identification?.socialSecurityNumber}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Tax Identification Number</dt>
                            <dd className="mt-1">{employee?.identification?.taxIdentificationNumber}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Work Permit</dt>
                            <dd className="mt-1">{employee?.identification?.workPermit}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </div>
    )
}

