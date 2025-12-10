"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Check, ArrowRight, Terminal } from "lucide-react"

export function TokenForm() {
  const [token, setToken] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem("auth-token")
    if (savedToken) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) return

    setIsLoading(true)
    localStorage.setItem("auth-token", token.trim())
    router.push("/dashboard")
  }

  const copyCommand = async () => {
    await navigator.clipboard.writeText('localStorage.getItem("auth-token")')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Token Input Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Enter Your Auth Token</CardTitle>
          <CardDescription>Paste your Newton School auth-token to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token" className="text-foreground">
                Auth Token
              </Label>
              <Input
                id="token"
                type="password"
                placeholder="Paste your auth-token here..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="font-mono text-sm bg-background border-border"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!token.trim() || isLoading}>
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Save & Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <span>🔍</span> How to Find Your Token
          </CardTitle>
          <CardDescription>Follow these steps to get your auth-token from Newton School</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step by step instructions */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <p className="text-foreground font-medium">Open Newton School Portal</p>
                <p className="text-muted-foreground text-sm">
                  Go to{" "}
                  <a
                    href="https://my.newtonschool.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    my.newtonschool.co
                  </a>{" "}
                  and login to your account
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <p className="text-foreground font-medium">Open Developer Tools</p>
                <p className="text-muted-foreground text-sm">
                  Right-click anywhere → Click <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Inspect</kbd>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <p className="text-foreground font-medium">Navigate to Application Tab</p>
                <p className="text-muted-foreground text-sm">
                  Go to <strong>Application</strong> → <strong>Local Storage</strong> →{" "}
                  <strong>https://my.newtonschool.co</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <p className="text-foreground font-medium">Copy the Token</p>
                <p className="text-muted-foreground text-sm">
                  Find the key <code className="px-1.5 py-0.5 bg-muted rounded text-xs">auth-token</code> and copy its
                  value
                </p>
              </div>
            </div>
          </div>

          {/* Quick Command */}
          <Alert className="bg-muted/50 border-border">
            <Terminal className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium text-foreground mb-2">Quick Method — Run this in console:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded text-sm font-mono text-foreground">
                  localStorage.getItem(&quot;auth-token&quot;)
                </code>
                <Button variant="outline" size="sm" onClick={copyCommand} className="flex-shrink-0 bg-transparent">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
