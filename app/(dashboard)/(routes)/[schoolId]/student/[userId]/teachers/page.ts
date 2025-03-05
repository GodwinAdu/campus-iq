// "use client"

// import { useState, useEffect } from "react"
// import {
//   Search,
//   Grid3X3,
//   List,
//   Star,
//   StarHalf,
//   Mail,
//   Phone,
//   MapPin,
//   BookOpen,
//   Clock,
//   Heart,
//   Download,
//   ArrowUpDown,
//   ExternalLink,
// } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Label } from "@/components/ui/label"

// // Types
// interface Teacher {
//   id: string
//   name: string
//   title: string
//   department: string
//   email: string
//   phone: string
//   office: string
//   officeHours: string[]
//   courses: string[]
//   expertise: string[]
//   bio: string
//   imageUrl: string
//   rating: number
//   reviews: number
//   publications: number
//   experience: number
//   availability: {
//     day: string
//     slots: string[]
//   }[]
//   education: {
//     degree: string
//     institution: string
//     year: number
//   }[]
//   socialLinks: {
//     type: string
//     url: string
//   }[]
//   isFavorite: boolean
// }

// export default function TeachersPage() {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
//   const [sortBy, setSortBy] = useState<string>("name")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
//   const [isLoading, setIsLoading] = useState(true)
//   const [teachers, setTeachers] = useState<Teacher[]>([])
//   const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
//   const [showProfileDialog, setShowProfileDialog] = useState(false)

