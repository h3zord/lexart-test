import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { api } from '../../utils/axios'
import { getToken } from '../../utils/getToken'
import { useState } from 'react'
import { fromZodError } from 'zod-validation-error'
import { CellphoneCard } from '../../components/cellphoneCard'

export function AddCellphones() {
  interface ICellphones {
    name: string
    brand: string
    model: string
    color: string
    price: number
    thumbnail: string | undefined
  }

  // interface IScructureThree {
  //   name: string
  //   brand: string
  //   model: string
  //   data: {
  //     price: number
  //     color: string
  //   }[]
  // }

  const [cellphonesToCreate, setCellphonestoCreate] = useState<ICellphones[]>(
    [],
  )

  const createDataSchema = z.object({
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
    structure: z.enum(['1', '2', '3'], {
      invalid_type_error: 'Structure must be "1", "2" or "3"',
    }),
  })

  type CreateDataSchema = z.infer<typeof createDataSchema>

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateDataSchema>({
    resolver: zodResolver(createDataSchema),
    defaultValues: {
      structure: '1',
    },
  })

  const { token } = getToken()

  const structure = watch('structure')

  const requestStructure = {
    '1': async (createData: CreateDataSchema) => {
      await api.post(
        '/cellphones',
        {
          name: createData.name,
          brand: createData.brand,
          model: createData.model,
          color: createData.color,
          price: createData.price,
          thumbnail: createData.thumbnail,
          structure: createData.structure,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
    },
    '2': async (createData: CreateDataSchema) => {
      await api.post(
        '/cellphones',
        {
          name: createData.name,
          details: {
            brand: createData.brand,
            model: createData.model,
            color: createData.color,
          },
          price: createData.price,
          thumbnail: createData.thumbnail,
          structure: createData.structure,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
    },
    '3': async () => {
      // await api.post('/cellphones', createStructureThree(), {
      //   headers: { Authorization: token },
      // })
      console.log('a')
    },
  }

  function cellphonesToCreateList() {
    const createData = watch()

    try {
      const { name, brand, model, color, price, thumbnail } =
        createDataSchema.parse(createData)

      setCellphonestoCreate((state) => [
        ...state,
        { name, brand, model, color, price, thumbnail },
      ])

      reset({
        name: '',
        brand: '',
        model: '',
        color: '',
        price: 0,
        thumbnail: '',
        structure: '3',
      })
    } catch (error) {
      const { message } = fromZodError(error as ZodError)

      console.error(message)
    }
  }

  // function createStructureThree() {
  //   const structureThree = cellphonesToCreate.reduce(
  //     (acc: IScructureThree[], curr) => {
  //       const cellphoneAlreadyExists = acc.find(
  //         (item) => item.name === curr.name,
  //       )

  //       if (!cellphoneAlreadyExists) {
  //         acc.push({
  //           name: curr.name,
  //           brand: curr.brand,
  //           model: curr.model,
  //           data: [{ price: curr.price, color: curr.color }],
  //         })
  //       } else {
  //         cellphoneAlreadyExists.data.push({
  //           price: curr.price,
  //           color: curr.color,
  //         })
  //       }

  //       return acc
  //     },
  //     [],
  //   )

  //   return structureThree
  // }

  async function submitCreateData(createData: CreateDataSchema) {
    try {
      await requestStructure[structure](createData)

      reset()

      window.alert('Cellphone created!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitCreateData)}>
      <label>Select structure</label>
      <select {...register('structure')}>
        <option value="1">Structure 1</option>
        <option value="2">Structure 2</option>
        <option value="3">Structure 3</option>
      </select>

      <input {...register('name')} placeholder="Type cellphone name" />
      <input {...register('brand')} placeholder="Type cellphone brand" />
      <input {...register('model')} placeholder="Type cellphone model" />
      <input {...register('color')} placeholder="Type cellphone color" />
      <input {...register('price')} placeholder="Type cellphone price" />
      <input
        {...register('thumbnail')}
        placeholder="Type cellphone thumbnail"
      />

      {structure === '3' && (
        <>
          <button type="button" onClick={cellphonesToCreateList}>
            Include
          </button>

          <div>
            {cellphonesToCreate.map((cellphone) => (
              <div key={cellphone.name}>
                <CellphoneCard
                  name={cellphone.name}
                  brand={cellphone.brand}
                  model={cellphone.brand}
                  color={cellphone.color}
                  price={cellphone.price}
                  thumbnail={cellphone.thumbnail}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <button type="submit" disabled={isSubmitting}>
        {structure === '3' ? 'Create All' : 'Create'}
      </button>
    </form>
  )
}
