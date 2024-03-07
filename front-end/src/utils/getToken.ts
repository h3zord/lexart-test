import Cookies from 'js-cookie'

export function getToken() {
  const token = Cookies.get('token') as string

  return { token }
}
