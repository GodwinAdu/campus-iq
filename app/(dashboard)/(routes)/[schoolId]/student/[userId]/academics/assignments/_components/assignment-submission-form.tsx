"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, X, FileText, FileArchive, File, Image } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface AssignmentSubmissionFormProps {
    assignmentId: string
}

export default function AssignmentSubmissionForm({ assignmentId }: AssignmentSubmissionFormProps) {
    const [content, setContent] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [activeTab, setActiveTab] = useState("text")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()
    const dropAreaRef = useRef<HTMLDivElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)
            setFiles((prev) => [...prev, ...newFiles])
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.add("border-primary")
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.remove("border-primary")
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.remove("border-primary")
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files)
            setFiles((prev) => [...prev, ...newFiles])
        }
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const getFileIcon = (file: File) => {
        const type = file.type
        if (type.startsWith("image/")) return <Image className="h-5 w-5" />
        if (type.includes("pdf")) return <FileText className="h-5 w-5" />
        if (type.includes("zip") || type.includes("rar") || type.includes("tar")) return <FileArchive className="h-5 w-5" />
        return <File className="h-5 w-5" />
    }

    const getFileSize = (size: number) => {
        if (size < 1024) return `${size} B`
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
        return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!content && files.length === 0) {
            toast({
                title: "Submission Error",
                description: "Please provide either text content or upload a file.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 95) {
                        clearInterval(interval)
                        return prev
                    }
                    return prev + 5
                })
            }, 200)

            // This would be an API call to your backend
            // const formData = new FormData()
            // formData.append("assignmentId", assignmentId)
            // formData.append("content", content)
            // files.forEach(file => formData.append("files", file))

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setUploadProgress(100)

            toast({
                title: "Success!",
                description: "Your assignment has been submitted successfully.",
            })

            // Reset form
            setTimeout(() => {
                setContent("")
                setFiles([])
                setUploadProgress(0)
                setIsSubmitting(false)
            }, 500)
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your assignment. Please try again.",
                variant: "destructive",
            })
            setIsSubmitting(false)
            setUploadProgress(0)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit Your Assignment</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="text">Text Response</TabsTrigger>
                            <TabsTrigger value="files">File Upload</TabsTrigger>
                        </TabsList>
                        <TabsContent value="text" className="pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">Your Answer</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Type your answer here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={8}
                                    className="resize-y min-h-[150px]"
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="files" className="pt-4">
                            <div className="space-y-4">
                                <div
                                    ref={dropAreaRef}
                                    className="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <h3 className="font-medium text-lg">Drag & Drop Files</h3>
                                        <p className="text-sm text-muted-foreground">
                                            or{" "}
                                            <button
                                                type="button"
                                                className="text-primary hover:underline"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                browse
                                            </button>{" "}
                                            to upload
                                        </p>
                                        <p className="text-xs text-muted-foreground">Supports PDF, Word, Excel, images, and more</p>
                                    </div>
                                </div>

                                {files.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Uploaded Files</Label>
                                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        {getFileIcon(file)}
                                                        <div className="truncate">
                                                            <p className="font-medium text-sm truncate">{file.name}</p>
                                                            <p className="text-xs text-muted-foreground">{getFileSize(file.size)}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFile(index)}
                                                        className="h-7 w-7"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    {isSubmitting && (
                        <div className="w-full mb-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                        </div>
                    )}
                    <Button type="submit" disabled={isSubmitting} className={cn("w-full", isSubmitting && "opacity-80")}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Submit Assignment
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

