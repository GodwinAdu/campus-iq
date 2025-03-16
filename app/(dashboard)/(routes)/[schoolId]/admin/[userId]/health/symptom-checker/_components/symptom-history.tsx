import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

// Mock history data
const mockHistory = [
    {
        id: "1",
        date: "2023-06-10T14:30:00Z",
        symptoms: ["Headache", "Fever", "Fatigue"],
        result: {
            possibleConditions: [
                { name: "Common Cold", probability: "High" },
                { name: "Flu", probability: "Medium" },
            ],
            urgency: "Low",
        },
    },
    {
        id: "2",
        date: "2023-06-05T09:15:00Z",
        symptoms: ["Sore Throat", "Cough"],
        result: {
            possibleConditions: [
                { name: "Strep Throat", probability: "Medium" },
                { name: "Viral Pharyngitis", probability: "High" },
            ],
            urgency: "Low",
        },
    },
    {
        id: "3",
        date: "2023-05-28T16:45:00Z",
        symptoms: ["Abdominal Pain", "Nausea"],
        result: {
            possibleConditions: [
                { name: "Gastroenteritis", probability: "High" },
                { name: "Food Poisoning", probability: "Medium" },
            ],
            urgency: "Medium",
        },
    },
]

export function SymptomHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Checks</CardTitle>
                <CardDescription>Your previous symptom checks</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {mockHistory.map((item) => (
                            <Card key={item.id} className="border-0 shadow-sm">
                                <CardHeader className="p-3 pb-0">
                                    <CardTitle className="text-sm font-medium">
                                        {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-1">
                                    <div className="text-xs text-muted-foreground mb-1">Symptoms: {item.symptoms.join(", ")}</div>
                                    <div className="text-xs mb-2">
                                        <span className="font-medium">Possible conditions:</span>{" "}
                                        {item.result.possibleConditions.map((c) => c.name).join(", ")}
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full text-xs">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

