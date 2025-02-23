"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { deleteFeeStructure } from "@/lib/actions/fee-structure.actions";
import moment from "moment";


interface Fee {
    category: string;
    amount: number;
}

interface FeesCardProps {
    id: string;
    classId: {
        _id: string;
        name: string;
        code: string;
        subjects: string[];
        students: string[];
        teachers: string[];
        school: string;
        createdBy: string;
        createdAt: string;
        __v: number;
    };
    term:any
    fees: Fee[];
    createdAt: string;
}

const FeesCard: React.FC<FeesCardProps> = ({ id, classId, fees, createdAt,term }) => {
    const params = useParams();
    const router = useRouter();
    const totalFees = fees.reduce((total, fee) => total + fee.amount, 0);

    const handleDelete = async () => {
        try {
            await deleteFeeStructure(id);
            router.refresh();
            toast({
                title: "Fee Structure Deleted",
                description: "Fee Structure was deleted successfully...",
            })

        } catch (error) {
            console.log(error);
            toast({
                title: "Something went wrong",
                description: "Please try again later...",
                variant: "destructive",
            })

        }
    }

    return (
        <Card className="shadow-2xl">
            <CardHeader >
                <div className="flex justify-between items-center">
                    <div className="">

                        <CardTitle>{classId.name} Fees</CardTitle>
                        <p className="text-center text-sm text-gray-500 pt-1">{term.name}</p>
                    </div>
                    <div className="flex flex-col gap-1 ">
                        {/* <Link href={`/${params.schoolId}/admin/${params.adminId}/account/fees-structures/${id}`} aria-label="edit button" className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"><Edit3Icon className="w-4 h-4" /></Link> */}
                        <button onClick={handleDelete} aria-label="delete button" className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"><Trash2 className="w-4 h-4" /></button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {fees.map((fee, index) => (
                    <>
                        <div key={index} className="flex justify-between py-2">
                            <span>{fee.category}</span>
                            <span>Gh{fee.amount}</span>
                        </div>
                        <Separator />
                    </>
                ))}
                <div className="flex justify-between py-2 mt-2">
                    <strong>Total:</strong>
                    <strong>Gh{totalFees}</strong>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    Created Date: {moment(createdAt).format('MMMM Do YYYY')}
                </div>
            </CardContent>
        </Card>
    );
};

export default FeesCard;
