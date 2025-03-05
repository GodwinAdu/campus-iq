'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

const initialAssignments = [
  { id: 1, title: 'CS101 Project', course: 'CS101', dueDate: '2023-07-15', completed: false },
  { id: 2, title: 'Math Homework', course: 'MATH101', dueDate: '2023-07-10', completed: true },
  { id: 3, title: 'English Essay', course: 'ENG101', dueDate: '2023-07-20', completed: false },
  { id: 4, title: 'Psychology Quiz', course: 'PSY101', dueDate: '2023-07-12', completed: false },
]

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleAssignment = (id: number) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
    ))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Assignments</h1>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Checkbox
                    checked={assignment.completed}
                    onCheckedChange={() => toggleAssignment(assignment.id)}
                  />
                  <span className={assignment.completed ? 'line-through' : ''}>{assignment.title}</span>
                </CardTitle>
                <Badge variant={assignment.completed ? 'secondary' : 'default'}>
                  {assignment.completed ? 'Completed' : 'Pending'}
                </Badge>
              </div>
              <CardDescription>{assignment.course}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span>Due: {assignment.dueDate}</span>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

