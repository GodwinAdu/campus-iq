"use client"
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { useParams } from "next/navigation";


interface CellActionProps {
    data: { _id: string,status: string};
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const params = useParams()
    const { schoolId, userId } = params;

    return (
        <>
            <Link href={`/${schoolId}/admin/${userId}/hr-payroll/salary-payment/${data._id}`}>  <Badge className="cursor-pointer">{data.status === "unpaid" ? "Pay Salary" : "Pay slip"}</Badge></Link>
        </>
    );
};
