"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import moment from "moment"
import { InvoiceTable } from "./InvoiceTable"
// import { numberToWords } from "@/lib/utils"
import { Printer } from "lucide-react"
import { useRef } from "react"
import CollectFeesForm from "./CollectFeesForm"
import CollectFullFeesForm from "./CollectFullFeesForm"


export function InvoicePaymentTabs({ data, accounts }: { data: any, school: any, accounts: any[] }) {
    const invoiceCardRef = useRef<HTMLDivElement>(null);
    const receiptCardRef = useRef<HTMLDivElement>(null);


    const grandTotal = data.fees.map((f: any) => f.amount).reduce((acc: number, cur: number) => {
        return acc += cur
    }, 0)
    const totalPaid = data.fees.map((f: any) => f.paid).reduce((acc: number, cur: number) => {
        return acc += cur
    }, 0)
    const totalFined = data.fees.map((f: any) => f.fine).reduce((acc: number, cur: number) => {
        return acc += cur
    }, 0)
    const totalDiscount = data.fees.map((f: any) => f.discount).reduce((acc: number, cur: number) => {
        return acc += cur
    }, 0)
    const totalBalance = data.fees.map((f: any) => f.balance).reduce((acc: number, cur: number) => {
        return acc += cur
    }, 0)

    const handlePrint = () => {
        if (invoiceCardRef.current) {
            const printContent = invoiceCardRef.current.innerHTML;
            const originalContent = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }
    };
    const handleReceiptPrint = () => {
        if (receiptCardRef.current) {
            const printContent = receiptCardRef.current.innerHTML;
            const originalContent = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }
    };
    const handleMultiPrint = () => {
        if (receiptCardRef.current) {
            const printContent = receiptCardRef.current.innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = `
                <div>${printContent}</div>
                <div style="page-break-before: always;">${printContent}</div>
                <div style="page-break-before: always;">${printContent}</div>
            `;

            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }
    };
    const colorStatus = (status: string) => {
        if (status === "Unpaid") {
            return `text-red-500 border-2 border-red-500`
        } else if (status === "Partly Paid") {
            return `text-yellow-500 border-2 border-yellow-500`
        } else {
            return `text-green-500 border-2 border-green-500`
        }
    }

    return (
        <Tabs defaultValue="invoice" className="w-full">
            <TabsList className="grid w-[96%] max-w-xl grid-cols-4">
                <TabsTrigger value="invoice">Invoice</TabsTrigger>
                {(data.status === "Total Paid" || data.status === "Partly Paid") && (
                    <TabsTrigger value="payment-history">Payment history</TabsTrigger>
                )}
                {(data.status === "Unpaid" || data.status === "Partly Paid") && (
                    <TabsTrigger value="collect-fees">Collect fees</TabsTrigger>
                )}
                {(data.status === "Unpaid" || data.status === "Partly Paid") && (
                    <TabsTrigger value="fully-paid">Fully paid</TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="invoice">
                <Card >
                    <CardContent className="space-y-2">
                        <div ref={invoiceCardRef}>
                            <div className="flex justify-between items-center border-2 shadow-lg rounded-md p-4 mt-4">
                                <div className=" bg-black p-4 rounded-md">
                                    <h1 className="font-extrabold text-xl text-white">Breanas Academy</h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-extrabold">Invoice #No : {data?.invoiceNo}</h2>
                                    <p className="text-sm text-gray-700">Date : {moment(new Date()).format("Do MMMM YYYY")}</p>
                                    <p className="text-xs">Status: <span className={`${colorStatus(data.status)} p-1 ml-3  rounded-full`}>{data.status}</span></p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <div className="">
                                    <h2 className="font-bold py-1">Invoice To:</h2>
                                    <p className="text-sm text-gray-600">{data?.fullName}</p>
                                    <p className="text-sm text-gray-600">ID: #{data.studentNo}</p>
                                    <p className="text-sm text-gray-600">Class: {data?.stage}</p>
                                    <p className="text-sm text-gray-600">Guardian: {data.guardian}</p>
                                </div>
                                <div className="">
                                    <h2 className="font-bold py-1">Academic :</h2>
                                    <p className="text-sm text-gray-600">Breanas Academy</p>
                                    <p className="text-sm text-gray-600">Kumasi, Ghana</p>
                                    <p className="text-sm text-gray-600">+233551556650</p>
                                    <p className="text-sm text-gray-600">jutech347@gmail.com</p>
                                </div>
                            </div>
                            <div className="py-4">
                                <InvoiceTable data={data.fees} dueDate={data.dueDate} />
                            </div>
                            <div className="py-4">
                                <div className="flex justify-end items-end text-end flex-col gap-2">
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Grand Total:</span>  Gh{grandTotal}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Discount:</span>  Gh{totalDiscount}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Paid:</span>  Gh{totalPaid}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Fined:</span>  Gh{totalFined}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Total Paid(With Fine):</span>  Gh{totalFined > 0 ? grandTotal + totalFined : 0}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Balance:</span>  Gh{grandTotal - totalPaid}.00</h4>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end text-end">
                            <Button onClick={handlePrint} size="sm" variant="outline"><Printer className="w-4 h-4 mr-2" />Print</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="payment-history">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment history</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you&apos;ll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div ref={receiptCardRef}>
                            <div className="flex justify-between items-center border-2 shadow-lg rounded-md p-4 mt-4">
                                <div className=" bg-black p-4 rounded-md">
                                    <h1 className="font-extrabold text-xl text-white">Breanas Academy</h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-extrabold">Invoice #No : {data?.invoiceNo}</h2>
                                    <p className="text-sm text-gray-700">Date : {moment(new Date()).format("Do MMMM YYYY")}</p>
                                    <p className="text-xs">Status: <span className={`${colorStatus(data.status)} p-1 ml-3  rounded-full`}>{data.status}</span></p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <div className="">
                                    <h2 className="font-bold py-1">Invoice To:</h2>
                                    <p className="text-sm text-gray-600">{data?.fullName}</p>
                                    <p className="text-sm text-gray-600">ID: #{data.studentNo}</p>
                                    <p className="text-sm text-gray-600">Class: {data?.stage}</p>
                                    <p className="text-sm text-gray-600">Guardian: {data?.guardian}</p>
                                </div>
                                <div className="">
                                    <h2 className="font-bold py-1">Academic :</h2>
                                    <p className="text-sm text-gray-600">Breanas Academy</p>
                                    <p className="text-sm text-gray-600">Kumasi,Ghana</p>
                                    <p className="text-sm text-gray-600">233551556650</p>
                                    <p className="text-sm text-gray-600">jutech347@gmail.com</p>
                                </div>
                            </div>
                            <div className="py-4">
                                <InvoiceTable data={data.fees} dueDate={data.dueDate} />
                            </div>
                            <div className="py-4">
                                <div className="flex justify-end items-end text-end flex-col gap-2">
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Sub Total:</span>  Gh{grandTotal}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Discount:</span>  Gh{totalDiscount}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Paid:</span>  Gh{totalPaid}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Fined:</span>  Gh{totalFined}.00</h4>
                                    <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Total Paid(With Fine):</span>  Gh{totalFined > 0 ? grandTotal + totalFined : 0}.00</h4>
                                    {/* <h4 className=" p-4 bg-gray-200 w-96  text-sm"><span className="font-bold">Balance:</span>  Gh{grandTotal - totalPaid}.00</h4> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-end text-end gap-3">
                            <Button onClick={handleMultiPrint} size="sm" variant="outline"><Printer className="w-4 h-4 mr-2" />Print paid receipt</Button>
                            <Button onClick={handleReceiptPrint} size="sm" variant="outline"><Printer className="w-4 h-4 mr-2" />Print</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="collect-fees">
                <Card>
                    <CardHeader>
                        <CardTitle>Collect Fees</CardTitle>
                        <CardDescription>
                            Collect fees from the students.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <CollectFeesForm initialData={data} accounts={accounts} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="fully-paid">
                <Card>
                    <CardHeader>
                        <CardTitle>Fully Payment</CardTitle>
                        <CardDescription>
                            This student is fully paying his/her fees.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <CollectFullFeesForm initialData={data} accounts={accounts} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
