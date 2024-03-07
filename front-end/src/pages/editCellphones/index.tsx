import { useEffect, useState } from 'react'
import { ICellphones } from '../home'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/getToken'
import { api } from '../../utils/axios'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function EditCellphones() {
  const [cellphonesList, setCellphonesList] = useState<ICellphones[]>([])

  const navigate = useNavigate()

  const { token } = getToken()

  useEffect(() => {
    const getCellphones = async () => {
      try {
        const { data: cellphonesData } = await api.get('/cellphones', {
          headers: {
            Authorization: token,
          },
        })

        setCellphonesList(cellphonesData)
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.error.includes('Token')
        ) {
          console.error(error.response.data.error)
          return navigate('/login')
        }

        console.error(error)
      }
    }

    getCellphones()
  }, [navigate, token])

  const updateDataSchema = z.object({
    id: z.string({
      invalid_type_error: 'Id must be a string',
      required_error: 'Id is required',
    }),
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required',
      })
      .toLowerCase(),
    brand: z
      .string({
        invalid_type_error: 'Brand must be a string',
        required_error: 'Brand is required',
      })
      .toLowerCase(),
    model: z
      .string({
        invalid_type_error: 'Model must be a string',
        required_error: 'Model is required',
      })
      .toLowerCase(),
    color: z
      .string({
        invalid_type_error: 'Color must be a string',
        required_error: 'Color is required',
      })
      .toLowerCase(),
    price: z
      .string({
        invalid_type_error: 'Price must be a string',
        required_error: 'Price is required',
      })
      .transform((price) => Number(price)),
    thumbnail: z
      .string({
        invalid_type_error: 'Thumbnail must be a string',
      })
      .optional(),
  })

  type UpdateDataSchema = z.infer<typeof updateDataSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateDataSchema>({
    resolver: zodResolver(updateDataSchema),
  })

  async function submitUpdateDataSchema(updateData: UpdateDataSchema) {
    try {
      await api.put(
        `/cellphones/${updateData.id}`,
        {
          name: updateData.name,
          brand: updateData.brand,
          model: updateData.model,
          color: updateData.color,
          price: updateData.price,
          thumbnail: updateData.thumbnail,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      window.alert('Updated!')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return console.error(error.response.data.error)
      }

      console.error(error)
    }
  }

  async function deleteCellphone(id: number) {
    try {
      await api.delete(`/cellphones/${id}`, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return console.error(error.response.data.error)
      }

      console.error(error)
    }
  }

  console.log(cellphonesList)

  return (
    <section>
      <form onSubmit={handleSubmit(submitUpdateDataSchema)}>
        {cellphonesList?.map((cellphone) => (
          <div key={cellphone.id} style={{ display: 'flex' }}>
            <input
              value={cellphone.id}
              {...register('id')}
              style={{ width: '10px' }}
            />
            <input defaultValue={cellphone.name} {...register('name')} />
            <input defaultValue={cellphone.brand} {...register('brand')} />
            <input defaultValue={cellphone.model} {...register('model')} />
            <input defaultValue={cellphone.color} {...register('color')} />
            <input defaultValue={cellphone.price} {...register('price')} />
            <input
              defaultValue={cellphone.thumbnail}
              {...register('thumbnail')}
            />

            <button type="submit" disabled={isSubmitting}>
              Update
            </button>

            <button
              onClick={() => deleteCellphone(cellphone.id)}
              disabled={isSubmitting}
            >
              Delete
            </button>
          </div>
        ))}
      </form>
    </section>
  )
}
