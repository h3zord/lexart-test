import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../config/database'

export interface ICellphoneModel
  extends Model<
    InferAttributes<ICellphoneModel>,
    InferCreationAttributes<ICellphoneModel>
  > {
  id: CreationOptional<number>
  name: string
  brand: string
  model: string
  price: number
  color: string
  thumbnail: CreationOptional<string>
}

export const Cellphone = sequelize.define<ICellphoneModel>(
  'Cellphone',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'cellphones',
  },
)
