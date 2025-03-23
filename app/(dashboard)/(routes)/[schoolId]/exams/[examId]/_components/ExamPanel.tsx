"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Camera,
    Clock,
    Eye,
    Fingerprint,
    Flag,
    HelpCircle,
    History,
    Info,
    Lock,
    Mic,
    MonitorSmartphone,
    RotateCcw,
    Save,
    Send,
    ShieldAlert,
    ShieldCheck,
    Video,
    WifiOff,
    Database,
    Loader2,
    FileVideo,
    Layers,
    Bookmark,
    BookmarkCheck,
} from "lucide-react"

// Mock data for the exam questions
const examQuestions = [
    {
        id: 1,
        type: "multiple-choice",
        question: "Which of the following is a primary color?",
        options: ["Green", "Red", "Purple", "Orange"],
        correctAnswer: "Red",
        points: 5,
    },
    {
        id: 2,
        type: "true-false",
        question: "The Earth is the third planet from the Sun.",
        correctAnswer: true,
        points: 2,
    },
    {
        id: 3,
        type: "multiple-select",
        question: "Which of the following are mammals?",
        options: ["Dolphin", "Shark", "Bat", "Eagle"],
        correctAnswers: ["Dolphin", "Bat"],
        points: 5,
    },
    {
        id: 4,
        type: "short-answer",
        question: "What is the capital of France?",
        correctAnswer: "Paris",
        points: 3,
    },
    {
        id: 5,
        type: "essay",
        question: "Explain the process of photosynthesis and its importance to life on Earth.",
        wordLimit: 250,
        points: 10,
    },
    {
        id: 6,
        type: "fill-blanks",
        question: "The process by which plants make their own food using sunlight is called ______.",
        correctAnswer: "photosynthesis",
        points: 3,
    },
    {
        id: 7,
        type: "matching",
        question: "Match the following countries with their capitals:",
        items: [
            { item: "USA", match: "Washington D.C." },
            { item: "Japan", match: "Tokyo" },
            { item: "Australia", match: "Canberra" },
            { item: "Brazil", match: "Brasília" },
        ],
        points: 8,
    },
    {
        id: 8,
        type: "drag-drop",
        question: "Arrange the following events in chronological order:",
        items: ["World War I", "Moon Landing", "Fall of the Berlin Wall", "Industrial Revolution"],
        correctOrder: ["Industrial Revolution", "World War I", "Moon Landing", "Fall of the Berlin Wall"],
        points: 8,
    },
    {
        id: 9,
        type: "hotspot",
        question: "Identify the location of the heart in the human body.",
        imageUrl: "/placeholder.svg?height=400&width=300",
        correctArea: { x: 150, y: 150, radius: 30 },
        points: 5,
    },
    {
        id: 10,
        type: "code-execution",
        question: "Write a function that returns the sum of two numbers.",
        language: "javascript",
        testCases: [
            { input: "sum(2, 3)", expected: 5 },
            { input: "sum(0, 0)", expected: 0 },
            { input: "sum(-1, 1)", expected: 0 },
        ],
        points: 10,
    },
]

// Define the type for session recording data
interface SessionRecording {
    timestamp: number
    type: "navigation" | "answer" | "focus" | "activity" | "security" | "snapshot"
    data: any
}

// Define the type for answer history
interface AnswerHistory {
    questionId: number
    timestamp: number
    value: any
}

// Define the type for exam session
interface ExamSession {
    id: string
    startTime: number
    lastSaved: number
    answers: Record<number, any>
    answerHistory: AnswerHistory[]
    recordings: SessionRecording[]
    securityEvents: {
        timestamp: number
        type: string
        details: string
    }[]
    snapshots: {
        timestamp: number
        imageData?: string
        screenData?: string
    }[]
    timeSpentPerQuestion: Record<number, number>
    focusEvents: {
        timestamp: number
        hasFocus: boolean
        duration?: number
    }[]
    keystrokes: {
        timestamp: number
        questionId: number
        count: number
    }[]
    mouseActivity: {
        timestamp: number
        x: number
        y: number
        type: "move" | "click"
    }[]
}

