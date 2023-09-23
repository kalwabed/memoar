export interface Post {
  id: string
  title: string
  slug: string
  content: string
  updated_at: string
  created_at: string
  user_id: string
}

export interface User {
  id: string
  username: string
  fullname: string
  instagram: string
  twitter: string
  bio: string
  website: string
  avatar_url: string
  created_at: string
}
