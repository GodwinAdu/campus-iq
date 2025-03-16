import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertTriangle } from "lucide-react"

interface AnalysisResultProps {
    result: any
    symptoms: string[]
}

export function AnalysisResult({ result, symptoms }: AnalysisResultProps) {
    if (!result) return null

    const getUrgencyColor = (urgency: string) => {
        switch (urgency.toLowerCase()) {
            case "high":
                return "destructive"
            case "medium":
                return "warning"
            case "low":
                return "default"
            default:
                return "secondary"
        }
    }

    const getProbabilityColor = (probability: string) => {
        switch (probability.toLowerCase()) {
            case "high":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            case "medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "low":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            default:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle>Analysis Results</CardTitle>
                        <Badge variant={getUrgencyColor(result.urgency)}>{result.urgency} Urgency</Badge>
                    </div>
                    <CardDescription>Based on your reported symptoms: {symptoms.join(", ")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Possible Conditions</h3>
                        {result.possibleConditions.map((condition: any, index: number) => (
                            <Card key={index} className="border-0 shadow-sm">
                                <CardHeader className="pb-2 pt-3">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base">{condition.name}</CardTitle>
                                        <Badge className={getProbabilityColor(condition.probability)}>
                                            {condition.probability} Probability
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm mb-2">{condition.description}</p>
                                    {condition.recommendations && (
                                        <div className="mt-2">
                                            <h4 className="text-sm font-semibold mb-1">Recommendations:</h4>
                                            <ul className="list-disc pl-5 text-sm space-y-1">
                                                {condition.recommendations.map((rec: string, i: number) => (
                                                    <li key={i}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}

                        <Alert>
                            <InfoIcon className="h-4 w-4" />
                            <AlertTitle>Follow-up Recommendation</AlertTitle>
                            <AlertDescription>{result.followUpRecommendation}</AlertDescription>
                        </Alert>

                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Important Disclaimer</AlertTitle>
                            <AlertDescription>{result.disclaimer}</AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