//   // Mock data - in a real app, this would come from an API
//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setTeachers([
//         {
//           id: "1",
//           name: "Dr. Sarah Johnson",
//           title: "Associate Professor",
//           department: "Computer Science",
//           email: "sarah.johnson@university.edu",
//           phone: "(555) 123-4567",
//           office: "Tech Building, Room 305",
//           officeHours: ["Monday 2-4 PM", "Thursday 1-3 PM"],
//           courses: ["Introduction to Programming", "Data Structures", "Algorithms"],
//           expertise: ["Machine Learning", "Artificial Intelligence", "Data Science"],
//           bio: "Dr. Johnson specializes in machine learning and artificial intelligence. She has over 10 years of experience in both academia and industry.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.8,
//           reviews: 124,
//           publications: 45,
//           experience: 12,
//           availability: [
//             { day: "Monday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
//             { day: "Wednesday", slots: ["11:00 AM", "3:00 PM"] },
//             { day: "Friday", slots: ["9:00 AM", "1:00 PM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: 2010 },
//             { degree: "M.S. in Computer Science", institution: "MIT", year: 2006 },
//             { degree: "B.S. in Computer Engineering", institution: "UC Berkeley", year: 2004 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/sarahjohnson" },
//             { type: "Twitter", url: "https://twitter.com/sarahjohnson" },
//             { type: "ResearchGate", url: "https://researchgate.net/profile/SarahJohnson" },
//           ],
//           isFavorite: true,
//         },
//         {
//           id: "2",
//           name: "Prof. Michael Chen",
//           title: "Full Professor",
//           department: "Mathematics",
//           email: "michael.chen@university.edu",
//           phone: "(555) 987-6543",
//           office: "Math Building, Room 210",
//           officeHours: ["Tuesday 10-12 PM", "Friday 2-4 PM"],
//           courses: ["Calculus I", "Linear Algebra", "Differential Equations"],
//           expertise: ["Number Theory", "Cryptography", "Mathematical Modeling"],
//           bio: "Prof. Chen is a renowned mathematician specializing in number theory and its applications to cryptography. He has published extensively in top-tier journals.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.5,
//           reviews: 98,
//           publications: 67,
//           experience: 18,
//           availability: [
//             { day: "Tuesday", slots: ["9:00 AM", "1:00 PM"] },
//             { day: "Thursday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Mathematics", institution: "Princeton University", year: 2002 },
//             { degree: "M.S. in Mathematics", institution: "Harvard University", year: 1998 },
//             { degree: "B.S. in Mathematics", institution: "UCLA", year: 1996 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/michaelchen" },
//             { type: "ResearchGate", url: "https://researchgate.net/profile/MichaelChen" },
//           ],
//           isFavorite: false,
//         },
//         {
//           id: "3",
//           name: "Dr. Emily Rodriguez",
//           title: "Assistant Professor",
//           department: "Biology",
//           email: "emily.rodriguez@university.edu",
//           phone: "(555) 456-7890",
//           office: "Science Center, Room 405",
//           officeHours: ["Monday 1-3 PM", "Wednesday 10-12 PM"],
//           courses: ["Introduction to Biology", "Cell Biology", "Genetics"],
//           expertise: ["Molecular Biology", "Genetics", "Biotechnology"],
//           bio: "Dr. Rodriguez focuses on molecular biology and genetics research. Her work has contributed significantly to understanding genetic disorders.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.7,
//           reviews: 87,
//           publications: 32,
//           experience: 8,
//           availability: [
//             { day: "Monday", slots: ["9:00 AM", "1:00 PM"] },
//             { day: "Wednesday", slots: ["10:00 AM", "2:00 PM"] },
//             { day: "Friday", slots: ["11:00 AM", "3:00 PM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Molecular Biology", institution: "Johns Hopkins University", year: 2012 },
//             { degree: "M.S. in Biology", institution: "University of Michigan", year: 2008 },
//             { degree: "B.S. in Biology", institution: "University of Texas", year: 2006 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/emilyrodriguez" },
//             { type: "Twitter", url: "https://twitter.com/emilyrodriguez" },
//           ],
//           isFavorite: true,
//         },
//         {
//           id: "4",
//           name: "Prof. David Wilson",
//           title: "Associate Professor",
//           department: "Physics",
//           email: "david.wilson@university.edu",
//           phone: "(555) 789-0123",
//           office: "Physics Building, Room 112",
//           officeHours: ["Tuesday 2-4 PM", "Thursday 10-12 PM"],
//           courses: ["Physics I", "Quantum Mechanics", "Thermodynamics"],
//           expertise: ["Quantum Physics", "Theoretical Physics", "Astrophysics"],
//           bio: "Prof. Wilson is a theoretical physicist with expertise in quantum mechanics and astrophysics. His research has been funded by multiple national grants.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.6,
//           reviews: 76,
//           publications: 41,
//           experience: 14,
//           availability: [
//             { day: "Tuesday", slots: ["11:00 AM", "3:00 PM"] },
//             { day: "Thursday", slots: ["9:00 AM", "1:00 PM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Physics", institution: "Caltech", year: 2006 },
//             { degree: "M.S. in Physics", institution: "University of Chicago", year: 2002 },
//             { degree: "B.S. in Physics", institution: "Cornell University", year: 2000 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/davidwilson" },
//             { type: "ResearchGate", url: "https://researchgate.net/profile/DavidWilson" },
//           ],
//           isFavorite: false,
//         },
//         {
//           id: "5",
//           name: "Dr. Lisa Thompson",
//           title: "Full Professor",
//           department: "Chemistry",
//           email: "lisa.thompson@university.edu",
//           phone: "(555) 234-5678",
//           office: "Chemistry Building, Room 301",
//           officeHours: ["Wednesday 1-3 PM", "Friday 10-12 PM"],
//           courses: ["General Chemistry", "Organic Chemistry", "Biochemistry"],
//           expertise: ["Organic Chemistry", "Medicinal Chemistry", "Drug Discovery"],
//           bio: "Dr. Thompson is a leading researcher in medicinal chemistry and drug discovery. She has collaborated with pharmaceutical companies on developing new medications.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.9,
//           reviews: 112,
//           publications: 58,
//           experience: 16,
//           availability: [
//             { day: "Monday", slots: ["10:00 AM", "2:00 PM"] },
//             { day: "Wednesday", slots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
//             { day: "Friday", slots: ["11:00 AM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Chemistry", institution: "Yale University", year: 2004 },
//             { degree: "M.S. in Chemistry", institution: "Columbia University", year: 2000 },
//             { degree: "B.S. in Chemistry", institution: "Duke University", year: 1998 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/lisathompson" },
//             { type: "Twitter", url: "https://twitter.com/lisathompson" },
//             { type: "ResearchGate", url: "https://researchgate.net/profile/LisaThompson" },
//           ],
//           isFavorite: true,
//         },
//         {
//           id: "6",
//           name: "Prof. Robert Kim",
//           title: "Assistant Professor",
//           department: "Computer Science",
//           email: "robert.kim@university.edu",
//           phone: "(555) 345-6789",
//           office: "Tech Building, Room 210",
//           officeHours: ["Monday 10-12 PM", "Thursday 2-4 PM"],
//           courses: ["Web Development", "Mobile App Development", "Software Engineering"],
//           expertise: ["Web Technologies", "Mobile Computing", "Human-Computer Interaction"],
//           bio: "Prof. Kim specializes in web and mobile application development. He has industry experience working with major tech companies before joining academia.",
//           imageUrl: "/placeholder.svg?height=400&width=400",
//           rating: 4.7,
//           reviews: 92,
//           publications: 24,
//           experience: 9,
//           availability: [
//             { day: "Monday", slots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
//             { day: "Wednesday", slots: ["10:00 AM", "2:00 PM"] },
//             { day: "Friday", slots: ["11:00 AM"] },
//           ],
//           education: [
//             { degree: "Ph.D. in Computer Science", institution: "University of Washington", year: 2014 },
//             { degree: "M.S. in Computer Science", institution: "Georgia Tech", year: 2010 },
//             { degree: "B.S. in Computer Science", institution: "University of Illinois", year: 2008 },
//           ],
//           socialLinks: [
//             { type: "LinkedIn", url: "https://linkedin.com/in/robertkim" },
//             { type: "GitHub", url: "https://github.com/robertkim" },
//             { type: "Twitter", url: "https://twitter.com/robertkim" },
//           ],
//           isFavorite: false,
//         },
//       ])
//       setIsLoading(false)
//     }, 1500)
//   }, [])

