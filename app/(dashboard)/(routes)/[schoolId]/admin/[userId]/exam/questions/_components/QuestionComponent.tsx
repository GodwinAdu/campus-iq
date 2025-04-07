"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
    BookOpen,
    Search,
    Plus,
    Filter,
    Download,
    Upload,
    MoreHorizontal,
    Edit,
    Trash2,
    Copy,
    Tag,
    FileText,
    CheckCircle2,
    BarChart2,
    Users,
    Layers,
    Settings,
    ChevronRight,
    X,
    Eye,
    Shuffle,
    FileUp,
    FileDown,
    Zap,
    Briefcase,
    Lightbulb,
    Sparkles,
    Loader2,
    AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ClassSelection from "@/components/commons/ClassSelection"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { fetchSubjectByClassIdForQuestionBank } from "@/lib/actions/subject.actions"
import { fetchQuestionBankBySubjectIdAndClassId } from "@/lib/actions/questions-bank.actions"
import { BankQuestionForm } from "./BankQuestionForm"

// Types
interface Course {
    id: string
    name: string
    code: string
    department: string
    questionBanks: number
    totalQuestions: number
    lastUpdated: string
    collaborators: Collaborator[]
}

interface QuestionBank {
    id: string
    name: string
    courseId: string
    description: string
    questionCount: number
    categories: string[]
    difficulty: "easy" | "medium" | "hard" | "mixed"
    lastUpdated: string
    status: "draft" | "published" | "archived"
    shared: boolean
    tags: string[]
    createdBy: string
    usageCount: number
}

interface Question {
    id: string
    type:
    | "multiple-choice"
    | "true-false"
    | "essay"
    | "short-answer"
    | "matching"
    | "fill-blanks"
    | "drag-drop"
    | "hotspot"
    | "code-execution"
    text: string
    difficulty: "easy" | "medium" | "hard"
    points: number
    estimatedTime: number // in seconds
    categories: string[]
    tags: string[]
    options?: string[]
    correctAnswer?: any
    correctAnswers?: string[]
    explanation?: string
    hints?: string[]
    attachments?: string[]
    usageCount: number
    successRate?: number
    lastUsed?: string
    createdAt: string
    updatedAt: string
    bankId: string
}

interface Collaborator {
    id: string
    name: string
    email: string
    role: "owner" | "editor" | "viewer"
    avatar: string
}

interface Category {
    id: string
    name: string
    count: number
}

interface TagType {
    id: string
    name: string
    count: number
}


const mockQuestionBanks: QuestionBank[] = [
    {
        id: "qb1",
        name: "Midterm Exam Questions",
        courseId: "c1",
        description: "Questions for the CS101 midterm exam covering basic programming concepts",
        questionCount: 40,
        categories: ["Programming Basics", "Algorithms", "Data Structures"],
        difficulty: "medium",
        lastUpdated: "2025-03-15T14:30:00Z",
        status: "published",
        shared: true,
        tags: ["midterm", "programming", "algorithms"],
        createdBy: "John Doe",
        usageCount: 3,
    },
    {
        id: "qb2",
        name: "Final Exam Questions",
        courseId: "c1",
        description: "Comprehensive question set for the CS101 final exam",
        questionCount: 50,
        categories: ["Programming Basics", "Algorithms", "Data Structures", "Object-Oriented Programming"],
        difficulty: "hard",
        lastUpdated: "2025-03-14T10:15:00Z",
        status: "draft",
        shared: false,
        tags: ["final", "comprehensive", "programming"],
        createdBy: "John Doe",
        usageCount: 0,
    },
    {
        id: "qb3",
        name: "Weekly Quiz Questions",
        courseId: "c1",
        description: "Collection of questions for weekly quizzes",
        questionCount: 30,
        categories: ["Programming Basics", "Algorithms"],
        difficulty: "easy",
        lastUpdated: "2025-03-10T09:45:00Z",
        status: "published",
        shared: true,
        tags: ["quiz", "weekly", "basic"],
        createdBy: "Jane Smith",
        usageCount: 8,
    },
    {
        id: "qb4",
        name: "Practice Problems",
        courseId: "c2",
        description: "Practice problems for Mathematics 202",
        questionCount: 45,
        categories: ["Calculus", "Linear Algebra", "Differential Equations"],
        difficulty: "mixed",
        lastUpdated: "2025-03-08T16:20:00Z",
        status: "published",
        shared: true,
        tags: ["practice", "math", "calculus"],
        createdBy: "John Doe",
        usageCount: 12,
    },
    {
        id: "qb5",
        name: "Advanced Topics",
        courseId: "c1",
        description: "Questions covering advanced programming topics",
        questionCount: 25,
        categories: ["Advanced Algorithms", "System Design", "Optimization"],
        difficulty: "hard",
        lastUpdated: "2025-03-05T11:30:00Z",
        status: "archived",
        shared: false,
        tags: ["advanced", "algorithms", "optimization"],
        createdBy: "John Doe",
        usageCount: 1,
    },
]

