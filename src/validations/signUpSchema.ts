import { z } from 'zod'

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.email().min(1, { message: 'Email address is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 character' })
      .regex(/.*[!@#$%^&*()|_+{}[\]\\:";'<>?,./].*/, {
        message: 'Password should contain at least 1 special character',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Confirm password don't match the password",
    path: ['confirmPassword'],
  })

type TRegisterType = z.infer<typeof signUpSchema>

export { signUpSchema, type TRegisterType }
