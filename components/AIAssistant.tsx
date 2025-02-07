"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/moving-border"

export default function AIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the query to your AI backend
    // For demo purposes, we'll just set a mock response
    setResponse("I'm an AI assistant for EduManage Pro. How can I help you with school management today?")
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">AI-Powered Assistant</h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
            <Input
              type="text"
              placeholder="Ask me anything about school management..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Ask</Button>
          </form>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700 p-6 rounded-lg"
            >
              <p>{response}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

