export interface SignUpFormData {
  fullName: string
  email: string
  phone: string
  password: string
  avatar: File | null
}

export interface SignInFormData {
  email: string
  password: string
}

export interface Message {
  type: 'success' | 'error' | ''
  text: string
}

export interface UserMetadata {
  full_name: string
  phone: string
  avatar_url?: string
}