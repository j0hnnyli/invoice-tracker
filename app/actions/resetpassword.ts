'use server'

import { resetPasswordSchema } from '@/lib/schema/resetSchema';
import { createClient } from '@/utils/supabase/server'

export async function sendResetPasswordEmail(formData : FormData){
  const email = formData.get('email') as string;

  if(!email){
    return {success: "", error : "Email Is Required"}
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.APP_BASE_URL}/resetpassword`,
  })

  if(error){
    return {success: "", error : error.message}
  }

  return { success: "Reset Link Sent!", error: "" }
}

export async function resetPassword(formData : FormData, code : string){
  const newPassword = formData.get('new-password') as string;
  const confirmNewPassword = formData.get('confirm-new-password') as string;

  const parseResult = resetPasswordSchema.safeParse({
    password: newPassword,
    confirmPassword: confirmNewPassword,
  });

  if (parseResult.error) {
    const errors = parseResult.error.issues.map((issue) => issue.message)[0];
    return { error: errors, success : "" };
  }
  
  const supabase = await createClient();
  const {error : codeError} = await supabase.auth.exchangeCodeForSession(code)

  if(codeError) return { error : codeError.message, success: "" }

  const { error } = await supabase.auth.updateUser({ password : newPassword })

  if(error){
    return { error : error.message, success: "" }
  }

  return {success : "Successfully Reset Password", error : ""}
}