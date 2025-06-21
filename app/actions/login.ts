'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const  password = formData.get('password') as string;

  if(!email || !password){
    return {error : 'Missing Credentials'}
  }

  const supabase = await createClient()

  const data = {
    email,
    password,
  }
  
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return error.code === 'invalid_credentials' ? {error: 'Invalid Credentials'} : {error: 'Email Not Confirmed'} ;
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}