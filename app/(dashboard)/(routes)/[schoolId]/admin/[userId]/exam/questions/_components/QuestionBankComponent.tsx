"use client"


import { formatDate } from 'date-fns'
import { BankQuestionForm } from './BankQuestionForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart2, Download, Edit, Eye, FileDown, FileUp, Filter, Layers, MoreHorizontal, Trash2, Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Bank = {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    usageCount: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
    status: 'draft' | 'published' | 'archived';
    lastUpdated: string;
    shared?: boolean;
    categories?: string[];
};

const QuestionBankComponent = ({ classId, subjectId, banks }: { classId: string, subjectId: string, banks: Bank[] }) => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState<"name" | "updated" | "questions" | "difficulty">("updated")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


    const params = useParams()

    const { schoolId, userId } = params


    const filteredBanks = banks
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
        });


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
        <div className='container'>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="updated">Last Updated</SelectItem>
                                <SelectItem value="questions">Question Count</SelectItem>
                                <SelectItem value="difficulty">Difficulty</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                            {sortOrder === "asc" ? <FileUp className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("grid")}
                        >
                            <Layers className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setViewMode("list")}
                        >
                            <BarChart2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {filteredBanks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-lg border border-dashed bg-muted/30">
                        <div className="bg-primary/10 p-3 rounded-full mb-4">
                            <Layers className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No question banks found</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                            You haven&apos;t created any question banks yet. Get started by creating your first question bank to organize
                            your questions.
                        </p>
                        <Button>
                            Create Question Bank
                            <Edit className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}


                {viewMode === "grid" ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBanks.map((bank) => (
                            <Link key={bank._id} href={`/${schoolId}/admin/${userId}/exam/questions/${classId}-${subjectId}/question/${bank._id}`}>
                                <Card
                                    className="cursor-pointer transition-all hover:shadow-md"
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{bank.name}</CardTitle>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // handleBankSelect(bank)
                                                        }}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Questions
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // setShowExportDialog(true)
                                                        }}
                                                    >
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Export
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // setShowShareDialog(true)
                                                        }}
                                                    >
                                                        <Users className="mr-2 h-4 w-4" />
                                                        Share
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // setShowDeleteDialog(true)
                                                        }}
                                                        className="text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <CardDescription className="line-clamp-2">{bank.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">Questions</span>
                                                <span className="text-2xl font-bold">{bank.questionCount}</span>
                                            </div>
                                            
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Badge variant="outline" className={getDifficultyColor(bank.difficulty)}>
                                                {bank.difficulty.charAt(0).toUpperCase() + bank.difficulty.slice(1)}
                                            </Badge>
                                            <Badge variant="outline" className={getStatusColor(bank.status)}>
                                                {bank.status.charAt(0).toUpperCase() + bank.status.slice(1)}
                                            </Badge>
                                            {bank.shared && (
                                                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-600">
                                                    Shared
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-2">
                                        <div className="flex flex-wrap gap-1">
                                            {bank?.categories?.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {(bank?.categories?.length ?? 0) > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{(bank.categories?.length ?? 0) - 2}
                                                </Badge>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">Updated {formatDate(bank.lastUpdated)}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                            <div className="col-span-4">Name</div>
                            <div className="col-span-2">Questions</div>
                            <div className="col-span-2">Difficulty</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Last Updated</div>
                        </div>
                        {filteredBanks.map((bank) => (
                            <div
                                key={bank.id}
                                className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer border-b last:border-0"
                                onClick={() => { }}
                            >
                                <div className="col-span-4">
                                    <div className="font-medium">{bank.name}</div>
                                    <div className="text-sm text-muted-foreground line-clamp-1">{bank.description}</div>
                                </div>
                                <div className="col-span-2 flex items-center">{bank.questionCount}</div>
                                <div className="col-span-2 flex items-center">
                                    <Badge variant="outline" className={getDifficultyColor(bank.difficulty)}>
                                        {bank.difficulty.charAt(0).toUpperCase() + bank.difficulty.slice(1)}
                                    </Badge>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <Badge variant="outline" className={getStatusColor(bank.status)}>
                                        {bank.status.charAt(0).toUpperCase() + bank.status.slice(1)}
                                    </Badge>
                                </div>
                                <div className="col-span-2 flex items-center text-sm text-muted-foreground">
                                    {formatDate(bank.lastUpdated)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default QuestionBankComponent