const mockQuestions: Question[] = [
    {
        id: "q1",
        type: "multiple-choice",
        text: "Which of the following is NOT a primitive data type in JavaScript?",
        difficulty: "easy",
        points: 5,
        estimatedTime: 60,
        categories: ["Programming Basics"],
        tags: ["javascript", "data types"],
        options: ["String", "Number", "Boolean", "Array"],
        correctAnswer: "Array",
        explanation: "Array is a complex data type (object) in JavaScript, not a primitive type.",
        hints: ["Primitive types are the most basic data types", "Think about which one can contain multiple values"],
        usageCount: 5,
        successRate: 78,
        lastUsed: "2025-02-20T10:30:00Z",
        createdAt: "2025-01-15T09:00:00Z",
        updatedAt: "2025-01-15T09:00:00Z",
        bankId: "qb1",
    },
    {
        id: "q2",
        type: "true-false",
        text: "In JavaScript, the '===' operator compares both value and type.",
        difficulty: "easy",
        points: 2,
        estimatedTime: 30,
        categories: ["Programming Basics"],
        tags: ["javascript", "operators"],
        correctAnswer: true,
        explanation: "The strict equality operator (===) checks both value and type without performing type conversion.",
        usageCount: 8,
        successRate: 92,
        lastUsed: "2025-02-22T14:15:00Z",
        createdAt: "2025-01-16T11:30:00Z",
        updatedAt: "2025-01-16T11:30:00Z",
        bankId: "qb1",
    },
    {
        id: "q3",
        type: "essay",
        text: "Explain the concept of recursion and provide an example of a recursive function to calculate factorial.",
        difficulty: "medium",
        points: 10,
        estimatedTime: 600,
        categories: ["Algorithms"],
        tags: ["recursion", "algorithms", "functions"],
        usageCount: 3,
        successRate: 65,
        lastUsed: "2025-02-18T09:45:00Z",
        createdAt: "2025-01-18T13:20:00Z",
        updatedAt: "2025-01-18T13:20:00Z",
        bankId: "qb1",
    },
    {
        id: "q4",
        type: "code-execution",
        text: "Write a function that checks if a string is a palindrome (reads the same forward and backward).",
        difficulty: "medium",
        points: 8,
        estimatedTime: 300,
        categories: ["Algorithms", "Programming Basics"],
        tags: ["strings", "algorithms"],
        usageCount: 4,
        successRate: 70,
        lastUsed: "2025-02-25T11:00:00Z",
        createdAt: "2025-01-20T10:15:00Z",
        updatedAt: "2025-01-20T10:15:00Z",
        bankId: "qb1",
    },
    {
        id: "q5",
        type: "multiple-choice",
        text: "Which data structure would be most efficient for implementing a priority queue?",
        difficulty: "hard",
        points: 5,
        estimatedTime: 90,
        categories: ["Data Structures"],
        tags: ["data structures", "algorithms", "efficiency"],
        options: ["Array", "Linked List", "Heap", "Stack"],
        correctAnswer: "Heap",
        explanation: "A heap provides O(log n) insertion and O(1) access to the highest/lowest priority element.",
        usageCount: 2,
        successRate: 45,
        lastUsed: "2025-02-15T15:30:00Z",
        createdAt: "2025-01-22T14:45:00Z",
        updatedAt: "2025-01-22T14:45:00Z",
        bankId: "qb1",
    },
    {
        id: "q6",
        type: "matching",
        text: "Match each algorithm with its average time complexity:",
        difficulty: "medium",
        points: 8,
        estimatedTime: 180,
        categories: ["Algorithms"],
        tags: ["algorithms", "time complexity"],
        options: [
            { item: "Bubble Sort", match: "O(n²)" },
            { item: "Merge Sort", match: "O(n log n)" },
            { item: "Binary Search", match: "O(log n)" },
            { item: "Linear Search", match: "O(n)" },
        ],
        usageCount: 3,
        successRate: 68,
        lastUsed: "2025-02-28T13:15:00Z",
        createdAt: "2025-01-25T09:30:00Z",
        updatedAt: "2025-01-25T09:30:00Z",
        bankId: "qb1",
    },
    {
        id: "q7",
        type: "fill-blanks",
        text: "In JavaScript, the ______ method is used to add elements to the end of an array, while the ______ method adds elements to the beginning.",
        difficulty: "easy",
        points: 4,
        estimatedTime: 45,
        categories: ["Programming Basics"],
        tags: ["javascript", "arrays"],
        correctAnswer: ["push", "unshift"],
        usageCount: 6,
        successRate: 85,
        lastUsed: "2025-03-01T10:00:00Z",
        createdAt: "2025-01-28T11:15:00Z",
        updatedAt: "2025-01-28T11:15:00Z",
        bankId: "qb1",
    },
]

const mockCategories: Category[] = [
    { id: "cat1", name: "Programming Basics", count: 35 },
    { id: "cat2", name: "Algorithms", count: 28 },
    { id: "cat3", name: "Data Structures", count: 22 },
    { id: "cat4", name: "Object-Oriented Programming", count: 15 },
    { id: "cat5", name: "Advanced Algorithms", count: 10 },
    { id: "cat6", name: "System Design", count: 8 },
    { id: "cat7", name: "Optimization", count: 7 },
    { id: "cat8", name: "Web Development", count: 12 },
    { id: "cat9", name: "Database Systems", count: 9 },
    { id: "cat10", name: "Computer Networks", count: 6 },
]

const mockTags: TagType[] = [
    { id: "tag1", name: "javascript", count: 25 },
    { id: "tag2", name: "algorithms", count: 30 },
    { id: "tag3", name: "data structures", count: 22 },
    { id: "tag4", name: "programming", count: 40 },
    { id: "tag5", name: "midterm", count: 15 },
    { id: "tag6", name: "final", count: 18 },
    { id: "tag7", name: "quiz", count: 20 },
    { id: "tag8", name: "practice", count: 35 },
    { id: "tag9", name: "advanced", count: 12 },
    { id: "tag10", name: "basic", count: 28 },
]

