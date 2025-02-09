import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function OccupantDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-white text-black hover:bg-gray-300">
                    View all Occupants
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[96%] max-w-lg">
                <DialogHeader>
                    <DialogTitle>Occupants in the Room</DialogTitle>
                </DialogHeader>
                    
            </DialogContent>
        </Dialog>
    )
}