//   // Filter teachers based on search query and department
//   const filteredTeachers = teachers.filter((teacher) => {
//     const matchesSearch =
//       teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       teacher.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))

//     const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment

//     return matchesSearch && matchesDepartment
//   })

//   // Sort teachers
//   const sortedTeachers = [...filteredTeachers].sort((a, b) => {
//     let comparison = 0

//     switch (sortBy) {
//       case "name":
//         comparison = a.name.localeCompare(b.name)
//         break
//       case "department":
//         comparison = a.department.localeCompare(b.department)
//         break
//       case "rating":
//         comparison = b.rating - a.rating
//         break
//       case "experience":
//         comparison = b.experience - a.experience
//         break
//       default:
//         comparison = a.name.localeCompare(b.name)
//     }

//     return sortOrder === "asc" ? comparison : -comparison
//   })

//   // Get unique departments for filter
//   const departments = ["all", ...Array.from(new Set(teachers.map((teacher) => teacher.department)))]

//   // Toggle favorite status
//   const toggleFavorite = (id: string) => {
//     setTeachers(
//       teachers.map((teacher) => (teacher.id === id ? { ...teacher, isFavorite: !teacher.isFavorite } : teacher)),
//     )
//   }

//   // Open teacher profile dialog
//   const openTeacherProfile = (teacher: Teacher) => {
//     setSelectedTeacher(teacher)
//     setShowProfileDialog(true)
//   }

// //   // Render star rating
// //   const renderRating = (rating: number) => {
// //     const fullStars = Math.floor(rating)
// //     const hasHalfStar = rating % 1 >= 0.5

// //     return (
// //       <div className="flex items-center">
// //         {[...Array(fullStars)].map((_, i) => (
// //           <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
// //         ))}
// //         {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
// //         {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
// //           <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
// //         ))}
// //         <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
// //       </div>
// //     )
// //   }

//   return (
//     <>
//     <div className="space-y-6">
//       <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
//         <div>
//           <h1 className="text-3xl font-bold">Faculty Directory</h1>
//           <p className="text-muted-foreground">Connect with your professors and instructors</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "outline"}
//                   size="icon"
//                   onClick={() => setViewMode("grid")}
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>Grid View</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "outline"}
//                   size="icon"
//                   onClick={() => setViewMode("list")}
//                 >
//                   <List className="h-4 w-4" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>List View</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>

