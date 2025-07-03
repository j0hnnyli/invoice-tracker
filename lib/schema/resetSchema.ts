import { z } from 'zod'

export const resetPasswordSchema = z.object({
  password : z.string().min(1, { message : 'Password Is Required'}),
  confirmPassword : z.string().min(1, {message : 'Confirm Password Is Required'})
})
.superRefine(({ password, confirmPassword}, cxt) => {
   if(password !== confirmPassword){
    cxt.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
})