import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../utils/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export function Register() {
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
    },
  })

  const navigate = useNavigate()

  const passwordAndNameLessThanFive =
    watch('fullName').length < 5 || watch('password').length < 5

  async function submitRegisterData(registerData: RegisterDataSchema) {
    try {
      const {
        data: { token },
      } = await api.post('/login/create', {
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
        accountType: 'user',
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

  function pushToLogin() {
    navigate('/login')
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
      </form>

      <div>
        <button
          form="register-form"
          type="submit"
          disabled={isSubmitting || passwordAndNameLessThanFive}
        >
          Register
        </button>
        <button onClick={pushToLogin}>Back</button>
      </div>
    </section>
  )
}