// Main component
export default function QuestionBanksPage({ classes }: { classes: IClass[] }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("courses")
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedBank, setSelectedBank] = useState<QuestionBank | null>(null)
    const [questions, setQuestions] = useState<Question[]>(mockQuestions)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterDifficulty, setFilterDifficulty] = useState<string[]>([])
    const [filterCategories, setFilterCategories] = useState<string[]>([])
    const [filterTags, setFilterTags] = useState<string[]>([])
    const [showCreateBankDialog, setShowCreateBankDialog] = useState(false)
    const [showCreateQuestionDialog, setShowCreateQuestionDialog] = useState(false)
    const [showImportDialog, setShowImportDialog] = useState(false)
    const [showExportDialog, setShowExportDialog] = useState(false)
    const [showShareDialog, setShowShareDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false)
    const [newBankName, setNewBankName] = useState("")
    const [newBankDescription, setNewBankDescription] = useState("")
    const [newBankCourse, setNewBankCourse] = useState("")
    const [newQuestionType, setNewQuestionType] = useState<Question["type"]>("multiple-choice")
    const [newQuestionText, setNewQuestionText] = useState("")
    const [newQuestionDifficulty, setNewQuestionDifficulty] = useState<Question["difficulty"]>("medium")
    const [newQuestionPoints, setNewQuestionPoints] = useState(5)
    const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>(["", "", "", ""])
    const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] = useState<any>("")
    const [newQuestionExplanation, setNewQuestionExplanation] = useState("")
    const [newQuestionCategories, setNewQuestionCategories] = useState<string[]>([])
    const [newQuestionTags, setNewQuestionTags] = useState<string[]>([])
    const [isCreatingBank, setIsCreatingBank] = useState(false)
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [isSharing, setIsSharing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [bulkSelectedQuestions, setBulkSelectedQuestions] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState<"name" | "updated" | "questions" | "difficulty">("updated")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [isAIGenerating, setIsAIGenerating] = useState(false)
    const [aiPrompt, setAiPrompt] = useState("")
    const [showAIDialog, setShowAIDialog] = useState(false)
    const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<Question[]>([])
    const [selectedClass, setSelectedClass] = useState(classes[0]?._id);
    const [subjects, setSubjects] = useState([]);
    const [questionBanks, setQuestionBanks] = useState([]);

    // Add these new state variables after the existing state declarations (around line 500)
    const [showPreviewDialog, setShowPreviewDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showTagsDialog, setShowTagsDialog] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [editedQuestion, setEditedQuestion] = useState<Partial<Question>>({})
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")


    const params = useParams();
    const { schoolId, userId } = params;


    const selectedSubject = subjects.filter((subject) => subject._id === selectedCourse?._id);


    useEffect(() => {
        if (!selectedClass) return;

        const fetchData = async () => {
            try {
                const subjects = await fetchSubjectByClassIdForQuestionBank(selectedClass);
                setSubjects(subjects);
            } catch (error) {
                console.error("Error fetching subjects for student:", error);
            }
        }

        fetchData()

    }, [selectedClass])



    useEffect(() => {
        if (!selectedCourse) return;

        const fetchData = async () => {
            try {
                const questionBanks = await fetchQuestionBankBySubjectIdAndClassId(selectedCourse._id, selectedClass as string);
                setQuestionBanks(questionBanks);
            } catch (error) {
                console.error("Error fetching question banks for student:", error);
            }
        }

        fetchData()

    }, [selectedCourse])
    // Filter and sort question banks
    const filteredBanks = questionBanks
        .filter((bank) => {
            if (selectedCourse && bank.courseId !== selectedCourse.id) return false
            if (
                searchQuery &&
                !bank.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !bank.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
                return false
            return true
        })
        .sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            } else if (sortBy === "updated") {
                return sortOrder === "asc"
                    ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
                    : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
            } else if (sortBy === "questions") {
                return sortOrder === "asc" ? a.questionCount - b.questionCount : b.questionCount - a.questionCount
            } else if (sortBy === "difficulty") {
                const difficultyOrder = { easy: 1, medium: 2, hard: 3, mixed: 2.5 }
                return sortOrder === "asc"
                    ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
                    : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
            }
            return 0
        })

    // Filter questions
    const filteredQuestions = questions
        .filter((question) => {
            if (selectedBank && question.bankId !== selectedBank.id) return false
            if (searchQuery && !question.text.toLowerCase().includes(searchQuery.toLowerCase())) return false
            if (filterDifficulty.length > 0 && !filterDifficulty.includes(question.difficulty)) return false
            if (filterCategories.length > 0 && !question.categories.some((cat) => filterCategories.includes(cat)))
                return false
            if (filterTags.length > 0 && !question.tags.some((tag) => filterTags.includes(tag))) return false
            return true
        })
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    // Handle course selection
    const handleCourseSelect = (course: Course) => {
        console.log(course, "subject")
        setSelectedCourse(course)
        setSelectedBank(null)
        setActiveTab("banks")
    }

    // Handle bank selection
    const handleBankSelect = (bank: QuestionBank) => {
        setSelectedBank(bank)
        setActiveTab("questions")
    }

    // Handle creating a new question bank
    const handleCreateBank = () => {
        if (!newBankName || !newBankCourse) return

        setIsCreatingBank(true)

        // Simulate API call
        setTimeout(() => {
            const newBank: QuestionBank = {
                id: `qb${questionBanks.length + 1}`,
                name: newBankName,
                courseId: newBankCourse,
                description: newBankDescription,
                questionCount: 0,
                categories: [],
                difficulty: "mixed",
                lastUpdated: new Date().toISOString(),
                status: "draft",
                shared: false,
                tags: [],
                createdBy: "John Doe",
                usageCount: 0,
            }

            setQuestionBanks([...questionBanks, newBank])
            setNewBankName("")
            setNewBankDescription("")
            setNewBankCourse("")
            setShowCreateBankDialog(false)
            setIsCreatingBank(false)

            // Select the new bank
            setSelectedBank(newBank)
            setActiveTab("questions")
        }, 1000)
    }

    // Handle creating a new question
    const handleCreateQuestion = () => {
        if (!newQuestionText || !selectedBank) return

        setIsCreatingQuestion(true)

        // Simulate API call
        setTimeout(() => {
            const newQuestion: Question = {
                id: `q${questions.length + 1}`,
                type: newQuestionType,
                text: newQuestionText,
                difficulty: newQuestionDifficulty,
                points: newQuestionPoints,
                estimatedTime: 60,
                categories: newQuestionCategories,
                tags: newQuestionTags,
                options: newQuestionType === "multiple-choice" ? newQuestionOptions : undefined,
                correctAnswer: newQuestionCorrectAnswer,
                explanation: newQuestionExplanation,
                usageCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                bankId: selectedBank.id,
            }

            setQuestions([...questions, newQuestion])

            // Update question count in the bank
            const updatedBanks = questionBanks.map((bank) => {
                if (bank.id === selectedBank.id) {
                    return {
                        ...bank,
                        questionCount: bank.questionCount + 1,
                        lastUpdated: new Date().toISOString(),
                    }
                }
                return bank
            })

            setQuestionBanks(updatedBanks)
            setSelectedBank(updatedBanks.find((bank) => bank.id === selectedBank.id) || null)

            // Reset form
            setNewQuestionType("multiple-choice")
            setNewQuestionText("")
            setNewQuestionDifficulty("medium")
            setNewQuestionPoints(5)
            setNewQuestionOptions(["", "", "", ""])
            setNewQuestionCorrectAnswer("")
            setNewQuestionExplanation("")
            setNewQuestionCategories([])
            setNewQuestionTags([])

            setShowCreateQuestionDialog(false)
            setIsCreatingQuestion(false)
        }, 1000)
    }


    // Handle AI question generation
    const handleAIGenerate = () => {
        if (!aiPrompt || !selectedBank) return

        setIsAIGenerating(true)

        // Simulate API call for AI generation
        setTimeout(() => {
            // Mock AI generated questions
            const generatedQuestions: Question[] = [
                {
                    id: `ai-q1-${Date.now()}`,
                    type: "multiple-choice",
                    text: "Which design pattern is most appropriate for implementing a notification system that sends updates to multiple subscribers?",
                    difficulty: "medium",
                    points: 5,
                    estimatedTime: 60,
                    categories: ["Design Patterns", "Object-Oriented Programming"],
                    tags: ["patterns", "architecture"],
                    options: ["Singleton", "Observer", "Factory", "Decorator"],
                    correctAnswer: "Observer",
                    explanation:
                        "The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
                    usageCount: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    bankId: selectedBank.id,
                },
                {
                    id: `ai-q2-${Date.now()}`,
                    type: "true-false",
                    text: "In JavaScript, the 'this' keyword always refers to the object that defined the function.",
                    difficulty: "medium",
                    points: 2,
                    estimatedTime: 30,
                    categories: ["Programming Basics"],
                    tags: ["javascript", "this keyword"],
                    correctAnswer: false,
                    explanation:
                        "In JavaScript, the value of 'this' depends on how the function is called, not where it was defined. It can refer to different objects depending on the context.",
                    usageCount: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    bankId: selectedBank.id,
                },
                {
                    id: `ai-q3-${Date.now()}`,
                    type: "essay",
                    text: "Explain the concept of asynchronous programming in JavaScript and discuss how Promises, async/await, and callbacks are used to handle asynchronous operations.",
                    difficulty: "hard",
                    points: 10,
                    estimatedTime: 600,
                    categories: ["Programming Basics", "Advanced JavaScript"],
                    tags: ["javascript", "async", "promises"],
                    usageCount: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    bankId: selectedBank.id,
                },
            ]

            setAiGeneratedQuestions(generatedQuestions)
            setIsAIGenerating(false)
        }, 2000)
    }

    // Handle adding AI generated questions to the bank
    const handleAddAIQuestions = () => {
        if (!selectedBank || aiGeneratedQuestions.length === 0) return

        // Add the generated questions to the questions list
        setQuestions([...questions, ...aiGeneratedQuestions])

        // Update question count in the bank
        const updatedBanks = questionBanks.map((bank) => {
            if (bank.id === selectedBank.id) {
                return {
                    ...bank,
                    questionCount: bank.questionCount + aiGeneratedQuestions.length,
                    lastUpdated: new Date().toISOString(),
                }
            }
            return bank
        })

        setQuestionBanks(updatedBanks)
        setSelectedBank(updatedBanks.find((bank) => bank.id === selectedBank.id) || null)

        // Reset
        setAiGeneratedQuestions([])
        setAiPrompt("")
        setShowAIDialog(false)
    }

    // Add these new handler functions after the existing handler functions (around line 900)

    // Handle question preview
    const handlePreviewQuestion = (question: Question) => {
        setCurrentQuestion(question)
        setShowPreviewDialog(true)
    }

    // Handle question edit
    const handleEditQuestion = (question: Question) => {
        setCurrentQuestion(question)
        setEditedQuestion({
            text: question.text,
            type: question.type,
            difficulty: question.difficulty,
            points: question.points,
            options: question.options ? [...question.options] : undefined,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            categories: [...question.categories],
            tags: [...question.tags],
        })
        setShowEditDialog(true)
    }

    // Handle question update
    const handleUpdateQuestion = () => {
        if (!currentQuestion) return

        // Simulate API call
        const updatedQuestions = questions.map((q) => {
            if (q.id === currentQuestion.id) {
                return {
                    ...q,
                    ...editedQuestion,
                    updatedAt: new Date().toISOString(),
                }
            }
            return q
        })

        setQuestions(updatedQuestions)
        setShowEditDialog(false)
        setCurrentQuestion(null)
        setEditedQuestion({})
    }

    // Handle question duplication
    const handleDuplicateQuestion = (question: Question) => {
        const newQuestion: Question = {
            ...question,
            id: `q${questions.length + 1}-${Date.now()}`,
            text: `${question.text} (Copy)`,
            usageCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setQuestions([...questions, newQuestion])

        // Update question count in the bank
        if (selectedBank) {
            const updatedBanks = questionBanks.map((bank) => {
                if (bank.id === selectedBank.id) {
                    return {
                        ...bank,
                        questionCount: bank.questionCount + 1,
                        lastUpdated: new Date().toISOString(),
                    }
                }
                return bank
            })

            setQuestionBanks(updatedBanks)
            setSelectedBank(updatedBanks.find((bank) => bank.id === selectedBank.id) || null)
        }
    }

    // Handle question deletion
    const handleDeleteQuestion = (questionId: string) => {
        // Simulate API call
        const updatedQuestions = questions.filter((q) => q.id !== questionId)
        setQuestions(updatedQuestions)

        // Update question count in the bank
        if (selectedBank) {
            const updatedBanks = questionBanks.map((bank) => {
                const deletedQuestion = questions.find((q) => q.id === questionId)
                if (bank.id === selectedBank.id && deletedQuestion?.bankId === bank.id) {
                    return {
                        ...bank,
                        questionCount: bank.questionCount - 1,
                        lastUpdated: new Date().toISOString(),
                    }
                }
                return bank
            })

            setQuestionBanks(updatedBanks)
            setSelectedBank(updatedBanks.find((bank) => bank.id === selectedBank.id) || null)
        }

        setShowDeleteDialog(false)
        setCurrentQuestion(null)
    }

    // Handle tag management
    const handleManageTags = (question: Question) => {
        setCurrentQuestion(question)
        setSelectedTags([...question.tags])
        setShowTagsDialog(true)
    }

    // Handle adding a new tag
    const handleAddTag = () => {
        if (!newTag.trim() || selectedTags.includes(newTag.trim())) return

        setSelectedTags([...selectedTags, newTag.trim()])
        setNewTag("")
    }

    // Handle saving tags
    const handleSaveTags = () => {
        if (!currentQuestion) return

        // Update question tags
        const updatedQuestions = questions.map((q) => {
            if (q.id === currentQuestion.id) {
                return {
                    ...q,
                    tags: selectedTags,
                    updatedAt: new Date().toISOString(),
                }
            }
            return q
        })

        setQuestions(updatedQuestions)
        setShowTagsDialog(false)
        setCurrentQuestion(null)
        setSelectedTags([])
    }

    // Handle showing analytics
    const handleShowAnalytics = (question: Question) => {
        setCurrentQuestion(question)
        setShowAnalyticsDialog(true)
    }


    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    // Get difficulty badge color
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "bg-green-500/10 text-green-600 border-green-600"
            case "medium":
                return "bg-yellow-500/10 text-yellow-600 border-yellow-600"
            case "hard":
                return "bg-red-500/10 text-red-600 border-red-600"
            case "mixed":
                return "bg-blue-500/10 text-blue-600 border-blue-600"
            default:
                return "bg-gray-500/10 text-gray-600 border-gray-600"
        }
    }

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "draft":
                return "bg-yellow-500/10 text-yellow-600 border-yellow-600"
            case "published":
                return "bg-green-500/10 text-green-600 border-green-600"
            case "archived":
                return "bg-gray-500/10 text-gray-600 border-gray-600"
            default:
                return "bg-gray-500/10 text-gray-600 border-gray-600"
        }
    }



    return (
        <div className="flex min-h-screen flex-col">
            <div className="container">
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <label className="font-bold text-sm hidden lg:block">Select Class</label>
                            <ClassSelection selectedClass={(value) => setSelectedClass(value)} classes={classes} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Select defaultValue="updated">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="updated">Last Updated</SelectItem>
                                        <SelectItem value="questions">Question Count</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {subjects.map((course) => (
                        <Link key={course._id} href={`/${schoolId}/admin/${userId}/exam/questions/${selectedClass}-${course._id}`}>
                            <Card
                                className="cursor-pointer transition-all hover:shadow-md space-y-6"
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">{course.subjectName}</CardTitle>
                                        <Badge variant="outline">{course.code}</Badge>
                                    </div>
                                    {/* <CardDescription>{course.department}</CardDescription> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Question Banks</span>
                                            <span className="text-2xl font-bold">{course.totalQuestionBanks}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Total Questions</span>
                                            <span className="text-2xl font-bold">{course.totalQuestions}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

            </div>
            {/* Create Question Dialog */}
            <Dialog open={showCreateQuestionDialog} onOpenChange={setShowCreateQuestionDialog}>
                <DialogContent className="sm:max-w-[700px] h-[85%] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Question</DialogTitle>
                        <DialogDescription>Add a new question to the &quot;{selectedBank?.name}&quot; question bank.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="question-type">Question Type</Label>
                            <Select value={newQuestionType} onValueChange={(value) => setNewQuestionType(value as Question["type"])}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select question type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="true-false">True/False</SelectItem>
                                    <SelectItem value="essay">Essay</SelectItem>
                                    <SelectItem value="short-answer">Short Answer</SelectItem>
                                    <SelectItem value="matching">Matching</SelectItem>
                                    <SelectItem value="fill-blanks">Fill in the Blanks</SelectItem>
                                    <SelectItem value="drag-drop">Drag and Drop</SelectItem>
                                    <SelectItem value="hotspot">Hotspot</SelectItem>
                                    <SelectItem value="code-execution">Code Execution</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="question-text">Question Text</Label>
                            <Textarea
                                id="question-text"
                                placeholder="Enter your question"
                                value={newQuestionText}
                                onChange={(e) => setNewQuestionText(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>

                        {newQuestionType === "multiple-choice" && (
                            <div className="grid gap-2">
                                <Label>Answer Options</Label>
                                {newQuestionOptions.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <RadioGroup value={newQuestionCorrectAnswer} onValueChange={setNewQuestionCorrectAnswer}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={option || `option-${index}`} id={`option-${index}`} />
                                            </div>
                                        </RadioGroup>
                                        <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...newQuestionOptions]
                                                newOptions[index] = e.target.value
                                                setNewQuestionOptions(newOptions)
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => {
                                                const newOptions = newQuestionOptions.filter((_, i) => i !== index)
                                                setNewQuestionOptions(newOptions)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => setNewQuestionOptions([...newQuestionOptions, ""])}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Option
                                </Button>
                            </div>
                        )}

                        {newQuestionType === "true-false" && (
                            <div className="grid gap-2">
                                <Label>Correct Answer</Label>
                                <RadioGroup
                                    value={newQuestionCorrectAnswer.toString()}
                                    onValueChange={(value) => setNewQuestionCorrectAnswer(value === "true")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" id="true" />
                                        <Label htmlFor="true">True</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="false" />
                                        <Label htmlFor="false">False</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="question-difficulty">Difficulty</Label>
                                <Select
                                    value={newQuestionDifficulty}
                                    onValueChange={(value) => setNewQuestionDifficulty(value as Question["difficulty"])}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="question-points">Points</Label>
                                <Input
                                    id="question-points"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={newQuestionPoints}
                                    onChange={(e) => setNewQuestionPoints(Number.parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="question-explanation">Explanation (Optional)</Label>
                            <Textarea
                                id="question-explanation"
                                placeholder="Provide an explanation for the correct answer"
                                value={newQuestionExplanation}
                                onChange={(e) => setNewQuestionExplanation(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Categories</Label>
                            <div className="flex flex-wrap gap-2 border rounded-md p-2">
                                {mockCategories.slice(0, 8).map((category) => (
                                    <Badge
                                        key={category.id}
                                        variant={newQuestionCategories.includes(category.name) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            if (newQuestionCategories.includes(category.name)) {
                                                setNewQuestionCategories(newQuestionCategories.filter((c) => c !== category.name))
                                            } else {
                                                setNewQuestionCategories([...newQuestionCategories, category.name])
                                            }
                                        }}
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2 border rounded-md p-2">
                                {mockTags.slice(0, 10).map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        variant={newQuestionTags.includes(tag.name) ? "secondary" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            if (newQuestionTags.includes(tag.name)) {
                                                setNewQuestionTags(newQuestionTags.filter((t) => t !== tag.name))
                                            } else {
                                                setNewQuestionTags([...newQuestionTags, tag.name])
                                            }
                                        }}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateQuestionDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateQuestion} disabled={isCreatingQuestion || !newQuestionText}>
                            {isCreatingQuestion ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Question"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Import Dialog */}
            <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Import Questions</DialogTitle>
                        <DialogDescription>Import questions from a file or another question bank.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Tabs defaultValue="file" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="file">From File</TabsTrigger>
                                <TabsTrigger value="bank">From Question Bank</TabsTrigger>
                            </TabsList>
                            <TabsContent value="file" className="space-y-4 pt-4">
                                <div className="grid gap-2">
                                    <Label>File Format</Label>
                                    <Select defaultValue="csv">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="csv">CSV</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                            <SelectItem value="qti">QTI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Upload File</Label>
                                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                        <p className="mt-2 text-sm font-medium">Drag and drop your file here</p>
                                        <p className="text-xs text-muted-foreground">or</p>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            Browse Files
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="replace" />
                                        <Label htmlFor="replace">Replace existing questions with the same ID</Label>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="bank" className="space-y-4 pt-4">
                                <div className="grid gap-2">
                                    <Label>Source Question Bank</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select question bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {questionBanks.map((bank) => (
                                                <SelectItem key={bank.id} value={bank.id}>
                                                    {bank.name} ({bank.questionCount} questions)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Import Options</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="copy" defaultChecked />
                                            <Label htmlFor="copy">Copy questions (create duplicates)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="categories" defaultChecked />
                                            <Label htmlFor="categories">Import categories</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="tags" defaultChecked />
                                            <Label htmlFor="tags">Import tags</Label>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                            Cancel
                        </Button>
                        <Button disabled={isImporting}>
                            {isImporting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                "Import Questions"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Export Dialog */}
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Export Questions</DialogTitle>
                        <DialogDescription>Export questions to a file in various formats.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>File Format</Label>
                            <Select defaultValue="csv">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="csv">CSV</SelectItem>
                                    <SelectItem value="excel">Excel</SelectItem>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="qti">QTI</SelectItem>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Export Options</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include-answers" defaultChecked />
                                    <Label htmlFor="include-answers">Include answers</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include-explanations" defaultChecked />
                                    <Label htmlFor="include-explanations">Include explanations</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include-metadata" defaultChecked />
                                    <Label htmlFor="include-metadata">Include metadata (categories, tags, etc.)</Label>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Questions to Export</Label>
                            <RadioGroup defaultValue="all">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="all" id="export-all" />
                                    <Label htmlFor="export-all">All questions</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="selected" id="export-selected" />
                                    <Label htmlFor="export-selected">Selected questions only</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="filtered" id="export-filtered" />
                                    <Label htmlFor="export-filtered">Filtered questions only</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                            Cancel
                        </Button>
                        <Button disabled={isExporting}>
                            {isExporting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                "Export Questions"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Dialogs */}
            <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Question Preview</DialogTitle>
                        <DialogDescription>Preview how this question will appear to students.</DialogDescription>
                    </DialogHeader>
                    {currentQuestion && (
                        <div className="py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                                        {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                                    </Badge>
                                    <Badge variant="outline">
                                        {currentQuestion.type
                                            .split("-")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </Badge>
                                    <Badge variant="outline">{currentQuestion.points} points</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        Created: {formatDate(currentQuestion.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <div className="border rounded-md p-4 space-y-4">
                                <div className="font-medium text-lg">{currentQuestion.text}</div>

                                {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                                    <div className="space-y-2 mt-4">
                                        {currentQuestion.options.map((option, index) => (
                                            <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                                                <div
                                                    className={`h-4 w-4 rounded-full ${option === currentQuestion.correctAnswer ? "bg-primary" : "border"
                                                        }`}
                                                ></div>
                                                <span>{option}</span>
                                                {option === currentQuestion.correctAnswer && (
                                                    <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-600">
                                                        Correct
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {currentQuestion.type === "true-false" && (
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                                            <div
                                                className={`h-4 w-4 rounded-full ${currentQuestion.correctAnswer === true ? "bg-primary" : "border"
                                                    }`}
                                            ></div>
                                            <span>True</span>
                                            {currentQuestion.correctAnswer === true && (
                                                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-600">
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                                            <div
                                                className={`h-4 w-4 rounded-full ${currentQuestion.correctAnswer === false ? "bg-primary" : "border"
                                                    }`}
                                            ></div>
                                            <span>False</span>
                                            {currentQuestion.correctAnswer === false && (
                                                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-600">
                                                    Correct
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentQuestion.type === "essay" && (
                                    <div className="mt-4 border rounded-md p-3 bg-muted/30 min-h-[100px]">
                                        <p className="text-muted-foreground italic">Student essay response area</p>
                                    </div>
                                )}

                                {currentQuestion.type === "short-answer" && (
                                    <div className="mt-4">
                                        <Input disabled placeholder="Student short answer response area" />
                                    </div>
                                )}

                                {currentQuestion.explanation && (
                                    <div className="mt-4 p-3 border-l-4 border-primary/50 bg-primary/5">
                                        <h4 className="font-medium">Explanation:</h4>
                                        <p>{currentQuestion.explanation}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <h4 className="text-sm font-medium mr-2">Categories:</h4>
                                {currentQuestion.categories.map((category) => (
                                    <Badge key={category} variant="outline">
                                        {category}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <h4 className="text-sm font-medium mr-2">Tags:</h4>
                                {currentQuestion.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {currentQuestion.usageCount > 0 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Used {currentQuestion.usageCount} times</span>
                                    {currentQuestion.successRate !== undefined && (
                                        <>
                                            <span>•</span>
                                            <span>Success rate: {currentQuestion.successRate}%</span>
                                        </>
                                    )}
                                    {currentQuestion.lastUsed && (
                                        <>
                                            <span>•</span>
                                            <span>Last used: {formatDate(currentQuestion.lastUsed)}</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                            Close
                        </Button>
                        {currentQuestion && (
                            <Button
                                onClick={() => {
                                    setShowPreviewDialog(false)
                                    handleEditQuestion(currentQuestion)
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Question
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[700px] h-[85%] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Question</DialogTitle>
                        <DialogDescription>Make changes to the selected question.</DialogDescription>
                    </DialogHeader>
                    {currentQuestion && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-question-type">Question Type</Label>
                                <Select
                                    value={editedQuestion.type || currentQuestion.type}
                                    onValueChange={(value) => setEditedQuestion({ ...editedQuestion, type: value as Question["type"] })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select question type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                        <SelectItem value="true-false">True/False</SelectItem>
                                        <SelectItem value="essay">Essay</SelectItem>
                                        <SelectItem value="short-answer">Short Answer</SelectItem>
                                        <SelectItem value="matching">Matching</SelectItem>
                                        <SelectItem value="fill-blanks">Fill in the Blanks</SelectItem>
                                        <SelectItem value="drag-drop">Drag and Drop</SelectItem>
                                        <SelectItem value="hotspot">Hotspot</SelectItem>
                                        <SelectItem value="code-execution">Code Execution</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-question-text">Question Text</Label>
                                <Textarea
                                    id="edit-question-text"
                                    placeholder="Enter your question"
                                    value={editedQuestion.text || currentQuestion.text}
                                    onChange={(e) => setEditedQuestion({ ...editedQuestion, text: e.target.value })}
                                    className="min-h-[100px]"
                                />
                            </div>

                            {(editedQuestion.type || currentQuestion.type) === "multiple-choice" && (
                                <div className="grid gap-2">
                                    <Label>Answer Options</Label>
                                    {(editedQuestion.options || currentQuestion.options || []).map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <RadioGroup
                                                value={editedQuestion.correctAnswer || currentQuestion.correctAnswer}
                                                onValueChange={(value) => setEditedQuestion({ ...editedQuestion, correctAnswer: value })}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value={option} id={`edit-option-${index}`} />
                                                </div>
                                            </RadioGroup>
                                            <Input
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...(editedQuestion.options || currentQuestion.options || [])]
                                                    newOptions[index] = e.target.value
                                                    setEditedQuestion({ ...editedQuestion, options: newOptions })
                                                }}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => {
                                                    const newOptions = (editedQuestion.options || currentQuestion.options || []).filter(
                                                        (_, i) => i !== index,
                                                    )
                                                    setEditedQuestion({ ...editedQuestion, options: newOptions })
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => {
                                            const newOptions = [...(editedQuestion.options || currentQuestion.options || []), ""]
                                            setEditedQuestion({ ...editedQuestion, options: newOptions })
                                        }}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Option
                                    </Button>
                                </div>
                            )}

                            {(editedQuestion.type || currentQuestion.type) === "true-false" && (
                                <div className="grid gap-2">
                                    <Label>Correct Answer</Label>
                                    <RadioGroup
                                        value={(editedQuestion.correctAnswer !== undefined
                                            ? editedQuestion.correctAnswer
                                            : currentQuestion.correctAnswer
                                        )?.toString()}
                                        onValueChange={(value) =>
                                            setEditedQuestion({ ...editedQuestion, correctAnswer: value === "true" })
                                        }
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="true" id="edit-true" />
                                            <Label htmlFor="edit-true">True</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" id="edit-false" />
                                            <Label htmlFor="edit-false">False</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-question-difficulty">Difficulty</Label>
                                    <Select
                                        value={editedQuestion.difficulty || currentQuestion.difficulty}
                                        onValueChange={(value) =>
                                            setEditedQuestion({ ...editedQuestion, difficulty: value as Question["difficulty"] })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-question-points">Points</Label>
                                    <Input
                                        id="edit-question-points"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={editedQuestion.points || currentQuestion.points}
                                        onChange={(e) =>
                                            setEditedQuestion({ ...editedQuestion, points: Number.parseInt(e.target.value) })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="edit-question-explanation">Explanation</Label>
                                <Textarea
                                    id="edit-question-explanation"
                                    placeholder="Provide an explanation for the correct answer"
                                    value={editedQuestion.explanation || currentQuestion.explanation || ""}
                                    onChange={(e) => setEditedQuestion({ ...editedQuestion, explanation: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Categories</Label>
                                <div className="flex flex-wrap gap-2 border rounded-md p-2">
                                    {mockCategories.slice(0, 8).map((category) => (
                                        <Badge
                                            key={category.id}
                                            variant={
                                                (editedQuestion.categories || currentQuestion.categories).includes(category.name)
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="cursor-pointer"
                                            onClick={() => {
                                                const currentCategories = editedQuestion.categories || currentQuestion.categories
                                                if (currentCategories.includes(category.name)) {
                                                    setEditedQuestion({
                                                        ...editedQuestion,
                                                        categories: currentCategories.filter((c) => c !== category.name),
                                                    })
                                                } else {
                                                    setEditedQuestion({
                                                        ...editedQuestion,
                                                        categories: [...currentCategories, category.name],
                                                    })
                                                }
                                            }}
                                        >
                                            {category.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Tags</Label>
                                <div className="flex flex-wrap gap-2 border rounded-md p-2">
                                    {mockTags.slice(0, 10).map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant={
                                                (editedQuestion.tags || currentQuestion.tags).includes(tag.name) ? "secondary" : "outline"
                                            }
                                            className="cursor-pointer"
                                            onClick={() => {
                                                const currentTags = editedQuestion.tags || currentQuestion.tags
                                                if (currentTags.includes(tag.name)) {
                                                    setEditedQuestion({
                                                        ...editedQuestion,
                                                        tags: currentTags.filter((t) => t !== tag.name),
                                                    })
                                                } else {
                                                    setEditedQuestion({
                                                        ...editedQuestion,
                                                        tags: [...currentTags, tag.name],
                                                    })
                                                }
                                            }}
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowEditDialog(false)
                                setCurrentQuestion(null)
                                setEditedQuestion({})
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateQuestion}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showTagsDialog} onOpenChange={setShowTagsDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Manage Tags</DialogTitle>
                        <DialogDescription>Add or remove tags for this question.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Add new tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        handleAddTag()
                                    }
                                }}
                            />
                            <Button onClick={handleAddTag}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="border rounded-md p-4">
                            <div className="text-sm font-medium mb-2">Current Tags</div>
                            {selectedTags.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No tags added yet.</p>
                            )}
                        </div>

                        <div className="border rounded-md p-4">
                            <div className="text-sm font-medium mb-2">Suggested Tags</div>
                            <div className="flex flex-wrap gap-2">
                                {mockTags
                                    .filter((tag) => !selectedTags.includes(tag.name))
                                    .slice(0, 10)
                                    .map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-secondary"
                                            onClick={() => setSelectedTags([...selectedTags, tag.name])}
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowTagsDialog(false)
                                setCurrentQuestion(null)
                                setSelectedTags([])
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveTags}>Save Tags</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showAnalyticsDialog} onOpenChange={setShowAnalyticsDialog}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Question Analytics</DialogTitle>
                        <DialogDescription>Performance metrics and usage statistics for this question.</DialogDescription>
                    </DialogHeader>
                    {currentQuestion && (
                        <div className="py-4 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Usage Count</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{currentQuestion.usageCount}</div>
                                        <p className="text-xs text-muted-foreground">Times used in exams</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Success Rate</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{currentQuestion.successRate || "N/A"}%</div>
                                        <p className="text-xs text-muted-foreground">Correct answers</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm">Avg. Time</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {Math.round((currentQuestion.estimatedTime || 60) * 0.8)}s
                                        </div>
                                        <p className="text-xs text-muted-foreground">To answer</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Performance by Difficulty</h3>
                                <div className="h-[200px] w-full rounded-md border flex items-center justify-center bg-muted/30">
                                    <p className="text-sm text-muted-foreground">Performance chart visualization would appear here</p>
                                </div>
                            </div>

                            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium">Answer Distribution</h3>
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, index) => {
                                            // Generate mock data for answer distribution
                                            const isCorrect = option === currentQuestion.correctAnswer
                                            const percentage = isCorrect
                                                ? currentQuestion.successRate || Math.floor(Math.random() * 30) + 60
                                                : Math.floor(Math.random() * 20) + 5

                                            return (
                                                <div key={index} className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span>{option}</span>
                                                        <span className="font-medium">{percentage}%</span>
                                                    </div>
                                                    <div className="relative">
                                                        <Progress value={percentage} className="h-2" />
                                                        {isCorrect && (
                                                            <Badge className="absolute -top-1 -right-12 text-[10px] bg-green-500/10 text-green-600 border-green-600">
                                                                Correct
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Usage History</h3>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-4 gap-4 p-3 font-medium border-b">
                                        <div>Exam</div>
                                        <div>Date</div>
                                        <div>Students</div>
                                        <div>Success Rate</div>
                                    </div>
                                    {/* Mock usage history */}
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="grid grid-cols-4 gap-4 p-3 hover:bg-muted/50 border-b last:border-0">
                                            <div className="text-sm">Midterm Exam {i}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm">{Math.floor(Math.random() * 50) + 20}</div>
                                            <div className="text-sm">{Math.floor(Math.random() * 30) + 60}%</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowAnalyticsDialog(false)
                                setCurrentQuestion(null)
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowAnalyticsDialog(false)
                                handleEditQuestion(currentQuestion!)
                            }}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Question
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Delete Question</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this question? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {currentQuestion && (
                        <div className="py-4">
                            <div className="p-4 border rounded-md bg-muted/30">
                                <p className="font-medium">{currentQuestion.text}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
                                        {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                                    </Badge>
                                    <Badge variant="outline">
                                        {currentQuestion.type
                                            .split("-")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </Badge>
                                </div>
                            </div>

                            {currentQuestion.usageCount > 0 && (
                                <Alert className="mt-4" variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        This question has been used in {currentQuestion.usageCount} exams. Deleting it may affect
                                        historical data.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowDeleteDialog(false)
                                setCurrentQuestion(null)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => currentQuestion && handleDeleteQuestion(currentQuestion.id)}>
                            Delete Question
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* AI Generation Dialog */}
            <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>AI Question Generation</DialogTitle>
                        <DialogDescription>
                            Use AI to generate questions based on your prompt or course materials.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="ai-prompt">Prompt</Label>
                            <Textarea
                                id="ai-prompt"
                                placeholder="Describe the topic, difficulty level, and types of questions you want to generate..."
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <p className="text-xs text-muted-foreground">
                                Example: &quot;Generate 3 multiple-choice questions about JavaScript promises at medium difficulty level.&quot;
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setAiPrompt(
                                        "Generate 3 multiple-choice questions about JavaScript promises at medium difficulty level.",
                                    )
                                }
                            >
                                <Zap className="mr-2 h-4 w-4" />
                                JavaScript
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setAiPrompt(
                                        "Create 3 questions about data structures (array, linked list, tree) with varying difficulty levels.",
                                    )
                                }
                            >
                                <Briefcase className="mr-2 h-4 w-4" />
                                Data Structures
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setAiPrompt("Generate 3 questions about object-oriented programming principles with explanations.")
                                }
                            >
                                <Lightbulb className="mr-2 h-4 w-4" />
                                OOP
                            </Button>
                        </div>

                        <Button onClick={handleAIGenerate} disabled={isAIGenerating || !aiPrompt} className="mt-2">
                            {isAIGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Questions
                                </>
                            )}
                        </Button>

                        {aiGeneratedQuestions.length > 0 && (
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Generated Questions</h3>
                                    <Button variant="outline" size="sm" onClick={() => setAiGeneratedQuestions([])}>
                                        <Shuffle className="mr-2 h-4 w-4" />
                                        Regenerate
                                    </Button>
                                </div>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto border rounded-md p-4">
                                    {aiGeneratedQuestions.map((question, index) => (
                                        <div key={index} className="border rounded-md p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                                                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {question.type
                                                            .split("-")
                                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                            .join(" ")}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-destructive">
                                                        <X className="mr-2 h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="font-medium">{question.text}</p>
                                                {question.type === "multiple-choice" && question.options && (
                                                    <div className="mt-2 space-y-1">
                                                        {question.options.map((option, optIndex) => (
                                                            <div key={optIndex} className="flex items-center gap-2">
                                                                <div
                                                                    className={`h-4 w-4 rounded-full ${option === question.correctAnswer ? "bg-primary" : "border"}`}
                                                                ></div>
                                                                <span>{option}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {question.explanation && (
                                                    <div className="mt-2 text-sm text-muted-foreground">
                                                        <span className="font-medium">Explanation:</span> {question.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={handleAddAIQuestions}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add to Question Bank
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowAIDialog(false)
                                setAiGeneratedQuestions([])
                                setAiPrompt("")
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

