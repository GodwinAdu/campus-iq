import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from "moment"

export function ExamTable({ data }: { data: IExamSchedule }) {
    return (
        <Table>
            <TableCaption>Exam schedule. you can download it.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Hall Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead className="text-right">End Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.subjectItems?.map((value) => (
                    <TableRow key={value.subjectName}>
                        <TableCell className="font-bold">{value.subjectName}</TableCell>
                        <TableCell>{moment(value.date).format("DD-MM-YY")}</TableCell>
                        <TableCell>{value.hallId.name}</TableCell>
                        <TableCell>{value.startTime}</TableCell>
                        <TableCell className="text-right">{value.endTime}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
