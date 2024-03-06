import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import {
  deleteCellphonesService,
  getCellphonesService,
  postCellphonesService,
  updateCellphonesService,
} from '../service/cellphones'
import { ZodError, fromZodError } from 'zod-validation-error'

export async function getCellphonesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const searchOptionsSchema = z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .toLowerCase()
      .optional(),
    brand: z
      .string({ invalid_type_error: 'Brand must be a string' })
      .toLowerCase()
      .optional(),
    model: z
      .string({ invalid_type_error: 'Model must be a string' })
      .toLowerCase()
      .optional(),
    color: z
      .string({ invalid_type_error: 'Color must be a string' })
      .toLowerCase()
      .optional(),
    price: z
      .enum(['ASC', 'DESC'], {
        invalid_type_error: 'Price must be "ASC" or "DESC"',
      })
      .optional(),
  })

  type SearchOptionsSchema = z.infer<typeof searchOptionsSchema>

  const { name, brand, model, color, price } = req.body as SearchOptionsSchema

  let searchOptions = {} as SearchOptionsSchema

  try {
    searchOptions = searchOptionsSchema.parse({
      name,
      brand,
      model,
      color,
      price,
    })
  } catch (error) {
    const validationError = fromZodError(error as ZodError)

    return next(validationError)
  }

  const { cellphonesList } = await getCellphonesService({
    name: searchOptions.name,
    brand: searchOptions.brand,
    model: searchOptions.model,
    color: searchOptions.color,
    price: searchOptions.price,
  })

  return res.status(200).json(cellphonesList)
}

export async function postCellphonesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const postDataSchema = z.object({
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
    price: z.number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required',
    }),
    thumbnail: z
      .string({
        invalid_type_error: 'Thumbnail must be a string',
      })
      .optional(),
  })

  type PostDataSchema = z.infer<typeof postDataSchema>

  const { name, brand, model, color, price, thumbnail } =
    req.body as PostDataSchema

  let postData = {} as PostDataSchema

  try {
    postData = postDataSchema.parse({
      name,
      brand,
      model,
      color,
      price,
      thumbnail,
    })
  } catch (error) {
    const validationError = fromZodError(error as ZodError)

    return next(validationError)
  }

  await postCellphonesService({
    name: postData.name,
    brand: postData.brand,
    model: postData.model,
    color: postData.color,
    price: postData.price,
    thumbnail: postData.thumbnail,
  })

  return res.status(201).end()
}

export async function updateCellphonesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params

  if (!id) throw new Error('Cellphone ID not found')

  const updateDataSchema = z.object({
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
    price: z.number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required',
    }),
    thumbnail: z
      .string({
        invalid_type_error: 'Thumbnail must be a string',
      })
      .optional(),
  })

  type UpdateDataSchema = z.infer<typeof updateDataSchema>

  const { name, brand, model, color, price, thumbnail } =
    req.body as UpdateDataSchema

  let updateData = {} as UpdateDataSchema

  try {
    updateData = updateDataSchema.parse({
      name,
      brand,
      model,
      color,
      price,
      thumbnail,
    })
  } catch (error) {
    const validationError = fromZodError(error as ZodError)

    return next(validationError)
  }

  await updateCellphonesService({
    id,
    name: updateData.model,
    brand: updateData.brand,
    model: updateData.model,
    color: updateData.color,
    price: updateData.price,
    thumbnail: updateData.thumbnail,
  })

  return res.status(200).end()
}

export async function deleteCellphonesController(req: Request, res: Response) {
  const { id } = req.params

  if (!id) throw new Error('Cellphone ID not found')

  await deleteCellphonesService({ id })

  return res.status(204).end()
}
