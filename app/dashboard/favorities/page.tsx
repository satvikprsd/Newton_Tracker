"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AssignmentList } from "@/components/assignment-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft } from "lucide-react"
import type { Assignment, FavoriteQuestion } from "@/lib/types"

const FAVORITES_STORAGE_KEY = "favoriteQuestions"
const COMPLETED_STORAGE_KEY = "completedQuestions"

const toAssignment = (favorite: FavoriteQuestion): Assignment => ({
  assignmentHash: favorite.assignmentHash || favorite.assignmenstHash,
  questionHash: favorite.questionHash,
  questionTitle: favorite.question_name,
  difficultyType: favorite.difficulty || "0",
  topics: favorite.topics || [],
  earnedPoints: 0,
  earnablePoints: 0,
  attemptStatus: "",
  deadline: null,
  courseHash: favorite.course_hash,
  courseName: favorite.courseName || favorite.course_hash,
})

const readFavorites = (): Record<string, FavoriteQuestion> => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY) || "{}"
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}

    const normalized: Record<string, FavoriteQuestion> = {}
    Object.entries(parsed).forEach(([key, value]) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return
      const candidate = value as Partial<FavoriteQuestion>
      if (!candidate.questionHash || !candidate.question_name) return
      normalized[key] = {
        course_hash: candidate.course_hash || "",
        assignmentHash: candidate.assignmentHash || candidate.assignmenstHash || "",
        assignmenstHash: candidate.assignmenstHash || candidate.assignmentHash || "",
        questionHash: candidate.questionHash,
        question_name: candidate.question_name,
        difficulty: candidate.difficulty || "0",
        topics: Array.isArray(candidate.topics) ? candidate.topics : [],
        courseName: candidate.courseName,
      }
    })

    return normalized
  } catch {
    return {}
  }
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Record<string, FavoriteQuestion>>({})
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const syncFromStorage = () => {
      setFavorites(readFavorites())
      try {
        const raw = localStorage.getItem(COMPLETED_STORAGE_KEY) || "{}"
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setCompleted(parsed as Record<string, boolean>)
        }
      } catch {
        setCompleted({})
      }
    }

    syncFromStorage()
    window.addEventListener("storage", syncFromStorage)
    window.addEventListener("favorites-updated", syncFromStorage)
    return () => {
      window.removeEventListener("storage", syncFromStorage)
      window.removeEventListener("favorites-updated", syncFromStorage)
    }
  }, [])

  const assignmentsByCourse = useMemo(() => {
    const grouped: Record<string, Assignment[]> = {}
    Object.values(favorites).forEach((favorite) => {
      const assignment = toAssignment(favorite)
      const key = assignment.courseName || "Unknown Course"
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(assignment)
    })
    return grouped
  }, [favorites])

  const total = Object.values(assignmentsByCourse).flat().length

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-400" />
              Favorites
            </h1>
            <p className="text-sm text-muted-foreground">{total} favorited questions</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {total === 0 ? (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>No favorites yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Star questions from any subject page to see them here.</p>
            </CardContent>
          </Card>
        ) : (
          <AssignmentList
            assignments={assignmentsByCourse}
            semester={null}
            completed={completed}
            setCompleted={setCompleted}
            showCompletion={false}
          />
        )}
      </main>
    </div>
  )
}
