"use client"

import { AssignmentCard } from "@/components/assignment-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderOpen } from "lucide-react"
import type { Assignment } from "@/lib/types"
import { useState } from "react"

interface AssignmentListProps {
  assignments: Record<string, Assignment[]>
  semester: { hash: string; title: string } | null
}

export function AssignmentList({ assignments, semester }: AssignmentListProps) {
  const courseNames = Object.keys(assignments)
  const COMPLETED_STORAGE_KEY = "completedQuestions"
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    ...(() => {
      try {
        if (typeof window === "undefined") return {}
        const raw = localStorage.getItem(COMPLETED_STORAGE_KEY)
        if (!raw) return {}
        return JSON.parse(raw)
      } catch {
        return {}
      }
    })(),
  })

  if (courseNames.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No assignments found</p>
        </CardContent>
      </Card>
    )
  }
  console.log(courseNames.join(", "));
  console.log(Object.values(assignments).map((a)=> a.map((as)=> as.questionTitle)).flat().join(", "));
  return (
    <div className="space-y-8">
      {courseNames.map((courseName) => {
        const courseAssignments = assignments[courseName]
        const completedCount = courseAssignments.filter((assignment) => completed[assignment.questionHash]).length

        return (
          <Card key={courseName} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  {courseName}
                  <Badge variant="outline" className="ml-2">
                    {courseAssignments.length} questions
                  </Badge>
                </CardTitle>
                <Badge variant={completedCount === courseAssignments.length ? "default" : "secondary"}>
                  {completedCount}/{courseAssignments.length} completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courseAssignments.map((assignment, index) => (
                  <AssignmentCard
                    key={`${assignment.questionHash}-${index}`}
                    assignment={assignment}
                    semester={semester}
                    completed={completed}
                    setCompleted={setCompleted}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
