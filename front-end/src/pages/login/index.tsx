import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/axios'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export function Login() {
  const loginDataSchema = z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' })
      .transform((email) => email.toLowerCase()),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(5, {
        message: 'Password must be 5 or more characters long',
      }),
  })

  type LoginDataSchema = z.infer<typeof loginDataSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginDataSchema>({
    resolver: zodResolver(loginDataSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const passwordLessThanFive = watch('password').length < 5

  async function submitLoginData(loginData: LoginDataSchema) {
    try {
      const {
        data: { token },
      } = await api.post('/login', {
        email: loginData.email,
        password: loginData.password,
      })

      Cookies.set('token', token, { expires: 7 })

      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return console.error(error.response.data.error)
      }

      console.error(error)
    }
  }

  function pushToRegister() {
    navigate('/register')
  }

  return (
    <section>
      <form id="login-form" onSubmit={handleSubmit(submitLoginData)}>
        <input
          type="email"
          {...register('email')}
          placeholder="Type your email!"
        />

        <input
          type="password"
          {...register('password')}
          placeholder="Type your password!"
        />
      </form>

      <div>
        <button
          form="login-form"
          type="submit"
          disabled={isSubmitting || passwordLessThanFive}
        >
          Login
        </button>

        <button onClick={pushToRegister}>Register</button>
      </div>
    </section>
  )
}