export default function ExamPage() {
    const router = useRouter()
    const params = useParams()
    const { examId } = params
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, any>>({})
    const [timeRemaining, setTimeRemaining] = useState(3600) // 1 hour in seconds
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [tabSwitchCount, setTabSwitchCount] = useState(0)
    const [showWarning, setShowWarning] = useState(false)
    const [warningMessage, setWarningMessage] = useState("")
    const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [webcamActive, setWebcamActive] = useState(false)
    const [micActive, setMicActive] = useState(false)
    const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([])
    const [securityLevel, setSecurityLevel] = useState<"standard" | "high" | "maximum">("high")
    const [biometricVerified, setBiometricVerified] = useState(false)
    const [networkStatus, setNetworkStatus] = useState<"online" | "offline">("online")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [showBiometricDialog, setShowBiometricDialog] = useState(true)
    const [showSecurityScan, setShowSecurityScan] = useState(false)
    const [securityScanProgress, setSecurityScanProgress] = useState(0)
    const [suspiciousActivity, setSuspiciousActivity] = useState<string[]>([])
    const [mouseMovements, setMouseMovements] = useState<{ x: number; y: number; timestamp: number }[]>([])
    const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false)
    const [fontSize, setFontSize] = useState(16)
    const [highContrast, setHighContrast] = useState(false)
    const [screenReaderMode, setScreenReaderMode] = useState(false)
    const [dragItem, setDragItem] = useState<string | null>(null)
    const [draggedItems, setDraggedItems] = useState<string[]>([])
    const [hotspotCoords, setHotspotCoords] = useState<{ x: number; y: number } | null>(null)
    const [codeValue, setCodeValue] = useState("")
    const [codeResults, setCodeResults] = useState<{ passed: boolean; message: string }[]>([])

    // New state variables for recording and advanced features
    const [isRecording, setIsRecording] = useState(false)
    const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording" | "paused">("inactive")
    const [sessionRecordings, setSessionRecordings] = useState<SessionRecording[]>([])
    const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([])
    const [autoSaveInterval, setAutoSaveInterval] = useState(30) // seconds
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved")
    const [examSession, setExamSession] = useState<ExamSession>({
        id: `exam-${examId}-${Date.now()}`,
        startTime: Date.now(),
        lastSaved: Date.now(),
        answers: {},
        answerHistory: [],
        recordings: [],
        securityEvents: [],
        snapshots: [],
        timeSpentPerQuestion: {},
        focusEvents: [],
        keystrokes: [],
        mouseActivity: [],
    })
    const [showVersionHistory, setShowVersionHistory] = useState(false)
    const [versionHistoryQuestion, setVersionHistoryQuestion] = useState<number | null>(null)
    const [isPlayingBack, setIsPlayingBack] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [showRecordingSettings, setShowRecordingSettings] = useState(false)
    const [recordingQuality, setRecordingQuality] = useState<"low" | "medium" | "high">("medium")
    const [snapshotInterval, setSnapshotInterval] = useState(60) // seconds
    const [lastSnapshotTime, setLastSnapshotTime] = useState(Date.now())
    const [bookmarkedTimestamps, setBookmarkedTimestamps] = useState<number[]>([])
    const [showBookmarks, setShowBookmarks] = useState(false)
    const [timeSpentOnCurrentQuestion, setTimeSpentOnCurrentQuestion] = useState(0)
    const [questionStartTime, setQuestionStartTime] = useState(Date.now())
    const [keystrokeCount, setKeystrokeCount] = useState<Record<number, number>>({})
    const [showExamSummary, setShowExamSummary] = useState(false)
    const [showRecoveryDialog, setShowRecoveryDialog] = useState(false)
    const [recoveryOptions, setRecoveryOptions] = useState<{ id: string; timestamp: number }[]>([])
    const [selectedRecoveryOption, setSelectedRecoveryOption] = useState<string | null>(null)
    const [isRecovering, setIsRecovering] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)
    const examContainerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const screenCanvasRef = useRef<HTMLCanvasElement>(null)
    const dragAreaRef = useRef<HTMLDivElement>(null)
    const hotspotRef = useRef<HTMLImageElement>(null)
    const codeEditorRef = useRef<HTMLTextAreaElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const screenRecorderRef = useRef<MediaRecorder | null>(null)
    const recordedChunksRef = useRef<Blob[]>([])
    const screenRecordedChunksRef = useRef<Blob[]>([])
    const questionTimerRef = useRef<NodeJS.Timeout | null>(null)
    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
    const snapshotTimerRef = useRef<NodeJS.Timeout | null>(null)
    const activityTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Format time remaining as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    // Format date for display
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString()
    }

    // Initialize exam session and check for recovery
    useEffect(() => {
        // Check local storage for existing sessions
        const checkForExistingSessions = () => {
            try {
                const storedSessions = localStorage.getItem(`exam-sessions-${examId}`)
                if (storedSessions) {
                    const sessions = JSON.parse(storedSessions) as { id: string; timestamp: number }[]
                    if (sessions.length > 0) {
                        setRecoveryOptions(sessions)
                        setShowRecoveryDialog(true)
                    }
                }
            } catch (error) {
                console.error("Error checking for existing sessions:", error)
            }
        }

        checkForExistingSessions()

        // Initialize the exam session
        const initSession = () => {
            const newSession: ExamSession = {
                id: `exam-${examId}-${Date.now()}`,
                startTime: Date.now(),
                lastSaved: Date.now(),
                answers: {},
                answerHistory: [],
                recordings: [],
                securityEvents: [],
                snapshots: [],
                timeSpentPerQuestion: {},
                focusEvents: [],
                keystrokes: [],
                mouseActivity: [],
            }

            setExamSession(newSession)

            // Add to local storage session list
            try {
                const storedSessions = localStorage.getItem(`exam-sessions-${examId}`)
                const sessions = storedSessions ? JSON.parse(storedSessions) : []
                sessions.push({ id: newSession.id, timestamp: newSession.startTime })
                localStorage.setItem(`exam-sessions-${examId}`, JSON.stringify(sessions))
            } catch (error) {
                console.error("Error saving session to local storage:", error)
            }

            // Record session start
            addRecording("navigation", { action: "session_start", questionId: currentQuestion })
        }

        if (!showRecoveryDialog) {
            initSession()
        }

        // Start auto-save timer
        startAutoSave()

        // Start snapshot timer
        startSnapshotTimer()

        return () => {
            // Clean up timers
            if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current)
            if (snapshotTimerRef.current) clearInterval(snapshotTimerRef.current)
            if (questionTimerRef.current) clearInterval(questionTimerRef.current)
            if (activityTimerRef.current) clearInterval(activityTimerRef.current)

            // Save session on unmount
            saveSession()
        }
    }, [examId])

    // Handle countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timer)
                    handleSubmitExam()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Track time spent on current question
    useEffect(() => {
        // Reset timer when question changes
        setQuestionStartTime(Date.now())
        setTimeSpentOnCurrentQuestion(0)

        // Record question navigation
        addRecording("navigation", { action: "question_view", questionId: currentQuestion })

        // Start tracking time spent on this question
        if (questionTimerRef.current) {
            clearInterval(questionTimerRef.current)
        }

        questionTimerRef.current = setInterval(() => {
            setTimeSpentOnCurrentQuestion((prev) => prev + 1)

            // Update exam session with time spent
            setExamSession((prev) => {
                const updatedTimeSpent = { ...prev.timeSpentPerQuestion }
                updatedTimeSpent[currentQuestion] = (updatedTimeSpent[currentQuestion] || 0) + 1
                return { ...prev, timeSpentPerQuestion: updatedTimeSpent }
            })
        }, 1000)

        return () => {
            if (questionTimerRef.current) {
                clearInterval(questionTimerRef.current)
            }
        }
    }, [currentQuestion])

    // Handle tab visibility changes (detect if student switches tabs/windows)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitchCount((prev) => prev + 1)
                setWarningMessage("Warning: Tab switching detected. This incident has been recorded.")
                setShowWarning(true)

                // Add to suspicious activity log
                setSuspiciousActivity((prev) => [...prev, `Tab switching detected at ${new Date().toLocaleTimeString()}`])

                // Record security event
                const event = {
                    timestamp: Date.now(),
                    type: "tab_switch",
                    details: `Tab switch detected at ${new Date().toLocaleTimeString()}`,
                }

                setExamSession((prev) => ({
                    ...prev,
                    securityEvents: [...prev.securityEvents, event],
                }))

                addRecording("security", { action: "tab_switch", count: tabSwitchCount + 1 })

                // Record focus event
                setExamSession((prev) => ({
                    ...prev,
                    focusEvents: [...prev.focusEvents, { timestamp: Date.now(), hasFocus: false }],
                }))

                // Auto-hide warning after 5 seconds
                setTimeout(() => {
                    setShowWarning(false)
                }, 5000)

                // If security level is maximum, auto-submit after 3 tab switches
                if (securityLevel === "maximum" && tabSwitchCount >= 2) {
                    setWarningMessage("Multiple tab switches detected. Exam will be submitted automatically.")
                    setTimeout(() => {
                        handleSubmitExam()
                    }, 5000)
                }

                // Take a snapshot when tab is switched
                takeSnapshot()
            } else {
                // Record focus event when returning to tab
                setExamSession((prev) => ({
                    ...prev,
                    focusEvents: [...prev.focusEvents, { timestamp: Date.now(), hasFocus: true }],
                }))

                addRecording("focus", { action: "focus_return", questionId: currentQuestion })
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [tabSwitchCount, securityLevel, currentQuestion])

    // Handle network status changes
    useEffect(() => {
        const handleOnline = () => {
            setNetworkStatus("online")
            // Sync any offline answers
            if (networkStatus === "offline") {
                // Simulate syncing
                setWarningMessage("Reconnected. Syncing your answers...")
                setShowWarning(true)
                setSaveStatus("saving")

                // Record network event
                addRecording("activity", { action: "network_reconnect" })

                // Sync data
                saveSession()

                setTimeout(() => {
                    setShowWarning(false)
                    setSaveStatus("saved")
                }, 3000)
            }
        }

        const handleOffline = () => {
            setNetworkStatus("offline")
            setWarningMessage("Network connection lost. Your answers will be saved locally and synced when reconnected.")
            setShowWarning(true)

            // Record network event
            addRecording("activity", { action: "network_disconnect" })
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [networkStatus])

    // Handle mouse movement tracking for AI behavior analysis
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Only sample every 100ms to avoid too much data
            if (mouseMovements.length === 0 || Date.now() - mouseMovements[mouseMovements.length - 1].timestamp > 100) {
                const newMovement = { x: e.clientX, y: e.clientY, timestamp: Date.now() }
                setMouseMovements((prev) => [...prev, newMovement])

                // Keep only the last 100 movements
                if (mouseMovements.length > 100) {
                    setMouseMovements((prev) => prev.slice(-100))
                }

                // Record in exam session (but less frequently)
                if (mouseMovements.length % 10 === 0) {
                    setExamSession((prev) => ({
                        ...prev,
                        mouseActivity: [
                            ...prev.mouseActivity,
                            {
                                timestamp: Date.now(),
                                x: e.clientX,
                                y: e.clientY,
                                type: "move",
                            },
                        ],
                    }))
                }
            }
        }

        const handleMouseClick = (e: MouseEvent) => {
            // Record mouse clicks
            setExamSession((prev) => ({
                ...prev,
                mouseActivity: [
                    ...prev.mouseActivity,
                    {
                        timestamp: Date.now(),
                        x: e.clientX,
                        y: e.clientY,
                        type: "click",
                    },
                ],
            }))

            addRecording("activity", {
                action: "mouse_click",
                position: { x: e.clientX, y: e.clientY },
                questionId: currentQuestion,
            })
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("click", handleMouseClick)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("click", handleMouseClick)
        }
    }, [mouseMovements, currentQuestion])

    // Handle keystroke tracking
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Update keystroke count for current question
            setKeystrokeCount((prev) => {
                const updatedCount = { ...prev }
                updatedCount[currentQuestion] = (updatedCount[currentQuestion] || 0) + 1
                return updatedCount
            })

            // Record in exam session
            setExamSession((prev) => ({
                ...prev,
                keystrokes: [
                    ...prev.keystrokes,
                    {
                        timestamp: Date.now(),
                        questionId: currentQuestion,
                        count: (keystrokeCount[currentQuestion] || 0) + 1,
                    },
                ],
            }))

            // Only record every 10 keystrokes to reduce data volume
            if ((keystrokeCount[currentQuestion] || 0) % 10 === 0) {
                addRecording("activity", {
                    action: "keystrokes",
                    count: keystrokeCount[currentQuestion] || 0,
                    questionId: currentQuestion,
                })
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentQuestion, keystrokeCount])

    // Handle full screen mode
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                setWarningMessage("Error attempting to enable full-screen mode: " + err.message)
                setShowWarning(true)
            })
            setIsFullScreen(true)

            // Record fullscreen event
            addRecording("activity", { action: "fullscreen_enter" })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullScreen(false)

                // Add warning if security level is high or maximum
                if (securityLevel !== "standard") {
                    setWarningMessage("Warning: Exiting full-screen mode during exam is not recommended.")
                    setShowWarning(true)
                    setSuspiciousActivity((prev) => [...prev, `Exited full-screen mode at ${new Date().toLocaleTimeString()}`])
                }

                // Record fullscreen exit event
                addRecording("activity", { action: "fullscreen_exit" })
            }
        }
    }

    // Handle webcam activation
    const toggleWebcam = async () => {
        try {
            if (!webcamActive) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    setWebcamActive(true)

                    // If security level is maximum, also enable audio
                    if (securityLevel === "maximum" && !micActive) {
                        toggleMicrophone()
                    }

                    // Start recording if enabled
                    if (isRecording) {
                        startMediaRecording(stream)
                    }

                    // Record webcam activation
                    addRecording("activity", { action: "webcam_enabled" })
                }
            } else {
                const stream = videoRef.current?.srcObject as MediaStream
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop())
                    if (videoRef.current) {
                        videoRef.current.srcObject = null
                    }
                    setWebcamActive(false)

                    // Stop recording
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                        mediaRecorderRef.current.stop()
                    }

                    // Record webcam deactivation
                    addRecording("activity", { action: "webcam_disabled" })
                }
            }
        } catch (err) {
            setWarningMessage("Error accessing webcam: " + (err as Error).message)
            setShowWarning(true)
        }
    }

    // Handle microphone activation
    const toggleMicrophone = async () => {
        try {
            if (!micActive) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                if (audioRef.current) {
                    audioRef.current.srcObject = stream
                    setMicActive(true)

                    // Record microphone activation
                    addRecording("activity", { action: "microphone_enabled" })
                }
            } else {
                const stream = audioRef.current?.srcObject as MediaStream
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop())
                    if (audioRef.current) {
                        audioRef.current.srcObject = null
                    }
                    setMicActive(false)

                    // Record microphone deactivation
                    addRecording("activity", { action: "microphone_disabled" })
                }
            }
        } catch (err) {
            setWarningMessage("Error accessing microphone: " + (err as Error).message)
            setShowWarning(true)
        }
    }

    // Start media recording
    const startMediaRecording = (videoStream: MediaStream) => {
        try {
            if (!mediaRecorderRef.current && videoStream) {
                const mediaRecorder = new MediaRecorder(videoStream, { mimeType: "video/webm" })

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        recordedChunksRef.current.push(event.data)
                    }
                }

                mediaRecorder.onstop = () => {
                    // Save recording
                    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" })
                    recordedChunksRef.current = []

                    // In a real app, you would upload this to a server
                    console.log("Recording stopped, blob size:", blob.size)

                    // For demo purposes, we'll just create a URL
                    const url = URL.createObjectURL(blob)
                    console.log("Recording URL:", url)

                    // Record in session
                    addRecording("activity", {
                        action: "recording_saved",
                        size: blob.size,
                        duration: mediaRecorder.videoBitsPerSecond,
                    })
                }

                mediaRecorderRef.current = mediaRecorder
                mediaRecorder.start(10000) // Capture in 10-second chunks
                setRecordingStatus("recording")

                // Record start of recording
                addRecording("activity", { action: "recording_started" })
            }
        } catch (error) {
            console.error("Error starting media recording:", error)
            setWarningMessage("Failed to start recording: " + (error as Error).message)
            setShowWarning(true)
        }
    }

    // Start screen recording
    const startScreenRecording = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    displaySurface: "window",
                    logicalSurface: true,
                    cursor: "always",
                },
            })

            const mediaRecorder = new MediaRecorder(screenStream, { mimeType: "video/webm" })

            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    screenRecordedChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                // Save screen recording
                const blob = new Blob(screenRecordedChunksRef.current, { type: "video/webm" })
                screenRecordedChunksRef.current = []

                // In a real app, you would upload this to a server
                console.log("Screen recording stopped, blob size:", blob.size)

                // For demo purposes, we'll just create a URL
                const url = URL.createObjectURL(blob)
                console.log("Screen recording URL:", url)

                // Record in session
                addRecording("activity", {
                    action: "screen_recording_saved",
                    size: blob.size,
                    duration: mediaRecorder.videoBitsPerSecond,
                })
            }

            screenRecorderRef.current = mediaRecorder
            mediaRecorder.start(10000) // Capture in 10-second chunks

            // Record start of screen recording
            addRecording("activity", { action: "screen_recording_started" })

            // Add event listener for when user stops sharing
            screenStream.getVideoTracks()[0].addEventListener("ended", () => {
                if (screenRecorderRef.current && screenRecorderRef.current.state !== "inactive") {
                    screenRecorderRef.current.stop()
                }
                addRecording("activity", { action: "screen_recording_stopped_by_user" })
            })
        } catch (error) {
            console.error("Error starting screen recording:", error)
            setWarningMessage("Failed to start screen recording: " + (error as Error).message)
            setShowWarning(true)
        }
    }

    // Toggle recording
    const toggleRecording = async () => {
        if (!isRecording) {
            setIsRecording(true)

            // Start webcam recording if webcam is active
            if (webcamActive && videoRef.current?.srcObject) {
                startMediaRecording(videoRef.current.srcObject as MediaStream)
            }

            // Start screen recording
            if (securityLevel === "maximum") {
                await startScreenRecording()
            }

            addRecording("activity", { action: "recording_enabled" })
        } else {
            setIsRecording(false)

            // Stop webcam recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.stop()
            }

            // Stop screen recording
            if (screenRecorderRef.current && screenRecorderRef.current.state !== "inactive") {
                screenRecorderRef.current.stop()
            }

            setRecordingStatus("inactive")
            addRecording("activity", { action: "recording_disabled" })
        }
    }

    // Take a snapshot of the current state
    const takeSnapshot = () => {
        try {
            // Capture webcam if active
            let webcamData = null
            if (webcamActive && videoRef.current && canvasRef.current) {
                const canvas = canvasRef.current
                const context = canvas.getContext("2d")
                if (context) {
                    canvas.width = videoRef.current.videoWidth
                    canvas.height = videoRef.current.videoHeight
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
                    webcamData = canvas.toDataURL("image/jpeg", 0.5) // Lower quality to save space
                }
            }

            // Capture screen if in maximum security mode
            let screenData = null
            if (securityLevel === "maximum" && screenCanvasRef.current) {
                // In a real implementation, this would use the Screen Capture API
                // For demo purposes, we'll just note that it would happen
                screenData = "screen-capture-data-would-be-here"
            }

            // Add snapshot to session
            setExamSession((prev) => ({
                ...prev,
                snapshots: [
                    ...prev.snapshots,
                    {
                        timestamp: Date.now(),
                        imageData: webcamData,
                        screenData: screenData,
                    },
                ],
            }))

            setLastSnapshotTime(Date.now())

            // Record snapshot event
            addRecording("snapshot", {
                action: "snapshot_taken",
                hasWebcam: !!webcamData,
                hasScreen: !!screenData,
            })
        } catch (error) {
            console.error("Error taking snapshot:", error)
        }
    }

    // Start snapshot timer
    const startSnapshotTimer = () => {
        if (snapshotTimerRef.current) {
            clearInterval(snapshotTimerRef.current)
        }

        snapshotTimerRef.current = setInterval(() => {
            takeSnapshot()
        }, snapshotInterval * 1000)
    }

    // Start auto-save timer
    const startAutoSave = () => {
        if (autoSaveTimerRef.current) {
            clearInterval(autoSaveTimerRef.current)
        }

        autoSaveTimerRef.current = setInterval(() => {
            saveSession()
        }, autoSaveInterval * 1000)
    }

    // Save the current session
    const saveSession = () => {
        try {
            setSaveStatus("saving")

            // Update last saved time
            const updatedSession = {
                ...examSession,
                lastSaved: Date.now(),
                answers: answers,
            }

            setExamSession(updatedSession)
            setLastSaved(new Date())

            // In a real app, you would send this to a server
            // For demo purposes, we'll save to localStorage
            localStorage.setItem(`exam-session-${updatedSession.id}`, JSON.stringify(updatedSession))

            // Record save event
            addRecording("activity", {
                action: "session_saved",
                timestamp: updatedSession.lastSaved,
                networkStatus: networkStatus,
            })

            setTimeout(() => {
                setSaveStatus("saved")
            }, 1000)
        } catch (error) {
            console.error("Error saving session:", error)
            setSaveStatus("error")

            // Record error
            addRecording("activity", {
                action: "save_error",
                error: (error as Error).message,
            })
        }
    }

    // Recover a previous session
    const recoverSession = (sessionId: string) => {
        try {
            setIsRecovering(true)

            // Get session from localStorage
            const sessionData = localStorage.getItem(`exam-session-${sessionId}`)
            if (sessionData) {
                const recoveredSession = JSON.parse(sessionData) as ExamSession

                // Restore session state
                setExamSession(recoveredSession)
                setAnswers(recoveredSession.answers)

                // Record recovery event
                addRecording("activity", {
                    action: "session_recovered",
                    originalSessionId: sessionId,
                    timestamp: Date.now(),
                })

                setShowRecoveryDialog(false)
                setIsRecovering(false)
            } else {
                throw new Error("Session data not found")
            }
        } catch (error) {
            console.error("Error recovering session:", error)
            setWarningMessage("Failed to recover session: " + (error as Error).message)
            setShowWarning(true)
            setIsRecovering(false)
        }
    }

    // Add a recording entry
    const addRecording = (type: SessionRecording["type"], data: any) => {
        const recording: SessionRecording = {
            timestamp: Date.now(),
            type,
            data,
        }

        setSessionRecordings((prev) => [...prev, recording])

        // Add to exam session
        setExamSession((prev) => ({
            ...prev,
            recordings: [...prev.recordings, recording],
        }))
    }

    // Add a bookmark at the current time
    const addBookmark = () => {
        const timestamp = Date.now()
        setBookmarkedTimestamps((prev) => [...prev, timestamp])

        // Record bookmark event
        addRecording("activity", {
            action: "bookmark_added",
            timestamp,
            questionId: currentQuestion,
        })
    }

    // Simulate biometric verification
    const verifyBiometric = () => {
        setSecurityScanProgress(0)
        setShowSecurityScan(true)

        // Simulate progress
        const interval = setInterval(() => {
            setSecurityScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setShowSecurityScan(false)
                        setBiometricVerified(true)
                        setShowBiometricDialog(false)

                        // Record verification event
                        addRecording("security", {
                            action: "biometric_verified",
                            timestamp: Date.now(),
                        })
                    }, 500)
                    return 100
                }
                return prev + 5
            })
        }, 200)
    }

    // Handle answer changes
    const handleAnswerChange = (value: any) => {
        const questionId = examQuestions[currentQuestion].id

        // Add to answer history
        const historyEntry: AnswerHistory = {
            questionId,
            timestamp: Date.now(),
            value,
        }

        setAnswerHistory((prev) => [...prev, historyEntry])

        // Update exam session
        setExamSession((prev) => ({
            ...prev,
            answerHistory: [...prev.answerHistory, historyEntry],
        }))

        // Record answer change
        addRecording("answer", {
            action: "answer_updated",
            questionId,
            timestamp: Date.now(),
        })

        setAnswers({
            ...answers,
            [questionId]: value,
        })
    }

    // Handle multiple select answers
    const handleMultiSelectChange = (option: string, checked: boolean) => {
        const questionId = examQuestions[currentQuestion].id
        const currentAnswers = answers[questionId] || []
        let newAnswers

        if (checked) {
            newAnswers = [...currentAnswers, option]
        } else {
            newAnswers = currentAnswers.filter((item: string) => item !== option)
        }

        // Add to answer history
        const historyEntry: AnswerHistory = {
            questionId,
            timestamp: Date.now(),
            value: newAnswers,
        }

        setAnswerHistory((prev) => [...prev, historyEntry])

        // Update exam session
        setExamSession((prev) => ({
            ...prev,
            answerHistory: [...prev.answerHistory, historyEntry],
        }))

        // Record answer change
        addRecording("answer", {
            action: "multi_select_updated",
            questionId,
            option,
            checked,
            timestamp: Date.now(),
        })

        setAnswers({
            ...answers,
            [questionId]: newAnswers,
        })
    }

    // Handle matching answers
    const handleMatchingChange = (item: string, match: string) => {
        const questionId = examQuestions[currentQuestion].id
        const currentMatches = answers[questionId] || {}

        const newValue = {
            ...currentMatches,
            [item]: match,
        }

        // Add to answer history
        const historyEntry: AnswerHistory = {
            questionId,
            timestamp: Date.now(),
            value: newValue,
        }

        setAnswerHistory((prev) => [...prev, historyEntry])

        // Update exam session
        setExamSession((prev) => ({
            ...prev,
            answerHistory: [...prev.answerHistory, historyEntry],
        }))

        // Record answer change
        addRecording("answer", {
            action: "matching_updated",
            questionId,
            item,
            match,
            timestamp: Date.now(),
        })

        setAnswers({
            ...answers,
            [questionId]: newValue,
        })
    }

    // Handle drag start for drag-drop questions
    const handleDragStart = (item: string) => {
        setDragItem(item)

        // Record drag start
        addRecording("activity", {
            action: "drag_started",
            questionId: examQuestions[currentQuestion].id,
            item,
        })
    }

    // Handle drag over
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    // Handle drop for drag-drop questions
    const handleDrop = () => {
        if (dragItem && !draggedItems.includes(dragItem)) {
            const newDraggedItems = [...draggedItems, dragItem]
            setDraggedItems(newDraggedItems)
            setDragItem(null)

            const questionId = examQuestions[currentQuestion].id

            // Add to answer history
            const historyEntry: AnswerHistory = {
                questionId,
                timestamp: Date.now(),
                value: newDraggedItems,
            }

            setAnswerHistory((prev) => [...prev, historyEntry])

            // Update exam session
            setExamSession((prev) => ({
                ...prev,
                answerHistory: [...prev.answerHistory, historyEntry],
            }))

            // Record drop event
            addRecording("activity", {
                action: "item_dropped",
                questionId,
                item: dragItem,
                newOrder: newDraggedItems,
            })

            // Update answer
            setAnswers({
                ...answers,
                [questionId]: newDraggedItems,
            })
        }
    }

    // Handle hotspot click
    const handleHotspotClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (hotspotRef.current) {
            const rect = hotspotRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            setHotspotCoords({ x, y })

            const questionId = examQuestions[currentQuestion].id

            // Add to answer history
            const historyEntry: AnswerHistory = {
                questionId,
                timestamp: Date.now(),
                value: { x, y },
            }

            setAnswerHistory((prev) => [...prev, historyEntry])

            // Update exam session
            setExamSession((prev) => ({
                ...prev,
                answerHistory: [...prev.answerHistory, historyEntry],
            }))

            // Record hotspot click
            addRecording("activity", {
                action: "hotspot_clicked",
                questionId,
                coordinates: { x, y },
            })

            // Update answer
            setAnswers({
                ...answers,
                [questionId]: { x, y },
            })
        }
    }

    // Handle code execution
    const runCode = () => {
        const question = examQuestions[currentQuestion]
        if (question.type === "code-execution") {
            try {
                // Very simple and unsafe eval for demo purposes
                // In a real app, you would use a sandboxed environment
                const code = codeValue
                const functionBody = code.includes("function sum") ? code : `function sum(a, b) { ${code} }`

                // eslint-disable-next-line no-new-func
                const fn = new Function(`
          ${functionBody}
          return sum;
        `)()

                const results = question.testCases.map((testCase) => {
                    const [a, b] = testCase.input.match(/\d+|-\d+/g)!.map(Number)
                    try {
                        const result = fn(a, b)
                        const passed = result === testCase.expected
                        return {
                            passed,
                            message: passed
                                ? `✓ Test passed: ${testCase.input} = ${result}`
                                : `✗ Test failed: ${testCase.input} returned ${result}, expected ${testCase.expected}`,
                        }
                    } catch (error) {
                        return {
                            passed: false,
                            message: `✗ Error: ${(error as Error).message}`,
                        }
                    }
                })

                setCodeResults(results)

                const questionId = question.id

                // Add to answer history
                const historyEntry: AnswerHistory = {
                    questionId,
                    timestamp: Date.now(),
                    value: {
                        code: codeValue,
                        results,
                    },
                }

                setAnswerHistory((prev) => [...prev, historyEntry])

                // Update exam session
                setExamSession((prev) => ({
                    ...prev,
                    answerHistory: [...prev.answerHistory, historyEntry],
                }))

                // Record code execution
                addRecording("activity", {
                    action: "code_executed",
                    questionId,
                    passed: results.every((r) => r.passed),
                    testsPassed: results.filter((r) => r.passed).length,
                    totalTests: results.length,
                })

                // Update answer
                setAnswers({
                    ...answers,
                    [questionId]: {
                        code: codeValue,
                        results,
                    },
                })
            } catch (error) {
                setCodeResults([
                    {
                        passed: false,
                        message: `✗ Error: ${(error as Error).message}`,
                    },
                ])

                // Record error
                addRecording("activity", {
                    action: "code_execution_error",
                    questionId: question.id,
                    error: (error as Error).message,
                })
            }
        }
    }

    // Navigate to next question
    const nextQuestion = () => {
        if (currentQuestion < examQuestions.length - 1) {
            // Save current question time
            const timeSpent = Date.now() - questionStartTime

            // Record navigation
            addRecording("navigation", {
                action: "next_question",
                fromQuestion: currentQuestion,
                toQuestion: currentQuestion + 1,
                timeSpent,
            })

            setCurrentQuestion(currentQuestion + 1)
        }
    }

    // Navigate to previous question
    const prevQuestion = () => {
        if (currentQuestion > 0) {
            // Save current question time
            const timeSpent = Date.now() - questionStartTime

            // Record navigation
            addRecording("navigation", {
                action: "prev_question",
                fromQuestion: currentQuestion,
                toQuestion: currentQuestion - 1,
                timeSpent,
            })

            setCurrentQuestion(currentQuestion - 1)
        }
    }

    // Flag current question for review
    const toggleFlagQuestion = () => {
        const questionId = examQuestions[currentQuestion].id
        if (flaggedQuestions.includes(questionId)) {
            setFlaggedQuestions(flaggedQuestions.filter((id) => id !== questionId))

            // Record unflag
            addRecording("activity", {
                action: "question_unflagged",
                questionId,
            })
        } else {
            setFlaggedQuestions([...flaggedQuestions, questionId])

            // Record flag
            addRecording("activity", {
                action: "question_flagged",
                questionId,
            })
        }
    }

    // Submit exam
    const handleSubmitExam = () => {
        setIsSubmitting(true)

        // Save final session state
        saveSession()

        // Record submission
        addRecording("activity", {
            action: "exam_submitted",
            timestamp: Date.now(),
            answeredQuestions: Object.keys(answers).length,
            totalQuestions: examQuestions.length,
            timeRemaining,
        });

        console.log(examSession, "exams result")

        // Simulate submission process
        // setTimeout(() => {
        //     router.push("/exam/submitted")
        // }, 2000)
    }

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        if (!isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        // Record theme change
        addRecording("activity", {
            action: "theme_changed",
            theme: !isDarkMode ? "dark" : "light",
        })
    }

    // View version history for a question
    const viewVersionHistory = (questionId: number) => {
        setVersionHistoryQuestion(questionId)
        setShowVersionHistory(true)

        // Record history view
        addRecording("activity", {
            action: "history_viewed",
            questionId,
        })
    }

    // Restore a previous version of an answer
    const restoreVersion = (historyEntry: AnswerHistory) => {
        // Update answer with historical version
        setAnswers({
            ...answers,
            [historyEntry.questionId]: historyEntry.value,
        })

        // Record restore action
        addRecording("activity", {
            action: "version_restored",
            questionId: historyEntry.questionId,
            timestamp: historyEntry.timestamp,
        })

        setShowVersionHistory(false)
    }

    // Prevent copy/paste
    useEffect(() => {
        const preventCopyPaste = (e: ClipboardEvent) => {
            e.preventDefault()
            setWarningMessage("Copy and paste actions are not allowed during the exam.")
            setShowWarning(true)
            setSuspiciousActivity((prev) => [...prev, `Copy/paste attempt at ${new Date().toLocaleTimeString()}`])

            // Record security event
            const event = {
                timestamp: Date.now(),
                type: "clipboard_violation",
                details: `${e.type} operation attempted at ${new Date().toLocaleTimeString()}`,
            }

            setExamSession((prev) => ({
                ...prev,
                securityEvents: [...prev.securityEvents, event],
            }))

            addRecording("security", {
                action: "clipboard_violation",
                operation: e.type,
            })
        }

        document.addEventListener("copy", preventCopyPaste)
        document.addEventListener("paste", preventCopyPaste)
        document.addEventListener("cut", preventCopyPaste)

        return () => {
            document.removeEventListener("copy", preventCopyPaste)
            document.removeEventListener("paste", preventCopyPaste)
            document.removeEventListener("cut", preventCopyPaste)
        }
    }, [])

    // Prevent right-click
    useEffect(() => {
        const preventRightClick = (e: MouseEvent) => {
            e.preventDefault()
            setWarningMessage("Right-click is disabled during the exam.")
            setShowWarning(true)
            setSuspiciousActivity((prev) => [...prev, `Right-click attempt at ${new Date().toLocaleTimeString()}`])

            // Record security event
            const event = {
                timestamp: Date.now(),
                type: "right_click",
                details: `Right-click attempted at ${new Date().toLocaleTimeString()}`,
            }

            setExamSession((prev) => ({
                ...prev,
                securityEvents: [...prev.securityEvents, event],
            }))

            addRecording("security", { action: "right_click_attempt" })
        }

        document.addEventListener("contextmenu", preventRightClick)

        return () => {
            document.removeEventListener("contextmenu", preventRightClick)
        }
    }, [])

    // Prevent keyboard shortcuts
    useEffect(() => {
        const preventKeyboardShortcuts = (e: KeyboardEvent) => {
            // Prevent common shortcuts like Ctrl+C, Ctrl+V, Ctrl+P, Alt+Tab, etc.
            if (
                (e.ctrlKey || e.metaKey) &&
                (e.key === "c" ||
                    e.key === "v" ||
                    e.key === "p" ||
                    e.key === "a" ||
                    e.key === "s" ||
                    e.key === "u" ||
                    e.key === "f")
            ) {
                e.preventDefault()
                setWarningMessage(
                    `Keyboard shortcut (${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key.toUpperCase()}) is not allowed during the exam.`,
                )
                setShowWarning(true)
                setSuspiciousActivity((prev) => [
                    ...prev,
                    `Keyboard shortcut attempt (${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key}) at ${new Date().toLocaleTimeString()}`,
                ])

                // Record security event
                const event = {
                    timestamp: Date.now(),
                    type: "keyboard_shortcut",
                    details: `Keyboard shortcut (${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key}) attempted at ${new Date().toLocaleTimeString()}`,
                }

                setExamSession((prev) => ({
                    ...prev,
                    securityEvents: [...prev.securityEvents, event],
                }))

                addRecording("security", {
                    action: "keyboard_shortcut_attempt",
                    key: e.key,
                    modifier: e.ctrlKey ? "ctrl" : "cmd",
                })
            }

            // Prevent Alt+Tab
            if (e.altKey && e.key === "Tab") {
                e.preventDefault()
                setWarningMessage("Alt+Tab is not allowed during the exam.")
                setShowWarning(true)
                setSuspiciousActivity((prev) => [...prev, `Alt+Tab attempt at ${new Date().toLocaleTimeString()}`])

                // Record security event
                addRecording("security", { action: "alt_tab_attempt" })
            }

            // Prevent F12 (Developer Tools)
            if (e.key === "F12") {
                e.preventDefault()
                setWarningMessage("Developer tools are not allowed during the exam.")
                setShowWarning(true)
                setSuspiciousActivity((prev) => [...prev, `Developer tools attempt at ${new Date().toLocaleTimeString()}`])

                // Record security event
                addRecording("security", { action: "dev_tools_attempt" })
            }
        }

        document.addEventListener("keydown", preventKeyboardShortcuts)

        return () => {
            document.removeEventListener("keydown", preventKeyboardShortcuts)
        }
    }, [])

    // Detect browser extensions and developer tools
    useEffect(() => {
        // Check for developer tools
        const checkDevTools = () => {
            const threshold = 160
            const widthThreshold = window.outerWidth - window.innerWidth > threshold
            const heightThreshold = window.outerHeight - window.innerHeight > threshold

            if (widthThreshold || heightThreshold) {
                setWarningMessage("Developer tools detected. This incident has been recorded.")
                setShowWarning(true)
                setSuspiciousActivity((prev) => [...prev, `Developer tools detected at ${new Date().toLocaleTimeString()}`])

                // Record security event
                const event = {
                    timestamp: Date.now(),
                    type: "dev_tools",
                    details: `Developer tools detected at ${new Date().toLocaleTimeString()}`,
                }

                setExamSession((prev) => ({
                    ...prev,
                    securityEvents: [...prev.securityEvents, event],
                }))

                addRecording("security", { action: "dev_tools_detected" })

                // Take a snapshot
                takeSnapshot()

                if (securityLevel === "maximum") {
                    setWarningMessage("Developer tools detected. Exam will be submitted automatically.")
                    setTimeout(() => {
                        handleSubmitExam()
                    }, 5000)
                }
            }
        }

        const interval = setInterval(checkDevTools, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [securityLevel])

    // Render current question based on type
    const renderQuestion = () => {
        const question = examQuestions[currentQuestion]

        switch (question.type) {
            case "multiple-choice":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <RadioGroup value={answers[question.id] || ""} onValueChange={handleAnswerChange} className="space-y-3">
                            {question.options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                                >
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )

            case "true-false":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <RadioGroup
                            value={answers[question.id]?.toString() || ""}
                            onValueChange={(value) => handleAnswerChange(value === "true")}
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value="true" id="true" />
                                <Label htmlFor="true" className="flex-grow cursor-pointer">
                                    True
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value="false" id="false" />
                                <Label htmlFor="false" className="flex-grow cursor-pointer">
                                    False
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                )

            case "multiple-select":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <div className="space-y-3">
                            {question.options.map((option, index) => {
                                const currentAnswers = answers[question.id] || []
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                                    >
                                        <Checkbox
                                            id={`option-${index}`}
                                            checked={currentAnswers.includes(option)}
                                            onCheckedChange={(checked) => handleMultiSelectChange(option, checked as boolean)}
                                        />
                                        <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                                            {option}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>
                        <p className="text-sm text-muted-foreground">Select all that apply.</p>
                    </div>
                )

            case "short-answer":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <Input
                            placeholder="Type your answer here"
                            value={answers[question.id] || ""}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="w-full"
                        />
                        <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm" onClick={() => viewVersionHistory(question.id)}>
                                <History className="mr-2 h-4 w-4" />
                                View Answer History
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                {answerHistory.filter((h) => h.questionId === question.id).length} versions saved
                            </span>
                        </div>
                    </div>
                )

            case "essay":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <Textarea
                            placeholder="Type your answer here"
                            value={answers[question.id] || ""}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="min-h-[200px] w-full"
                        />
                        <div className="flex justify-between text-sm">
                            <span>Word limit: {question.wordLimit}</span>
                            <span>
                                Words:{" "}
                                {answers[question.id]
                                    ? answers[question.id].split(/\s+/).filter((word: string) => word.length > 0).length
                                    : 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm" onClick={() => viewVersionHistory(question.id)}>
                                <History className="mr-2 h-4 w-4" />
                                View Revision History
                            </Button>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => addBookmark()}>
                                    <Bookmark className="h-4 w-4" />
                                    <span className="sr-only">Bookmark</span>
                                </Button>
                                <span className="text-xs text-muted-foreground">
                                    Auto-saved {lastSaved ? `at ${lastSaved.toLocaleTimeString()}` : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                )

            case "fill-blanks":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                            {question.question.split("______").map((part, index, array) => (
                                <span key={index}>
                                    {part}
                                    {index < array.length - 1 && (
                                        <Input
                                            className="mx-2 inline-block w-40"
                                            value={answers[question.id] || ""}
                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                        />
                                    )}
                                </span>
                            ))}
                        </h3>
                        <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm" onClick={() => viewVersionHistory(question.id)}>
                                <History className="mr-2 h-4 w-4" />
                                View Answer History
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving..." : "Error saving"}
                            </span>
                        </div>
                    </div>
                )

            case "matching":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {question.items.map((item, index) => (
                                    <div key={index} className="rounded-md border p-3 bg-muted/30">
                                        {item.item}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {question.items.map((item, index) => {
                                    const currentMatches = answers[question.id] || {}
                                    const options = question.items.map((i) => i.match)

                                    return (
                                        <div key={index} className="rounded-md border p-2">
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={currentMatches[item.item] || ""}
                                                onChange={(e) => handleMatchingChange(item.item, e.target.value)}
                                            >
                                                <option value="">-- Select match --</option>
                                                {options.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Match items from the left column with the right column.</p>
                    </div>
                )

            case "drag-drop":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Available Items</h4>
                                <div className="space-y-2">
                                    {question.items
                                        .filter((item) => !draggedItems.includes(item))
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="rounded-md border p-3 bg-muted/30 cursor-move"
                                                draggable
                                                onDragStart={() => handleDragStart(item)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Your Answer (Drag items here)</h4>
                                <div
                                    ref={dragAreaRef}
                                    className="min-h-[200px] rounded-md border border-dashed p-4 flex flex-col gap-2"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    {draggedItems.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center my-auto">Drag items here to order them</p>
                                    ) : (
                                        draggedItems.map((item, index) => (
                                            <div key={index} className="rounded-md border p-3 bg-primary/10">
                                                {index + 1}. {item}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Drag items from the left to the right in the correct order.</p>
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setDraggedItems([])
                                    handleAnswerChange([])
                                }}
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset Order
                            </Button>
                        </div>
                    </div>
                )

            case "hotspot":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <div className="relative inline-block">
                            <img
                                ref={hotspotRef}
                                src={question.imageUrl || "/placeholder.svg"}
                                alt="Hotspot question"
                                className="rounded-md border cursor-crosshair"
                                onClick={handleHotspotClick}
                            />
                            {hotspotCoords && (
                                <div
                                    className="absolute w-6 h-6 rounded-full border-2 border-primary bg-primary/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{
                                        left: `${hotspotCoords.x}px`,
                                        top: `${hotspotCoords.y}px`,
                                    }}
                                />
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">Click on the image to mark your answer.</p>
                        <div className="flex justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setHotspotCoords(null)
                                    handleAnswerChange(null)
                                }}
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Clear Selection
                            </Button>
                        </div>
                    </div>
                )

            case "code-execution":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">{question.question}</h3>
                        <div className="rounded-md border overflow-hidden">
                            <div className="bg-muted p-2 text-sm flex justify-between items-center">
                                <span>JavaScript</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => viewVersionHistory(question.id)}>
                                        <History className="mr-2 h-4 w-4" />
                                        History
                                    </Button>
                                    <Button size="sm" onClick={runCode}>
                                        Run Code
                                    </Button>
                                </div>
                            </div>
                            <textarea
                                ref={codeEditorRef}
                                className="w-full min-h-[200px] p-4 font-mono text-sm bg-black text-white"
                                value={codeValue}
                                onChange={(e) => setCodeValue(e.target.value)}
                                placeholder="// Write your code here
function sum(a, b) {
  // Your code here
  return a + b;
}"
                            />
                        </div>
                        {codeResults.length > 0 && (
                            <div className="rounded-md border p-4 space-y-2">
                                <h4 className="text-sm font-medium">Test Results</h4>
                                {codeResults.map((result, index) => (
                                    <div key={index} className={`text-sm ${result.passed ? "text-green-600" : "text-red-600"}`}>
                                        {result.message}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )

            default:
                return <div>Question type not supported</div>
        }
    }

    // Get question history for a specific question
    const getQuestionHistory = (questionId: number) => {
        return examSession.answerHistory.filter((h) => h.questionId === questionId)
    }

    return (
        <div
            ref={examContainerRef}
            className={`flex min-h-screen flex-col bg-background ${isDarkMode ? "dark" : ""} ${highContrast ? "contrast-high" : ""}`}
            style={{ fontSize: `${fontSize}px` }}
        >
            {/* Recovery dialog */}
            <Dialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Recover Previous Session</DialogTitle>
                        <DialogDescription>We found previous exam sessions. Would you like to recover one?</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="rounded-md border p-4 space-y-2">
                            <h3 className="text-sm font-medium">Available Sessions</h3>
                            <RadioGroup value={selectedRecoveryOption || ""} onValueChange={setSelectedRecoveryOption}>
                                {recoveryOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer ${selectedRecoveryOption === option.id ? "bg-muted" : ""}`}
                                        onClick={() => setSelectedRecoveryOption(option.id)}
                                    >
                                        <div className="text-sm">Session from {new Date(option.timestamp).toLocaleString()}</div>
                                        <RadioGroupItem value={option.id} />
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRecoveryDialog(false)}>
                            Start New Session
                        </Button>
                        <Button
                            onClick={() => selectedRecoveryOption && recoverSession(selectedRecoveryOption)}
                            disabled={!selectedRecoveryOption || isRecovering}
                        >
                            {isRecovering ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Recovering...
                                </>
                            ) : (
                                "Recover Session"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Biometric verification dialog */}
            <Dialog open={showBiometricDialog} onOpenChange={setShowBiometricDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Biometric Verification Required</DialogTitle>
                        <DialogDescription>
                            For enhanced security, please verify your identity before starting the exam.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                        <div className="rounded-full bg-muted p-6">
                            <Fingerprint className="h-12 w-12 text-primary" />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            This helps prevent impersonation and ensures academic integrity.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button onClick={verifyBiometric} className="w-full">
                            Start Verification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Security scan dialog */}
            <Dialog open={showSecurityScan} onOpenChange={setShowSecurityScan}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Security Scan in Progress</DialogTitle>
                        <DialogDescription>
                            Please wait while we verify your identity and secure your environment.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center py-6 space-y-6">
                        <div className="w-full">
                            <Progress value={securityScanProgress} className="h-2" />
                            <p className="mt-2 text-center text-sm text-muted-foreground">
                                {securityScanProgress < 30
                                    ? "Scanning environment..."
                                    : securityScanProgress < 60
                                        ? "Verifying identity..."
                                        : securityScanProgress < 90
                                            ? "Securing connection..."
                                            : "Finalizing setup..."}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <span>Browser secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <span>No virtual machines</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <span>No screen sharing</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <span>No prohibited software</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Accessibility settings dialog */}
            <Dialog open={showAccessibilitySettings} onOpenChange={setShowAccessibilitySettings}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Accessibility Settings</DialogTitle>
                        <DialogDescription>Customize your exam experience to meet your needs.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="font-size">Font Size</Label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">A</span>
                                <Slider
                                    id="font-size"
                                    min={12}
                                    max={24}
                                    step={1}
                                    value={[fontSize]}
                                    onValueChange={(value) => setFontSize(value[0])}
                                    className="flex-1"
                                />
                                <span className="text-lg">A</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="high-contrast">High Contrast Mode</Label>
                            <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
                            <Switch id="screen-reader" checked={screenReaderMode} onCheckedChange={setScreenReaderMode} />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowAccessibilitySettings(false)}>Save Settings</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Recording settings dialog */}
            <Dialog open={showRecordingSettings} onOpenChange={setShowRecordingSettings}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Recording Settings</DialogTitle>
                        <DialogDescription>Configure how your exam session is recorded and monitored.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="recording-quality">Recording Quality</Label>
                            <div className="flex items-center gap-4">
                                <RadioGroup
                                    value={recordingQuality}
                                    onValueChange={(value: "low" | "medium" | "high") => setRecordingQuality(value)}
                                    className="flex flex-row gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="low" id="quality-low" />
                                        <Label htmlFor="quality-low">Low</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="medium" id="quality-medium" />
                                        <Label htmlFor="quality-medium">Medium</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="high" id="quality-high" />
                                        <Label htmlFor="quality-high">High</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="snapshot-interval">Snapshot Interval (seconds)</Label>
                            <div className="flex items-center gap-4">
                                <Slider
                                    id="snapshot-interval"
                                    min={10}
                                    max={120}
                                    step={10}
                                    value={[snapshotInterval]}
                                    onValueChange={(value) => {
                                        setSnapshotInterval(value[0])
                                        // Restart snapshot timer with new interval
                                        if (snapshotTimerRef.current) {
                                            clearInterval(snapshotTimerRef.current)
                                        }
                                        startSnapshotTimer()
                                    }}
                                    className="flex-1"
                                />
                                <span className="text-sm w-10">{snapshotInterval}s</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="auto-save-interval">Auto-Save Interval (seconds)</Label>
                            <div className="flex items-center gap-4">
                                <Slider
                                    id="auto-save-interval"
                                    min={10}
                                    max={120}
                                    step={10}
                                    value={[autoSaveInterval]}
                                    onValueChange={(value) => {
                                        setAutoSaveInterval(value[0])
                                        // Restart auto-save timer with new interval
                                        if (autoSaveTimerRef.current) {
                                            clearInterval(autoSaveTimerRef.current)
                                        }
                                        startAutoSave()
                                    }}
                                    className="flex-1"
                                />
                                <span className="text-sm w-10">{autoSaveInterval}s</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="webcam-recording">Webcam Recording</Label>
                            <Switch
                                id="webcam-recording"
                                checked={webcamActive}
                                onCheckedChange={(checked) => {
                                    if (checked && !webcamActive) {
                                        toggleWebcam()
                                    } else if (!checked && webcamActive) {
                                        toggleWebcam()
                                    }
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="audio-recording">Audio Recording</Label>
                            <Switch
                                id="audio-recording"
                                checked={micActive}
                                onCheckedChange={(checked) => {
                                    if (checked && !micActive) {
                                        toggleMicrophone()
                                    } else if (!checked && micActive) {
                                        toggleMicrophone()
                                    }
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="screen-recording">Screen Recording</Label>
                            <Switch
                                id="screen-recording"
                                checked={securityLevel === "maximum"}
                                disabled={securityLevel !== "maximum"}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowRecordingSettings(false)}>Save Settings</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Version history dialog */}
            <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Answer History</DialogTitle>
                        <DialogDescription>View and restore previous versions of your answer.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                        {versionHistoryQuestion && getQuestionHistory(versionHistoryQuestion).length > 0 ? (
                            getQuestionHistory(versionHistoryQuestion)
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .map((historyEntry, index) => (
                                    <div key={index} className="rounded-md border p-4 space-y-2 hover:bg-muted/50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                                Version {getQuestionHistory(versionHistoryQuestion).length - index}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(historyEntry.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="text-sm border-l-2 border-primary/50 pl-2">
                                            {typeof historyEntry.value === "string" ? (
                                                historyEntry.value.length > 100 ? (
                                                    historyEntry.value.substring(0, 100) + "..."
                                                ) : (
                                                    historyEntry.value
                                                )
                                            ) : (
                                                <span className="text-muted-foreground italic">Complex answer type</span>
                                            )}
                                        </div>
                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" onClick={() => restoreVersion(historyEntry)}>
                                                <RotateCcw className="mr-2 h-4 w-4" />
                                                Restore This Version
                                            </Button>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="text-center py-4 text-muted-foreground">No history available for this question.</div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowVersionHistory(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Bookmarks dialog */}
            <Dialog open={showBookmarks} onOpenChange={setShowBookmarks}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bookmarked Moments</DialogTitle>
                        <DialogDescription>Jump to bookmarked points in your exam session.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                        {bookmarkedTimestamps.length > 0 ? (
                            bookmarkedTimestamps
                                .sort((a, b) => b - a)
                                .map((timestamp, index) => {
                                    // Find the recording closest to this timestamp
                                    const relatedRecording = sessionRecordings
                                        .filter((r) => Math.abs(r.timestamp - timestamp) < 5000)
                                        .sort((a, b) => Math.abs(a.timestamp - timestamp) - Math.abs(b.timestamp - timestamp))[0]

                                    return (
                                        <div key={index} className="rounded-md border p-4 space-y-2 hover:bg-muted/50">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Bookmark {bookmarkedTimestamps.length - index}</span>
                                                <span className="text-xs text-muted-foreground">{new Date(timestamp).toLocaleString()}</span>
                                            </div>
                                            <div className="text-sm">
                                                {relatedRecording ? (
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">
                                                            {relatedRecording.type === "answer"
                                                                ? "Answer Change"
                                                                : relatedRecording.type === "navigation"
                                                                    ? "Navigation"
                                                                    : relatedRecording.type === "activity"
                                                                        ? "Activity"
                                                                        : relatedRecording.type}
                                                        </Badge>
                                                        <span>
                                                            {relatedRecording.data.questionId !== undefined &&
                                                                `Question ${relatedRecording.data.questionId}`}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground italic">No related activity</span>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        // In a real implementation, this would jump to the bookmarked point
                                                        // For demo purposes, we'll just close the dialog
                                                        setShowBookmarks(false)
                                                    }}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Jump to Bookmark
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })
                        ) : (
                            <div className="text-center py-4 text-muted-foreground">No bookmarks added yet.</div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowBookmarks(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Exam summary dialog */}
            <Dialog open={showExamSummary} onOpenChange={setShowExamSummary}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Exam Progress Summary</DialogTitle>
                        <DialogDescription>Overview of your progress and activity during this exam.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4 max-h-[500px] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-md border p-4">
                                <h3 className="text-sm font-medium mb-2">Completion Status</h3>
                                <Progress value={(Object.keys(answers).length / examQuestions.length) * 100} className="h-2 mb-2" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>
                                        {Object.keys(answers).length} of {examQuestions.length} answered
                                    </span>
                                    <span>{Math.round((Object.keys(answers).length / examQuestions.length) * 100)}% complete</span>
                                </div>
                            </div>

                            <div className="rounded-md border p-4">
                                <h3 className="text-sm font-medium mb-2">Time Statistics</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Time Remaining:</span>
                                        <span className="font-medium">{formatTime(timeRemaining)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Time Elapsed:</span>
                                        <span className="font-medium">{formatTime(3600 - timeRemaining)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Avg. Time per Question:</span>
                                        <span className="font-medium">
                                            {formatTime(Math.round((3600 - timeRemaining) / Math.max(1, Object.keys(answers).length)))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border p-4">
                            <h3 className="text-sm font-medium mb-2">Question Activity</h3>
                            <div className="space-y-3">
                                {examQuestions.map((question, index) => {
                                    const timeSpent = examSession.timeSpentPerQuestion[index] || 0
                                    const hasAnswer = !!answers[question.id]
                                    const isFlagged = flaggedQuestions.includes(question.id)
                                    const historyCount = getQuestionHistory(question.id).length

                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-between p-2 rounded-md ${currentQuestion === index ? "bg-muted" : ""}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">Q{index + 1}:</span>
                                                <span className="text-sm truncate max-w-[200px]">
                                                    {question.question.length > 30
                                                        ? question.question.substring(0, 30) + "..."
                                                        : question.question}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {isFlagged && (
                                                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-600">
                                                        Flagged
                                                    </Badge>
                                                )}
                                                {hasAnswer ? (
                                                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">
                                                        Answered
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-600">
                                                        Unanswered
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-muted-foreground">{formatTime(timeSpent)}</span>
                                                {historyCount > 1 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {historyCount} revisions
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="rounded-md border p-4">
                            <h3 className="text-sm font-medium mb-2">Security Status</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Security Level:</span>
                                    <Badge variant="outline">
                                        {securityLevel === "standard" ? "Standard" : securityLevel === "high" ? "High" : "Maximum"}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Tab Switches:</span>
                                    <Badge variant={tabSwitchCount > 0 ? "destructive" : "outline"}>{tabSwitchCount}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Suspicious Activities:</span>
                                    <Badge variant={suspiciousActivity.length > 0 ? "destructive" : "outline"}>
                                        {suspiciousActivity.length}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Webcam Status:</span>
                                    <Badge variant={webcamActive ? "outline" : "secondary"}>{webcamActive ? "Active" : "Inactive"}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Recording Status:</span>
                                    <Badge variant={recordingStatus === "recording" ? "outline" : "secondary"}>
                                        {recordingStatus === "recording"
                                            ? "Recording"
                                            : recordingStatus === "paused"
                                                ? "Paused"
                                                : "Not Recording"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border p-4">
                            <h3 className="text-sm font-medium mb-2">Session Information</h3>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Session ID:</span>
                                    <span className="font-medium">{examSession.id.substring(0, 16)}...</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Started:</span>
                                    <span className="font-medium">{formatDate(examSession.startTime)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Last Saved:</span>
                                    <span className="font-medium">{formatDate(examSession.lastSaved)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Snapshots Taken:</span>
                                    <span className="font-medium">{examSession.snapshots.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Bookmarks:</span>
                                    <span className="font-medium">{bookmarkedTimestamps.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowExamSummary(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Header with exam info and controls */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm font-medium">Exam: {examId}</h1>
                        <Badge variant="outline" className="text-xs">
                            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
                            {securityLevel === "standard" ? "Standard" : securityLevel === "high" ? "High" : "Maximum"} Security
                        </Badge>
                        {networkStatus === "offline" && (
                            <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500">
                                <WifiOff className="h-3.5 w-3.5 mr-1" />
                                Offline Mode
                            </Badge>
                        )}
                        {recordingStatus === "recording" && (
                            <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500 animate-pulse">
                                <FileVideo className="h-3.5 w-3.5 mr-1" />
                                Recording
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className={`text-sm font-medium ${timeRemaining < 300 ? "text-destructive animate-pulse" : ""}`}>
                                {formatTime(timeRemaining)}
                            </span>
                        </div>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleFullScreen}
                                        className={isFullScreen ? "bg-primary/10" : ""}
                                    >
                                        <Lock className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isFullScreen ? "Exit" : "Enter"} full screen mode</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleWebcam}
                                        className={webcamActive ? "bg-primary/10" : ""}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{webcamActive ? "Disable" : "Enable"} webcam monitoring</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleMicrophone}
                                        className={micActive ? "bg-primary/10" : ""}
                                    >
                                        <Mic className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{micActive ? "Disable" : "Enable"} audio monitoring</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleRecording}
                                        className={isRecording ? "bg-red-500/10 text-red-500" : ""}
                                    >
                                        <FileVideo className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isRecording ? "Stop" : "Start"} recording</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => setShowRecordingSettings(true)}>
                                        <Layers className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Recording settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={() => setShowAccessibilitySettings(true)}>
                                        <MonitorSmartphone className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Accessibility settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button
                            onClick={() => setShowConfirmSubmit(true)}
                            disabled={isSubmitting}
                            className={isSubmitting ? "animate-pulse" : ""}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Exam"}
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main exam content */}
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-6">
                {/* Sidebar with question navigation */}
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    <div className="h-full py-6 pr-6 lg:py-8 overflow-y-auto">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Exam Progress</h3>
                                <Progress value={(Object.keys(answers).length / examQuestions.length) * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {Object.keys(answers).length}/{examQuestions.length} questions answered
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Question Navigation</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {examQuestions.map((q, index) => (
                                        <Button
                                            key={q.id}
                                            variant={currentQuestion === index ? "default" : answers[q.id] ? "outline" : "ghost"}
                                            size="icon"
                                            className={`h-8 w-8 ${flaggedQuestions.includes(q.id) ? "border-yellow-500 border-2" : ""}`}
                                            onClick={() => setCurrentQuestion(index)}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                                    <span className="text-xs">Current Question</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full border"></div>
                                    <span className="text-xs">Unanswered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-muted"></div>
                                    <span className="text-xs">Answered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full border-2 border-yellow-500"></div>
                                    <span className="text-xs">Flagged for Review</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 items-center">
                                <Button variant="outline" size="sm" onClick={() => setShowExamSummary(true)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Exam Summary
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowBookmarks(true)}
                                    disabled={bookmarkedTimestamps.length === 0}
                                >
                                    <BookmarkCheck className="mr-2 h-4 w-4" />
                                    Bookmarks
                                </Button>
                            </div>

                            {webcamActive && (
                                <div className="mt-4 border rounded-md overflow-hidden">
                                    <video ref={videoRef} autoPlay muted className="w-full h-auto" />
                                    <div className="bg-muted p-2 text-center text-xs">
                                        <div className="flex items-center justify-center gap-1">
                                            <Video className="h-3 w-3 text-red-500" />
                                            <span>Webcam Monitoring Active</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {micActive && (
                                <div className="mt-4 border rounded-md overflow-hidden">
                                    <audio ref={audioRef} className="hidden" />
                                    <div className="p-4 flex justify-center">
                                        <div className="flex items-center justify-center size-16 rounded-full bg-muted">
                                            <Mic className="h-6 w-6 text-red-500" />
                                        </div>
                                    </div>
                                    <div className="bg-muted p-2 text-center text-xs">
                                        <div className="flex items-center justify-center gap-1">
                                            <span>Audio Monitoring Active</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tabSwitchCount > 0 && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>Tab switching detected: {tabSwitchCount} times</AlertDescription>
                                </Alert>
                            )}

                            {suspiciousActivity.length > 0 && securityLevel === "maximum" && (
                                <div className="mt-4 border rounded-md overflow-hidden">
                                    <div className="bg-destructive/10 p-2">
                                        <h4 className="text-xs font-medium text-destructive flex items-center">
                                            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
                                            Suspicious Activity Log
                                        </h4>
                                    </div>
                                    <div className="p-2 max-h-32 overflow-y-auto">
                                        <ul className="text-xs space-y-1">
                                            {suspiciousActivity.map((activity, index) => (
                                                <li key={index} className="text-muted-foreground">
                                                    • {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 border rounded-md overflow-hidden">
                                <div className="bg-muted p-2">
                                    <h4 className="text-xs font-medium flex items-center">
                                        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                                        Security Status
                                    </h4>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Biometric Verification</span>
                                        <Badge variant={biometricVerified ? "outline" : "destructive"} className="text-[10px]">
                                            {biometricVerified ? "Verified" : "Required"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Full Screen Mode</span>
                                        <Badge variant={isFullScreen ? "outline" : "destructive"} className="text-[10px]">
                                            {isFullScreen ? "Active" : "Required"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Proctoring</span>
                                        <Badge
                                            variant={webcamActive ? "outline" : securityLevel === "maximum" ? "destructive" : "outline"}
                                            className="text-[10px]"
                                        >
                                            {webcamActive ? "Active" : securityLevel === "maximum" ? "Required" : "Optional"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Network Status</span>
                                        <Badge variant={networkStatus === "online" ? "outline" : "secondary"} className="text-[10px]">
                                            {networkStatus === "online" ? "Online" : "Offline"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Session Recording</span>
                                        <Badge variant={recordingStatus === "recording" ? "outline" : "secondary"} className="text-[10px]">
                                            {recordingStatus === "recording" ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 border rounded-md overflow-hidden">
                                <div className="bg-muted p-2">
                                    <h4 className="text-xs font-medium flex items-center">
                                        <Database className="h-3.5 w-3.5 mr-1" />
                                        Auto-Save Status
                                    </h4>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Last Saved</span>
                                        <span className="font-medium">{lastSaved ? lastSaved.toLocaleTimeString() : "Never"}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Save Interval</span>
                                        <span>{autoSaveInterval} seconds</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Status</span>
                                        <Badge
                                            variant={
                                                saveStatus === "saved" ? "outline" : saveStatus === "saving" ? "secondary" : "destructive"
                                            }
                                            className="text-[10px]"
                                        >
                                            {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving..." : "Error"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span>Version History</span>
                                        <span>{answerHistory.length} versions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main question area */}
                <main className="w-full space-y-6">
                    {showWarning && (
                        <Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-5">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{warningMessage}</AlertDescription>
                        </Alert>
                    )}

                    <Card className="border-2 transition-all duration-300 hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        Question {currentQuestion + 1} of {examQuestions.length}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {examQuestions[currentQuestion].type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            ({examQuestions[currentQuestion].points} points)
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatTime(timeSpentOnCurrentQuestion)}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={toggleFlagQuestion}
                                        className={flaggedQuestions.includes(examQuestions[currentQuestion].id) ? "text-red-600" : ""}
                                    >
                                        <Flag className="mr-2 h-4 w-4" />
                                        {flaggedQuestions.includes(examQuestions[currentQuestion].id) ? "Unflag" : "Flag"}
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={addBookmark}>
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        Bookmark
                                    </Button>
                                </div>
                            </div>

                            {renderQuestion()}

                            <div className="flex justify-between mt-6">
                                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Previous
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => saveSession()}>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Progress
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewVersionHistory(examQuestions[currentQuestion].id)}
                                    >
                                        <History className="mr-2 h-4 w-4" />
                                        History
                                    </Button>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={nextQuestion}
                                    disabled={currentQuestion === examQuestions.length - 1}
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                {saveStatus === "saved"
                                    ? `Last saved at ${lastSaved?.toLocaleTimeString() || "unknown"}`
                                    : saveStatus === "saving"
                                        ? "Saving..."
                                        : "Error saving"}
                            </span>
                        </div>
                        <Button onClick={() => setShowConfirmSubmit(true)} disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Exam"}
                        </Button>
                    </div>
                </main>
            </div>

            {/* Confirmation dialog for exam submission */}
            <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit Exam</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to submit your exam? You won't be able to make changes after submission.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="rounded-md bg-muted p-4">
                            <div className="flex items-center justify-between text-sm">
                                <span>Total Questions:</span>
                                <span className="font-medium">{examQuestions.length}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Answered Questions:</span>
                                <span className="font-medium">{Object.keys(answers).length}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Unanswered Questions:</span>
                                <span className="font-medium">{examQuestions.length - Object.keys(answers).length}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Flagged Questions:</span>
                                <span className="font-medium">{flaggedQuestions.length}</span>
                            </div>
                        </div>

                        {flaggedQuestions.length > 0 && (
                            <Alert>
                                <HelpCircle className="h-4 w-4" />
                                <AlertDescription>You have {flaggedQuestions.length} question(s) flagged for review.</AlertDescription>
                            </Alert>
                        )}

                        {examQuestions.length - Object.keys(answers).length > 0 && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    You have {examQuestions.length - Object.keys(answers).length} unanswered question(s).
                                </AlertDescription>
                            </Alert>
                        )}

                        {suspiciousActivity.length > 0 && (
                            <Alert variant="destructive">
                                <ShieldAlert className="h-4 w-4" />
                                <AlertDescription>
                                    {suspiciousActivity.length} suspicious activities were detected during this exam.
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="rounded-md border p-4">
                            <h4 className="text-sm font-medium mb-2">Submission Verification</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                By submitting this exam, you confirm that all work is your own and completed according to the exam
                                rules.
                            </p>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="confirm-submission" />
                                <Label htmlFor="confirm-submission">
                                    I confirm this is my own work and I have followed all exam rules
                                </Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                            Return to Exam
                        </Button>
                        <Button onClick={handleSubmitExam} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Confirm Submission
                                    <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hidden elements for security and monitoring */}
            <canvas ref={canvasRef} className="hidden" width="300" height="150" />
            <canvas ref={screenCanvasRef} className="hidden" width="800" height="600" />
        </div>
    )
}

