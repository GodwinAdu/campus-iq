'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const initialCourses = [
  { id: 1, name: 'Introduction to Computer Science', code: 'CS101', progress: 60, credits: 3 },
  { id: 2, name: 'Calculus I', code: 'MATH101', progress: 75, credits: 4 },
  { id: 3, name: 'English Composition', code: 'ENG101', progress: 90, credits: 3 },
  { id: 4, name: 'Introduction to Psychology', code: 'PSY101', progress: 40, credits: 3 },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>
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
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{course.credits} credits</Badge>
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

