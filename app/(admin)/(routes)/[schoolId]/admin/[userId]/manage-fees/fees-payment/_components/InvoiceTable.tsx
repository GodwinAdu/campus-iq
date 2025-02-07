import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import moment from "moment";
  

  export function InvoiceTable({data,dueDate}:{data:any,dueDate:any}) {
    console.log(data,"invoice");
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Fees Type</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Fine</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead >Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice:any) => (
            <TableRow key={invoice.category}>
              <TableCell className="font-medium">{invoice.category}</TableCell>
              <TableCell>{moment(dueDate).format("Do MMMM YYYY")}</TableCell>
              <TableCell>{invoice.status===true ? (
                <>
                {invoice.amount > invoice.paid ? (

                  <span className="text-yellow-500 p-0.5 border-2 border-yellow-500 rounded-sm">Partly paid</span>
                ):(
                  <span className="text-green-500 p-0.5 border-2 border-green-500 rounded-sm">Total paid</span>
                )}
                </>
              ):(
                <span className="text-red-500 border-2 border-red-500 p-0.5 rounded-sm">Unpaid</span>
              )}</TableCell>
              <TableCell>Gh{invoice.amount}</TableCell>
              <TableCell>Gh{invoice.discount}</TableCell>
              <TableCell>Gh{invoice.fine}</TableCell>
              <TableCell>Gh{invoice.paid}</TableCell>
              <TableCell >Gh{invoice.amount-invoice.paid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  