
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaymentDetails from './PaymentDetails';


const Payroll = ({ salaryPayment }: { salaryPayment: ISalaryPayment }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className='col-span-2'>
                <CardContent>
                    <h1 className='text-lg font-semibold flex gap-2 pt-3'><User />Salary Details</h1>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 items-center">
                        <div className="col-span-1 mx-auto">
                            <Avatar className='h-24 w-24'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="col-span-2">
                            <div className="grid grid-cols-3 gap-3">
                                <h2>Name :</h2>
                                <p className="text-sm text-gray-700 font-medium col-span-2">{salaryPayment?.employeeId.fullName}</p>
                            </div>
                            <Separator className='my-1' />
                            <div className="grid grid-cols-3 gap-3">
                                <h2>Staff ID :</h2>
                                <p className="text-sm text-gray-700 font-medium col-span-2">{salaryPayment?.employeeId.staffId}</p>
                            </div>
                            <Separator className='my-1' />
                            <div className="grid grid-cols-3 gap-3">
                                <h2>Joining Date :</h2>
                                <p className="text-sm text-gray-700 font-medium col-span-2">Name: Shad CN</p>
                            </div>
                            <Separator className='my-1' />
                            <div className="grid grid-cols-3 gap-3">
                                <h2>Department :</h2>
                                <p className="text-sm text-gray-700 font-medium col-span-2">{salaryPayment?.employeeId.departmentId.name}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />

                    <div className="py-4">
                        <Card className='w-[95] max-w-lg mx-auto py-4'>
                            <CardContent className='mx-auto'>
                                <div className="flex justify-between items-center">
                                    <h2>Salary Grade :</h2>
                                    <p className="text-sm text-gray-700 font-medium col-span-2">{salaryPayment?.salaryStructureId.salaryName}</p>
                                </div>
                                <Separator className='my-1' />
                                <div className="flex justify-between items-center">
                                    <h2>Basic Salary :</h2>
                                    <p className="text-sm text-gray-700 font-medium col-span-2">GH{salaryPayment?.salaryStructureId.basicSalary}</p>
                                </div>
                                <Separator className='my-1' />
                                <div className="flex justify-between items-center">
                                    <h2>Overtime Rate(per hour) :</h2>
                                    <p className="text-sm text-gray-700 font-medium col-span-2">GH{salaryPayment?.salaryStructureId.overtimeRate}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className='py-3'>
                                <h3>Allowances</h3>
                                <Separator />
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="">Allowance Name</TableHead>
                                            <TableHead>Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salaryPayment.salaryStructureId.allowances.map((invoice: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{invoice.allowanceName}</TableCell>
                                                <TableCell className="font-medium">GH{invoice.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className='py-3'>
                                <h3>Deductions</h3>
                                <Separator />
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="">Deduction Name</TableHead>
                                            <TableHead>Amount</TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salaryPayment.salaryStructureId.deductions.map((invoice: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{invoice?.deductionName}</TableCell>
                                                <TableCell className="font-medium">GH{invoice?.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </CardContent>
                        </Card>
                    </div>

                </CardContent>

            </Card>
            <PaymentDetails salary={salaryPayment.salaryStructureId} />
        </div>
    )
}

export default Payroll
