"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, BookOpen, GraduationCap, ChevronLeft } from "lucide-react"
import type { UserInfo, Course } from "@/lib/types"

interface DashboardSidebarProps {
  userInfo: UserInfo | null
  semester: { hash: string; title: string } | null
  courses: Course[]
  showAllQuestions?: boolean
  subjectName: string
  setShowAllQuestions?: (v: boolean) => void
  completed?: number
  total?: number
  assignments?: Record<string, any[]>
  filteredAssignments?: Record<string, any[]>
  setFilteredAssignments?: React.Dispatch<React.SetStateAction<Record<string, any[]>>>
}

export function DashboardSidebar({ userInfo, semester, courses, subjectName, showAllQuestions = false, setShowAllQuestions, completed, total, assignments, filteredAssignments, setFilteredAssignments }: DashboardSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("semester-hash")
    localStorage.removeItem("user-info")
    localStorage.removeItem("ADA-courses")
    localStorage.removeItem("AP-courses")
    localStorage.removeItem("DBMS-courses")
    localStorage.removeItem("assignmentsCache-ADA")
    localStorage.removeItem("assignmentsCache-AP")
    localStorage.removeItem("assignmentsCache-DBMS")
    router.push("/")
  }

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border p-4 flex flex-col gap-4 overflow-y-auto">

      <Card className="bg-sidebar-accent border-sidebar-border gap-3 py-4">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
            <div className="pl-20">
              <Button variant="ghost" onClick={() => router.push("/dashboard")} className="w-full justify-start">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userInfo && (
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.first_name} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {userInfo.first_name?.[0]}
                  {userInfo.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">
                  {userInfo.first_name} {userInfo.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">@{userInfo.username}</p>
                <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-sidebar-accent border-sidebar-border gap-2 py-4">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Current Semester
          </CardTitle>
        </CardHeader>
        <CardContent>
          {semester && (
            <div className="space-y-2">
              <code className="text-xs bg-background px-2 py-1 rounded text-muted-foreground font-mono block wrap-break-words line-clamp-2">
                {semester.title}
              </code>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="gap-1">
        <CardHeader className="pb-1 ">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            Search Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Search by title"
            className="w-full px-3 py-1 border border-sidebar-border rounded text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => {
              const query = e.target.value.toLowerCase()
              if (setFilteredAssignments && assignments) {
                if (query.trim() === "") {
                  setFilteredAssignments(assignments)
                } else {
                  const newFiltered: Record<string, any[]> = {}
                  Object.entries(assignments).forEach(([courseName, assignmentList]) => {
                    const filteredList = assignmentList.filter((assignment) =>
                      assignment.questionTitle.toLowerCase().includes(query)
                    )
                    if (filteredList.length > 0) {
                      newFiltered[courseName] = filteredList
                    }
                  })
                  setFilteredAssignments(newFiltered)
                }
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-sidebar-accent border-sidebar-border flex-1 max-h-fit py-4 gap-3">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {subjectName} Courses
          </CardTitle>
          <Badge className="w-full mb-2 text-base" variant={completed === total ? "default" : "secondary"}>
                  {completed}/{total} completed
          </Badge>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center gap-2 pb-2">
            <input
              id="show-all-questions"
              type="checkbox"
              checked={showAllQuestions}
              onChange={(e) => setShowAllQuestions && setShowAllQuestions(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="show-all-questions" className="text-sm text-sidebar-foreground">
              Show all questions
            </label>
          </div>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.hash} className="p-1 rounded-md">
                <Badge variant="secondary" className="bg-background w-full text-sm py-1">
                  {course.shortName}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No {subjectName} courses found</p>
          )}
        </CardContent>
      </Card>

      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </aside>
  )
}
