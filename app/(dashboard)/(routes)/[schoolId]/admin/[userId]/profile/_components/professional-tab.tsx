import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Briefcase, Star, CheckCircle, FileText } from "lucide-react"

export function ProfessionalTab({ employee }: { employee: any }) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Highest Degree</dt>
                            <dd className="mt-1">{employee?.professionalDetails.highestDegree.degree}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Institution</dt>
                            <dd className="mt-1">{employee?.professionalDetails.highestDegree.institution}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Year</dt>
                            <dd className="mt-1">{employee?.professionalDetails.highestDegree.year}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Years of Experience</dt>
                            <dd className="mt-1">{employee?.professionalDetails.experienceYears} years</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Award className="mr-2 h-5 w-5 text-primary" />
                        Certifications & Specializations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Certifications</h3>
                            <div className="flex flex-wrap gap-2">
                                {employee?.professionalDetails.certifications.map((cert: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        {cert}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Specializations</h3>
                            <div className="flex flex-wrap gap-2">
                                {employee?.professionalDetails.specialization.map((spec: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                        <Star className="mr-1 h-3 w-3 text-amber-500" />
                                        {spec}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-primary" />
                        Previous Employment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {employee?.professionalDetails.previousEmployment.map((job: any, index: number) => (
                            <div key={index} className="border rounded-md p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{job.position}</h3>
                                        <p className="text-sm text-muted-foreground">{job.school}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {job.duration}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        References & Additional Info
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Professional References</h3>
                            {employee?.professionalDetails.references.map((ref: any, index: number) => (
                                <div key={index} className="border rounded-md p-3 mb-2">
                                    <p className="font-medium">{ref.name}</p>
                                    <p className="text-sm text-muted-foreground">{ref.relationship}</p>
                                    <p className="text-sm">{ref.contact}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Background Check</h3>
                            <div className="border rounded-md p-3">
                                <p className="text-sm">
                                    <span className="font-medium">Criminal Record: </span>
                                    {employee?.professionalDetails.backgroundCheck.criminalRecord ? "Yes" : "No"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Details: </span>
                                    {employee?.professionalDetails.backgroundCheck.details}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {employee?.professionalDetails.additionalInfo.specialSkills.map((skill: string, index: number) => (
                                    <Badge key={index} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

