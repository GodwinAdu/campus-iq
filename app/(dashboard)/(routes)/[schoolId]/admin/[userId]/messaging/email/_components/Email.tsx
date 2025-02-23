"use client"

import { useState } from "react"
import {
    Mail,
    Send,
    Star,
    Trash2,
    Plus,
    Search,
    MoreVertical,
    Check,
    Tag,
    Menu,
    Paperclip,
    FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { EmailDetail } from "./email-details"
import { ComposeEmail } from "./compose-email"


// Mock data for emails
const mockEmails: Email[] = [
    {
        id: "1",
        sender: "john@example.com",
        recipients: ["admin@school.edu"],
        subject: "Meeting Tomorrow",
        message: "Hi, just a reminder about our meeting tomorrow at 10 AM.",
        time: "2023-06-10T10:00:00Z",
        unread: true,
        folder: "inbox",
        labels: ["work"],
    },
    {
        id: "2",
        sender: "admin@school.edu",
        recipients: ["jane@example.com"],
        subject: "Re: Student Records",
        message: "I've attached the updated student records you requested.",
        time: "2023-06-09T14:30:00Z",
        unread: false,
        folder: "sent",
        labels: ["work"],
    },
    {
        id: "3",
        sender: "admin@school.edu",
        recipients: ["principal@school.edu"],
        subject: "Budget Proposal Draft",
        message: "Here's the first draft of the budget proposal for next year.",
        time: "2023-06-08T16:45:00Z",
        unread: false,
        folder: "drafts",
        labels: ["work", "important"],
    },
    {
        id: "4",
        sender: "newsletter@edutech.com",
        recipients: ["admin@school.edu"],
        subject: "Latest in EdTech",
        message: "Check out the latest trends in educational technology!",
        time: "2023-06-07T09:15:00Z",
        unread: true,
        folder: "inbox",
        labels: ["follow-up"],
    },
    {
        id: "5",
        sender: "admin@school.edu",
        recipients: ["it@school.edu"],
        subject: "Software License Renewal",
        message: "We need to renew our software licenses by the end of this month.",
        time: "2023-06-06T11:20:00Z",
        unread: false,
        folder: "important",
        labels: ["urgent", "work"],
    },
]

export default function EmailDashboard() {
    const [emails, setEmails] = useState<Email[]>(mockEmails)
    const [selectedEmails, setSelectedEmails] = useState<string[]>([])
    const [filter, setFilter] = useState<EmailFilter>({ folder: "inbox", labels: [], search: "" })
    const [composeOpen, setComposeOpen] = useState(false)
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)


    const [replyEmail, setReplyEmail] = useState<Email | null>(null)

    const handleReply = (email: Email) => {
        setReplyEmail(email)
        setComposeOpen(true)
    }

    const handleReplyAll = (email: Email) => {
        setReplyEmail({
            ...email,
            recipients: [email.sender, ...email.recipients.filter((r) => r !== email.sender)],
        })
        setComposeOpen(true)
    }

    const handleForward = (email: Email) => {
        setReplyEmail({
            ...email,
            recipients: [],
            subject: `Fwd: ${email.subject}`,
        })
        setComposeOpen(true)
    }

    const filteredEmails = emails.filter(
        (email) =>
            email.folder === filter.folder &&
            (email.subject.toLowerCase().includes(filter.search.toLowerCase()) ||
                email.message.toLowerCase().includes(filter.search.toLowerCase()) ||
                email.sender.toLowerCase().includes(filter.search.toLowerCase())),
    )

    const handleSelectEmail = (emailId: string) => {
        setSelectedEmails((prev) => (prev.includes(emailId) ? prev.filter((id) => id !== emailId) : [...prev, emailId]))
    }

    const handleSelectAll = () => {
        setSelectedEmails(selectedEmails.length === filteredEmails.length ? [] : filteredEmails.map((email) => email.id))
    }

    const handleMarkAsRead = async () => {
        if (selectedEmails.length === 0) return
        setEmails((prev) => prev.map((email) => (selectedEmails.includes(email.id) ? { ...email, unread: false } : email)))
        toast({ title: "Marked as read", description: `${selectedEmails.length} email(s) marked as read` })
        setSelectedEmails([])
    }

    const handleMoveToTrash = async () => {
        if (selectedEmails.length === 0) return
        setEmails((prev) =>
            prev.map((email) => (selectedEmails.includes(email.id) ? { ...email, folder: "trash" } : email)),
        )
        toast({ title: "Moved to trash", description: `${selectedEmails.length} email(s) moved to trash` })
        setSelectedEmails([])
    }

    const handleToggleImportant = async (id: string) => {
        setEmails((prev) =>
            prev.map((email) =>
                email.id === id ? { ...email, folder: email.folder === "important" ? "inbox" : "important" } : email,
            ),
        )
        toast({ title: "Updated", description: "Email importance toggled" })
    }

    const handleAddLabel = async (label: EmailLabel) => {
        if (selectedEmails.length === 0) return
        setEmails((prev) =>
            prev.map((email) =>
                selectedEmails.includes(email.id) ? { ...email, labels: [...new Set([...email.labels, label])] } : email,
            ),
        )
        toast({ title: "Label added", description: `${label} label added to ${selectedEmails.length} email(s)` })
        setSelectedEmails([])
    }

    const getFolderCount = (folder: EmailFolder) =>
        emails.filter((email) => email.folder === folder && email.unread).length

    const getFolderIcon = (folder: EmailFolder) => {
        switch (folder) {
            case "inbox":
                return <Mail className="h-4 w-4" />
            case "sent":
                return <Send className="h-4 w-4" />
            case "drafts":
                return <FileText className="h-4 w-4" />
            case "important":
                return <Star className="h-4 w-4" />
            case "trash":
                return <Trash2 className="h-4 w-4" />
        }
    }

    return (
        <div className="h-screen flex flex-col bg-background">
            <header className="border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen((prev) => !prev)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold">Mail System</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search emails..."
                            className="pl-8 w-64"
                            value={filter.search}
                            onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
                        />
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 240, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="border-r bg-background"
                        >
                            <div className="p-4 flex flex-col gap-2">
                                <Button className="w-full gap-2" size="lg" onClick={() => setComposeOpen(true)}>
                                    <Plus className="h-4 w-4" />
                                    Compose
                                </Button>

                                <ScrollArea className="flex-1 h-[calc(100vh-8rem)]">
                                    <div className="space-y-2 mt-4">
                                        {(["inbox", "sent", "drafts", "important", "trash"] as EmailFolder[]).map((folder) => (
                                            <Button
                                                key={folder}
                                                variant={filter.folder === folder ? "secondary" : "ghost"}
                                                className="w-full justify-start gap-2"
                                                onClick={() => setFilter((prev) => ({ ...prev, folder }))}
                                            >
                                                {getFolderIcon(folder)}
                                                {folder.charAt(0).toUpperCase() + folder.slice(1)}
                                                {getFolderCount(folder) > 0 && (
                                                    <Badge className="ml-auto" variant="secondary">
                                                        {getFolderCount(folder)}
                                                    </Badge>
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedEmail ? (
                        <EmailDetail
                            email={selectedEmail}
                            onClose={() => setSelectedEmail(null)}
                            onDelete={handleMoveToTrash}
                            onToggleImportant={handleToggleImportant}
                            onReply={handleReply}
                            onReplyAll={handleReplyAll}
                            onForward={handleForward}
                        />
                    ) : (
                        <>
                            <div className="p-4 border-b flex items-center gap-2 overflow-x-auto bg-background">
                                <Checkbox
                                    checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                                <Button variant="outline" size="icon" onClick={handleMarkAsRead}>
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleMoveToTrash}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Tag className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {(["work", "personal", "urgent", "follow-up"] as EmailLabel[]).map((label) => (
                                            <DropdownMenuItem key={label} onClick={() => handleAddLabel(label)}>
                                                Add {label} label
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Separator orientation="vertical" className="mx-2 h-6" />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleMarkAsRead}>Mark all as read</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleMoveToTrash}>Move to trash</DropdownMenuItem>
                                        <DropdownMenuItem>Export selected</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <ScrollArea className="flex-1">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                    {filteredEmails.length > 0 ? (
                                        filteredEmails.map((email) => (
                                            <motion.div
                                                key={email.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`flex items-center gap-4 p-4 border-b hover:bg-muted/50 cursor-pointer ${email.unread ? "bg-muted/30" : ""
                                                    }`}
                                                onClick={() => setSelectedEmail(email)}
                                            >
                                                <Checkbox
                                                    checked={selectedEmails.includes(email.id)}
                                                    onCheckedChange={() => handleSelectEmail(email.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.sender}`} />
                                                    <AvatarFallback>{email.sender[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold truncate">{email.sender}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {new Date(email.time).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-sm font-medium truncate">{email.subject}</h3>
                                                    <p className="text-sm text-muted-foreground truncate">{email.message}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {email.labels.map((label) => (
                                                        <Badge key={label} variant="outline">
                                                            {label}
                                                        </Badge>
                                                    ))}
                                                    {email.attachments && email.attachments.length > 0 && (
                                                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No messages</h3>
                                            <p className="text-muted-foreground">There are no messages in this folder.</p>
                                        </div>
                                    )}
                                </motion.div>
                            </ScrollArea>
                        </>
                    )}
                </div>
            </div>

            <ComposeEmail
                open={composeOpen}
                onOpenChange={setComposeOpen}
                initialTo={replyEmail ? replyEmail.recipients.join(", ") : ""}
                initialSubject={
                    replyEmail ? (replyEmail.subject.startsWith("Re:") ? replyEmail.subject : `Re: ${replyEmail.subject}`) : ""
                }
                initialMessage={
                    replyEmail
                        ? `

On ${new Date(replyEmail.time).toLocaleString()}, ${replyEmail.sender} wrote:

${replyEmail.message}
`
                        : ""
                }
            />
        </div>
    )
}

