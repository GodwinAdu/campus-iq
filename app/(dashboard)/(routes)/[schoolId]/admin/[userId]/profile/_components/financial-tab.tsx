import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Building, FileText } from "lucide-react"

export function FinancialTab({ employee }: { employee: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Building className="mr-2 h-5 w-5 text-primary" />
                        Bank Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Account Name</dt>
                            <dd className="mt-1">{employee?.identification.bankDetails.accountName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Account Number</dt>
                            <dd className="mt-1">{employee?.identification.bankDetails.accountNumber}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Bank Name</dt>
                            <dd className="mt-1">{employee?.identification.bankDetails.bankName}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-primary" />
                        Salary Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-32">
                        <p className="text-muted-foreground text-center">
                            Salary information is restricted. Please contact HR for details.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        Financial Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="border rounded-md p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-muted-foreground mr-3" />
                                <div>
                                    <p className="font-medium">Tax Declaration Form</p>
                                    <p className="text-sm text-muted-foreground">Last updated: Jan 15, 2023</p>
                                </div>
                            </div>
                            <button className="text-sm text-primary hover:underline">View</button>
                        </div>

                        <div className="border rounded-md p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-muted-foreground mr-3" />
                                <div>
                                    <p className="font-medium">Salary Structure</p>
                                    <p className="text-sm text-muted-foreground">Last updated: Mar 10, 2023</p>
                                </div>
                            </div>
                            <button className="text-sm text-primary hover:underline">View</button>
                        </div>

                        <div className="border rounded-md p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-muted-foreground mr-3" />
                                <div>
                                    <p className="font-medium">Benefits Statement</p>
                                    <p className="text-sm text-muted-foreground">Last updated: Apr 22, 2023</p>
                                </div>
                            </div>
                            <button className="text-sm text-primary hover:underline">View</button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

