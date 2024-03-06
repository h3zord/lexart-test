import { User } from '../database/models/user'
import { createJwtToken } from '../utils/auth'
import bcrypt from 'bcryptjs'

interface IGetUserData {
  email: string
  password: string
}

export async function getLoginService({ email, password }: IGetUserData) {
  const userData = await User.findOne({ where: { email } })

  if (!userData) throw new Error('User not found')

  const hash = userData.password

  if (!bcrypt.compareSync(password, hash))
    throw new Error('Password do not match')

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

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  password = hash

  const userData = await User.create({ fullName, email, password, accountType })

  const { token } = createJwtToken({
    fullName: userData.fullName,
    email: userData.email,
    accountType: userData.accountType,
  })

  return { token }
}