//       <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
//         <div className="flex-1 space-y-2">
//           <Label htmlFor="search">Search</Label>
//           <div className="relative">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="search"
//               placeholder="Search by name, department, or expertise..."
//               className="pl-8"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="w-full md:w-[200px] space-y-2">
//           <Label htmlFor="department">Department</Label>
//           <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
//             <SelectTrigger id="department">
//               <SelectValue placeholder="Select department" />
//             </SelectTrigger>
//             <SelectContent>
//               {departments.map((dept) => (
//                 <SelectItem key={dept} value={dept}>
//                   {dept === "all" ? "All Departments" : dept}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="w-full md:w-[200px] space-y-2">
//           <Label htmlFor="sortBy">Sort By</Label>
//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger id="sortBy">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="name">Name</SelectItem>
//               <SelectItem value="department">Department</SelectItem>
//               <SelectItem value="rating">Rating</SelectItem>
//               <SelectItem value="experience">Experience</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//           className="h-10 w-10"
//         >
//           <ArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""} transition-transform`} />
//         </Button>
//       </div>

//       {isLoading ? (
//         <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className={viewMode === "grid" ? "" : "flex"}>
//               <Card className={viewMode === "list" ? "flex flex-row" : ""}>
//                 <CardContent className={`p-6 ${viewMode === "list" ? "flex flex-1 items-center space-x-4" : ""}`}>
//                   <div className={viewMode === "list" ? "flex items-center space-x-4" : "space-y-4"}>
//                     <Skeleton className="h-12 w-12 rounded-full" />
//                     <div className="space-y-2">
//                       <Skeleton className="h-4 w-[250px]" />
//                       <Skeleton className="h-4 w-[200px]" />
//                       <Skeleton className="h-4 w-[150px]" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//         </>
//       ) : (
//         <>
//           {sortedTeachers.length === 0 ? (
//             <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
//               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
//                 <Search className="h-10 w-10 text-muted-foreground" />
//                 <h3 className="mt-4 text-lg font-semibold">No teachers found</h3>
//                 <p className="mb-4 mt-2 text-sm text-muted-foreground">
//                   We couldn't find any teachers matching your search criteria. Try adjusting your filters.
//                 </p>
//                 <Button
//                   onClick={() => {
//                     setSearchQuery("")
//                     setSelectedDepartment("all")
//                   }}
//                 >
//                   Reset Filters
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={viewMode}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={viewMode === "grid" ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}
//               >
//                 {sortedTeachers.map((teacher) => (
//                   <motion.div
//                     key={teacher.id}
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className={viewMode === "list" ? "overflow-hidden" : ""}>
//                       {viewMode === "grid" ? (
//                         <>
//                           <CardHeader className="relative pb-2">
//                             <div className="absolute right-4 top-4 z-10">
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
//                                 onClick={() => toggleFavorite(teacher.id)}
//                               >
//                                 <Heart
//                                   className={`h-4 w-4 ${teacher.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
//                                 />
//                               </Button>
//                             </div>
//                             <div className="flex flex-col items-center">
//                               <Avatar className="h-24 w-24">
//                                 <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
//                                 <AvatarFallback>
//                                   {teacher.name
//                                     .split(" ")
//                                     .map((n) => n[0])
//                                     .join("")}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <CardTitle className="mt-4 text-center">{teacher.name}</CardTitle>
//                               <CardDescription className="text-center">{teacher.title}</CardDescription>
//                               <Badge variant="outline" className="mt-2">
//                                 {teacher.department}
//                               </Badge>
//                             </div>
//                           </CardHeader>
//                           <CardContent className="pb-2">
//                             <div className="space-y-4">
//                               <div className="flex justify-center">
//                                 {renderRating(teacher.rating)}
//                                 <span className="ml-2 text-sm text-muted-foreground">({teacher.reviews} reviews)</span>
//                               </div>
//                               <div className="flex flex-wrap gap-2 justify-center">
//                                 {teacher.expertise.slice(0, 3).map((exp, i) => (
//                                   <Badge key={i} variant="secondary">
//                                     {exp}
//                                   </Badge>
//                                 ))}
//                               </div>
//                               <div className="flex items-center justify-center space-x-4">
//                                 <div className="flex flex-col items-center">
//                                   <span className="text-lg font-bold">{teacher.publications}</span>
//                                   <span className="text-xs text-muted-foreground">Publications</span>
//                                 </div>
//                                 <div className="h-10 border-l"></div>
//                                 <div className="flex flex-col items-center">
//                                   <span className="text-lg font-bold">{teacher.experience}</span>
//                                   <span className="text-xs text-muted-foreground">Years</span>
//                                 </div>
//                                 <div className="h-10 border-l"></div>
//                                 <div className="flex flex-col items-center">
//                                   <span className="text-lg font-bold">{teacher.courses.length}</span>
//                                   <span className="text-xs text-muted-foreground">Courses</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </CardContent>
//                           <CardFooter className="flex justify-between pt-2">
//                             <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${teacher.email}`)}>
//                               <Mail className="mr-2 h-4 w-4" />
//                               Contact
//                             </Button>
//                             <Button size="sm" onClick={() => openTeacherProfile(teacher)}>
//                               View Profile
//                             </Button>
//                           </CardFooter>
//                         </>
//                       ) : (
//                         <div className="flex flex-col md:flex-row">
//                           <div className="flex items-center justify-center p-6 md:w-[180px]">
//                             <Avatar className="h-20 w-20">
//                               <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
//                               <AvatarFallback>
//                                 {teacher.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </AvatarFallback>
//                             </Avatar>
//                           </div>
//                           <div className="flex-1 p-6 pt-0 md:pt-6">
//                             <div className="flex flex-col md:flex-row md:items-start md:justify-between">
//                               <div>
//                                 <h3 className="text-lg font-semibold">{teacher.name}</h3>
//                                 <p className="text-sm text-muted-foreground">
//                                   {teacher.title} • {teacher.department}
//                                 </p>
//                                 <div className="mt-1">{renderRating(teacher.rating)}</div>
//                               </div>
//                               <div className="mt-4 flex md:mt-0">
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="h-8 w-8"
//                                   onClick={() => toggleFavorite(teacher.id)}
//                                 >
//                                   <Heart
//                                     className={`h-4 w-4 ${teacher.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
//                                   />
//                                 </Button>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="h-8 w-8"
//                                   onClick={() => window.open(`mailto:${teacher.email}`)}
//                                 >
//                                   <Mail className="h-4 w-4" />
//                                 </Button>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="h-8 w-8"
//                                   onClick={() => window.open(`tel:${teacher.phone}`)}
//                                 >
//                                   <Phone className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </div>
//                             <div className="mt-4 flex flex-wrap gap-2">
//                               {teacher.expertise.map((exp, i) => (
//                                 <Badge key={i} variant="secondary">
//                                   {exp}
//                                 </Badge>
//                               ))}
//                             </div>
//                             <div className="mt-4">
//                               <p className="line-clamp-2 text-sm">{teacher.bio}</p>
//                             </div>
//                             <div className="mt-4 flex justify-end">
//                               <Button size="sm" onClick={() => openTeacherProfile(teacher)}>
//                                 View Profile
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Card>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </>
//       )}

