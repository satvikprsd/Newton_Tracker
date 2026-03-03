"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/loading-state"
import { LogOut, ChevronLeft, ExternalLink, PlaySquare, ListVideo } from "lucide-react"

interface StudyLink {
  url: string
  title?: string
}

const studyMaterial = [
  {
    course: "DM (Discrete Maths)",
    links: [
      { url: "https://www.youtube.com/playlist?list=PLg7lel5LdVjwGFruvKEsQ_W3HAw9WO2mq", title: "Discrete Math - Logic and Proofs Series" },
      { url: "https://www.youtube.com/playlist?list=PLHXZ9OQGMqxersk8fUxiUMSIx0DBqsKZS", title: "Discrete Math (Full Course: Sets, Logic, Proofs, Probability, Graph Theory, etc)" },
      { url: "https://www.youtube.com/watch?v=0HF39OWyl54" },
      { url: "https://www.youtube.com/watch?v=OxGsU8oIWjY" },
    ],
  },
  {
    course: "GenAI",
    links: [
      { url: "https://www.youtube.com/watch?v=SIEaLBXr0rk" },
      { url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", title: "3Blue1Brown - Neural Networks" },
      { url: "https://www.youtube.com/watch?v=LLBGiAAZqAM" },
    ],
  },
{
    course: "DVA",
    links: [{ url: "https://www.youtube.com/watch?v=VXU4LSAQDSc" }],
  },
  {
    course: "SD",
    links: [
      { url: "https://www.youtube.com/watch?v=NjN00cM18Z4" },
      { url: "https://www.youtube.com/playlist?list=PLA_LG2oFbzOnY9M8mjCByYvnSjoleNTrJ", title: "Software Engineering UML all 14 diagrams" },
      { url: "https://www.youtube.com/watch?v=xsg9BDiwiJE" },
    ],
  },
]

const getLinkType = (url: string) => (url.includes("playlist?") ? "Playlist" : "Video")

const extractVideoId = (url: string) => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null
    }
    return parsed.searchParams.get("v")
  } catch {
    return null
  }
}

const getThumbnailUrl = (url: string) => {
  if (getLinkType(url) === "Playlist") return null
  const videoId = extractVideoId(url)
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  return null
}

export default function StudyMaterialPage() {
  const [userInfo, setUserInfo] = useState<any | null>(null)
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingStep, setLoadingStep] = useState<string>("")
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

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true)
        setLoadingStep("Fetching user info...")
        let cachedUserInfo = null
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("user-info")
          if (raw) cachedUserInfo = JSON.parse(raw)
        }

        const token = localStorage.getItem("auth-token")
        if (!token) {
          setLoading(false)
          return
        }
        if (!cachedUserInfo) {
          setLoadingStep("Refreshing profile...")
          const response = await fetch(`/api/proxy?url=${encodeURIComponent("https://my.newtonschool.co/api/v1/user/me/")}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (response.ok) {
            const data = await response.json()
            setUserInfo(data)
            try {
              localStorage.setItem("user-info", JSON.stringify(data))
            } catch {}
          }
        } else {
          setUserInfo(cachedUserInfo)
        }
      } catch {
        // ignore failures
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    const fetchVideoTitles = async () => {
      const videoLinks = studyMaterial
        .flatMap((courseGroup) => courseGroup.links)
        .map((link) => link.url)
        .filter((url) => getLinkType(url) === "Video")

      if (videoLinks.length === 0) return

      const results = await Promise.all(
        videoLinks.map(async (url) => {
          try {
            const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`)
            if (!response.ok) return [url, ""] as const
            const data = await response.json()
            return [url, data.title || ""] as const
          } catch {
            return [url, ""] as const
          }
        }),
      )

      const titleMap: Record<string, string> = {}
      for (const [url, title] of results) {
        if (title) titleMap[url] = title
      }
      setVideoTitles(titleMap)
    }

    fetchVideoTitles()
  }, [])

  if (loading) return <LoadingState step={loadingStep} />

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <aside className="hidden sm:block fixed top-4 left-4 w-80 z-20">
        <Card className="bg-sidebar-accent border-sidebar-border gap-3 py-4">
          <CardContent>
            {userInfo ? (
              <div className="flex flex-col gap-4">
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
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="cursor-pointer w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not signed in</p>
            )}
          </CardContent>
        </Card>
      </aside>

      <main className="p-6 mt-10 w-full max-w-5xl mx-auto">
        <div className="mb-6 sm:pl-28">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-1 text-foreground">Study Material</h1>
          <p className="text-sm text-muted-foreground">YouTube style course playlists and videos grouped by subject.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {studyMaterial.map((courseGroup) => (
            <section key={courseGroup.course}>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-foreground">{courseGroup.course}</h2>
                <span className="text-xs text-muted-foreground">{courseGroup.links.length} links</span>
              </div>

              {courseGroup.links.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-6 text-sm text-muted-foreground">No links added yet.</CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseGroup.links.map((link, index) => {
                    const url = link.url
                    const type = getLinkType(url)
                    const thumbnailUrl = getThumbnailUrl(url)
                    const heading =
                      type === "Video"
                        ? videoTitles[url] || `${courseGroup.course} Video ${index + 1}`
                        : link.title || `${courseGroup.course} Playlist ${index + 1}`
                    return (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-md hover:border-primary/40"
                      >
                        <div className="aspect-video w-full bg-muted">
                          {thumbnailUrl ? (
                            <img src={thumbnailUrl} alt={heading} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                              {type === "Playlist" ? "Playlist" : "No thumbnail"}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {type === "Playlist" ? (
                                <ListVideo className="h-5 w-5 text-primary" />
                              ) : (
                                <PlaySquare className="h-5 w-5 text-primary" />
                              )}
                              <p className="font-medium text-foreground line-clamp-2">{heading}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{url}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
