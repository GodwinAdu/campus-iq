'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const data = [
    { name: 'Math', score: 80 },
    { name: 'Science', score: 75 },
    { name: 'History', score: 90 },
    { name: 'English', score: 85 },
    { name: 'Art', score: 95 },
]

const notices = [
    { id: 1, title: 'Campus Closure', content: 'Campus will be closed on Monday for maintenance.' },
    { id: 2, title: 'New Course Offerings', content: 'Check out our new AI and Machine Learning courses!' },
    { id: 3, title: 'Library Hours Extended', content: 'Library will now be open until 11 PM on weekdays.' },
]

const upcomingClasses = [
    { id: 1, name: 'Mathematics 101', time: '09:00 AM', room: 'Room 201' },
    { id: 2, name: 'Introduction to Physics', time: '11:00 AM', room: 'Lab 3' },
    { id: 3, name: 'World History', time: '02:00 PM', room: 'Room 105' },
]

const homework = [
    { id: 1, subject: 'Mathematics', task: 'Problem Set 3', dueDate: '2023-07-15' },
    { id: 2, subject: 'Physics', task: 'Lab Report', dueDate: '2023-07-18' },
    { id: 3, subject: 'English', task: 'Essay on Shakespeare', dueDate: '2023-07-20' },
]

const teachers = [
    { id: 1, name: 'Dr. Smith', subject: 'Mathematics' },
    { id: 2, name: 'Prof. Johnson', subject: 'Physics' },
    { id: 3, name: 'Ms. Williams', subject: 'English' },
]

const visitors = [
    { id: 1, name: 'John Doe', purpose: 'Parent Meeting', time: '10:00 AM' },
    { id: 2, name: 'Jane Smith', purpose: 'Guest Lecture', time: '02:00 PM' },
]

const libraryBooks = [
    { id: 1, title: 'Introduction to Algorithms', dueDate: '2023-07-25' },
    { id: 2, title: 'To Kill a Mockingbird', dueDate: '2023-07-30' },
    { id: 3, title: 'The Art of Computer Programming', dueDate: '2023-08-05' },
]

export default function DashboardPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    return (
        <div className="space-y-6">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-lg bg-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg bg-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg bg-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg bg-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">95%</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Notice Board</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            {notices.map((notice) => (
                                <div key={notice.id} className="mb-4 last:mb-0">
                                    <h3 className="font-semibold">{notice.title}</h3>
                                    <p className="text-sm text-muted-foreground">{notice.content}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            {upcomingClasses.map((class_) => (
                                <div key={class_.id} className="mb-2 last:mb-0">
                                    <p className="font-semibold">{class_.name}</p>
                                    <p className="text-sm text-muted-foreground">{class_.time} - {class_.room}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.map((course) => (
                                <div key={course.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium">{course.name}</div>
                                        <div className="text-sm text-muted-foreground">{course.score}%</div>
                                    </div>
                                    <Progress value={course.score} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="score" fill="currentColor" className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Homework</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            {homework.map((item) => (
                                <div key={item.id} className="mb-2 last:mb-0">
                                    <p className="font-semibold">{item.subject}: {item.task}</p>
                                    <p className="text-sm text-muted-foreground">Due: {item.dueDate}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Teachers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            {teachers.map((teacher) => (
                                <div key={teacher.id} className="flex items-center mb-2 last:mb-0">
                                    <Avatar className="h-9 w-9 mr-2">
                                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={teacher.name} />
                                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{teacher.name}</p>
                                        <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            {visitors.map((visitor) => (
                                <div key={visitor.id} className="mb-2 last:mb-0">
                                    <p className="font-semibold">{visitor.name}</p>
                                    <p className="text-sm text-muted-foreground">{visitor.purpose} - {visitor.time}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Library Books Issued</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {libraryBooks.map((book) => (
                                <div key={book.id} className="mb-2 last:mb-0">
                                    <p className="font-semibold">{book.title}</p>
                                    <p className="text-sm text-muted-foreground">Due: {book.dueDate}</p>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