//       <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
//         <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
//           {selectedTeacher && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="text-2xl">{selectedTeacher.name}</DialogTitle>
//                 <DialogDescription>
//                   {selectedTeacher.title} • {selectedTeacher.department}
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                 <div className="flex flex-col items-center space-y-4">
//                   <Avatar className="h-32 w-32">
//                     <AvatarImage src={selectedTeacher.imageUrl} alt={selectedTeacher.name} />
//                     <AvatarFallback>
//                       {selectedTeacher.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="text-center">
//                     {renderRating(selectedTeacher.rating)}
//                     <p className="text-sm text-muted-foreground">{selectedTeacher.reviews} reviews</p>
//                   </div>
//                   <div className="w-full space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{selectedTeacher.email}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{selectedTeacher.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{selectedTeacher.office}</span>
//                     </div>
//                   </div>
//                   <div className="w-full">
//                     <h4 className="mb-2 font-medium">Office Hours</h4>
//                     <div className="space-y-1">
//                       {selectedTeacher.officeHours.map((hours, i) => (
//                         <div key={i} className="flex items-center space-x-2">
//                           <Clock className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-sm">{hours}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="w-full">
//                     <h4 className="mb-2 font-medium">Connect</h4>
//                     <div className="flex space-x-2">
//                       {selectedTeacher.socialLinks.map((link, i) => (
//                         <Button key={i} variant="outline" size="sm" asChild>
//                           <a href={link.url} target="_blank" rel="noopener noreferrer">
//                             {link.type}
//                             <ExternalLink className="ml-1 h-3 w-3" />
//                           </a>
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-6">
//                   <Tabs defaultValue="about">
//                     <TabsList className="grid w-full grid-cols-4">
//                       <TabsTrigger value="about">About</TabsTrigger>
//                       <TabsTrigger value="courses">Courses</TabsTrigger>
//                       <TabsTrigger value="availability">Availability</TabsTrigger>
//                       <TabsTrigger value="publications">Publications</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="about" className="space-y-4">
//                       <div>
//                         <h4 className="mb-2 font-medium">Biography</h4>
//                         <p className="text-sm">{selectedTeacher.bio}</p>
//                       </div>
//                       <div>
//                         <h4 className="mb-2 font-medium">Areas of Expertise</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedTeacher.expertise.map((exp, i) => (
//                             <Badge key={i} variant="secondary">
//                               {exp}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="mb-2 font-medium">Education</h4>
//                         <div className="space-y-2">
//                           {selectedTeacher.education.map((edu, i) => (
//                             <div key={i} className="rounded-lg border p-3">
//                               <div className="flex items-center justify-between">
//                                 <div className="font-medium">{edu.degree}</div>
//                                 <Badge variant="outline">{edu.year}</Badge>
//                               </div>
//                               <div className="text-sm text-muted-foreground">{edu.institution}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="courses" className="space-y-4">
//                       <div className="space-y-2">
//                         {selectedTeacher.courses.map((course, i) => (
//                           <Card key={i}>
//                             <CardContent className="flex items-center justify-between p-4">
//                               <div className="flex items-center space-x-2">
//                                 <BookOpen className="h-4 w-4 text-muted-foreground" />
//                                 <span>{course}</span>
//                               </div>
//                               <Button variant="ghost" size="sm">
//                                 View Details
//                               </Button>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="availability" className="space-y-4">
//                       <div className="space-y-4">
//                         {selectedTeacher.availability.map((avail, i) => (
//                           <div key={i} className="rounded-lg border p-4">
//                             <h4 className="mb-2 font-medium">{avail.day}</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {avail.slots.map((slot, j) => (
//                                 <Badge key={j} variant="outline">
//                                   {slot}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="publications" className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium">Recent Publications</h4>
//                         <Badge variant="secondary">{selectedTeacher.publications} total</Badge>
//                       </div>
//                       <div className="space-y-2">
//                         {/* Mock publications - in a real app, these would come from the API */}
//                         {[...Array(3)].map((_, i) => (
//                           <Card key={i}>
//                             <CardContent className="p-4">
//                               <h5 className="font-medium">
//                                 {
//                                   [
//                                     "Advances in Machine Learning Algorithms",
//                                     "Novel Approaches to Quantum Computing",
//                                     "The Future of Artificial Intelligence in Education",
//                                   ][i]
//                                 }
//                               </h5>
//                               <p className="text-sm text-muted-foreground">
//                                 {
//                                   [
//                                     "Journal of Computer Science",
//                                     "International Physics Review",
//                                     "Educational Technology Journal",
//                                   ][i]
//                                 }{" "}
//                                 • {2023 - i}
//                               </p>
//                               <div className="mt-2 flex justify-end">
//                                 <Button variant="ghost" size="sm">
//                                   <Download className="mr-1 h-4 w-4" />
//                                   Download PDF
//                                 </Button>
//                               </div>
//                             </CardContent>
//                           </Card>
//                         ))}
//                       </div>
//                       <div className="flex justify-center">
//                         <Button variant="outline">View All Publications</Button>
//                       </div>
//                     </TabsContent>
//                   </Tabs>
//                   <div className="space-y-4">
//                     <h4 className="font-medium">Schedule a Meeting</h4>
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div>
//                         <Label htmlFor="meeting-reason">Reason for Meeting</Label>
//                         <Select>
//                           <SelectTrigger id="meeting-reason">
//                             <SelectValue placeholder="Select reason" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="office-hours">Office Hours</SelectItem>
//                             <SelectItem value="academic-advising">Academic Advising</SelectItem>
//                             <SelectItem value="research-discussion">Research Discussion</SelectItem>
//                             <SelectItem value="other">Other</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div>
//                         <Label htmlFor="meeting-date">Preferred Date</Label>
//                         <Input id="meeting-date" type="date" />
//                       </div>
//                     </div>
//                     <Button className="w-full">Request Meeting</Button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

