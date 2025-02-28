"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Sparkles } from "lucide-react"

export default function AIWellbeingAssistant() {
    const [userInput, setUserInput] = useState("")
    const [aiResponse, setAiResponse] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, you would send the userInput to your AI model
        // and receive a response. For this example, we'll simulate a response.
        setAiResponse(
            "Based on your input, I recommend focusing on stress management techniques. Try incorporating 10 minutes of mindfulness meditation into your daily routine. Also, ensure you're getting enough sleep - aim for 7-9 hours per night. If you continue to feel overwhelmed, don't hesitate to reach out to a counselor or trusted adult.",
        )
        setUserInput("")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    Wellbeing Assistant
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Describe how you're feeling or ask for wellbeing advice..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" className="">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Get AI Insights
                        </Button>
                    </div>
                </form>
                {aiResponse && (
                    <div className="mt-4 p-4 bg-secondary rounded-lg">
                        <h4 className="font-semibold mb-2">AI Recommendation:</h4>
                        <p>{aiResponse}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

