import { Request, Response } from 'express'
import { z } from 'zod'
import { getLoginService, postLoginService } from '../service/login'

export async function getLoginController(req: Request, res: Response) {
  const loginSchema = z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
      password: z
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .length(60, { message: 'Hash must be exactly 60 characters long' }),
    })
    .required()

  type LoginSchema = z.infer<typeof loginSchema>

  const { email, password }: LoginSchema = req.body

  try {
    loginSchema.parse({ email, password })
  } catch (error) {
    console.error(error)
  }

  const { token } = await getLoginService({ email, password })

  return res.status(200).json({ token })
}

export async function postLoginController(req: Request, res: Response) {
  const loginSchema = z
    .object({
      fullName: z
        .string({
          required_error: 'Name is required',
          invalid_type_error: 'Name must be a string',
        })
        .min(5, { message: 'FullName must be 5 or more characters long' })
        .toLowerCase(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
      password: z
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .length(60, { message: 'Hash must be exactly 60 characters long' }),
      accountType: z.enum(['admin', 'user'], {
        required_error: 'Account type is required',
        invalid_type_error: 'Account type must be "admin" or "user"',
      }),
    })
    .required()

  type LoginSchema = z.infer<typeof loginSchema>

  const { fullName, email, password, accountType }: LoginSchema = req.body

  try {
    loginSchema.parse({ fullName, email, password, accountType })
  } catch (error) {
    console.error(error)
  }

  const { token } = await postLoginService({
    fullName,
    email,
    password,
    accountType,
  })

  return res.status(201).json({ token })
}
