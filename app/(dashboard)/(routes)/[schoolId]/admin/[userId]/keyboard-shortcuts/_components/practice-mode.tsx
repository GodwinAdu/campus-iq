"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Clock, Keyboard, RotateCcw, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface PracticeModeProps {
  shortcuts: Array<{
    name: string
    keys: string[]
    description: string
  }>
  onActiveKeysChange: (keys: string[]) => void
}

export function PracticeMode({ shortcuts, onActiveKeysChange }: PracticeModeProps) {
  const { toast } = useToast()
  const [currentShortcut, setCurrentShortcut] = useState<(typeof shortcuts)[0] | null>(null)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds
  const [isGameActive, setIsGameActive] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Start the game
  const startGame = () => {
    setScore(0)
    setTotalAttempts(0)
    setTimeLeft(60)
    setIsGameActive(true)
    setPressedKeys(new Set())
    pickRandomShortcut()
  }

  // Pick a random shortcut
  const pickRandomShortcut = () => {
    const randomIndex = Math.floor(Math.random() * shortcuts.length)
    const shortcut = shortcuts[randomIndex]
    setCurrentShortcut(shortcut)
    onActiveKeysChange([])
    setIsCorrect(null)
  }

  // Check if the pressed keys match the current shortcut
  const checkShortcut = () => {
    if (!currentShortcut) return

    const requiredKeys = new Set(currentShortcut.keys.map((key) => key.toLowerCase()))
    const pressedKeysLower = new Set([...pressedKeys].map((key) => key.toLowerCase()))

    // Check if all required keys are pressed and no extra keys are pressed
    const allRequiredKeysPressed = [...requiredKeys].every((key) => pressedKeysLower.has(key))
    const noExtraKeysPressed = [...pressedKeysLower].every((key) => requiredKeys.has(key))
    const isMatch = allRequiredKeysPressed && noExtraKeysPressed && requiredKeys.size === pressedKeysLower.size

    setTotalAttempts((prev) => prev + 1)

    if (isMatch) {
      setScore((prev) => prev + 1)
      setIsCorrect(true)
      toast({
        title: "Correct!",
        description: `You pressed the right keys for ${currentShortcut.name}`,
        duration: 1500,
      })
      setTimeout(() => {
        pickRandomShortcut()
      }, 1000)
    } else {
      setIsCorrect(false)
      toast({
        title: "Incorrect",
        description: `Try again. The shortcut for ${currentShortcut.name} is ${currentShortcut.keys.join(" + ")}`,
        duration: 2000,
        variant: "destructive",
      })
    }
  }

  // Listen for key presses
  useEffect(() => {
    if (!isGameActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()

      // Normalize key names
      let key = e.key
      if (key === " ") key = "Space"
      if (key === "Control") key = "Ctrl"
      if (key === "Meta") key = "Win"
      if (key === "Escape") key = "Esc"

      setPressedKeys((prev) => {
        const newKeys = new Set(prev)
        newKeys.add(key)
        return newKeys
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      // Normalize key names
      let key = e.key
      if (key === " ") key = "Space"
      if (key === "Control") key = "Ctrl"
      if (key === "Meta") key = "Win"
      if (key === "Escape") key = "Esc"

      setPressedKeys((prev) => {
        const newKeys = new Set(prev)
        newKeys.delete(key)
        return newKeys
      })

      // If all keys are released, check the shortcut
      if (pressedKeys.size > 0 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        checkShortcut()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isGameActive, pressedKeys, currentShortcut])

  // Update the keyboard visualization
  useEffect(() => {
    if (isGameActive && currentShortcut) {
      onActiveKeysChange([...pressedKeys])
    }
  }, [pressedKeys, isGameActive, currentShortcut, onActiveKeysChange])

  // Timer countdown
  useEffect(() => {
    if (!isGameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameActive])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Practice Mode</CardTitle>
            <CardDescription>Test your knowledge of keyboard shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            {isGameActive ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{timeLeft} seconds left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Score: {score}/{totalAttempts}
                    </span>
                  </div>
                </div>
                <Progress value={(timeLeft / 60) * 100} className="h-2" />

                {currentShortcut && (
                  <motion.div
                    key={currentShortcut.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border p-4 text-center"
                  >
                    <h3 className="text-lg font-medium">{currentShortcut.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{currentShortcut.description}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {isCorrect === true && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
                        >
                          <Check className="h-5 w-5" />
                        </motion.div>
                      )}
                      {isCorrect === false && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                <div className="text-center text-sm text-muted-foreground">
                  Press the keyboard shortcut for the action above
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <Keyboard className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">Ready to test your skills?</h3>
                <p className="text-center text-sm text-muted-foreground">
                  You'll have 60 seconds to complete as many shortcuts as you can.
                </p>
                {timeLeft === 0 && (
                  <div className="mt-4 rounded-lg border bg-muted p-4 text-center">
                    <h4 className="font-medium">Time's up!</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You got {score} out of {totalAttempts} shortcuts correct.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!isGameActive && (
              <Button onClick={startGame} className="w-full">
                {timeLeft === 0 ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                  </>
                ) : (
                  "Start Practice"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>How to Play</CardTitle>
            <CardDescription>Instructions for practice mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Start the timer</h3>
              <p className="text-sm text-muted-foreground">
                Click the "Start Practice" button to begin. You'll have 60 seconds to complete as many shortcuts as
                possible.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. Press the correct keys</h3>
              <p className="text-sm text-muted-foreground">
                For each shortcut shown, press the correct combination of keys on your keyboard.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">3. Score points</h3>
              <p className="text-sm text-muted-foreground">
                You'll earn a point for each correct shortcut. Try to get as many as you can before time runs out!
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tips</h3>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                <li>Release all keys after each attempt</li>
                <li>The order of keys doesn't matter</li>
                <li>Focus on accuracy rather than speed</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
