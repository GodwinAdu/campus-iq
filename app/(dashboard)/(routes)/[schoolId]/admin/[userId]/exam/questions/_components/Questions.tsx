"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart2, CheckCircle2, Copy, Download, Edit, Eye, FileText, Filter, Layers, MoreHorizontal, Plus, Tag, Trash2, Upload, X } from "lucide-react"
import { useState } from "react"
import CreateQuestionDialog from "./CreateQuestionDialog"

const Questions = ({ questions,classId,subjectId,bankId ,selectedBankName}) => {
    const [bulkSelectedQuestions, setBulkSelectedQuestions] = useState<string[]>([]);
     const [filterCategories, setFilterCategories] = useState<string[]>([])


    // Filter questions
    const filteredQuestions = questions
        // .filter((question) => {
        //     if (selectedBank && question.bankId !== selectedBank.id) return false
        //     if (searchQuery && !question.text.toLowerCase().includes(searchQuery.toLowerCase())) return false
        //     if (filterDifficulty.length > 0 && !filterDifficulty.includes(question.difficulty)) return false
        //     if (filterCategories.length > 0 && !question.categories.some((cat) => filterCategories.includes(cat)))
        //         return false
        //     if (filterTags.length > 0 && !question.tags.some((tag) => filterTags.includes(tag))) return false
        //     return true
        // })
        .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    // Handle bulk selection
    const handleBulkSelect = (questionId: string) => {
        if (bulkSelectedQuestions.includes(questionId)) {
            setBulkSelectedQuestions(bulkSelectedQuestions.filter((id) => id !== questionId))
        } else {
            setBulkSelectedQuestions([...bulkSelectedQuestions, questionId])
        }
    }

    // Handle select all
    const handleSelectAll = () => {
        if (bulkSelectedQuestions.length === filteredQuestions.length) {
            setBulkSelectedQuestions([])
        } else {
            setBulkSelectedQuestions(filteredQuestions.map((q) => q.id))
        }
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


    // Get question type icon
    const getQuestionTypeIcon = (type: Question["type"]) => {
        switch (type) {
            case "multiple-choice":
                return <CheckCircle2 className="h-4 w-4" />
            case "true-false":
                return <CheckCircle2 className="h-4 w-4" />
            case "essay":
                return <FileText className="h-4 w-4" />
            case "short-answer":
                return <FileText className="h-4 w-4" />
            case "matching":
                return <Layers className="h-4 w-4" />
            case "fill-blanks":
                return <FileText className="h-4 w-4" />
            case "drag-drop":
                return <Layers className="h-4 w-4" />
            case "hotspot":
                return <Layers className="h-4 w-4" />
            case "code-execution":
                return <FileText className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }
    return (
        <>
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
                            <SelectItem value="updated">Last Updated</SelectItem>
                            <SelectItem value="difficulty">Difficulty</SelectItem>
                            <SelectItem value="type">Question Type</SelectItem>
                            <SelectItem value="usage">Usage Count</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    {bulkSelectedQuestions.length > 0 ? (
                        <>
                            <span className="text-sm text-muted-foreground">{bulkSelectedQuestions.length} selected</span>
                            <Button variant="outline" size="sm" onClick={() => setBulkSelectedQuestions([])}>
                                <X className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                            <Button variant="outline" size="sm">
                                <Tag className="mr-2 h-4 w-4" />
                                Tag
                            </Button>
                            <Button variant="outline" size="sm">
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowImportDialog(true)}>
                                <Upload className="mr-2 h-4 w-4" />
                                Import
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                    <div className="col-span-1 flex items-center">
                        <Checkbox
                            checked={
                                bulkSelectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                        />
                    </div>
                    <div className="col-span-5">Question</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-1">Difficulty</div>
                    <div className="col-span-1">Points</div>
                    <div className="col-span-2">Actions</div>
                </div>

                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                        <div
                            key={question._id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 border-b last:border-0"
                        >
                            <div className="col-span-1 flex items-center">
                                <Checkbox
                                    checked={bulkSelectedQuestions.includes(question._id)}
                                    onCheckedChange={() => handleBulkSelect(question._id)}
                                />
                            </div>
                            <div className="col-span-5">
                                <div className="font-medium line-clamp-2">{question.text}</div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {question.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {question.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{question.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <div className="flex items-center gap-2">
                                    {getQuestionTypeIcon(question.type)}
                                    <span className="text-sm">
                                        {question.type
                                            .split("-")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                </Badge>
                            </div>
                            <div className="col-span-1 flex items-center">{question.points}</div>
                            <div className="col-span-2 flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem >
                                            <Copy className="mr-2 h-4 w-4" />
                                            Duplicate
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                            <Tag className="mr-2 h-4 w-4" />
                                            Manage Tags
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <BarChart2 className="mr-2 h-4 w-4" />
                                            View Analytics
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">No questions yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Get started by creating your first question or importing questions from another bank.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <CreateQuestionDialog classId={classId} subjectId={subjectId} bankId={bankId} selectedBankName={selectedBankName} />
                            <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                                <Upload className="mr-2 h-4 w-4" />
                                Import Questions
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Questions
