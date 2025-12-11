"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AssignmentList } from "@/components/assignment-list"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import type { UserInfo, Course, Assignment } from "@/lib/types"
import { fetchWithAuth } from "@/utils/auth"

interface SubjectDashboardProps {
  subjectName: string
  courseTag: string
  excludeCourse?: string
  topicOrder: string[]
  mustReviseKeywords: string[]
}

export default function SubjectDashboard({ subjectName, courseTag, excludeCourse, topicOrder, mustReviseKeywords }: SubjectDashboardProps) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [semester, setSemester] = useState<{ hash: string; title: string } | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [allAssignments, setAllAssignments] = useState<Record<string, Assignment[]>>({})
  const [assignments, setAssignments] = useState<Record<string, Assignment[]>>({})
  const [loading, setLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false)

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[_\s]+/g, " ")
      .replace(/[^a-z0-9\- ]/g, "")

  const CACHE_KEY = `assignmentsCache-${subjectName}`

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      if (typeof window !== "undefined") {
        try {
          const userCached = localStorage.getItem("user-info")
          if (userCached) setUserInfo(JSON.parse(userCached))

          const sem = localStorage.getItem("semester-info")
          if (sem) setSemester(JSON.parse(sem))

          const coursesRaw = localStorage.getItem(`${subjectName}-courses`)
          if (coursesRaw) {
            try {
              const parsed = JSON.parse(coursesRaw)
              if (Array.isArray(parsed)) setCourses(parsed)
            } catch {}
          }
        } catch {}

        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          try {
            const parsed: Record<string, Assignment[]> = JSON.parse(cached)
            setAllAssignments(parsed)
            if (showAllQuestions) setAssignments(parsed)
            else {
              const kwNorm = mustReviseKeywords.map((k) => k.toLowerCase())
              const filtered: Record<string, Assignment[]> = {}
              for (const k of Object.keys(parsed)) {
                const list = (parsed[k] || []).filter((a) => kwNorm.some((kw) => (a.questionTitle || "").toLowerCase().includes(kw)))
                if (list.length > 0) filtered[k] = list
              }
              setAssignments(filtered)
            }
            setLoading(false)
            return
          } catch {
            // corrupted cache — continue
          }
        }
      }

      setLoadingStep("Fetching user info...")
      let userData = userInfo
      if (!userData) {
        userData = await fetchWithAuth("https://my.newtonschool.co/api/v1/user/me/")
        setUserInfo(userData)
        try {
          if (typeof window !== "undefined") localStorage.setItem("user-info", JSON.stringify(userData))
        } catch {}
      }

      setLoadingStep("Finding current semester...")
      const coursesData = await fetchWithAuth(
        "https://my.newtonschool.co/api/v2/course/all/applied/?pagination=false&completed=false",
      )

      const currentCourse = coursesData.find((c: { title: string }) => c.title.includes("RU") && !c.title.includes("All Content"))
      const semesterCourse = currentCourse.children_courses.admin_unit_courses.find((c: { title: string }) => c.title.includes("Semester 3"))
      if (!semesterCourse) throw new Error("Could not find current semester course")
      const semObj = { hash: semesterCourse.hash, title: semesterCourse.title }
      setSemester(semObj)
      try {
        if (typeof window !== "undefined") localStorage.setItem("semester-info", JSON.stringify(semObj))
      } catch {}

      setLoadingStep(`Finding ${subjectName} courses...`)
      const userCourseInfo = await fetchWithAuth("https://my.newtonschool.co/api/v1/user/me/info/")
      const subjectCourses: Course[] = []
      if (userCourseInfo.current_active_course_user_mapping?.active_learning_course_user_mappings) {
        for (const mapping of userCourseInfo.current_active_course_user_mapping.active_learning_course_user_mappings) {
          if (mapping.course?.short_display_name?.includes(courseTag) && (!excludeCourse || !mapping.course?.short_display_name?.includes(excludeCourse))) {
            subjectCourses.push({
              hash: mapping.course.hash,
              title: mapping.course.title || mapping.course.short_display_name,
              shortName: mapping.course.short_display_name,
            })
          }
        }
      }
      setCourses(subjectCourses)
      try {
        if (typeof window !== "undefined") localStorage.setItem(`${subjectName}-courses`, JSON.stringify(subjectCourses))
      } catch {}

      setLoadingStep("Loading assignments...")
      const assignmentsByGroup: Record<string, Assignment[]> = {}
      const normalizedOrder = topicOrder.map(normalize)

      for (const course of subjectCourses) {
        try {
          const assignmentsData = await fetchWithAuth(
            `https://my.newtonschool.co/api/v2/course/h/${semesterCourse.hash}/assignment/all/?limit=1000&learning_course_hash=${course.hash}&offset=0&attempt_statuses=&difficulty_types=&filter_topic_slugs=`,
          )

          if (assignmentsData.results) {
            for (const result of assignmentsData.results) {
              if (!result.assignment_questions) continue
              for (const question of result.assignment_questions) {
                const assignmentObj: Assignment = {
                  assignmentHash: result.hash,
                  questionHash: question.hash,
                  questionTitle: question.question_title,
                  difficultyType: question.difficulty_type,
                  topics: question.topics || [],
                  earnedPoints: question.earned_points || 0,
                  earnablePoints: result.earnable_points || 0,
                  attemptStatus: question.attempt_status,
                  deadline: result.deadline,
                  courseHash: course.hash,
                  courseName: course.shortName,
                }

                const rawTopics: string[] = assignmentObj.topics.length ? assignmentObj.topics : ["Uncategorized"]
                const unique = Array.from(new Set(rawTopics))
                let chosenTopic = unique[0]
                if (unique.length > 1) {
                  let bestIdx = -Infinity
                  for (const t of unique) {
                    const ni = normalize(t)
                    const ord = normalizedOrder.indexOf(ni)
                    const score = ord === -1 ? -1 : ord
                    if (score > bestIdx) {
                      bestIdx = score
                      chosenTopic = t
                    }
                  }
                }

                if (!assignmentsByGroup[chosenTopic]) assignmentsByGroup[chosenTopic] = []
                if (!assignmentsByGroup[chosenTopic].some((a) => a.questionHash === assignmentObj.questionHash)) {
                  assignmentsByGroup[chosenTopic].push(assignmentObj)
                }
              }
            }
          }
        } catch (e) {
          // ignore individual course failures
        }
      }

      const keys = Object.keys(assignmentsByGroup)
      keys.sort((a, b) => {
        if (a === "Uncategorized" && b !== "Uncategorized") return -1
        if (b === "Uncategorized" && a !== "Uncategorized") return 1

        const na = normalize(a)
        const nb = normalize(b)
        const ia = normalizedOrder.indexOf(na)
        const ib = normalizedOrder.indexOf(nb)
        if (ia !== -1 && ib !== -1) return ia - ib
        if (ia !== -1) return -1
        if (ib !== -1) return 1
        return a.localeCompare(b)
      })

      const orderedAssignments: Record<string, Assignment[]> = {}
      for (const k of keys) {
        const list = (assignmentsByGroup[k] || []).slice()
        list.sort((a, b) => {
          const da = parseInt(String(a.difficultyType ?? "0"), 10)
          const db = parseInt(String(b.difficultyType ?? "0"), 10)
          const na = Number.isNaN(da) ? 0 : da
          const nb = Number.isNaN(db) ? 0 : db
          return na - nb
        })
        orderedAssignments[k] = list
      }

      setAllAssignments(orderedAssignments)
      try {
        if (typeof window !== "undefined") localStorage.setItem(CACHE_KEY, JSON.stringify(orderedAssignments))
      } catch {}

      const kwNorm = mustReviseKeywords.map((k) => k.toLowerCase())
      const filteredAssignments: Record<string, Assignment[]> = {}
      if (showAllQuestions) Object.assign(filteredAssignments, orderedAssignments)
      else {
        for (const k of keys) {
          const list = orderedAssignments[k].filter((a) => kwNorm.some((kw) => (a.questionTitle || "").toLowerCase().includes(kw)))
          if (list.length > 0) filteredAssignments[k] = list
        }
      }

      setAssignments(filteredAssignments)
      setLoading(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred"
      setError(message)
      setLoading(false)
      if (message.includes("Invalid token") || message.includes("No token")) {
        localStorage.removeItem("auth-token")
        router.push("/")
      }
    }
  }

  useEffect(() => {
    // ensure assignments cache is kept when toggling filter
    const filtered: Record<string, Assignment[]> = {}
    if (showAllQuestions) Object.assign(filtered, allAssignments)
    else {
      const kwNorm = mustReviseKeywords.map((k) => k.toLowerCase())
      for (const k of Object.keys(allAssignments)) {
        const list = allAssignments[k].filter((a) => kwNorm.some((kw) => (a.questionTitle || "").toLowerCase().includes(kw)))
        if (list.length > 0) filtered[k] = list
      }
    }
    setAssignments(filtered)
    try {
      if (typeof window !== "undefined" && Object.keys(allAssignments).length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(allAssignments))
      }
    } catch {}
  }, [showAllQuestions])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (!token) {
      router.push("/")
      return
    }
    loadDashboard()
  }, [router])

  if (loading) return <LoadingState step={loadingStep} />
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar showAllQuestions={showAllQuestions} setShowAllQuestions={setShowAllQuestions} userInfo={userInfo} semester={semester} adaCourses={courses} />
      <main className="flex-1 p-6 max-h-screen overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">{subjectName} Revision {Object.values(assignments).flat().length}</h1>
          <AssignmentList assignments={assignments} semester={semester} />
        </div>
      </main>
    </div>
  )
}
