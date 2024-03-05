import 'dotenv/config'
import jwt from 'jsonwebtoken'

interface IUserData {
  fullName: string
  email: string
  accountType: 'admin' | 'user'
}

export function createJwtToken({ fullName, email, accountType }: IUserData) {
  const token = jwt.sign(
    {
      fullName,
      email,
      accountType,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '9999d',
    },
  )

  return { token }
}

interface IToken {
  token: string
}

export function validateJwtToken({ token }: IToken) {
  try {
    jwt.verify(token, process.env.SECRET_KEY as string)
  } catch (_error) {
    throw new Error('Token is invalid')
  }
}
