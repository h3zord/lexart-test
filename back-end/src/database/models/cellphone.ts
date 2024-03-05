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
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
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