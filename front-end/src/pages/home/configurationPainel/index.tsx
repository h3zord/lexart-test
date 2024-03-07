import { useNavigate } from 'react-router-dom'

export function ConfigurationPainel() {
  const navigate = useNavigate()

  function pushToRegister() {
    navigate('/register')
  }

  function pushToEdit() {
    navigate('/edit')
  }

  function pushToCreate() {
    navigate('/create')
  }

  return (
    <section>
      <button onClick={pushToRegister}>Register new user</button>
      <button onClick={pushToEdit}>Edit cellphones</button>
      <button onClick={pushToCreate}>Add cellphones</button>
    </section>
  )
}
