
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ResetComponent from "./ResetAmount"
import { CreateAmount } from "./CreateAmount."


interface FineAmountProps {
    data: IBookFine
}
const FineAmount = ({ data }: FineAmountProps) => {
  
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Enter Fine Amount</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center gap-2">
                    <div className="">
                        <h1 className="font-semibold text-2xl text-green-500">{`GH ${data?.amount || 0}`}</h1>
                    </div>
                    <div className="flex flex-col gap-1">
                        {data?.amount > 0 ? (
                           <ResetComponent data={data} />
                        ) : (

                            <CreateAmount />
                        )}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FineAmount