import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Pill, AlertTriangle, Syringe } from "lucide-react"

export function MedicalTab({ employee }: { employee: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Heart className="mr-2 h-5 w-5 text-primary" />
                        Medical Conditions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Conditions</h3>
                            {employee?.medicalHistory.medicalConditions.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                    {employee?.medicalHistory.medicalConditions.map((condition: string, index: number) => (
                                        <li key={index} className="text-sm">
                                            {condition}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No medical conditions reported</p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical Notes</h3>
                            <p className="text-sm border rounded-md p-3">
                                {employee?.medicalHistory.medicalNotes || "No notes available"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-primary" />
                        Medications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {employee?.medicalHistory.medications.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {employee?.medicalHistory.medications.map((medication: string, index: number) => (
                                <li key={index} className="text-sm">
                                    {medication}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No medications reported</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                        Allergies
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {employee?.medicalHistory.allergies.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {employee?.medicalHistory.allergies.map((allergy: string, index: number) => (
                                <li key={index} className="text-sm">
                                    {allergy}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No allergies reported</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Syringe className="mr-2 h-5 w-5 text-primary" />
                        Immunizations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {employee?.medicalHistory.immunizations.length > 0 ? (
                            employee?.medicalHistory.immunizations.map((immunization: any, index: number) => (
                                <div key={index} className="border rounded-md p-3">
                                    <p className="font-medium">{immunization.vaccineName}</p>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Date</p>
                                            <p className="text-sm">{format(new Date(immunization.dateAdministered), "MMM d, yyyy")}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Administered By</p>
                                            <p className="text-sm">{immunization.administeredBy}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No immunization records available</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

