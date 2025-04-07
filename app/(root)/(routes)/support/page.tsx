"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertCircle,
    ArrowRight,
    BookOpen,
    ChevronRight,
    Clock,
    FileQuestion,
    HelpCircle,
    LifeBuoy,
    Loader2,
    MessageSquare,
    Phone,
    Play,
    Search,
    Settings,
    ThumbsUp,
    Ticket,
    Users,
    X,
    Upload,
    Calendar,
} from "lucide-react"
import Link from "next/link"
import { ContactSupportDialog } from "@/components/contact-support-dialog"
import { ScheduleDemoDialog } from "@/components/schedule-demo-dialog"

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState("help")
    const [showContactDialog, setShowContactDialog] = useState(false)
    const [showDemoDialog, setShowDemoDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [activeTickets, setActiveTickets] = useState<any[]>([])
    const [systemStatus, setSystemStatus] = useState<{ status: string; uptime: number; components: any[] }>({
        status: "operational",
        uptime: 99.98,
        components: [],
    })
    const [isLoading, setIsLoading] = useState(true)
    const [showLiveChat, setShowLiveChat] = useState(false)
    const [chatMessages, setChatMessages] = useState<{ sender: string; message: string; time: string }[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [supportPreferences, setSupportPreferences] = useState({
        emailNotifications: true,
        pushNotifications: false,
        weeklyDigest: true,
        productUpdates: true,
    })

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            // Mock active tickets
            setActiveTickets([
                {
                    id: "TKT-4872",
                    subject: "Unable to access gradebook module",
                    status: "in-progress",
                    priority: "high",
                    created: "2023-04-05T14:30:00Z",
                    lastUpdate: "2023-04-05T16:45:00Z",
                    assignee: "Sarah Johnson",
                },
                {
                    id: "TKT-4865",
                    subject: "Question about billing cycle",
                    status: "waiting",
                    priority: "medium",
                    created: "2023-04-03T09:15:00Z",
                    lastUpdate: "2023-04-04T11:20:00Z",
                    assignee: "Michael Chen",
                },
                {
                    id: "TKT-4853",
                    subject: "Feature request: Additional report templates",
                    status: "open",
                    priority: "low",
                    created: "2023-04-01T10:45:00Z",
                    lastUpdate: "2023-04-01T10:45:00Z",
                    assignee: "Unassigned",
                },
            ])

            // Mock system status
            setSystemStatus({
                status: "operational",
                uptime: 99.98,
                components: [
                    { name: "Core Application", status: "operational" },
                    { name: "API Services", status: "operational" },
                    { name: "Database", status: "operational" },
                    { name: "Authentication", status: "operational" },
                    { name: "File Storage", status: "degraded", message: "Experiencing slower upload speeds" },
                ],
            })

            setIsLoading(false)
        }, 1200)

        return () => clearTimeout(timer)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setIsSearching(true)

        // Simulate search results
        setTimeout(() => {
            setSearchResults([
                {
                    id: 1,
                    title: "How to reset student passwords",
                    category: "Account Management",
                    excerpt: "Learn how to reset student passwords individually or in bulk...",
                    url: "#",
                    relevance: 95,
                },
                {
                    id: 2,
                    title: "Troubleshooting login issues",
                    category: "Authentication",
                    excerpt: "Common solutions for login problems including locked accounts...",
                    url: "#",
                    relevance: 87,
                },
                {
                    id: 3,
                    title: "Common account access problems",
                    category: "Account Management",
                    excerpt: "Solutions for the most frequently reported account access issues...",
                    url: "#",
                    relevance: 82,
                },
                {
                    id: 4,
                    title: "Setting up two-factor authentication",
                    category: "Security",
                    excerpt: "Step-by-step guide to enabling and managing two-factor authentication...",
                    url: "#",
                    relevance: 78,
                },
                {
                    id: 5,
                    title: "Managing user permissions",
                    category: "Administration",
                    excerpt: "Learn how to configure role-based access control for different user types...",
                    url: "#",
                    relevance: 75,
                },
            ])
            setIsSearching(false)
        }, 800)
    }

    const sendChatMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        setChatMessages((prev) => [
            ...prev,
            {
                sender: "user",
                message: newMessage,
                time: timeString,
            },
        ])

        setNewMessage("")

        // Simulate agent response
        setTimeout(() => {
            const responseTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            setChatMessages((prev) => [
                ...prev,
                {
                    sender: "agent",
                    message:
                        "Thanks for reaching out! I'm reviewing your question about account access. Could you please tell me which specific error message you're seeing?",
                    time: responseTime,
                },
            ])
        }, 1500)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "operational":
                return "bg-green-500"
            case "degraded":
                return "bg-yellow-500"
            case "partial_outage":
                return "bg-orange-500"
            case "major_outage":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const getTicketStatusBadge = (status: string) => {
        switch (status) {
            case "open":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Open
                    </Badge>
                )
            case "in-progress":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                        In Progress
                    </Badge>
                )
            case "waiting":
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                        Waiting
                    </Badge>
                )
            case "resolved":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Resolved
                    </Badge>
                )
            case "closed":
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
                        Closed
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getTicketPriorityBadge = (priority: string) => {
        switch (priority) {
            case "low":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Low
                    </Badge>
                )
            case "medium":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Medium
                    </Badge>
                )
            case "high":
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        High
                    </Badge>
                )
            case "critical":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                        Critical
                    </Badge>
                )
            default:
                return <Badge variant="outline">{priority}</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <div className="min-h-screen bg-background mt-16">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Support & Resources</h1>
                            <p className="mt-1 text-gray-500">Get help, find answers, and connect with our support team</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <ContactSupportDialog />
                            <ScheduleDemoDialog />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Global Search */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Search for help articles, tutorials, and FAQs..."
                                    className="pl-10 h-12 text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
                                    disabled={isSearching || !searchQuery.trim()}
                                >
                                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <div className="mb-8 bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Search Results</h2>
                                <Button variant="ghost" size="sm" onClick={() => setSearchResults([])}>
                                    Clear Results
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {searchResults.map((result) => (
                                    <div key={result.id} className="border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-blue-600 hover:underline">
                                                    <Link href={result.url}>{result.title}</Link>
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <Badge variant="secondary" className="mr-2">
                                                        {result.category}
                                                    </Badge>
                                                    <span className="text-sm text-gray-500">{result.relevance}% match</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                View
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">{result.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Tabs defaultValue="help" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid grid-cols-5 w-full">
                            <TabsTrigger value="help">Get Help</TabsTrigger>
                            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                            <TabsTrigger value="status">System Status</TabsTrigger>
                            <TabsTrigger value="preferences">Preferences</TabsTrigger>
                        </TabsList>

                        <TabsContent value="help" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                                            Contact Support
                                        </CardTitle>
                                        <CardDescription>Submit a ticket or chat with our team</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>Get personalized assistance from our dedicated support team for any issues or questions.</p>
                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>Typical response time: 4 hours</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => setShowContactDialog(true)}>
                                            Contact Support
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                                            Live Chat
                                        </CardTitle>
                                        <CardDescription>Chat with a support agent in real-time</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>Connect instantly with our support team for quick questions and immediate assistance.</p>
                                        <div className="mt-4 flex items-center">
                                            <span className="flex h-3 w-3 relative mr-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="text-sm text-green-600">Agents available now</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => setShowLiveChat(true)}>
                                            Start Chat
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <Phone className="h-5 w-5 mr-2 text-blue-500" />
                                            Call Us
                                        </CardTitle>
                                        <CardDescription>Speak directly with a support agent</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>For urgent matters, call our support line for immediate assistance during business hours.</p>
                                        <p className="font-medium mt-2">(555) 123-4567</p>
                                        <p className="text-xs text-gray-500 mt-1">Monday-Friday, 8am-6pm ET</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            View Support Hours
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <FileQuestion className="h-5 w-5 mr-2 text-blue-500" />
                                            Popular FAQs
                                        </CardTitle>
                                        <CardDescription>Quick answers to common questions</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                How do I reset a student's password?
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Learn how to reset passwords for individual students or in bulk.
                                            </p>
                                        </div>
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                How do I generate custom reports?
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Step-by-step guide to creating and scheduling custom reports.
                                            </p>
                                        </div>
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                How do I set up grade scales?
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Instructions for configuring custom grade scales and weighting.
                                            </p>
                                        </div>
                                        <div>
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                How do I import student data?
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Guide to importing student records from CSV or SIS integration.
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            View All FAQs
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <Users className="h-5 w-5 mr-2 text-blue-500" />
                                            Community Forum
                                        </CardTitle>
                                        <CardDescription>Connect with other CampusIQ users</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                Best practices for parent communication
                                            </Link>
                                            <div className="flex items-center mt-1">
                                                <Badge variant="secondary" className="mr-2">
                                                    Discussion
                                                </Badge>
                                                <span className="text-xs text-gray-500">23 replies • 2 days ago</span>
                                            </div>
                                        </div>
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                Custom report template sharing
                                            </Link>
                                            <div className="flex items-center mt-1">
                                                <Badge variant="secondary" className="mr-2">
                                                    Resources
                                                </Badge>
                                                <span className="text-xs text-gray-500">17 replies • 5 days ago</span>
                                            </div>
                                        </div>
                                        <div className="border-b pb-2">
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                End of year checklist for administrators
                                            </Link>
                                            <div className="flex items-center mt-1">
                                                <Badge variant="secondary" className="mr-2">
                                                    Guide
                                                </Badge>
                                                <span className="text-xs text-gray-500">31 replies • 1 week ago</span>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#" className="text-blue-600 hover:underline font-medium">
                                                Feature request: Enhanced attendance tracking
                                            </Link>
                                            <div className="flex items-center mt-1">
                                                <Badge variant="secondary" className="mr-2">
                                                    Feature Request
                                                </Badge>
                                                <span className="text-xs text-gray-500">42 replies • 2 weeks ago</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            Join Community
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <LifeBuoy className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-blue-900">Need immediate assistance?</h3>
                                        <p className="text-blue-700">Our support team is available 24/7 for Enterprise customers.</p>
                                    </div>
                                </div>
                                <Button className="whitespace-nowrap">Contact Emergency Support</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="tickets" className="space-y-6">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="text-center">
                                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
                                        <p className="text-gray-500">Loading your support tickets...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold">My Support Tickets</h2>
                                            <p className="text-gray-500">Track and manage your support requests</p>
                                        </div>
                                        <Button onClick={() => setShowContactDialog(true)}>
                                            <Ticket className="mr-2 h-4 w-4" />
                                            New Ticket
                                        </Button>
                                    </div>

                                    {activeTickets.length > 0 ? (
                                        <div className="bg-white rounded-lg shadow overflow-hidden">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-gray-50 border-b">
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Ticket ID
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Subject
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Priority
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Created
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Last Update
                                                            </th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Assignee
                                                            </th>
                                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {activeTickets.map((ticket) => (
                                                            <tr key={ticket.id} className="hover:bg-gray-50">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                                    {ticket.id}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                    {getTicketStatusBadge(ticket.status)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                                    {getTicketPriorityBadge(ticket.priority)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {formatDate(ticket.created)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {formatDate(ticket.lastUpdate)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {ticket.assignee === "Unassigned" ? (
                                                                        <span className="text-gray-400">Unassigned</span>
                                                                    ) : (
                                                                        ticket.assignee
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <Button variant="ghost" size="sm">
                                                                        View
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <Card className="bg-gray-50 border border-dashed">
                                            <CardContent className="pt-6 text-center">
                                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <Ticket className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-medium mb-2">No Active Tickets</h3>
                                                <p className="text-gray-500 mb-4">You don't have any active support tickets at the moment.</p>
                                                <Button onClick={() => setShowContactDialog(true)}>Create a New Ticket</Button>
                                            </CardContent>
                                        </Card>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Ticket History</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold">24</div>
                                                    <Button variant="ghost" size="sm">
                                                        View All
                                                    </Button>
                                                </div>
                                                <p className="text-sm text-gray-500">Total tickets in the last 12 months</p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Average Resolution Time</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold">8.5 hours</div>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                                        <ArrowRight className="h-3 w-3 mr-1" />
                                                        -12%
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500">Faster than our SLA commitment</p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Satisfaction Rating</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold">4.8/5</div>
                                                    <ThumbsUp className="h-4 w-4 text-green-500" />
                                                </div>
                                                <p className="text-sm text-gray-500">Based on your feedback</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="resources" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                                            Knowledge Base
                                        </CardTitle>
                                        <CardDescription>Comprehensive documentation</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>Explore detailed articles, guides, and tutorials on using CampusIQ effectively.</p>
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <div className="bg-gray-50 p-2 rounded-md">
                                                <p className="font-medium text-xs">Getting Started</p>
                                                <p className="text-xs text-gray-500">12 articles</p>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded-md">
                                                <p className="font-medium text-xs">Administration</p>
                                                <p className="text-xs text-gray-500">24 articles</p>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded-md">
                                                <p className="font-medium text-xs">Reporting</p>
                                                <p className="text-xs text-gray-500">18 articles</p>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded-md">
                                                <p className="font-medium text-xs">Integrations</p>
                                                <p className="text-xs text-gray-500">9 articles</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            Browse Knowledge Base
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <Play className="h-5 w-5 mr-2 text-blue-500" />
                                            Video Tutorials
                                        </CardTitle>
                                        <CardDescription>Learn through step-by-step videos</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>Watch our collection of video tutorials covering all aspects of CampusIQ.</p>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 rounded w-16 h-9 flex items-center justify-center mr-2">
                                                    <Play className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium">Getting Started with CampusIQ</p>
                                                    <p className="text-xs text-gray-500">5:32</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 rounded w-16 h-9 flex items-center justify-center mr-2">
                                                    <Play className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium">Advanced Reporting Features</p>
                                                    <p className="text-xs text-gray-500">8:15</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            Watch Tutorials
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center text-lg">
                                            <Users className="h-5 w-5 mr-2 text-blue-500" />
                                            Community Forum
                                        </CardTitle>
                                        <CardDescription>Connect with other users</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>Join discussions, share ideas, and learn from other CampusIQ users.</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-xs">Active Community</p>
                                                <p className="text-xs text-gray-500">5,200+ members</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-xs">Daily Activity</p>
                                                <p className="text-xs text-gray-500">120+ posts</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            Join Community
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Latest Updates</CardTitle>
                                        <CardDescription>Stay informed about new features and improvements</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-b pb-3">
                                            <p className="font-medium">Gradebook Enhancements</p>
                                            <p className="text-sm text-gray-500">
                                                New analytics and reporting features added to the gradebook module.
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">Released: April 2, 2023</p>
                                        </div>
                                        <div className="border-b pb-3">
                                            <p className="font-medium">Mobile App Update</p>
                                            <p className="text-sm text-gray-500">
                                                Version 2.5 of our mobile app is now available with improved notifications.
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">Released: March 15, 2023</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">New Integration Options</p>
                                            <p className="text-sm text-gray-500">
                                                Added support for Google Classroom and Microsoft Teams integrations.
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1">Released: February 28, 2023</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            View All Updates
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Upcoming Webinars</CardTitle>
                                        <CardDescription>Register for live training sessions</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="border-b pb-3">
                                            <p className="font-medium">Advanced Reporting Techniques</p>
                                            <p className="text-sm text-gray-500">Learn how to create custom reports and dashboards.</p>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-3 w-3 text-blue-500 mr-1" />
                                                <p className="text-xs text-blue-600">April 15, 2023 • 2:00 PM ET</p>
                                            </div>
                                        </div>
                                        <div className="border-b pb-3">
                                            <p className="font-medium">Optimizing Student Engagement</p>
                                            <p className="text-sm text-gray-500">
                                                Strategies for increasing student participation and success.
                                            </p>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-3 w-3 text-blue-500 mr-1" />
                                                <p className="text-xs text-blue-600">April 22, 2023 • 1:00 PM ET</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium">Administrator Best Practices</p>
                                            <p className="text-sm text-gray-500">Essential tips for school administrators using CampusIQ.</p>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-3 w-3 text-blue-500 mr-1" />
                                                <p className="text-xs text-blue-600">May 5, 2023 • 11:00 AM ET</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            Register for Webinars
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
                                <div className="max-w-3xl mx-auto text-center">
                                    <h2 className="text-2xl font-bold mb-4">Need personalized training?</h2>
                                    <p className="mb-6">Our education specialists can provide custom training sessions for your staff.</p>
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                        Request Training
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="status" className="space-y-6">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="text-center">
                                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
                                        <p className="text-gray-500">Loading system status...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                            <div className="flex items-center mb-4 md:mb-0">
                                                <div className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(systemStatus.status)}`}></div>
                                                <h2 className="text-xl font-semibold">
                                                    {systemStatus.status === "operational" ? "All Systems Operational" : "System Issues Detected"}
                                                </h2>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-sm text-gray-500 mr-4">
                                                    <span className="font-medium text-black">{systemStatus.uptime}%</span> uptime
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    Incident History
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {systemStatus.components.map((component, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                                    <div className="flex items-center">
                                                        <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(component.status)}`}></div>
                                                        <span className="font-medium">{component.name}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-sm capitalize">
                                                            {component.status === "operational" ? "Operational" : component.status}
                                                        </span>
                                                        {component.message && (
                                                            <HelpCircle
                                                                className="h-4 w-4 ml-2 text-gray-400 cursor-help"
                                                                title={component.message}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Response Time</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold mb-1">124ms</div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-500">Average over 24 hours</p>
                                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                                        <ArrowRight className="h-3 w-3 mr-1" />
                                                        -8ms
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">API Requests</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold mb-1">1.2M</div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-500">Last 24 hours</p>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                        <ArrowRight className="h-3 w-3 mr-1" />
                                                        +5.3%
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Last Incident</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-lg font-medium mb-1">March 15, 2023</div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-500">Database maintenance</p>
                                                    <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                                        Resolved
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Scheduled Maintenance</CardTitle>
                                            <CardDescription>Upcoming planned maintenance windows</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-start justify-between p-4 bg-amber-50 border border-amber-200 rounded-md">
                                                    <div>
                                                        <h3 className="font-medium">Database Optimization</h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Scheduled database maintenance to improve performance. Expected downtime: 15 minutes.
                                                        </p>
                                                        <div className="flex items-center mt-2">
                                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">April 15, 2023 • 2:00 AM - 2:30 AM ET</span>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                                        Upcoming
                                                    </Badge>
                                                </div>

                                                <div className="flex items-start justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
                                                    <div>
                                                        <h3 className="font-medium">System Upgrade</h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Upgrading to the latest version with new features and security improvements.
                                                        </p>
                                                        <div className="flex items-center mt-2">
                                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                            <span className="text-sm text-gray-500">April 22, 2023 • 1:00 AM - 3:00 AM ET</span>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                                        Scheduled
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                                        <div className="flex items-center">
                                            <Settings className="h-5 w-5 text-gray-500 mr-2" />
                                            <span className="text-gray-700">Subscribe to status updates</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Button variant="outline" size="sm">
                                                Email
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                SMS
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Slack
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="preferences" className="space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Support Preferences</h2>
                                <p className="text-gray-500 mb-6">Customize how you receive support and communications</p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label htmlFor="email-notifications" className="font-medium">
                                                        Email Notifications
                                                    </Label>
                                                    <p className="text-sm text-gray-500">Receive updates about your support tickets via email</p>
                                                </div>
                                                <Switch
                                                    id="email-notifications"
                                                    checked={supportPreferences.emailNotifications}
                                                    onCheckedChange={(checked) =>
                                                        setSupportPreferences((prev) => ({ ...prev, emailNotifications: checked }))
                                                    }
                                                />
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label htmlFor="push-notifications" className="font-medium">
                                                        Push Notifications
                                                    </Label>
                                                    <p className="text-sm text-gray-500">Receive real-time updates in your browser</p>
                                                </div>
                                                <Switch
                                                    id="push-notifications"
                                                    checked={supportPreferences.pushNotifications}
                                                    onCheckedChange={(checked) =>
                                                        setSupportPreferences((prev) => ({ ...prev, pushNotifications: checked }))
                                                    }
                                                />
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label htmlFor="weekly-digest" className="font-medium">
                                                        Weekly Digest
                                                    </Label>
                                                    <p className="text-sm text-gray-500">Receive a summary of your support activity each week</p>
                                                </div>
                                                <Switch
                                                    id="weekly-digest"
                                                    checked={supportPreferences.weeklyDigest}
                                                    onCheckedChange={(checked) =>
                                                        setSupportPreferences((prev) => ({ ...prev, weeklyDigest: checked }))
                                                    }
                                                />
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label htmlFor="product-updates" className="font-medium">
                                                        Product Updates
                                                    </Label>
                                                    <p className="text-sm text-gray-500">
                                                        Receive notifications about new features and improvements
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="product-updates"
                                                    checked={supportPreferences.productUpdates}
                                                    onCheckedChange={(checked) =>
                                                        setSupportPreferences((prev) => ({ ...prev, productUpdates: checked }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Contact Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">Primary Contact Method</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="contact-email"
                                                                name="contact-method"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                defaultChecked
                                                            />
                                                            <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700">
                                                                Email
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="contact-phone"
                                                                name="contact-method"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700">
                                                                Phone
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="contact-chat"
                                                                name="contact-method"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <label htmlFor="contact-chat" className="ml-2 block text-sm text-gray-700">
                                                                Live Chat
                                                            </label>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">Support Hours</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="hours-business"
                                                                name="support-hours"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                defaultChecked
                                                            />
                                                            <label htmlFor="hours-business" className="ml-2 block text-sm text-gray-700">
                                                                Business Hours (9am-5pm)
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="hours-extended"
                                                                name="support-hours"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <label htmlFor="hours-extended" className="ml-2 block text-sm text-gray-700">
                                                                Extended Hours (7am-9pm)
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id="hours-anytime"
                                                                name="support-hours"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <label htmlFor="hours-anytime" className="ml-2 block text-sm text-gray-700">
                                                                Anytime
                                                            </label>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Language & Accessibility</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="language" className="block mb-2">
                                                    Preferred Language
                                                </Label>
                                                <select
                                                    id="language"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    defaultValue="en"
                                                >
                                                    <option value="en">English</option>
                                                    <option value="es">Spanish</option>
                                                    <option value="fr">French</option>
                                                    <option value="de">German</option>
                                                    <option value="zh">Chinese</option>
                                                </select>
                                            </div>

                                            <div>
                                                <Label htmlFor="accessibility" className="block mb-2">
                                                    Accessibility Needs
                                                </Label>
                                                <select
                                                    id="accessibility"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    defaultValue="none"
                                                >
                                                    <option value="none">None</option>
                                                    <option value="screen-reader">Screen Reader Optimized</option>
                                                    <option value="high-contrast">High Contrast</option>
                                                    <option value="large-text">Large Text</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button variant="outline" className="mr-2">
                                        Reset to Defaults
                                    </Button>
                                    <Button>Save Preferences</Button>
                                </div>
                            </div>

                            <Alert className="bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertTitle>Privacy Note</AlertTitle>
                                <AlertDescription>
                                    Your preferences are stored securely and used only to improve your support experience. You can change
                                    these settings at any time.
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>


            {/* Live Chat Floating Button */}
            {!showLiveChat && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Button className="rounded-full w-14 h-14 shadow-lg" onClick={() => setShowLiveChat(true)}>
                        <MessageSquare className="h-6 w-6" />
                        <span className="sr-only">Open Live Chat</span>
                    </Button>
                </div>
            )}

            {/* Live Chat Panel */}
            {showLiveChat && (
                <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col h-[500px] border">
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative mr-3">
                                <Avatar className="h-8 w-8 border-2 border-white">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <p className="font-medium text-sm">CampusIQ Support</p>
                                <p className="text-xs text-blue-100">Online • Typically replies in minutes</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-blue-700 h-8 w-8"
                            onClick={() => setShowLiveChat(false)}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {chatMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                <div className="bg-blue-100 rounded-full p-3 mb-3">
                                    <MessageSquare className="h-6 w-6 text-blue-600" />
                                </div>
                                <p className="font-medium">Welcome to CampusIQ Support</p>
                                <p className="text-sm mt-1">How can we help you today?</p>
                            </div>
                        ) : (
                            chatMessages.map((msg, index) => (
                                <div key={index} className={`flex max-w-[80%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>
                                    {msg.sender === "agent" && (
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                                            <AvatarFallback>SA</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div>
                                        <div
                                            className={`rounded-lg p-3 ${msg.sender === "user"
                                                    ? "bg-blue-500 text-white rounded-br-none"
                                                    : "bg-white text-gray-800 rounded-bl-none"
                                                }`}
                                        >
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={sendChatMessage} className="p-3 border-t bg-white rounded-b-lg">
                        <div className="flex space-x-2">
                            <Input
                                placeholder="Type your message here..."
                                className="flex-1"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button type="submit" size="sm" className="shrink-0">
                                Send
                            </Button>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <div className="flex items-center">
                                <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-gray-500">
                                    <Upload className="h-4 w-4 mr-1" />
                                    Attach
                                </Button>
                            </div>
                            <p>Powered by CampusIQ AI</p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

