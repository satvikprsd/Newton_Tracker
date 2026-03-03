"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/loading-state"
import { LogOut, ChevronLeft } from "lucide-react"

const subjects = [
	{ name: "DVA", href: "/dashboard/semesters/sem4/dva", description: "Data Visualization & Analytics" },
	{ name: "GenAI", href: "/dashboard/semesters/sem4/genai", description: "Generative AI" },
	{ name: "SD", href: "/dashboard/semesters/sem4/sd", description: "System Design" },
]

export default function Sem4Page() {
	const [userInfo, setUserInfo] = useState<any | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [loadingStep, setLoadingStep] = useState<string>("")
	const router = useRouter()

	const handleLogout = () => {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("semester-hash")
        localStorage.removeItem("user-info")
        localStorage.removeItem("DVA-courses")
        localStorage.removeItem("GenAI-courses")
        localStorage.removeItem("SD-courses")
        localStorage.removeItem("assignmentsCache-DVA")
        localStorage.removeItem("assignmentsCache-GenAI")
        localStorage.removeItem("assignmentsCache-SD")
        router.push("/")
    }

	useEffect(() => {
		const loadUser = async () => {
			try {
				setLoading(true)
				setLoadingStep("Fetching user info...")
				let userInfo = null
				if (typeof window !== "undefined") {
					const raw = localStorage.getItem("user-info")
					if (raw) userInfo = JSON.parse(raw)
				}

				const token = localStorage.getItem("auth-token")
				if (!token) {
					setLoading(false)
					return
				}
				if (!userInfo) {
					setLoadingStep("Refreshing profile...")
					const response = await fetch(`/api/proxy?url=${encodeURIComponent("https://my.newtonschool.co/api/v1/user/me/")}`, {
						headers: { Authorization: `Bearer ${token}` }
					})
					if (response.ok) {
						const data = await response.json()
						setUserInfo(data)
						try {
							localStorage.setItem("user-info", JSON.stringify(data))
						} catch {}
					}
				}
				else {
					setUserInfo(userInfo)
				}
			} catch {
				// ignore failures
			} finally {
				setLoading(false)
			}
		}

		loadUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) return <LoadingState step={loadingStep} />

	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			{/* profile aside (top-left) */}
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

			<main className="p-6 w-full max-w-4xl">
				<div className="mb-6">
					<Link 
						href="/dashboard/semesters" 
						className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
					>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Back to Semesters
					</Link>
					<h1 className="text-3xl font-bold mb-1 text-foreground">Semester 4</h1>
					<p className="text-sm text-muted-foreground">Select a subject to open its revision dashboard.</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{subjects.map((s) => (
						<Link
							key={s.href}
							href={s.href}
							className="block p-6 bg-card border border-transparent hover:border-border rounded-lg transition-shadow shadow-sm"
						>
							<h2 className="text-xl font-semibold text-foreground">{s.name}</h2>
							<p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	)
}
