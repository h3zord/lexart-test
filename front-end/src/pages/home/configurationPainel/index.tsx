import { useNavigate } from 'react-router-dom'

export function ConfigurationPainel() {
  const navigate = useNavigate()

  function pushToRegister() {
    navigate('/register')
  }

  return (
    <section>
      <button onClick={pushToRegister}>Register new user</button>
    </section>
  )
}
