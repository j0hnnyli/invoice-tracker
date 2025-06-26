import { z } from 'zod'

export const signupSchema = z.object({
  name : z.string().min(1, {message : "Name Is Required"}),
  email : z.string().min(1, { message : "Email is Required"}).email({ message : "Email is Invaild"}),
  password : z.string().min(5, { message : "Passwrd must be at least 5 characters"}),
  confirmPassword: z.string().min(1, { message: "Confirm Password is Required" }),
})
.superRefine(({password, confirmPassword} , ctx) => {
  if(password !== confirmPassword){
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
})