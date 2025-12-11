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
  adaCourses: Course[]
  showAllQuestions?: boolean
  setShowAllQuestions?: (v: boolean) => void
}

export function DashboardSidebar({ userInfo, semester, adaCourses, showAllQuestions = false, setShowAllQuestions }: DashboardSidebarProps) {
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
        <CardHeader className="pb-1 ">
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
              <code className="text-xs bg-background px-2 py-1 rounded text-muted-foreground font-mono block w-fit">
                {semester.hash}
              </code>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-sidebar-accent border-sidebar-border flex-1 max-h-fit py-4">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            ADA Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
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
          {adaCourses.length > 0 ? (
            adaCourses.map((course) => (
              <div key={course.hash} className="p-2 bg-background rounded-md">
                <Badge variant="secondary" className="mb-1">
                  {course.shortName}
                </Badge>
                <p className="text-xs text-muted-foreground font-mono truncate">{course.hash}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No ADA courses found</p>
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
