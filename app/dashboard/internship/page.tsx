"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import type { Internship, InternshipResponse, UserInfo } from "@/lib/types"
import { fetchWithAuth } from "@/utils/auth"
import { ArrowLeft, Building2, MapPin, Briefcase, Clock, IndianRupee, Search, ExternalLink, FileText, Users, X, ChevronRight, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InternshipPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [internships, setInternships] = useState<Internship[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "applied">("all")
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [minCtc, setMinCtc] = useState<string>("")
  const [maxCtc, setMaxCtc] = useState<string>("")

  // Fix salary human error: 10000000 (7 zeros) -> 10000 (4 zeros)
  const fixSalary = (value: number): number => {
    if (value >= 1000000) {
      return value / 1000
    }
    return value
  }

  const loadInternships = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load user info
      setLoadingStep("Fetching user info...")
      try {
        const userCached = localStorage.getItem("user-info")
        if (userCached) setUserInfo(JSON.parse(userCached))
      } catch {}

      if (!userInfo) {
        const userData = await fetchWithAuth("https://my.newtonschool.co/api/v1/user/me/")
        setUserInfo(userData)
        localStorage.setItem("user-info", JSON.stringify(userData))
      }

      const coursesData = await fetchWithAuth(
        "https://my.newtonschool.co/api/v2/course/all/applied/?pagination=false&completed=false",
      )

      localStorage.setItem("user-courses", JSON.stringify(coursesData))
      const placementCourse = coursesData.find((c: { title: string }) => c.title.includes("Placement"))
      const placementCourseHash = placementCourse ? placementCourse.hash : null
      // Load internships - first fetch to get total count
      setLoadingStep("Fetching internships...")
      const firstPage: InternshipResponse = await fetchWithAuth(
        `https://my.newtonschool.co/api/v2/course/h/${placementCourseHash}/job_opening_course_mapping/list/?roles&locations&years_of_experience&limit=100&offset=0`
      )

      const total = firstPage.count
      setTotalCount(total)
      let allInternships: Internship[] = [...firstPage.results]

      // Fetch remaining pages if there are more
      const pageSize = 100
      const totalPages = Math.ceil(total / pageSize)
      
      if (totalPages > 1) {
        for (let page = 1; page < totalPages; page++) {
          setLoadingStep(`Fetching internships... (${page + 1}/${totalPages})`)
          const offset = page * pageSize
          const pageData: InternshipResponse = await fetchWithAuth(
            `https://my.newtonschool.co/api/v2/course/h/${placementCourseHash}/job_opening_course_mapping/list/?roles&locations&years_of_experience&limit=${pageSize}&offset=${offset}`
          )
          allInternships = [...allInternships, ...pageData.results]
        }
      }

      setInternships(allInternships)
      setFilteredInternships(allInternships)
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
    const token = localStorage.getItem("auth-token")
    if (!token) {
      router.push("/")
      return
    }
    loadInternships()
  }, [router])

  useEffect(() => {
    let filtered = internships

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (i) =>
          i.job_opening.title.toLowerCase().includes(query) ||
          i.job_opening.company.title.toLowerCase().includes(query) ||
          i.job_opening.topics.some((t) => t.title.toLowerCase().includes(query)) ||
          i.job_opening.city?.name.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (filterStatus === "open") {
      filtered = filtered.filter((i) => i.job_opening_course_mapping_user_status.can_apply && !i.job_opening_course_mapping_user_status.has_applied)
    } else if (filterStatus === "applied") {
      filtered = filtered.filter((i) => i.job_opening_course_mapping_user_status.has_applied)
    }

    // Apply skills filter
    if (skillsFilter.length > 0) {
      filtered = filtered.filter((i) =>
        skillsFilter.every((skill) =>
          i.job_opening.topics.some((t) => t.title.toLowerCase().includes(skill.toLowerCase()))
        )
      )
    }

    // Apply CTC filter
    if (minCtc) {
      const minValue = parseFloat(minCtc) * 1000 // Convert from K to actual value
      filtered = filtered.filter((i) => fixSalary(i.job_opening.max_ctc) >= minValue)
    }
    if (maxCtc) {
      const maxValue = parseFloat(maxCtc) * 1000 // Convert from K to actual value
      filtered = filtered.filter((i) => fixSalary(i.job_opening.min_ctc) <= maxValue)
    }

    setFilteredInternships(filtered)
  }, [searchQuery, filterStatus, internships, skillsFilter, minCtc, maxCtc])

  const formatSalary = (min: number, max: number) => {
    const fixedMin = fixSalary(min)
    const fixedMax = fixSalary(max)
    if (fixedMin === fixedMax) return `₹${(fixedMin / 1000).toFixed(0)}K/month`
    return `₹${(fixedMin / 1000).toFixed(0)}K - ₹${(fixedMax / 1000).toFixed(0)}K/month`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: Internship["job_opening_course_mapping_user_status"]) => {
    if (status.has_applied) {
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Applied</Badge>
    }
    if (status.can_apply) {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Open</Badge>
    }
    return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">{status.remark}</Badge>
  }

  const getEmploymentTypeBadge = (type: number) => {
    switch (type) {
      case 1:
        return <Badge variant="outline">Full Time</Badge>
      case 2:
        return <Badge variant="outline">Internship</Badge>
      case 3:
        return <Badge variant="outline">Part Time</Badge>
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  const openCounts = internships.filter((i) => i.job_opening_course_mapping_user_status.can_apply && !i.job_opening_course_mapping_user_status.has_applied).length
  const appliedCounts = internships.filter((i) => i.job_opening_course_mapping_user_status.has_applied).length

  // Get all unique skills from internships
  const allSkills = Array.from(
    new Set(internships.flatMap((i) => i.job_opening.topics.map((t) => t.title)))
  ).sort()

  const addSkillFilter = (skill: string) => {
    if (!skillsFilter.includes(skill)) {
      setSkillsFilter([...skillsFilter, skill])
    }
  }

  const removeSkillFilter = (skill: string) => {
    setSkillsFilter(skillsFilter.filter((s) => s !== skill))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setFilterStatus("all")
    setSkillsFilter([])
    setMinCtc("")
    setMaxCtc("")
  }

  if (loading) return <LoadingState step={loadingStep} />
  if (error) return <ErrorState message={error} onRetry={loadInternships} />

  return (
    <div className="min-h-screen bg-background">
      {/* Expanded View Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedInternship(null)}>
          <div 
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="bg-card border-b border-border p-4 flex items-center justify-between rounded-t-xl shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInternship.job_opening.company.company_avatar || selectedInternship.job_opening.company.avatar}
                  alt={selectedInternship.job_opening.company.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold text-foreground">{selectedInternship.job_opening.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedInternship.job_opening.company.title}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedInternship(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status & Type */}
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(selectedInternship.job_opening_course_mapping_user_status)}
                {getEmploymentTypeBadge(selectedInternship.job_opening.employment_type)}
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedInternship.job_opening.city?.name}, {selectedInternship.job_opening.state?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IndianRupee className="h-4 w-4" />
                  <span>{formatSalary(selectedInternship.job_opening.min_ctc, selectedInternship.job_opening.max_ctc)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedInternship.job_opening.number_of_rounds} interview rounds</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{selectedInternship.job_opening.minimum_experience} years exp</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInternship.job_opening.topics.map((topic) => (
                    <Badge key={topic.slug} variant="secondary">
                      {topic.title}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              {(selectedInternship.job_opening.description || selectedInternship.job_opening.short_description) && (
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedInternship.job_opening.description || selectedInternship.job_opening.short_description}
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Application Deadline</span>
                  <span className="font-medium text-foreground">{formatDate(selectedInternship.end_timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="bg-card border-t border-border p-4 rounded-b-xl shrink-0">
              <div className="flex gap-3">
                {selectedInternship.job_opening.description_user_uploads.length > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(selectedInternship.job_opening.description_user_uploads[0].url, "_blank")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Job Description PDF
                  </Button>
                )}
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => window.open(`https://my.newtonschool.co/course/placement24/placement/job/${selectedInternship.job_opening.hash}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply on Newton
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Internships & Jobs</h1>
            <p className="text-muted-foreground">
              {totalCount} opportunities available
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold">{totalCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            <span className="text-muted-foreground">Open:</span>
            <span className="font-semibold">{openCounts}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <span className="text-muted-foreground">Applied:</span>
            <span className="font-semibold">{appliedCounts}</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, role, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-end">
            {/* Status Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "open" ? "default" : "outline"}
                onClick={() => setFilterStatus("open")}
                size="sm"
              >
                Open
              </Button>
              <Button
                variant={filterStatus === "applied" ? "default" : "outline"}
                onClick={() => setFilterStatus("applied")}
                size="sm"
              >
                Applied
              </Button>
            </div>

            {/* CTC Range Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">CTC:</span>
              <Input
                type="number"
                placeholder="Min (K)"
                value={minCtc}
                onChange={(e) => setMinCtc(e.target.value)}
                className="w-24 h-9"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max (K)"
                value={maxCtc}
                onChange={(e) => setMaxCtc(e.target.value)}
                className="w-24 h-9"
              />
            </div>

            {/* Skills Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                    <Briefcase className="h-4 w-4" />
                    Skills
                    <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    className="w-48 max-h-64 overflow-y-auto"
                >
                    {allSkills.slice(0, 30).map((skill) => (
                    <DropdownMenuItem
                        key={skill}
                        onClick={() => addSkillFilter(skill)}
                        className={`cursor-pointer ${
                        skillsFilter.includes(skill)
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                    >
                        {skill}
                    </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {(searchQuery || filterStatus !== "all" || skillsFilter.length > 0 || minCtc || maxCtc) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Active Skill Filters */}
          {skillsFilter.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skillsFilter.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                  {skill}
                  <button
                    onClick={() => removeSkillFilter(skill)}
                    className="ml-1 hover:bg-accent rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Showing {filteredInternships.length} of {totalCount} opportunities
          </p>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInternships.map((internship) => (
            <Card
              key={internship.hash}
              onClick={() => setSelectedInternship(internship)}
              className="cursor-pointer hover:border-primary/50 transition-all group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <img
                    src={internship.job_opening.company.company_avatar || internship.job_opening.company.avatar}
                    alt={internship.job_opening.company.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                      {internship.job_opening.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building2 className="h-3 w-3" />
                      {internship.job_opening.company.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Status & Type Badges */}
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(internship.job_opening_course_mapping_user_status)}
                  {getEmploymentTypeBadge(internship.job_opening.employment_type)}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {internship.job_opening.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{internship.job_opening.city.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 shrink-0" />
                    <span className="truncate">{formatSalary(internship.job_opening.min_ctc, internship.job_opening.max_ctc)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>{internship.job_opening.number_of_rounds} rounds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 shrink-0" />
                    <span>{internship.job_opening.minimum_experience}y exp</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {internship.job_opening.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic.slug} variant="secondary" className="text-xs">
                      {topic.title}
                    </Badge>
                  ))}
                  {internship.job_opening.topics.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{internship.job_opening.topics.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Deadline */}
                <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                  <span>Deadline</span>
                  <span className="font-medium">{formatDate(internship.end_timestamp)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No internships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
