import { useEffect, useState } from 'react'
import { api } from '../../utils/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from '../../utils/decodeToken'
import { CellphoneCard } from '../../components/cellphoneCard'
import { SearchOptions } from './searchOptions'
import { ConfigurationPainel } from './configurationPainel'
import { getToken } from '../../utils/getToken'

export interface ICellphones {
  id: number
  name: string
  brand: string
  model: string
  color: string
  price: number
  thumbnail: string
  createdAt: Date
  updatedAt: Date
}

export function Home() {
  const [cellphonesList, setCellphonesList] = useState<ICellphones[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  function setCellphonesListProxy(data: ICellphones[]) {
    setCellphonesList(data)
  }

  const navigate = useNavigate()

  const { token } = getToken()

  const jwtDecoded = decodeToken(token)

  useEffect(() => {
    jwtDecoded?.accountType === 'admin' && setIsAdmin(true)

    const getCellphones = async () => {
      try {
        const { data: cellphonesData } = await api.get('/cellphones', {
          headers: {
            Authorization: token,
          },
        })

        setCellphonesListProxy(cellphonesData)
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.error.includes('Token')
        ) {
          console.error(error.response.data.error)
        }

        return navigate('/login')
      }
    }

    getCellphones()
  }, [navigate, token, jwtDecoded?.accountType])

  return (
    <main>
      <SearchOptions setCellphonesList={setCellphonesListProxy} />

      {isAdmin && <ConfigurationPainel />}

      {cellphonesList?.map((cellphone) => (
        <div key={cellphone.id}>
          <CellphoneCard
            name={cellphone.name}
            brand={cellphone.brand}
            model={cellphone.model}
            color={cellphone.color}
            price={cellphone.price}
            thumbnail={cellphone.thumbnail}
          />
        </div>
      ))}
    </main>
  )
}
