export interface UserInfo {
  username: string
  uid: string
  first_name: string
  last_name: string
  avatar: string
  bio: string
  email: string
  is_email_verified: boolean
  phone: string
  is_phone_verified: boolean
}

export interface Course {
  hash: string
  title: string
  shortName: string
}

export interface Assignment {
  assignmentHash: string
  questionHash: string
  questionTitle: string
  difficultyType: string
  topics: string[]
  earnedPoints: number
  earnablePoints: number
  attemptStatus: string
  deadline: string | null
  courseHash: string
  courseName: string
}

export interface FavoriteQuestion {
  course_hash: string
  assignmentHash: string
  assignmenstHash: string
  questionHash: string
  question_name: string
  difficulty: string
  topics: string[]
  courseName?: string
}

export interface InternshipCompany {
  slug: string
  title: string
  avatar: string
  company_avatar: string | null
  company_wordmark_logo: string | null
  description: string | null
}

export interface InternshipTopic {
  title: string
  slug: string
  icon: string | null
  topic_requirement_level: number
}

export interface InternshipCity {
  name: string
  slug: string
}

export interface InternshipState {
  name: string
  slug: string
  country: {
    code: string
    slug: string
    name: string
    phone_code: string
  }
}

export interface InternshipJobOpening {
  hash: string
  title: string
  company: InternshipCompany
  placement_role: {
    hash: string
    title: string
  }
  topics: InternshipTopic[]
  min_ctc: number
  max_ctc: number
  city: InternshipCity
  state: InternshipState
  description: string
  short_description: string
  employment_type: number
  number_of_rounds: number
  minimum_experience: string
  band: number
  description_user_uploads: {
    hash: string
    url: string
    name: string
  }[]
}

export interface InternshipUserStatus {
  can_apply: boolean
  remark: string
  has_applied: boolean
}

export interface Internship {
  hash: string
  job_opening: InternshipJobOpening
  start_timestamp: number
  end_timestamp: number
  job_opening_course_mapping_user_status: InternshipUserStatus
  course: {
    hash: string
    title: string
    short_display_name: string
  }
  apply_form_available: boolean
}

export interface InternshipResponse {
  count: number
  next: string | null
  previous: string | null
  results: Internship[]
}
