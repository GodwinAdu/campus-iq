"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    FileText,
    HelpCircle,
    Loader2,
    MessageSquare,
    Phone,
    Search,
    Upload,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ContactSupportDialogProps {
    trigger?: React.ReactNode
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

export function ContactSupportDialog() {
    const [activeTab, setActiveTab] = useState("ticket")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [ticketNumber, setTicketNumber] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [chatMessages, setChatMessages] = useState<{ sender: string; message: string; time: string }[]>([])
    const [newMessage, setNewMessage] = useState("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            setSelectedFiles((prev) => [...prev, ...filesArray])
        }
    }

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const simulateFileUpload = () => {
        if (selectedFiles.length === 0) return

        setIsUploading(true)
        setUploadProgress(0)

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsUploading(false)
                    return 100
                }
                return prev + 5
            })
        }, 100)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            setTicketNumber(
                `SUP-${Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}`,
            )
        }, 1500)
    }

    const resetForm = () => {
        setIsSubmitted(false)
        setSelectedFiles([])
        setUploadProgress(0)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setIsSearching(true)

        // Simulate search results
        setTimeout(() => {
            setSearchResults([
                { id: 1, title: "How to reset student passwords", url: "#", relevance: 95 },
                { id: 2, title: "Troubleshooting login issues", url: "#", relevance: 87 },
                { id: 3, title: "Common account access problems", url: "#", relevance: 82 },
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

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button  className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {!isSubmitted ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Contact Support</DialogTitle>
                            <DialogDescription>Get help from our support team or explore self-service options.</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="ticket" value={activeTab} onValueChange={setActiveTab} className="mt-4">
                            <TabsList className="grid grid-cols-3 mb-4">
                                <TabsTrigger value="ticket" className="flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    <span>Submit Ticket</span>
                                </TabsTrigger>
                                <TabsTrigger value="chat" className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Live Chat</span>
                                </TabsTrigger>
                                <TabsTrigger value="knowledge" className="flex items-center gap-1">
                                    <HelpCircle className="h-4 w-4" />
                                    <span>Knowledge Base</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="ticket">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4 py-2 pb-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" placeholder="Brief description of your issue" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="account">Account Access</SelectItem>
                                                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                                                        <SelectItem value="technical">Technical Issue</SelectItem>
                                                        <SelectItem value="feature">Feature Request</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="priority">Priority</Label>
                                                <Select required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select priority" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                                                    Low
                                                                </Badge>
                                                                <span>General question</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="medium">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                                                    Medium
                                                                </Badge>
                                                                <span>Minor issue</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="high">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                                                                    High
                                                                </Badge>
                                                                <span>Major functionality affected</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="critical">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                                                                    Critical
                                                                </Badge>
                                                                <span>System unusable</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Please provide as much detail as possible"
                                                className="min-h-[120px]"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center justify-between">
                                                <span>Attachments</span>
                                                <span className="text-xs text-gray-500">Max 5 files (10MB each)</span>
                                            </Label>

                                            <div
                                                className="border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                                                />
                                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                                <p className="text-sm font-medium">Drag files here or click to browse</p>
                                                <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, PDF, DOC, XLS</p>
                                            </div>

                                            {selectedFiles.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {selectedFiles.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                            <div className="flex items-center space-x-2 truncate">
                                                                <FileText className="h-4 w-4 text-blue-500" />
                                                                <span className="text-sm truncate">{file.name}</span>
                                                                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 w-6 p-0"
                                                                onClick={() => removeFile(index)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}

                                                    <div className="flex justify-between items-center">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={simulateFileUpload}
                                                            disabled={isUploading}
                                                        >
                                                            {isUploading ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                                    Uploading...
                                                                </>
                                                            ) : (
                                                                <>Upload Files</>
                                                            )}
                                                        </Button>
                                                        <span className="text-xs text-gray-500">{selectedFiles.length} file(s) selected</span>
                                                    </div>

                                                    {isUploading && <Progress value={uploadProgress} className="h-2" />}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2 pt-2">
                                            <Switch id="cc-me" />
                                            <Label htmlFor="cc-me" className="text-sm">
                                                Send me a copy of this ticket
                                            </Label>
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>Submit Ticket</>
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </TabsContent>

                            <TabsContent value="chat">
                                <div className="flex flex-col h-[400px]">
                                    <div className="bg-gray-50 p-3 rounded-t-md">
                                        <div className="flex items-center space-x-2">
                                            <div className="relative">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                                                    <AvatarFallback>SA</AvatarFallback>
                                                </Avatar>
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Sarah Johnson</p>
                                                <p className="text-xs text-gray-500">Support Specialist • Online</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
                                        {chatMessages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                                <MessageSquare className="h-12 w-12 mb-2 text-gray-300" />
                                                <p className="font-medium">Start a conversation</p>
                                                <p className="text-sm">Our support team is online and ready to help</p>
                                            </div>
                                        ) : (
                                            chatMessages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={cn("flex max-w-[80%]", msg.sender === "user" ? "ml-auto" : "mr-auto")}
                                                >
                                                    {msg.sender === "agent" && (
                                                        <Avatar className="h-8 w-8 mr-2">
                                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                                                            <AvatarFallback>SA</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div>
                                                        <div
                                                            className={cn(
                                                                "rounded-lg p-3",
                                                                msg.sender === "user"
                                                                    ? "bg-blue-500 text-white rounded-br-none"
                                                                    : "bg-white text-gray-800 rounded-bl-none",
                                                            )}
                                                        >
                                                            <p className="text-sm">{msg.message}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <form onSubmit={sendChatMessage} className="p-3 border-t">
                                        <div className="flex space-x-2">
                                            <Textarea
                                                placeholder="Type your message here..."
                                                className="min-h-[60px] resize-none"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                            />
                                            <Button type="submit" size="sm" className="self-end">
                                                Send
                                            </Button>
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                                                    <Upload className="h-4 w-4 mr-1" />
                                                    Attach
                                                </Button>
                                                <Separator orientation="vertical" className="h-4 mx-2" />
                                                <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                                                    <Phone className="h-4 w-4 mr-1" />
                                                    Call
                                                </Button>
                                            </div>
                                            <p>Response time: ~2 minutes</p>
                                        </div>
                                    </form>
                                </div>
                            </TabsContent>

                            <TabsContent value="knowledge">
                                <div className="space-y-4">
                                    <form onSubmit={handleSearch}>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Search our knowledge base..."
                                                className="pl-10"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </form>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-base">Getting Started</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-sm text-gray-500">Setup guides, tutorials, and basic configuration</p>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-base">Account Management</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-sm text-gray-500">User roles, permissions, and access control</p>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-base">Billing & Subscriptions</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-sm text-gray-500">Payment methods, invoices, and plan changes</p>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-base">Troubleshooting</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-sm text-gray-500">Common issues and their solutions</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {isSearching && (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                        </div>
                                    )}

                                    {searchResults.length > 0 && (
                                        <div className="space-y-3 mt-6">
                                            <h3 className="font-medium">Search Results</h3>
                                            {searchResults.map((result) => (
                                                <Card key={result.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-base flex items-center justify-between">
                                                            <span>{result.title}</span>
                                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                                {result.relevance}% match
                                                            </Badge>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-0">
                                                        <p className="text-sm text-gray-500">
                                                            View article <ArrowRight className="h-3 w-3 inline ml-1" />
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4">
                                        <p className="text-sm text-gray-500">Can't find what you're looking for?</p>
                                        <Button type="button" variant="outline" size="sm" onClick={() => setActiveTab("ticket")}>
                                            Submit a Ticket
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </>
                ) : (
                    <div className="py-6 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Ticket Submitted</h2>
                            <p className="text-gray-500 mt-1">
                                Your ticket number is <span className="font-medium text-black">{ticketNumber}</span>
                            </p>
                        </div>

                        <Alert className="mt-6 bg-blue-50 text-blue-800 border-blue-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>What happens next?</AlertTitle>
                            <AlertDescription>
                                <p className="mt-1">
                                    We've sent a confirmation to your email. A support representative will review your ticket and respond
                                    within 24 hours.
                                </p>
                            </AlertDescription>
                        </Alert>

                        <div className="pt-4 space-y-2">
                            <Button onClick={resetForm} className="w-full">
                                Submit Another Ticket
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => setActiveTab("knowledge")}>
                                Browse Knowledge Base
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

