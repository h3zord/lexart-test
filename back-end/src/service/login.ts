import { User } from '../database/models/user'
import { createJwtToken } from '../utils/createToken'

interface IGetUserData {
  email: string
  password: string
}

export async function getLoginService({ email, password }: IGetUserData) {
  const userData = await User.findOne({ where: { email } })

  if (!userData) throw new Error('User not found')
  if (userData.password !== password) throw new Error('Passwords do not match')

  const { token } = createJwtToken({
    fullName: userData.fullName,
    email: userData.email,
    accountType: userData.accountType,
  })

  return { token }
}

interface IPostUserData {
  fullName: string
  email: string
  password: string
  accountType: 'admin' | 'user'
}

export async function postLoginService({
  fullName,
  email,
  password,
  accountType,
}: IPostUserData) {
  const userAlreadyExists = await User.findOne({ where: { email } })

  if (userAlreadyExists) throw new Error('User already exists')

  const userData = await User.create({ fullName, email, password, accountType })

  const { token } = createJwtToken({
    fullName: userData.fullName,
    email: userData.email,
    accountType: userData.accountType,
  })

  return { token }
}
