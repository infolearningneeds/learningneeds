// lib/adminEmails.ts
export const ADMIN_EMAILS = [
  'infolearningneeds@gmail.com',

]

export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}