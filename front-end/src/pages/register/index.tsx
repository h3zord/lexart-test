import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../utils/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { getToken } from '../../utils/getToken'
import { decodeToken } from '../../utils/decodeToken'

export function Register() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const { token } = getToken()

  const jwtDecoded = decodeToken(token)

  useEffect(() => {
    jwtDecoded?.accountType === 'admin' && setIsAdmin(true)
  }, [jwtDecoded?.accountType])

  const registerDataSchema = z.object({
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
    accountType: z
      .enum(['admin', 'user'], {
        invalid_type_error: 'Account type must be "admin" or "user"',
      })
      .optional(),
  })

  type RegisterDataSchema = z.infer<typeof registerDataSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterDataSchema>({
    resolver: zodResolver(registerDataSchema),
    defaultValues: {
      fullName: '',
      password: '',
      email: '',
      accountType: 'user',
    },
  })

  const navigate = useNavigate()

  const passwordAndNameLessThanFive =
    watch('fullName').length < 5 || watch('password').length < 5

  async function submitRegisterData(registerData: RegisterDataSchema) {
    try {
      const URL = isAdmin ? '/login/create/admin' : '/login/create'

      const {
        data: { token: newToken },
      } = await api.post(
        URL,
        {
          fullName: registerData.fullName,
          email: registerData.email,
          password: registerData.password,
          accountType: registerData.accountType,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (!isAdmin) {
        Cookies.set('token', newToken, { expires: 7 })
        return navigate('/')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return console.error(error.response.data.error)
      }

      console.error(error)
    }
  }

  function pushToLogin() {
    navigate('/login')
  }

  function pushToHome() {
    navigate('/')
  }

  return (
    <section>
      <form id="register-form" onSubmit={handleSubmit(submitRegisterData)}>
        <input
          {...register('fullName')}
          placeholder="Type your full name!"
          type="text"
        />
        <input
          {...register('email')}
          placeholder="Type your email!"
          type="email"
        />
        <input
          {...register('password')}
          placeholder="Type your password!"
          type="password"
        />

        {isAdmin && (
          <>
            <label htmlFor="account-type">Type Account</label>
            <select {...register('accountType')} id="account-type">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
      </form>

      <div>
        <button
          form="register-form"
          type="submit"
          disabled={isSubmitting || passwordAndNameLessThanFive}
        >
          Register
        </button>
        <button onClick={pushToLogin}>Back to Login</button>
        {isAdmin && <button onClick={pushToHome}>Back to Home</button>}
      </div>
    </section>
  )
}
