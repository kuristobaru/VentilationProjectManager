import { DataTypes } from 'sequelize'
import db from '../database/config.db.js'
import { Setting } from './setting.models.js'
import { Vector } from './vector.models.js'
import { Criteria } from './criteria.models.js'

export const Project = db.define(
  'project',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    project_name: { type: DataTypes.STRING },
    user_id: { type: DataTypes.UUID }
  },
  { tableName: 'Project', timestamps: false }
)

Project.hasMany(Setting, {
  foreignKey: 'project_id',
  sourceKey: 'id'
})
Setting.belongsTo(Project, {
  foreignKey: 'project_id',
  targetKey: 'id'
})
Project.hasMany(Vector, {
  foreignKey: 'project_id',
  sourceKey: 'id'
})
Vector.belongsTo(Project, {
  foreignKey: 'project_id',
  targetKey: 'id'
})
Project.hasMany(Criteria, {
  foreignKey: 'project_id',
  sourceKey: 'id'
})
Criteria.belongsTo(Project, {
  foreignKey: 'project_id',
  targetKey: 'id'
})
