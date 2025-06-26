import { z } from 'zod'

export const loginSchema = z.object({
  email : z.string().min(1, { message : "Email is Required"}).email({ message : "Email is Invaild"}),
  password : z.string().min(1, { message : "Passwrd is Required"})
})