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
