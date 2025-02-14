"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "support" }[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }])
      setInputMessage("")
      // Simulate a response from support
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message. A support representative will be with you shortly.", sender: "support" },
        ])
      }, 1000)
    }
  }

  if (!isOpen) {
    return (
      <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Live Support
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto mb-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"} max-w-[80%]`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LiveChat

