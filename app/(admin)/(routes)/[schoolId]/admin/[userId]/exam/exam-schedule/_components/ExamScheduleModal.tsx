import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, PrinterCheck } from "lucide-react"
import { ExamTable } from "./ExamTable"

export function ExamScheduleModal({ data }: { data: IExamSchedule }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center px-2 ">
                    <Eye className="mr-2 h-4 w-4" /> view
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[96%]">
                <DialogHeader>
                    <DialogTitle>Exams Time Table</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <ExamTable data={data} />
                </div>
                <DialogFooter>
                    <Button><PrinterCheck className="w-4 h-4 mr-2" /> Print</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
