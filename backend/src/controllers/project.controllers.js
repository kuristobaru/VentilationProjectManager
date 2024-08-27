import { response, request } from 'express'
import { Project } from '../models/project.models.js'
import { Setting } from '../models/setting.models.js'
import { Vector } from '../models/vector.models.js'
import { User } from '../models/user.models.js'

export const projectPost = async (req = request, res = response) => {
  const { project_name, user_id, unit, leakage, value_leakage, period } =
    req.body
  if (!project_name || !user_id)
    return res
      .status(400)
      .json({ msg: 'Project name or user was not provided' })

  try {
    const project = {
      project_name: project_name,
      user_id: user_id
    }
    const addProject = Project.build(project)
    await addProject.save()
    const newSetting = {
      unit: unit,
      leakage: leakage,
      value_leakage: value_leakage,
      period: period,
      project_id: addProject.dataValues.id
    }
    const addSetting = Setting.build(newSetting)
    await addSetting.save()
    const projects = await Project.findAll({
      include: [
        { model: User, attributes: ['user_name'] },
        {
          model: Vector,
          attributes: ['id']
        }
      ],
      attributes: { exclude: ['user_id'] },
      where: { user_id: user_id }
    })

    res.status(201).json({ msg: 'project created correctly', projects })
  } catch (error) {
    res.status(500).json({ msg: 'error creating project' })
  }
}

export const projectGet = async (req = request, res = response) => {
  const { user_id } = req.params
  try {
    const project = await Project.findAll({
      include: [
        { model: User, 
          attributes: ['user_name'] },
        {
          model: Vector,
          attributes: ['id']
        }
      ],
      attributes: { exclude: ['user_id'] },
      where: { user_id: user_id }
    })

    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ msg: 'error getting project' })
  }
}

export const projectDelete = async (req = request, res = response) => {
  const { id, user_id } = req.params
  try {
    const project = await Project.findByPk(id)
    await project.destroy({ where: { id: id, user_id: user_id } })
    const projects = await Project.findAll({
      include: [
        { model: User, attributes: ['user_name'] },
        {
          model: Vector,
          attributes: ['id']
        }
      ],
      attributes: { exclude: ['user_id'] },
      where: { user_id: user_id }
    })

    res.status(200).json({ msg: 'project deleted correctly', projects })
  } catch (error) {
    res.status(500).json({ msg: 'error deleting project' })
  }
}
