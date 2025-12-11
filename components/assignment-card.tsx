"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react"
import type { Assignment } from "@/lib/types"
import { fetchWithAuth } from "@/utils/auth"

interface AssignmentCardProps {
  assignment: Assignment
  semester: { hash: string; title: string } | null
  completed: Record<string, boolean>
  setCompleted: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export function AssignmentCard({ assignment, semester, completed, setCompleted}: AssignmentCardProps) {
  const [playgroundLink, setPlaygroundLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const COMPLETED_STORAGE_KEY = "completedQuestions"

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_STORAGE_KEY) || "{}"
      const obj = JSON.parse(raw)
      obj[assignment.questionHash] = !!completed[assignment.questionHash]
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(obj))
    } catch {
    }
  }, [assignment.questionHash, completed])

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
      const token = localStorage.getItem("auth-token")
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
            <input
              type="checkbox"
              checked={completed[assignment.questionHash]}
              onChange={() => setCompleted({ ...completed, [assignment.questionHash]: !completed[assignment.questionHash] })}
              aria-label="Mark question completed"
              className="h-4 w-4 shrink-0 accent-gray-800"
            />
            <CardTitle className={`text-sm font-medium text-foreground line-clamp-2 flex-1 ${completed[assignment.questionHash] ? "line-through" : ""}`}>
              {assignment.questionTitle}
            </CardTitle>
          </div>
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
            <Badge key={index} variant="secondary" className="text-xs">
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
