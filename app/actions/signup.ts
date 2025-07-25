'use server'

import { createClient } from '@/utils/supabase/server';
import { signupSchema } from '@/lib/schema/signupSchema';

export async function signup(formData: FormData ) {
  const rawData = {
    name : formData.get('name'),
    email : formData.get('email'),
    password : formData.get('password'),
    confirmPassword : formData.get('confirm-password'),
  }

  const parsed = signupSchema.safeParse(rawData);

  if(parsed.error){
    return {success: false, error : parsed.error.errors[0].message}
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email : parsed.data.email,
    password : parsed.data.password,
    options : {
      data : {
        display_name : parsed.data.name,
      }
    }
  })

  if (error) {
    return {success: false, error : error.message}
  }

  return {success: true ,error: ""}
}