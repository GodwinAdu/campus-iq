"use client"
import { AdvancedDropdown } from "@/components/ui/advance-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Brain, MoreHorizontal, SmileIcon } from "lucide-react";


interface CellActionProps {
    data: IStudent;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {



    // <Badge className="cursor-pointer">Pay Now</Badge>
    return (
        <>
            <AdvancedDropdown
                trigger={
                    <Button variant="outline" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                }

                items={[
                    {
                        label: "Activity Tracker",
                        icon: <Activity className="h-4 w-4" />,
                        modalType: "activity",
                        data: data,
                    },
                    {
                        label: "Behavior Tracker",
                        icon: <Brain className="h-4 w-4" />,
                        modalType: "behavior",
                        data: data,
                    },
                    {
                        label: "Mood Tracker",
                        icon: <SmileIcon className="h-4 w-4" />,
                        modalType: "mood",
                        data: data,
                    },
                ]}
            />

        </>
    );
};
