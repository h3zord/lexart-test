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
      ([_, value]) => value !== undefined,
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
