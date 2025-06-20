'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';


export async function signup(formData: FormData ) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (!name || !email || !password || !confirmPassword) {
    return { error: 'All fields are required' }
  }
  
  if(password !== confirmPassword){
    return { error : 'Password does not match'}
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options : {
      data : {
        display_name : name,
      }
    }
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
  return {error: ""}
}