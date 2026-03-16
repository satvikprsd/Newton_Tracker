"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, Star } from "lucide-react"
import type { Assignment, FavoriteQuestion } from "@/lib/types"
import { fetchWithAuth } from "@/utils/auth"

interface AssignmentCardProps {
  assignment: Assignment
  semester: { hash: string; title: string } | null
  completed: Record<string, boolean>
  setCompleted: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  showCompletion?: boolean
}

export function AssignmentCard({ assignment, semester, completed, setCompleted, showCompletion = true }: AssignmentCardProps) {
  const [playgroundLink, setPlaygroundLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const COMPLETED_STORAGE_KEY = "completedQuestions"
  const FAVORITES_STORAGE_KEY = "favoriteQuestions"

  const readFavorites = (): Record<string, FavoriteQuestion> => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY) || "{}"
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}
      return parsed as Record<string, FavoriteQuestion>
    } catch {
      return {}
    }
  }

  useEffect(() => {
    const favorites = readFavorites()
    setIsFavorite(!!favorites[assignment.questionHash])
  }, [assignment.questionHash])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_STORAGE_KEY) || "{}"
      const obj = JSON.parse(raw)
      obj[assignment.questionHash] = !!completed[assignment.questionHash]
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(obj))
    } catch {
    }
  }, [assignment.questionHash, completed])

  const toggleFavorite = () => {
    const next = !isFavorite
    const favorites = readFavorites()

    if (next) {
      favorites[assignment.questionHash] = {
        course_hash: assignment.courseHash,
        assignmentHash: assignment.assignmentHash,
        assignmenstHash: assignment.assignmentHash,
        questionHash: assignment.questionHash,
        question_name: assignment.questionTitle,
        difficulty: assignment.difficultyType,
        topics: assignment.topics || [],
        courseName: assignment.courseName,
      }
    } else {
      delete favorites[assignment.questionHash]
    }

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
      window.dispatchEvent(new Event("favorites-updated"))
    } catch {
    }

    setIsFavorite(next)
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) {
      return "bg-green-500/10 text-green-500 border-green-500/20";
    } else if (difficulty === 3) {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    } else if (difficulty >= 4) {
      return "bg-red-500/10 text-red-500 border-red-500/20";
    } else {
      return "bg-muted text-muted-foreground";
    }
  };

  const fetchPlaygroundLink = async () => {
    if (playgroundLink) {
      window.open(playgroundLink, "_blank")
      return
    }

    setLoading(true)
    try {
      const data = await fetchWithAuth(`https://my.newtonschool.co/api/v1/course/h/${assignment.courseHash}/assignment/h/${assignment.assignmentHash}/question/h/${assignment.questionHash}/details/`,)
      if (!data.hash) {
        throw new Error("No playground link available")
      }
      let link = ""
      if (data.sub_type_text === "Newton Box") {
        link = `https://my.newtonschool.co/playground/newton-box/${data.hash}`
      }
      else if (data.sub_type_text === "Git Hub View") {
        link = `https://my.newtonschool.co/playground/project/${data.hash}`
      }
      else if (data.sub_type_text === "Spreadsheet View") {
        link = `https://my.newtonschool.co/playground/spreadsheet/${data.hash}`
      }
      else {
        link = `https://my.newtonschool.co/playground/code/${data.hash}`
      }
      setPlaygroundLink(link)
      window.open(link, "_blank")
    } catch (error) {
      console.error("Error fetching playground link:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="border-border bg-card hover:bg-accent/50 transition-colors">
      <CardHeader className="pb-2 min-h-15">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {showCompletion && (
              <input
                type="checkbox"
                checked={completed[assignment.questionHash]}
                onChange={() => setCompleted({ ...completed, [assignment.questionHash]: !completed[assignment.questionHash] })}
                aria-label="Mark question completed"
                className="h-4 w-4 shrink-0 accent-gray-800"
              />
            )}
            <CardTitle className={`text-sm font-medium text-foreground line-clamp-2 flex-1 ${showCompletion && completed[assignment.questionHash] ? "line-through" : ""}`}>
              {assignment.questionTitle}
            </CardTitle>
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="shrink-0"
          >
            <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-500" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {assignment.difficultyType && (
            <Badge variant="outline" className={getDifficultyColor(parseInt(assignment.difficultyType))}>
              {assignment.difficultyType == "1"
                ? "Easy"
                : assignment.difficultyType == "2"
                ? "Easy"
                : assignment.difficultyType == "3"
                ? "Medium"
                : assignment.difficultyType == "4"
                ? "Hard"
                : "Unknown"}
            </Badge>
          )}
          {assignment.topics?.slice(0, 2).map((topic, index) => (
            <Badge key={index} variant="secondary" className="text-xs line-clamp-2 max-w-[100px]">
              {topic}
            </Badge>
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="w-full bg-transparent"
          onClick={fetchPlaygroundLink}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ExternalLink className="h-4 w-4 mr-2" />}
          Open in Code Playground
        </Button>
      </CardContent>
    </Card>
  )
}
