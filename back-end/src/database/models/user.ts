import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { sequelize } from '../config/database'

export interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  id: CreationOptional<number>
  fullName: string
  email: string
  password: string
  accountType: 'admin' | 'user'
}

export const User = sequelize.define<IUserModel>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
  },
)
