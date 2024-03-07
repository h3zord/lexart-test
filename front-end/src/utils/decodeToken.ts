import { jwtDecode } from 'jwt-decode'

interface IDecodedToken {
  fullName: string
  email: string
  accountType: 'admin' | 'user'
}

export function decodeToken(token: string) {
  if (token) {
    const { fullName, email, accountType } = jwtDecode(token) as IDecodedToken
    return { fullName, email, accountType }
  }
}
