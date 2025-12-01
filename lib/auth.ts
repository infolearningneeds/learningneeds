import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'
import { isAdminEmail } from './adminEmails'

export type UserRole = 'admin' | 'user'

export interface UserWithRole extends User {
  role?: UserRole
}

export const getUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getUserRole = async (): Promise<UserRole> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return 'user'
  
  // Check if user has a role in the database
  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()
  
  return (roleData?.role as UserRole) || 'user'
}

export const getUserWithRole = async (): Promise<UserWithRole | null> => {
  const user = await getUser()
  if (!user) return null
  
  const role = await getUserRole()
  return { ...user, role }
}

export const isAdmin = async (): Promise<boolean> => {
  const role = await getUserRole()
  return role === 'admin'
}

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut()
}

export const checkAuth = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export const setUserRole = async (userId: string, role: UserRole): Promise<void> => {
  await supabase
    .from('user_roles')
    .upsert({ 
      user_id: userId, 
      role 
    })
}