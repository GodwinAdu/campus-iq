"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { PaperclipIcon, Send, X, Smile } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { toast } from "@/hooks/use-toast"

interface ComposeEmailProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialTo?: string
    initialSubject?: string
    initialMessage?: string
}

export function ComposeEmail({
    open,
    onOpenChange,
    initialTo = "",
    initialSubject = "",
    initialMessage = "",
}: ComposeEmailProps) {
    const [attachments, setAttachments] = useState<File[]>([])
    const [sending, setSending] = useState(false)
    const [to, setTo] = useState(initialTo)
    const [subject, setSubject] = useState(initialSubject)
    const [message, setMessage] = useState(initialMessage)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (open) {
            setTo(initialTo)
            setSubject(initialSubject)
            setMessage(initialMessage)
        }
    }, [open, initialTo, initialSubject, initialMessage])

    const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
        }
    }

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSending(true)

        try {
            const formData = new FormData()
            formData.append("to", to)
            formData.append("subject", subject)
            formData.append("message", message)
            attachments.forEach((file) => formData.append("attachments", file))

            const response = await fetch("/api/send-email", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to send email")
            }

            toast({
                title: "Email sent successfully",
                description: "Your message has been sent to the recipients.",
            })
            onOpenChange(false)
            resetForm()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to send email",
                description: (error as Error).message,
            })
        } finally {
            setSending(false)
        }
    }

    const resetForm = () => {
        setTo("")
        setSubject("")
        setMessage("")
        setAttachments([])
    }

    const addEmoji = (emoji: { native: string }) => {
        const textarea = textareaRef.current
        if (textarea) {
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const newMessage = message.substring(0, start) + emoji.native + message.substring(end)
            setMessage(newMessage)
            // Set cursor position after the inserted emoji
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + emoji.native.length
                textarea.focus()
            }, 0)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[800px] w-full h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>Compose and send your email to students, faculty, or staff.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 flex flex-col gap-4 p-6 pt-2 overflow-y-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Label htmlFor="to" className="sm:w-20 sm:text-right">
                                To
                            </Label>
                            <Input
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="Enter recipient email addresses (comma-separated)"
                                className="flex-1"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Label htmlFor="subject" className="sm:w-20 sm:text-right">
                                Subject
                            </Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject"
                                className="flex-1"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                            <Label htmlFor="message" className="sm:w-20 sm:text-right mt-2">
                                Message
                            </Label>
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <Popover>
                                        <PopoverTrigger  asChild>
                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full">
                                            <Picker data={data}  onEmojiSelect={addEmoji} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Textarea
                                    ref={textareaRef}
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="min-h-[200px]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Label className="sm:w-20 sm:text-right">Attachments</Label>
                            <div className="flex-1 flex items-center gap-2 flex-wrap">
                                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                    <PaperclipIcon className="h-4 w-4 mr-2" />
                                    Attach files
                                </Button>
                                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleAttachment} />
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
                                        <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 p-0"
                                            onClick={() => removeAttachment(index)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="p-6 pt-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-2" disabled={sending}>
                            <Send className="h-4 w-4" />
                            {sending ? "Sending..." : "Send Email"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

