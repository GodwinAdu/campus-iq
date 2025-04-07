"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    AlertCircle,
    Code,
    DropletsIcon as DragDropIcon,
    FileText,
    GripVertical,
    HelpCircle,
    ImageIcon,
    Info,
    Loader2,
    MapIcon as MatchIcon,
    Pencil,
    Plus,
    ScanEye,
    TextIcon as ShortText,
    Trash2,
    Type,
    X,
} from "lucide-react"
import { useState, useRef, useCallback } from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
import { createQuestion } from "@/lib/actions/questions.actions"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

// Define the question types
const questionTypes = [
    "multiple-choice",
    "true-false",
    "essay",
    "short-answer",
    "matching",
    "fill-blanks",
    "drag-drop",
] as const

// Define the difficulty levels
const difficultyLevels = ["easy", "medium", "hard"] as const


// Mock data for categories and tags
const mockCategories = Array.from({ length: 8 }, (_, i) => ({
    id: `cat-${i + 1}`,
    name: `Category ${i + 1}`,
}))

const mockTags = Array.from({ length: 10 }, (_, i) => ({
    id: `tag-${i + 1}`,
    name: `Tag ${i + 1}`,
}))

// Create the form schema with Zod
const formSchema = z.object({
    type: z.enum(questionTypes),
    text: z.string().min(1, "Question text is required"),

    // Multiple choice options
    options: z.array(z.string()).optional(),
    correctAnswer: z.union([z.string(), z.boolean(), z.array(z.string())]).optional(),

    // Essay options
    wordLimit: z.number().min(0).optional(),

    // Short answer options
    caseSensitive: z.boolean().optional(),
    acceptableAnswers: z.array(z.string()).optional(),

    // Matching options
    matchingPairs: z
        .array(
            z.object({
                id: z.string(),
                left: z.string(),
                right: z.string(),
            }),
        )
        .optional(),

    // Fill in the blanks options
    blankText: z.string().optional(),
    blanks: z
        .array(
            z.object({
                id: z.string(),
                answer: z.string(),
            }),
        )
        .optional(),

    // Drag and drop options
    dragDropItems: z
        .array(
            z.object({
                id: z.string(),
                text: z.string(),
                correctZone: z.string(),
            }),
        )
        .optional(),
    dropZones: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
            }),
        )
        .optional(),

    // Common fields
    difficulty: z.enum(difficultyLevels),
    points: z.number().min(1).max(100),
    explanation: z.string().optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    timeLimit: z.number().min(0).optional(),
})

type FormValues = z.infer<typeof formSchema>

interface CreateQuestionDialogProps {
    classId: string,
    subjectId: string,
    bankId: string,
    selectedBankName?: string
}

// Custom icon components for question types
const QuestionTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "multiple-choice":
            return (
                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
            )
        case "true-false":
            return <ScanEye className="h-4 w-4" />
        case "essay":
            return <FileText className="h-4 w-4" />
        case "short-answer":
            return <ShortText className="h-4 w-4" />
        case "matching":
            return <MatchIcon className="h-4 w-4" />
        case "fill-blanks":
            return <Type className="h-4 w-4" />
        case "drag-drop":
            return <DragDropIcon className="h-4 w-4" />
        case "hotspot":
            return <ImageIcon className="h-4 w-4" />
        case "code-execution":
            return <Code className="h-4 w-4" />
        default:
            return <HelpCircle className="h-4 w-4" />
    }
}

// Sortable item component for drag and drop
const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 bg-background border rounded-md p-2 mb-2"
        >
            <div {...listeners} className="cursor-grab">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            {children}
        </div>
    )
}

