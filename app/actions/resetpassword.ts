'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendResetPasswordEmail(formData : FormData){
  const email = formData.get('email') as string;

  if(!email){
    return {success: "", error : "Email Is Required"}
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.APP_BASE_URL}/update-password`,
  })

  if(error){
    console.log(error)
    return {success: "", error : error.message}
  }

  return { success: "Reset Link Sent!", error: "" }
}

export async function resetPassword(formData : FormData){
  const newPassword = formData.get('new-password') as string;
  const confirmNewPassword = formData.get('confirm-new-password') as string;

  if(!newPassword || !confirmNewPassword){
    return {error : "Missing Credentials"}
  }

  if(newPassword !== confirmNewPassword){
    return {error : "Password Not Match"}
  }
  
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password : newPassword })

  if(error){
    return { error : error.message }
  }

  revalidatePath("/dashboard", "layout")
  redirect("/dashboard")
}