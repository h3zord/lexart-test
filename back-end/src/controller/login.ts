import { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { getLoginService, postLoginService } from '../service/login'
import { fromZodError } from 'zod-validation-error'
import { tokenHandler } from '../middlewares/tokenHandler'

export async function getLoginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
        .min(5, {
          message: 'Password must be 5 or more characters long',
        }),
    })
    .required()

  type LoginSchema = z.infer<typeof loginSchema>

  const { email, password } = req.body as LoginSchema

  let userData = {} as LoginSchema

  try {
    userData = loginSchema.parse({ email, password })
  } catch (error) {
    const validationError = fromZodError(error as ZodError)

    return next(validationError)
  }

  const { token } = await getLoginService({
    email: userData.email,
    password: userData.password,
  })

  return res.status(200).json({ token })
}

export async function postLoginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
        .min(5, {
          message: 'Password must be 5 or more characters long',
        }),
      accountType: z.enum(['admin', 'user'], {
        required_error: 'Account type is required',
        invalid_type_error: 'Account type must be "admin" or "user"',
      }),
    })
    .required()

  type LoginSchema = z.infer<typeof loginSchema>

  const { fullName, email, password, accountType } = req.body as LoginSchema

  let userData = {} as LoginSchema

  try {
    userData = loginSchema.parse({ fullName, email, password, accountType })
  } catch (error) {
    const validationError = fromZodError(error as ZodError)

    return next(validationError)
  }

  const { token } = await postLoginService({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    accountType: userData.accountType,
  })

  return res.status(201).json({ token })
}
