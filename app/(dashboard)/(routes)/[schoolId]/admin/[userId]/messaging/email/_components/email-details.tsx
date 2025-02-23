import { format } from "date-fns"
import { ArrowLeft, Paperclip, Star, Trash, Reply, ReplyAll, Forward } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"


interface EmailDetailProps {
    email: Email
    onClose: () => void
    onDelete: (id: string) => void
    onToggleImportant: (id: string) => void
    onReply: (email: Email) => void
    onReplyAll: (email: Email) => void
    onForward: (email: Email) => void
}

export function EmailDetail({
    email,
    onClose,
    onDelete,
    onToggleImportant,
    onReply,
    onReplyAll,
    onForward,
}: EmailDetailProps) {
    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" onClick={onClose}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => onToggleImportant(email.id)}>
                        <Star
                            className={`h-4 w-4 ${email.labels.includes("important") ? "text-yellow-400 fill-yellow-400" : ""}`}
                        />
                    </Button>
                    <Button variant="ghost" onClick={() => onDelete(email.id)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <ScrollArea className="flex-grow p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${email.sender}`} />
                                <AvatarFallback>{email.sender[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-semibold">{email.sender}</h2>
                                <p className="text-sm text-muted-foreground">{format(new Date(email.time), "PPpp")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => onReply(email)}>
                                <Reply className="h-4 w-4 mr-2" />
                                Reply
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => onReplyAll(email)}>
                                <ReplyAll className="h-4 w-4 mr-2" />
                                Reply All
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => onForward(email)}>
                                <Forward className="h-4 w-4 mr-2" />
                                Forward
                            </Button>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{email.subject}</h3>
                    <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: email.message }} />
                    {email.attachments && email.attachments.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2">Attachments</h4>
                            <div className="flex flex-wrap gap-2">
                                {email.attachments.map((attachment, index) => (
                                    <a
                                        key={index}
                                        href={attachment.url}
                                        className="flex items-center p-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                                        download
                                    >
                                        <Paperclip className="h-4 w-4 mr-2" />
                                        {attachment.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {email.labels.map((label) => (
                            <Badge key={label} variant="secondary">
                                {label}
                            </Badge>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

