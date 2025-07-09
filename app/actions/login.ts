'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { loginSchema } from '@/lib/schema/loginSchema';
import { links } from '@/lib/link';

export async function login(formData: FormData) {
  const rawData = {
    email : formData.get('email'),
    password : formData.get('password')
  }

  const parsed = loginSchema.safeParse(rawData);

  if(parsed.error){
    return {error : parsed.error.errors[0].message}
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return error.code === 'invalid_credentials' ? {error: 'Invalid Credentials'} : {error: 'Email Not Confirmed'} ;
  }

  revalidatePath('/dashboard', 'layout')
  redirect(links.dashboard)
}