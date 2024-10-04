import db from '../database/config.db.js'
import { DataTypes } from 'sequelize'
import { Vector } from './vector.models.js'

export const Operational_Streets_Values = db.define(
  'opetarional_streets_values',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    vector_id: { type: DataTypes.UUID },
    value_y: { type: DataTypes.FLOAT },
    value_x: { type: DataTypes.FLOAT }
  },
  { tableName: 'Operational_Streets_Values', timestamps: false }
)
Operational_Streets_Values.belongsTo(Vector, {
  foreignKey: 'vector_id',
  sourceKey: 'id'
})
Vector.hasMany(Operational_Streets_Values, {
  foreignKey: 'vector_id',
  targetKey: 'id'
})
