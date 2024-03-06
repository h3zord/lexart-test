import { Op } from 'sequelize'
import { Cellphone } from '../database/models/cellphone'

export interface ISearchOptions {
  name?: string
  brand?: string
  model?: string
  color?: string
  price?: 'ASC' | 'DESC'
}

export async function getCellphonesService({
  name,
  brand,
  model,
  color,
  price,
}: ISearchOptions) {
  const searchConditions = {
    brand,
    model,
    color,
  }

  const filteredConditions = Object.fromEntries(
    Object.entries(searchConditions).filter(
      ([, condition]) => condition !== undefined,
    ),
  )

  const cellphonesList = await Cellphone.findAll({
    where: {
      ...filteredConditions,
      name: {
        [Op.like]: name ? `%${name}%` : '%',
      },
    },
    order: price && [['price', price]],
  })

  if (!cellphonesList.length)
    throw new Error('There are no products registered in the database')

  return { cellphonesList }
}

interface IUpdateData {
  id: string
  name: string
  brand: string
  model: string
  color: string
  price: number
  thumbnail?: string
}

export async function updateCellphonesService({
  id,
  name,
  brand,
  model,
  color,
  price,
  thumbnail,
}: IUpdateData) {
  const [affectedCount] = await Cellphone.update(
    { name, brand, model, color, price, thumbnail },
    {
      where: {
        id,
      },
    },
  )

  if (!affectedCount)
    throw new Error('Failed to update, verify your ID or update data')
}
