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
