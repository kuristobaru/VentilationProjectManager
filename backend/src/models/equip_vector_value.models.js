import { DataTypes } from 'sequelize'
import db from '../database/config.db.js'
import { Vector } from './vector.models.js'

export const Equip_Vector_Value = db.define(
  'equip_vector_value',
  {
    id_equip_vector_value: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    vector_id: { type: DataTypes.UUID },
    value_y: { type: DataTypes.FLOAT },
    value_x: { type: DataTypes.FLOAT }
  },
  {
    tableName: 'Equip_Vector_Value',
    timestamps: false
  }
)

Equip_Vector_Value.belongsTo(Vector, {
  foreignKey: 'vector_id',
  sourceKey: 'id'
})
Vector.hasMany(Equip_Vector_Value, {
  foreignKey: 'vector_id',
  targetKey: 'id'
})
