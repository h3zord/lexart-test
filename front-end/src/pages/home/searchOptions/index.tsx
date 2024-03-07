import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../utils/axios'
import { AxiosError } from 'axios'
import { ICellphones } from '..'
import { getToken } from '../../../utils/getToken'

interface ISearchOptionsProps {
  setCellphonesList: (data: ICellphones[]) => void
}

export function SearchOptions({ setCellphonesList }: ISearchOptionsProps) {
  const searchOptionsSchema = z.object({
    name: z.string().toLowerCase(),
    brand: z.string().toLowerCase(),
    model: z.string().toLowerCase(),
    color: z.string().toLowerCase(),
    price: z.enum(['ASC', 'DESC']),
  })

  type SearchOptionsSchema = z.infer<typeof searchOptionsSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchOptionsSchema>({
    resolver: zodResolver(searchOptionsSchema),
  })

  async function submitSearchOptions(searchOptions: SearchOptionsSchema) {
    const { token } = getToken()
    try {
      const { data: cellphonesData } = await api.get('/cellphones', {
        headers: {
          Authorization: token,
        },
        params: {
          name: searchOptions.name,
          brand: searchOptions.brand,
          model: searchOptions.model,
          color: searchOptions.color,
          price: searchOptions.price,
        },
      })

      setCellphonesList(cellphonesData)
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.error.includes('There are no products')
      ) {
        return setCellphonesList([])
      }

      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitSearchOptions)}>
      <input placeholder="Search by name" {...register('name')} />
      <input placeholder="Search by brand" {...register('brand')} />
      <input placeholder="Search by model" {...register('model')} />
      <input placeholder="Search by color" {...register('color')} />

      <label htmlFor="price-option">Price</label>
      <select {...register('price')} id="price-option">
        <option value="ASC" defaultValue="ASC">
          Ascending
        </option>
        <option value="DESC">Descending</option>
      </select>

      <button type="submit" disabled={isSubmitting}>
        Search
      </button>
    </form>
  )
}
