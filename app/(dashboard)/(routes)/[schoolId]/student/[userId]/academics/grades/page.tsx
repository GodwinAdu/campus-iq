'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const initialGrades = [
  { id: 1, course: 'CS101', assignment: 'Project', grade: 'A', score: 95 },
  { id: 2, course: 'MATH101', assignment: 'Midterm Exam', grade: 'B+', score: 88 },
  { id: 3, course: 'ENG101', assignment: 'Essay', grade: 'A-', score: 92 },
  { id: 4, course: 'PSY101', assignment: 'Quiz 1', grade: 'B', score: 85 },
  { id: 5, course: 'CS101', assignment: 'Homework 1', grade: 'A+', score: 98 },
  { id: 6, course: 'MATH101', assignment: 'Quiz 2', grade: 'B', score: 84 },
]

export default function GradesPage() {
  const [grades, setGrades] = useState(initialGrades)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('All')

  const courses = ['All', ...new Set(grades.map(grade => grade.course))]

  const filteredGrades = grades.filter(grade =>
    (selectedCourse === 'All' || grade.course === selectedCourse) &&
    (grade.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
     grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const calculateGPA = () => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
    const totalPoints = filteredGrades.reduce((sum, grade) => sum + gradePoints[grade.grade], 0)
    return (totalPoints / filteredGrades.length).toFixed(2)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Grades</h1>
      <Card>
        <CardHeader>
          <CardTitle>Grade Summary</CardTitle>
          <CardDescription>Your current GPA: {calculateGPA()}</CardDescription>
        </CardHeader>
      </Card>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search grades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map(course => (
              <SelectItem key={course} value={course}>{course}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.course}</TableCell>
                  <TableCell>{grade.assignment}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

