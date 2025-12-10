"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AssignmentList } from "@/components/assignment-list"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import type { UserInfo, Course, Assignment } from "@/lib/types"
import { fetchWithAuth } from "@/utils/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [semester, setSemester] = useState<{ hash: string; title: string } | null>(null)
  const [adaCourses, setAdaCourses] = useState<Course[]>([]);
  const [allAssignments, setAllAssignments] = useState<Record<string, Assignment[]>>({});
  const [assignments, setAssignments] = useState<Record<string, Assignment[]>>({})
  const [loading, setLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false)

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      if (typeof window !== "undefined") {
        try {
          const userCached = localStorage.getItem("user-info") || localStorage.getItem("userInfo") || localStorage.getItem("userData")
          if (userCached) {
            try {
              const parsedUser = JSON.parse(userCached)
              setUserInfo(parsedUser)
            } catch {}
          }

          const sem = localStorage.getItem("semester-info")
          if (sem) setSemester(JSON.parse(sem))

          const adaRaw = localStorage.getItem("ada-courses")
          if (adaRaw) {
            try {
              const courses = JSON.parse(adaRaw)
              if (Array.isArray(courses)) {
                setAdaCourses(courses)
              }
            } catch {}
          }
        } catch {
        }
      }

      const CACHE_KEY = "adaAssignmentsCache"
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          try {
            const parsed: Record<string, Assignment[]> = JSON.parse(cached)
            setAllAssignments(parsed)
            if (showAllQuestions) {
              setAssignments(parsed)
            } else {
              const mustReviseKeywords = [
                "Score of Good Pairs", "First and Last position of Key", "Number of subarrays with sum equal to k",
                "Possible Case Combinations", "Topo Sort", "Find Eventual Safe States", "Alien Dictionary",
                "Course Schedule", "Parallel Courses", "Shortest path in Directed Acyclic Graph",
                "Maximize Greatness", "Minimum Platforms Required", "Insert Interval", "Merging Intervals", "Non-Overlapping Intervals",
                "Detect cycle", "Minimum Number of Arrows", "Bag of Tokens", "Implementing Quick Sort", "Quicksort Partitioning",
                "Save People", "Minimum size Subarray sum", "Gas Station", "Fractional Knapsack", "N meetings in one room",
                "Construct K Palindrome Strings", "Coin Change", "Optimal Candy Allocation", "Maximum Number of Events",
                "Room Allocation", "Task Scheduler", "Two Sum - BST", "Range Sum of BST", "Subtree of Another Tree",
                "Zigzag level order traversal", "Left View of Binary Tree", "Knight Walk", "Word Search", "Suduko Solver",
                "Rat in Maze", "Partial K Permutation", "Subsets", "N-Queens", "Palindrome Partitioning",
                "Print All Partitions of a String", "Combination Sum", "Tribonacci Series", "Max Sum Non Adjacent Numbers",
                "Calculate Fibonacci Number", "Climbing Stairs", "House Robber", "Frog Jump", "Best Time to Buy and Sell Stock",
                "Russian Doll Envelopes", "Largest Divisible Subset", "Longest Bitonic Subsequence", "Longest Increasing Subsequence",
                "Delete Operation", "Minimum ASCII Delete Sum", "LCS", "Minimum Insertion Steps", "Distinct Subsequences",
                "Minimum Path Sum", "Unique Paths", "Dungeon Game", "Triangle Path Sum", "Maximum Collection",
                "Count Subsets with Sum K", "Partitions with Given Difference", "Unbounded Knapsack", "Equal Sum Partition",
                "0/1 Knapsack"
              ]
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
          } catch (e) {
          }
        }
      }

      setLoadingStep("Fetching user info...")
      let userData = userInfo
      if (!userData) {
        userData = await fetchWithAuth("https://my.newtonschool.co/api/v1/user/me/")
        setUserInfo(userData)
        localStorage.setItem("user-info", JSON.stringify(userData))
        try {
          if (typeof window !== "undefined") localStorage.setItem("user-info", JSON.stringify(userData))
        } catch {
        }
      }

      setLoadingStep("Finding current semester...")
      const coursesData = await fetchWithAuth(
        "https://my.newtonschool.co/api/v2/course/all/applied/?pagination=false&completed=false",
      )

      const currentCourse = coursesData.find(
        (course: { title: string }) => course.title.includes("RU") && !course.title.includes("All Content"),
      )
      // console.log(currentCourse, 'here');
      const semesterCourse = currentCourse.children_courses.admin_unit_courses.find(
        (course: { title: string }) => course.title.includes("Semester 3"),
      )

      if (!semesterCourse) {
        throw new Error("Could not find current semester course")
      }
      const sem = { hash: semesterCourse.hash, title: semesterCourse.title }
      setSemester(sem)
      localStorage.setItem("semester-info", JSON.stringify(sem))

      setLoadingStep("Finding ADA courses...")
      const userCourseInfo = await fetchWithAuth("https://my.newtonschool.co/api/v1/user/me/info/")
      // console.log(userCourseInfo, 'here2');
      const adaCoursesList: Course[] = []
      if (userCourseInfo.current_active_course_user_mapping.active_learning_course_user_mappings) {
        for (const mapping of userCourseInfo.current_active_course_user_mapping.active_learning_course_user_mappings) {
          if (mapping.course?.short_display_name?.includes("ADA")) {
            adaCoursesList.push({
              hash: mapping.course.hash,
              title: mapping.course.title || mapping.course.short_display_name,
              shortName: mapping.course.short_display_name,
            })
          }
        }
      }

      setAdaCourses(adaCoursesList)
      localStorage.setItem("ada-courses", JSON.stringify(adaCoursesList))

      setLoadingStep("Loading assignments...")
      const assignmentsByGroup: Record<string, Assignment[]> = {}

      const topicOrder = [
        "Time and Space Complexity",
        "Arrays",
        "String",
        "Prefix Sum Technique",
        "Sorting Algorithms",
        "Quick Sort",
        "Binary Search",
        "Two Pointers",
        "Greedy Algorithms",
        "Heaps",
        "Priority Queue",
        "Max Heap",
        "Graph Representation",
        "Adjacency List, Adjacency Matrix",
        "Graphs",
        "Graph",
        "Graph Traversal",
        "Breadth First Search (BFS)",
        "Depth First Search (DFS)",
        "Cycle Detection",
        "Connected Components",
        "Topological Sorting",
        "Kahn’s Algorithm",
        "Directed Graph",
        "Dijkstra",
        "Shortest Paths",
        "Minimum spanning tree",
        "Tree Traversal",
        "Binary Tree",
        "Preorder Traversal",
        "Inorder Traversal",
        "Binary Search Tree",
        "Deletion In BST",
        "Recursion",
        "Backtracking",
        "Dynamic Programming",
        "1D Dynamic Programming (1D DP)",
        "2D Dynamic Programming (2D DP)",
      ]

      const normalize = (s: string) =>
        s
          .toLowerCase()
          .trim()
          .replace(/[_\s]+/g, " ")
          .replace(/[^a-z0-9\- ]/g, "")

      const normalizedOrder = topicOrder.map(normalize)

      for (const course of adaCoursesList) {
        try {
          const assignmentsData = await fetchWithAuth(
            `https://my.newtonschool.co/api/v2/course/h/${semesterCourse.hash}/assignment/all/?limit=1000&learning_course_hash=${course.hash}&offset=0&attempt_statuses=&difficulty_types=&filter_topic_slugs=`,
          )

          if (assignmentsData.results) {
            for (const result of assignmentsData.results) {
              if (result.assignment_questions) {
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

                  const canonicalizeTopic = (t: string) => {
                    const n = t
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9\s]/g, "")
                      .replace(/\s+/g, " ")

                    if (n.includes("2d") && n.includes("dp")) return "2D Dynamic Programming (2D DP)"
                    if (n.includes("1d") && n.includes("dp")) return "1D Dynamic Programming (1D DP)"
                    if (n.includes("dynamic") && n.includes("program")) return "Dynamic Programming"
                    if (n.includes("prefix")) return "Prefix Sum Technique"
                    if (n.includes("quick sort") || (n.includes("quick") && n.includes("sort"))) return "Quick Sort"
                    if (n.includes("sort")) return "Sorting Algorithms"
                    if (n.includes("binary search") && !n.includes("tree")) return "Binary Search"
                    if (n.includes("two pointer")) return "Two Pointers"
                    if (n.includes("two pointers")) return "Two Pointers"
                    if (n.includes("greedy")) return "Greedy Algorithms"
                    if (n.includes("heap")) return "Heaps"
                    if (n.includes("priority")) return "Priority Queue"
                    if (n.includes("adjacency") || n.includes("matrix")) return "Adjacency List, Adjacency Matrix"
                    if (n.includes("graph")) return "Graphs"
                    if (n.includes("graph") && n.includes("traversal")) return "Graph Traversal"
                    if (n.includes("bfs") || n.includes("breadth")) return "Breadth First Search (BFS)"
                    if (n.includes("dfs") || n.includes("depth")) return "Depth First Search (DFS)"
                    if (n.includes("cycle")) return "Cycle Detection"

                    // Fallback to original trimmed value (preserve capitalization as returned by API)
                    return t.trim()
                  }

                  const mapped = rawTopics.map(canonicalizeTopic)
                  // Deduplicate while preserving order
                  const unique: string[] = Array.from(new Set(mapped))

                  // If a question has specific DP (1D/2D) and also general DP, prefer the specific and remove the general
                  const has2d = unique.includes("2D Dynamic Programming (2D DP)")
                  const has1d = unique.includes("1D Dynamic Programming (1D DP)")
                  const hasGeneralDP = unique.includes("Dynamic Programming")
                  if ((has2d || has1d) && hasGeneralDP) {
                    const idx = unique.indexOf("Dynamic Programming")
                    if (idx !== -1) unique.splice(idx, 1)
                  }

                  if (unique.length === 0) unique.push("Uncategorized")

                  // If multiple topics, pick the hardest topic according to normalizedOrder (highest index).
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
          }
        } catch {
          console.error(`Failed to fetch assignments for ${course.shortName}`)
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
      setAllAssignments(orderedAssignments);
      try {
        if (typeof window !== "undefined") localStorage.setItem("adaAssignmentsCache", JSON.stringify(orderedAssignments))
      } catch {
      }
      const mustReviseKeywords = [
        "Score of Good Pairs", "First and Last position of Key", "Number of subarrays with sum equal to k",
        "Possible Case Combinations", "Topo Sort", "Find Eventual Safe States", "Alien Dictionary",
        "Course Schedule", "Parallel Courses", "Shortest path in Directed Acyclic Graph",
        "Maximize Greatness", "Minimum Platforms Required", "Insert Interval", "Merging Intervals", "Non-Overlapping Intervals",
        "Detect cycle", "Minimum Number of Arrows", "Bag of Tokens", "Implementing Quick Sort", "Quicksort Partitioning",
        "Save People", "Minimum size Subarray sum", "Gas Station", "Fractional Knapsack", "N meetings in one room",
        "Construct K Palindrome Strings", "Coin Change", "Optimal Candy Allocation", "Maximum Number of Events",
        "Room Allocation", "Task Scheduler", "Two Sum - BST", "Range Sum of BST", "Subtree of Another Tree",
        "Zigzag level order traversal", "Left View of Binary Tree", "Knight Walk", "Word Search", "Suduko Solver",
        "Rat in Maze", "Partial K Permutation", "Subsets", "N-Queens", "Palindrome Partitioning",
        "Print All Partitions of a String", "Combination Sum", "Tribonacci Series", "Max Sum Non Adjacent Numbers",
        "Calculate Fibonacci Number", "Climbing Stairs", "House Robber", "Frog Jump", "Best Time to Buy and Sell Stock",
        "Russian Doll Envelopes", "Largest Divisible Subset", "Longest Bitonic Subsequence", "Longest Increasing Subsequence",
        "Delete Operation", "Minimum ASCII Delete Sum", "LCS", "Minimum Insertion Steps", "Distinct Subsequences",
        "Minimum Path Sum", "Unique Paths", "Dungeon Game", "Triangle Path Sum", "Maximum Collection",
        "Count Subsets with Sum K", "Partitions with Given Difference", "Unbounded Knapsack", "Equal Sum Partition",
        "0/1 Knapsack"
      ]

      const kwNorm = mustReviseKeywords.map((k) => k.toLowerCase())

      const filteredAssignments: Record<string, Assignment[]> = {}
      if (showAllQuestions) {
        Object.assign(filteredAssignments, orderedAssignments)
      } else {
        for (const k of keys) {
          const list = orderedAssignments[k].filter((a) => {
            const title = (a.questionTitle || "").toLowerCase()
            return kwNorm.some((kw) => title.includes(kw))
          })
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
    const filteredAssignments: Record<string, Assignment[]> = {}
    if (showAllQuestions) {
      Object.assign(filteredAssignments, allAssignments)
    } else {
      const mustReviseKeywords = [
        "Score of Good Pairs", "First and Last position of Key", "Number of subarrays with sum equal to k",
        "Possible Case Combinations", "Topo Sort", "Find Eventual Safe States", "Alien Dictionary",
        "Course Schedule", "Parallel Courses", "Shortest path in Directed Acyclic Graph",
        "Maximize Greatness", "Minimum Platforms Required", "Insert Interval", "Merging Intervals", "Non-Overlapping Intervals",
        "Detect cycle", "Minimum Number of Arrows", "Bag of Tokens", "Implementing Quick Sort", "Quicksort Partitioning",
        "Save People", "Minimum size Subarray sum", "Gas Station", "Fractional Knapsack", "N meetings in one room",
        "Construct K Palindrome Strings", "Coin Change", "Optimal Candy Allocation", "Maximum Number of Events",
        "Room Allocation", "Task Scheduler", "Two Sum - BST", "Range Sum of BST", "Subtree of Another Tree",
        "Zigzag level order traversal", "Left View of Binary Tree", "Knight Walk", "Word Search", "Suduko Solver",
        "Rat in Maze", "Partial K Permutation", "Subsets", "N-Queens", "Palindrome Partitioning",
        "Print All Partitions of a String", "Combination Sum", "Tribonacci Series", "Max Sum Non Adjacent Numbers",
        "Calculate Fibonacci Number", "Climbing Stairs", "House Robber", "Frog Jump", "Best Time to Buy and Sell Stock",
        "Russian Doll Envelopes", "Largest Divisible Subset", "Longest Bitonic Subsequence", "Longest Increasing Subsequence",
        "Delete Operation", "Minimum ASCII Delete Sum", "LCS", "Minimum Insertion Steps", "Distinct Subsequences",
        "Minimum Path Sum", "Unique Paths", "Dungeon Game", "Triangle Path Sum", "Maximum Collection",
        "Count Subsets with Sum K", "Partitions with Given Difference", "Unbounded Knapsack", "Equal Sum Partition",
        "0/1 Knapsack"
      ]
      const kwNorm = mustReviseKeywords.map((k) => k.toLowerCase())

      for (const k of Object.keys(allAssignments)) {
        const list = allAssignments[k].filter((a) => {
          const title = (a.questionTitle || "").toLowerCase()
          return kwNorm.some((kw) => title.includes(kw))
        })
        if (list.length > 0) filteredAssignments[k] = list
      }
    }

    setAssignments(filteredAssignments)
    try {
      if (typeof window !== "undefined" && Object.keys(allAssignments).length > 0) {
        localStorage.setItem("adaAssignmentsCache", JSON.stringify(allAssignments))
      }
    } catch {
    }
  }, [showAllQuestions])

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (!token) {
      router.push("/")
      return
    }
    loadDashboard()
  }, [router])

  if (loading) {
    return <LoadingState step={loadingStep} />
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadDashboard} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar showAllQuestions={showAllQuestions} setShowAllQuestions={setShowAllQuestions} userInfo={userInfo} semester={semester} adaCourses={adaCourses} />
      <main className="flex-1 p-6 max-h-screen overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">ADA Revision {Object.values(assignments).flat().length}</h1>
          <AssignmentList assignments={assignments} semester={semester} />
        </div>
      </main>
    </div>
  )
}
