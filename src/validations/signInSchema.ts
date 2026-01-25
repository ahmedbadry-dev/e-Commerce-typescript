import { z } from 'zod'

const loginSchema = z.object({
  email: z.email().min(1, { message: 'password is required' }),
  password: z.string().min(1, { message: 'password is required' }),
})

type TSignInType = z.infer<typeof loginSchema>

export { type TSignInType, loginSchema }
