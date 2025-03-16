'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'


export default function CoursesPage({subjects}:{subjects:ISubject[]}) {

    const [searchTerm, setSearchTerm] = useState('')

    const filteredCourses = subjects.filter(course =>
        course.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">

            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                    <Card key={course._id}>
                        <CardHeader>
                            <CardTitle>{course.subjectName}</CardTitle>
                            <CardDescription>{course.code}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Badge variant="secondary">{course.subjectCredit} credits</Badge>
                                    <Button variant="outline">View Details</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

