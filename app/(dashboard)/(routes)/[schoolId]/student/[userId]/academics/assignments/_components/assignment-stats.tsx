"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssignmentStatsProps {
    submissions: any[]
}

export default function AssignmentStats({ submissions }: AssignmentStatsProps) {
    // Calculate statistics
    const totalSubmissions = submissions.length
    const gradedSubmissions = submissions.filter((s) => s.submission.isMarked).length
    const pendingSubmissions = totalSubmissions - gradedSubmissions

    // Calculate average score
    const totalScore = submissions
        .filter((s) => s.submission.isMarked)
        .reduce((acc, s) => acc + (s.submission.marks / s.assignmentId.totalMarks) * 100, 0)

    const averageScore = gradedSubmissions > 0 ? Math.round(totalScore / gradedSubmissions) : 0

    // Get subject performance
    const subjectPerformance = submissions
        .filter((s) => s.submission.isMarked)
        .reduce((acc, s) => {
            const subjectName = s.assignmentId.subjectId.name
            const score = (s.submission.marks / s.assignmentId.totalMarks) * 100

            if (!acc[subjectName]) {
                acc[subjectName] = {
                    totalScore: score,
                    count: 1,
                    color: s.assignmentId.subjectId.color || "#888888",
                }
            } else {
                acc[subjectName].totalScore += score
                acc[subjectName].count += 1
            }

            return acc
        }, {})

    // Calculate average score per subject
    const subjectAverages = Object.entries(subjectPerformance).map(([subject, data]: [string, any]) => ({
        subject,
        average: Math.round(data.totalScore / data.count),
        color: data.color,
    }))

    // Sort by average score
    subjectAverages.sort((a, b) => b.average - a.average)

    // Grade distribution
    const gradeDistribution = submissions
        .filter((s) => s.submission.isMarked)
        .reduce(
            (acc, s) => {
                const score = Math.round((s.submission.marks / s.assignmentId.totalMarks) * 100)

                if (score >= 90) acc.A += 1
                else if (score >= 80) acc.B += 1
                else if (score >= 70) acc.C += 1
                else if (score >= 60) acc.D += 1
                else acc.F += 1

                return acc
            },
            { A: 0, B: 0, C: 0, D: 0, F: 0 },
        )

    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-muted-foreground text-sm font-medium mb-2">Average Score</h3>
                                <div className="text-4xl font-bold">{averageScore}%</div>
                                <div className="mt-4">
                                    <Progress value={averageScore} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-muted-foreground text-sm font-medium mb-2">Submissions</h3>
                                <div className="text-4xl font-bold">{totalSubmissions}</div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span className="text-green-500">{gradedSubmissions} Graded</span>
                                    <span className="text-yellow-500">{pendingSubmissions} Pending</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h3 className="text-muted-foreground text-sm font-medium mb-2">Top Subject</h3>
                                {subjectAverages.length > 0 ? (
                                    <>
                                        <div className="text-xl font-bold">{subjectAverages[0].subject}</div>
                                        <div className="text-3xl font-bold mt-1">{subjectAverages[0].average}%</div>
                                    </>
                                ) : (
                                    <div className="text-xl font-medium text-muted-foreground">No data</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="subjects" className="pt-4">
                {subjectAverages.length === 0 ? (
                    <div className="text-center py-8 bg-muted rounded-md">
                        <p className="text-muted-foreground">No graded submissions yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {subjectAverages.map((subject) => (
                            <div key={subject.subject} className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                                        <span>{subject.subject}</span>
                                    </div>
                                    <span className="font-medium">{subject.average}%</span>
                                </div>
                                <Progress value={subject.average} className="h-2" />
                            </div>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="grades" className="pt-4">
                {gradedSubmissions === 0 ? (
                    <div className="text-center py-8 bg-muted rounded-md">
                        <p className="text-muted-foreground">No graded submissions yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-5 gap-2">
                            {Object.entries(gradeDistribution).map(([grade, count]) => (
                                <Card key={grade} className="overflow-hidden">
                                    <div
                                        className="h-1"
                                        style={{
                                            backgroundColor:
                                                grade === "A"
                                                    ? "#10b981"
                                                    : grade === "B"
                                                        ? "#3b82f6"
                                                        : grade === "C"
                                                            ? "#f59e0b"
                                                            : grade === "D"
                                                                ? "#f97316"
                                                                : "#ef4444",
                                        }}
                                    />
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold">{grade}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {count} {count === 1 ? "assignment" : "assignments"}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="bg-muted p-3 rounded-md text-sm">
                            <div className="grid grid-cols-5 gap-2 text-center">
                                <div>A: 90-100%</div>
                                <div>B: 80-89%</div>
                                <div>C: 70-79%</div>
                                <div>D: 60-69%</div>
                                <div>F: 0-59%</div>
                            </div>
                        </div>
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}