const CreateQuestionDialog = ({
    classId,
    subjectId,
    bankId,
    selectedBankName
}: CreateQuestionDialogProps) => {
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)
    const [activeTab, setActiveTab] = useState("question")
    const fileInputRef = useRef<HTMLInputElement>(null)


    const router = useRouter()

    // Initialize the form with default values
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "multiple-choice",
            text: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            wordLimit: 500,
            caseSensitive: false,
            acceptableAnswers: [""],
            matchingPairs: [{ id: "pair-1", left: "", right: "" }],
            blankText: "Enter text with [blank] placeholders",
            blanks: [{ id: "blank-1", answer: "" }],
            dragDropItems: [{ id: "item-1", text: "", correctZone: "zone-1" }],
            dropZones: [{ id: "zone-1", name: "Zone 1" }],
            difficulty: "medium",
            points: 10,
            explanation: "",
            categories: [],
            tags: [],
            timeLimit: 0,
        },
    })

    // Get the current question type
    const questionType = form.watch("type")

    // DnD sensors for drag and drop functionality
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // Handle drag end for sortable items
    const handleDragEnd = useCallback(
        (event: DragEndEvent, fieldName: string) => {
            const { active, over } = event

            if (over && active.id !== over.id) {
                const fieldValues = form.getValues(fieldName as keyof FormValues) as Array<{ id: string }> | undefined;
                const oldIndex = fieldValues?.findIndex((item) => item.id === active.id) ?? -1;
                const newIndex = fieldValues?.findIndex((item) => item.id === over.id) ?? -1;

                const items = [...(fieldValues || [])]
                const [removed] = items.splice(oldIndex, 1)
                items.splice(newIndex, 0, removed)

                form.setValue(fieldName as keyof FormValues, items as any)
            }
        },
        [form],
    )

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        setIsCreatingQuestion(true)
        try {
            // Process the data based on question type
            const processedData = { ...data }

            // Remove fields that are not relevant to the current question type
            Object.keys(processedData).forEach((key) => {
                if (
                    key !== "type" &&
                    key !== "text" &&
                    key !== "difficulty" &&
                    key !== "points" &&
                    key !== "explanation" &&
                    key !== "categories" &&
                    key !== "tags" &&
                    key !== "timeLimit"
                ) {
                    if (!isFieldRelevantForQuestionType(key, data.type)) {
                        delete processedData[key as keyof FormValues]
                    }
                }
            });

            const values = {
                ...processedData,
                classId,
                subjectId,
                bankId,
            }

           await createQuestion(values)
            form.reset()
            router.refresh();
            toast({
                title: "Question created",
                description: "The question has been successfully created.",
                // status: "success",
            })
            // onOpenChange(false)
        } catch (error) {
            console.error("Error creating question:", error)
            toast({
                title: "Error creating question",
                description: "An error occurred while creating the question. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsCreatingQuestion(false)
        }
    }

    // Check if a field is relevant for the current question type
    const isFieldRelevantForQuestionType = (fieldName: string, type: string): boolean => {
        const fieldMap: Record<string, string[]> = {
            options: ["multiple-choice"],
            correctAnswer: ["multiple-choice", "true-false"],
            wordLimit: ["essay"],
            caseSensitive: ["short-answer"],
            acceptableAnswers: ["short-answer"],
            matchingPairs: ["matching"],
            blankText: ["fill-blanks"],
            blanks: ["fill-blanks"],
            dragDropItems: ["drag-drop"],
            dropZones: ["drag-drop"],
        }

        return !fieldMap[fieldName] || fieldMap[fieldName].includes(type)
    }


    // Extract blanks from fill-in-the-blanks text
    const extractBlanks = (text: string) => {
        const blankRegex = /\[blank\]/g
        const matches = text.match(blankRegex)

        if (matches) {
            const blanks = Array.from({ length: matches.length }, (_, i) => ({
                id: `blank-${i + 1}`,
                answer: form.getValues("blanks")?.[i]?.answer || "",
            }))

            form.setValue("blanks", blanks)
        } else {
            form.setValue("blanks", [])
        }
    }

    // Generate a unique ID
    const generateId = (prefix: string) => {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4" />
                    New Question
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QuestionTypeIcon type={questionType} />
                        Create New Question
                    </DialogTitle>
                    <DialogDescription>Add a new question to the &quot;{selectedBankName}&quot; question bank.</DialogDescription>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <TabsList>
                            <TabsTrigger value="question" className="flex items-center gap-1">
                                <Pencil className="h-4 w-4" />
                                Question
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-1">
                                <Info className="h-4 w-4" />
                                Settings
                            </TabsTrigger>
                            {previewMode && (
                                <TabsTrigger value="preview" className="flex items-center gap-1">
                                    <ScanEye className="h-4 w-4" />
                                    Preview
                                </TabsTrigger>
                            )}
                        </TabsList>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)} className="gap-1">
                                        {previewMode ? <AlertCircle className="h-4 w-4" /> : <ScanEye className="h-4 w-4" />}
                                        {previewMode ? "Hide Preview" : "Show Preview"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {previewMode ? "Hide the question preview" : "Preview how the question will appear to students"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <TabsContent value="question" className="space-y-6 mt-0">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question Type</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    // Reset relevant fields when changing question type
                                                    if (value === "multiple-choice") {
                                                        form.setValue("options", ["", "", "", ""])
                                                        form.setValue("correctAnswer", "")
                                                    } else if (value === "true-false") {
                                                        form.setValue("correctAnswer", false)
                                                    }
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select question type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="multiple-choice">
                                                        <div className="">

                                                            <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                                                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                            </div>
                                                            Multiple Choice
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="true-false">
                                                        <div className="">

                                                            <ScanEye className="h-4 w-4" />
                                                            True/False
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="essay">
                                                        <div className="">

                                                            <FileText className="h-4 w-4" />
                                                            Essay
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="short-answer">
                                                        <div className="">

                                                            <ShortText className="h-4 w-4" />
                                                            Short Answer
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="matching">
                                                        <div className="flex gap-2">
                                                            <MatchIcon className="h-4 w-4" />
                                                            Matching
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="fill-blanks" >
                                                        <div className="flex gap-2">
                                                            <Type className="h-4 w-4" />
                                                            Fill in the Blanks
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="drag-drop" >
                                                        <div className="flex gap-2">
                                                            <DragDropIcon className="h-4 w-4" />
                                                            Drag and Drop
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question Text</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your question" className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Question type specific fields */}
                                {questionType === "multiple-choice" && (
                                    <FormField
                                        control={form.control}
                                        name="options"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Answer Options</FormLabel>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                        {field.value?.map((option, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <RadioGroup
                                                                    value={form.getValues("correctAnswer") as string}
                                                                    onValueChange={(value) => form.setValue("correctAnswer", value)}
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value={option || `option-${index}`} id={`option-${index}`} />
                                                                    </div>
                                                                </RadioGroup>
                                                                <Input
                                                                    placeholder={`Option ${index + 1}`}
                                                                    value={option}
                                                                    onChange={(e) => {
                                                                        const newOptions = [...(field.value || [])]
                                                                        newOptions[index] = e.target.value
                                                                        field.onChange(newOptions)
                                                                    }}
                                                                    className="flex-1"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => {
                                                                        const newOptions = (field.value || []).filter((_, i) => i !== index)
                                                                        field.onChange(newOptions)

                                                                        // Update correctAnswer if the selected option is removed
                                                                        if (form.getValues("correctAnswer") === option) {
                                                                            form.setValue("correctAnswer", "")
                                                                        }
                                                                    }}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2"
                                                            onClick={() => {
                                                                field.onChange([...(field.value || []), ""])
                                                            }}
                                                        >
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Option
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>Select the radio button next to the correct answer.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {questionType === "true-false" && (
                                    <FormField
                                        control={form.control}
                                        name="correctAnswer"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Correct Answer</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(value) => field.onChange(value === "true")}
                                                        defaultValue={field.value ? "true" : "false"}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="true" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">True</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="false" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">False</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {questionType === "essay" && (
                                    <FormField
                                        control={form.control}
                                        name="wordLimit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Word Limit</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormDescription>Set to 0 for no word limit.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {questionType === "short-answer" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="acceptableAnswers"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Acceptable Answers</FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-2">
                                                            {field.value?.map((answer, index) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <Input
                                                                        placeholder={`Acceptable answer ${index + 1}`}
                                                                        value={answer}
                                                                        onChange={(e) => {
                                                                            const newAnswers = [...(field.value || [])]
                                                                            newAnswers[index] = e.target.value
                                                                            field.onChange(newAnswers)
                                                                        }}
                                                                        className="flex-1"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8"
                                                                        onClick={() => {
                                                                            const newAnswers = (field.value || []).filter((_, i) => i !== index)
                                                                            field.onChange(newAnswers.length ? newAnswers : [""]) // Always keep at least one
                                                                        }}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="mt-2"
                                                                onClick={() => {
                                                                    field.onChange([...(field.value || []), ""])
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add Acceptable Answer
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Add multiple acceptable answers. Students need to match one of these exactly.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="caseSensitive"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Case Sensitive</FormLabel>
                                                        <FormDescription>Require exact case matching for answers</FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}


                                {questionType === "matching" && (
                                    <FormField
                                        control={form.control}
                                        name="matchingPairs"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Matching Pairs</FormLabel>
                                                <FormControl>
                                                    <div className="w-full">
                                                        {/* Wrap everything in a single div */}
                                                        <div>
                                                            <DndContext
                                                                sensors={sensors}
                                                                collisionDetection={closestCenter}
                                                                onDragEnd={(event) => handleDragEnd(event, "matchingPairs")}
                                                                modifiers={[restrictToVerticalAxis]}
                                                            >
                                                                <SortableContext
                                                                    items={field.value?.map((item) => item.id) || []}
                                                                    strategy={verticalListSortingStrategy}
                                                                >
                                                                    <div className="space-y-2">
                                                                        {field.value?.map((pair, index) => (
                                                                            <SortableItem key={pair.id} id={pair.id}>
                                                                                <div className="grid grid-cols-2 gap-2 flex-1">
                                                                                    <Input
                                                                                        placeholder="Left item"
                                                                                        value={pair.left}
                                                                                        onChange={(e) => {
                                                                                            const newPairs = [...(field.value || [])]
                                                                                            newPairs[index].left = e.target.value
                                                                                            field.onChange(newPairs)
                                                                                        }}
                                                                                    />
                                                                                    <Input
                                                                                        placeholder="Right item"
                                                                                        value={pair.right}
                                                                                        onChange={(e) => {
                                                                                            const newPairs = [...(field.value || [])]
                                                                                            newPairs[index].right = e.target.value
                                                                                            field.onChange(newPairs)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-8 w-8"
                                                                                    onClick={() => {
                                                                                        if (field.value && field.value.length > 1) {
                                                                                            const newPairs = field.value.filter((_, i) => i !== index)
                                                                                            field.onChange(newPairs)
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </SortableItem>
                                                                        ))}
                                                                    </div>
                                                                </SortableContext>
                                                            </DndContext>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="mt-4"
                                                                onClick={() => {
                                                                    const newPair = { id: generateId("pair"), left: "", right: "" }
                                                                    field.onChange([...(field.value || []), newPair])
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add Matching Pair
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Create pairs of items that students will need to match. Drag to reorder.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {questionType === "fill-blanks" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="blankText"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Text with Blanks</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter text with [blank] placeholders"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value)
                                                                extractBlanks(e.target.value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Use [blank] to indicate where blanks should appear.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="blanks"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Answers for Blanks</FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-2">
                                                            {field.value?.map((blank, index) => (
                                                                <div key={blank.id} className="flex items-center gap-2">
                                                                    <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">
                                                                        Blank {index + 1}:
                                                                    </div>
                                                                    <Input
                                                                        placeholder={`Answer for blank ${index + 1}`}
                                                                        value={blank.answer}
                                                                        onChange={(e) => {
                                                                            const newBlanks = [...(field.value || [])]
                                                                            newBlanks[index].answer = e.target.value
                                                                            field.onChange(newBlanks)
                                                                        }}
                                                                        className="flex-1"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Provide the correct answer for each blank in the text.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {questionType === "drag-drop" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="dropZones"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Drop Zones</FormLabel>
                                                        <FormControl>
                                                            <div className="space-y-2">
                                                                {field.value?.map((zone, index) => (
                                                                    <div key={zone.id} className="flex items-center gap-2">
                                                                        <Input
                                                                            placeholder={`Zone ${index + 1} name`}
                                                                            value={zone.name}
                                                                            onChange={(e) => {
                                                                                const newZones = [...(field.value || [])]
                                                                                newZones[index].name = e.target.value
                                                                                field.onChange(newZones)
                                                                            }}
                                                                            className="flex-1"
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                            onClick={() => {
                                                                                if (field.value && field.value.length > 1) {
                                                                                    const newZones = field.value.filter((_, i) => i !== index)
                                                                                    field.onChange(newZones)

                                                                                    // Update dragDropItems that reference this zone
                                                                                    const items = form.getValues('dragDropItems') || []
                                                                                    const updatedItems = items.map(item => {
                                                                                        if (item.correctZone === zone.id) {
                                                                                            return { ...item, correctZone: field.value[0].id }
                                                                                        }
                                                                                        return item
                                                                                    })
                                                                                    form.setValue('dragDropItems', updatedItems)
                                                                                }
                                                                            }}
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="mt-2"
                                                                    onClick={() => {
                                                                        const newZone = {
                                                                            id: generateId("zone"),
                                                                            name: `Zone ${(field.value?.length || 0) + 1}`,
                                                                        }
                                                                        field.onChange([...(field.value || []), newZone])
                                                                    }}
                                                                >
                                                                    <Plus className="mr-2 h-4 w-4" />
                                                                    Add Zone
                                                                </Button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="dragDropItems"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Draggable Items</FormLabel>
                                                        <FormControl>
                                                            <div className="w-full">
                                                                {/* Wrap everything in a single div */}
                                                                <div>
                                                                    <DndContext
                                                                        sensors={sensors}
                                                                        collisionDetection={closestCenter}
                                                                        onDragEnd={(event) => handleDragEnd(event, "dragDropItems")}
                                                                        modifiers={[restrictToVerticalAxis]}
                                                                    >
                                                                        <SortableContext
                                                                            items={field.value?.map((item) => item.id) || []}
                                                                            strategy={verticalListSortingStrategy}
                                                                        >
                                                                            <div className="space-y-2">
                                                                                {field.value?.map((item, index) => (
                                                                                    <SortableItem key={item.id} id={item.id}>
                                                                                        <div className="grid grid-cols-2 gap-2 flex-1">
                                                                                            <Input
                                                                                                placeholder="Item text"
                                                                                                value={item.text}
                                                                                                onChange={(e) => {
                                                                                                    const newItems = [...(field.value || [])]
                                                                                                    newItems[index].text = e.target.value
                                                                                                    field.onChange(newItems)
                                                                                                }}
                                                                                            />
                                                                                            <Select
                                                                                                value={item.correctZone}
                                                                                                onValueChange={(value) => {
                                                                                                    const newItems = [...(field.value || [])]
                                                                                                    newItems[index].correctZone = value
                                                                                                    field.onChange(newItems)
                                                                                                }}
                                                                                            >
                                                                                                <SelectTrigger>
                                                                                                    <SelectValue placeholder="Select zone" />
                                                                                                </SelectTrigger>
                                                                                                <SelectContent>
                                                                                                    {form.getValues('dropZones')?.map((zone) => (
                                                                                                        <SelectItem key={zone.id} value={zone.id}>
                                                                                                            {zone.name}
                                                                                                        </SelectItem>
                                                                                                    ))}
                                                                                                </SelectContent>
                                                                                            </Select>
                                                                                        </div>
                                                                                        <Button
                                                                                            type="button"
                                                                                            variant="ghost"
                                                                                            size="icon"
                                                                                            className="h-8 w-8"
                                                                                            onClick={() => {
                                                                                                if (field.value && field.value.length > 1) {
                                                                                                    const newItems = field.value.filter((_, i) => i !== index)
                                                                                                    field.onChange(newItems)
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <Trash2 className="h-4 w-4" />
                                                                                        </Button>
                                                                                    </SortableItem>
                                                                                ))}
                                                                            </div>
                                                                        </SortableContext>
                                                                    </DndContext>
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="mt-4"
                                                                        onClick={() => {
                                                                            const zones = form.getValues('dropZones') || []
                                                                            const defaultZone = zones.length > 0 ? zones[0].id : ''
                                                                            const newItem = {
                                                                                id: generateId("item"),
                                                                                text: "",
                                                                                correctZone: defaultZone
                                                                            }
                                                                            field.onChange([...(field.value || []), newItem])
                                                                        }}
                                                                    >
                                                                        <Plus className="mr-2 h-4 w-4" />
                                                                        Add Item
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Create items that students will drag to the correct zones. Drag to reorder.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}


                                {questionType === "hotspot" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="hotspotImageUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Hotspot Image</FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-4">
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    ref={fileInputRef}
                                                                    className="hidden"
                                                                    onChange={handleFileUpload}
                                                                />
                                                                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                                                    Upload Image
                                                                </Button>
                                                                {field.value && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            field.onChange("")
                                                                            form.setValue("hotspotRegions", [])
                                                                        }}
                                                                    >
                                                                        Remove Image
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            {field.value && (
                                                                <div className="relative border rounded-md overflow-hidden">
                                                                    <img
                                                                        src={field.value || "/placeholder.svg"}
                                                                        alt="Hotspot"
                                                                        className="max-w-full h-auto"
                                                                    />
                                                                    {/* In a real implementation, you would add a canvas overlay here for defining hotspot regions */}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Upload an image and define clickable regions.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {form.watch("hotspotImageUrl") && (
                                            <FormField
                                                control={form.control}
                                                name="hotspotRegions"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Hotspot Regions</FormLabel>
                                                        <FormControl>
                                                            <div className="space-y-2">
                                                                {field.value?.map((region, index) => (
                                                                    <div key={region.id} className="flex items-center gap-2 border p-3 rounded-md">
                                                                        <div className="grid grid-cols-2 gap-2 flex-1">
                                                                            <div>
                                                                                <Label>Region Label</Label>
                                                                                <Input
                                                                                    placeholder="Region label"
                                                                                    value={region.label || ""}
                                                                                    onChange={(e) => {
                                                                                        const newRegions = [...(field.value || [])]
                                                                                        newRegions[index].label = e.target.value
                                                                                        field.onChange(newRegions)
                                                                                    }}
                                                                                    className="mt-1"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Label>Position</Label>
                                                                                <div className="grid grid-cols-2 gap-2 mt-1">
                                                                                    <Input
                                                                                        placeholder="X"
                                                                                        type="number"
                                                                                        value={region.x}
                                                                                        onChange={(e) => {
                                                                                            const newRegions = [...(field.value || [])]
                                                                                            newRegions[index].x = Number(e.target.value)
                                                                                            field.onChange(newRegions)
                                                                                        }}
                                                                                    />
                                                                                    <Input
                                                                                        placeholder="Y"
                                                                                        type="number"
                                                                                        value={region.y}
                                                                                        onChange={(e) => {
                                                                                            const newRegions = [...(field.value || [])]
                                                                                            newRegions[index].y = Number(e.target.value)
                                                                                            field.onChange(newRegions)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                            onClick={() => {
                                                                                const newRegions = field.value?.filter((_, i) => i !== index)
                                                                                field.onChange(newRegions)
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="mt-2"
                                                                    onClick={() => {
                                                                        const newRegion = {
                                                                            id: generateId("region"),
                                                                            x: 0,
                                                                            y: 0,
                                                                            width: 100,
                                                                            height: 100,
                                                                            label: `Region ${(field.value?.length || 0) + 1}`,
                                                                        }
                                                                        field.onChange([...(field.value || []), newRegion])
                                                                    }}
                                                                >
                                                                    <Plus className="mr-2 h-4 w-4" />
                                                                    Add Region
                                                                </Button>
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription>
                                                            In a real implementation, you would be able to draw regions directly on the image.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </>
                                )}

                                {questionType === "code-execution" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="language"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Programming Language</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select language" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="javascript">JavaScript</SelectItem>
                                                            <SelectItem value="typescript">TypeScript</SelectItem>
                                                            <SelectItem value="python">Python</SelectItem>
                                                            <SelectItem value="java">Java</SelectItem>
                                                            <SelectItem value="c">C</SelectItem>
                                                            <SelectItem value="cpp">C++</SelectItem>
                                                            <SelectItem value="csharp">C#</SelectItem>
                                                            <SelectItem value="ruby">Ruby</SelectItem>
                                                            <SelectItem value="go">Go</SelectItem>
                                                            <SelectItem value="rust">Rust</SelectItem>
                                                            <SelectItem value="php">PHP</SelectItem>
                                                            <SelectItem value="swift">Swift</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="codeTemplate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Code Template</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="// Initial code template for students"
                                                            className="min-h-[150px] font-mono"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is the starting code that will be provided to students.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="testCases"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Test Cases</FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-4">
                                                            {field.value?.map((testCase, index) => (
                                                                <div key={testCase.id} className="border rounded-md p-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                            <Label>Input</Label>
                                                                            <Textarea
                                                                                placeholder="Test input"
                                                                                value={testCase.input}
                                                                                onChange={(e) => {
                                                                                    const newTestCases = [...(field.value || [])]
                                                                                    newTestCases[index].input = e.target.value
                                                                                    field.onChange(newTestCases)
                                                                                }}
                                                                                className="mt-1 min-h-[80px] font-mono"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <Label>Expected Output</Label>
                                                                            <Textarea
                                                                                placeholder="Expected output"
                                                                                value={testCase.expectedOutput}
                                                                                onChange={(e) => {
                                                                                    const newTestCases = [...(field.value || [])]
                                                                                    newTestCases[index].expectedOutput = e.target.value
                                                                                    field.onChange(newTestCases)
                                                                                }}
                                                                                className="mt-1 min-h-[80px] font-mono"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-end mt-2">
                                                                        <Button
                                                                            type="button"
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                if (field.value && field.value.length > 1) {
                                                                                    const newTestCases = field.value.filter((_, i) => i !== index)
                                                                                    field.onChange(newTestCases)
                                                                                }
                                                                            }}
                                                                        >
                                                                            Remove Test Case
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    const newTestCase = {
                                                                        id: generateId("test"),
                                                                        input: "",
                                                                        expectedOutput: "",
                                                                    }
                                                                    field.onChange([...(field.value || []), newTestCase])
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add Test Case
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Define test cases to verify student code.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                            </TabsContent>

                            <TabsContent value="settings" className="space-y-6 mt-0">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="difficulty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Difficulty</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select difficulty" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="easy">Easy</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="hard">Hard</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="points"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Points</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max="100"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="timeLimit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time Limit (seconds)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Set to 0 for no time limit.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="explanation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Explanation (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Provide an explanation for the correct answer"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>This will be shown to students after they answer the question.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categories</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-wrap gap-2 border rounded-md p-3">
                                                    {mockCategories.map((category) => (
                                                        <Badge
                                                            key={category.id}
                                                            variant={field.value.includes(category.name) ? "default" : "outline"}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                const newCategories = field.value.includes(category.name)
                                                                    ? field.value.filter((c) => c !== category.name)
                                                                    : [...field.value, category.name]
                                                                field.onChange(newCategories)
                                                            }}
                                                        >
                                                            {category.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-wrap gap-2 border rounded-md p-3">
                                                    {mockTags.map((tag) => (
                                                        <Badge
                                                            key={tag.id}
                                                            variant={field.value.includes(tag.name) ? "secondary" : "outline"}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                const newTags = field.value.includes(tag.name)
                                                                    ? field.value.filter((t) => t !== tag.name)
                                                                    : [...field.value, tag.name]
                                                                field.onChange(newTags)
                                                            }}
                                                        >
                                                            {tag.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            {previewMode && (
                                <TabsContent value="preview" className="mt-0">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">
                                                            {questionType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                        </Badge>
                                                        <Badge>{form.getValues("difficulty")}</Badge>
                                                        <Badge variant="secondary">{form.getValues("points")} points</Badge>
                                                    </div>
                                                    {form.getValues("timeLimit") > 0 && (
                                                        <Badge variant="outline" className="flex items-center gap-1">
                                                            <span>Time: {form.getValues("timeLimit")}s</span>
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="text-xl font-medium">{form.getValues("text")}</div>

                                                {/* Question type specific preview */}
                                                {questionType === "multiple-choice" && (
                                                    <div className="space-y-2">
                                                        <RadioGroup value={(form.getValues("correctAnswer") as string) || ""}>
                                                            {form.getValues("options")?.map((option, index) => (
                                                                <div key={index} className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value={option || `option-${index}`}
                                                                        id={`preview-option-${index}`}
                                                                        disabled
                                                                    />
                                                                    <Label htmlFor={`preview-option-${index}`}>{option || `Option ${index + 1}`}</Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>
                                                )}

                                                {questionType === "true-false" && (
                                                    <div className="space-y-2">
                                                        <RadioGroup value={form.getValues("correctAnswer") ? "true" : "false"}>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="true" id="preview-true" disabled />
                                                                <Label htmlFor="preview-true">True</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="false" id="preview-false" disabled />
                                                                <Label htmlFor="preview-false">False</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                )}

                                                {questionType === "essay" && (
                                                    <div className="space-y-2">
                                                        <Textarea placeholder="Type your answer here..." disabled className="min-h-[150px]" />
                                                        {form.getValues("wordLimit") > 0 && (
                                                            <div className="text-sm text-muted-foreground text-right">
                                                                Word limit: {form.getValues("wordLimit")} words
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {questionType === "short-answer" && (
                                                    <div>
                                                        <Input placeholder="Type your answer here..." disabled />
                                                    </div>
                                                )}

                                                {questionType === "matching" && (
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            {form.getValues("matchingPairs")?.map((pair, index) => (
                                                                <div key={index} className="p-2 border rounded-md">
                                                                    {pair.left || `Left item ${index + 1}`}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="space-y-2">
                                                            {form.getValues("matchingPairs")?.map((pair, index) => (
                                                                <div key={index} className="p-2 border rounded-md">
                                                                    {pair.right || `Right item ${index + 1}`}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {questionType === "fill-blanks" && (
                                                    <div>
                                                        {form
                                                            .getValues("blankText")
                                                            ?.split(/(\[blank\])/)
                                                            .map((part, index) =>
                                                                part === "[blank]" ? (
                                                                    <Input key={index} className="inline-block w-32 mx-1" disabled />
                                                                ) : (
                                                                    <span key={index}>{part}</span>
                                                                ),
                                                            )}
                                                    </div>
                                                )}

                                                {questionType === "drag-drop" && (
                                                    <div className="space-y-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {form.getValues("dragDropItems")?.map((item, index) => (
                                                                <div key={index} className="p-2 border rounded-md bg-muted">
                                                                    {item.text || `Item ${index + 1}`}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {form.getValues("dropZones")?.map((zone, index) => (
                                                                <div key={index} className="p-4 border-2 border-dashed rounded-md text-center">
                                                                    {zone.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {questionType === "hotspot" && (
                                                    <div className="border rounded-md overflow-hidden">
                                                        {form.getValues("hotspotImageUrl") ? (
                                                            <img
                                                                src={form.getValues("hotspotImageUrl") || "/placeholder.svg"}
                                                                alt="Hotspot"
                                                                className="max-w-full h-auto"
                                                            />
                                                        ) : (
                                                            <div className="h-40 bg-muted flex items-center justify-center">
                                                                <p className="text-muted-foreground">No image uploaded</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {questionType === "code-execution" && (
                                                    <div className="space-y-2">
                                                        <div className="p-4 bg-muted rounded-md font-mono text-sm whitespace-pre">
                                                            {form.getValues("codeTemplate") || "// Code template will appear here"}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Language: {form.getValues("language")?.replace(/\b\w/g, (l) => l.toUpperCase())}
                                                        </div>
                                                    </div>
                                                )}

                                                {form.getValues("explanation") && (
                                                    <div className="mt-6 p-4 bg-muted/30 rounded-md">
                                                        <div className="font-medium mb-1">Explanation:</div>
                                                        <div>{form.getValues("explanation")}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            )}

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isCreatingQuestion || !form.formState.isValid}>
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
                        </form>
                    </Form>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default CreateQuestionDialog

