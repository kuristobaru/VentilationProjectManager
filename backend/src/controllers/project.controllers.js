import { response, request } from 'express'
import db from '../database/config.db.js';
import {
  Project,
  Setting,
  Vector,
  User,
  Activity,
  Area,
  Criteria,
  Equip_Vector_Value,
  Operational_Streets,
  Operational_Streets_Values,
  SubArea,
  ValueVector
} from '../models/index.js'

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
        {
          model: User,
          attributes: ['user_name']
        },
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

export const importProject = async (req = request, res = response) => {
  const {
    project_name,
    user_id,
    unit,
    leakage,
    value_leakage,
    period,
    area,
    subArea,
    activity,
    criteria,
  } = req.body;

  const transaction = await db.transaction();

  try {
    const project = {
      project_name: project_name,
      user_id: user_id
    };
    const addProject = Project.build(project);
    const projectSaved = await addProject.save({ transaction });

    const newSetting = {
      unit: unit,
      leakage: leakage,
      value_leakage: value_leakage,
      period: period,
      project_id: projectSaved.id
    };
    const addSetting = Setting.build(newSetting);
    await addSetting.save({ transaction });

    const addArea = Area.build(area);
    const areaSaved = await addArea.save({ transaction });

    const addSubArea = SubArea.build(subArea);
    const subAreaSaved = await addSubArea.save({ transaction });

    const addActivity = Activity.build(activity);
    const activitySaved = await addActivity.save({ transaction });

    for (const crit of criteria) {
      const newCriteria = {
        project_id: projectSaved.id,
        name: crit.name,
        value: crit.value,
        type_vector: crit?.type_vector,
        other_vector: crit?.other_vector
      };
      const addCriteria = Criteria.build(newCriteria);
      const criteriaSaved = await addCriteria.save({ transaction });

      for (const vect of crit.vector) {
        const newVector = {
          user_id: user_id,
          area_id: areaSaved.id,
          sub_area_id: subAreaSaved.id,
          activity_id: activitySaved.id,
          criteria_id: criteriaSaved.id,
          project_id: projectSaved.id,
          availability: vect.availability,
          air_velocity: vect.air_velocity || 0,
          area_m2: vect.area_m2 || 0,
          fix_q: vect.fix_q || 0,
          intake_t: vect.intake_t || 0,
          output_t: vect.output_t || 0,
          k_w: vect.k_w || 0,
          r_h: vect.r_h || 0,
          volume_m3: vect.volume_m3 || 0,
          vector: vect.vector,
          power_input: vect.power_input,
          type_vector: vect.type_vector,
          position: vect.position,
        };
        const addVector = Vector.build(newVector);
        const vectorSaved = await addVector.save({ transaction });

        const newOperational_Streets = {
          ...vect.Operational_Streets,
          vector_id: vectorSaved.id,
          criteria_id: criteriaSaved.id,
        };
        const addOperational_Streets = Operational_Streets.build(newOperational_Streets);
        await addOperational_Streets.save({ transaction });

        const newEquip_Vector_Value = {
          ...vect.Equip_Vector_Value,
          vector_id: vectorSaved.id,
        };
        const addEquip_Vector_Value = Equip_Vector_Value.build(newEquip_Vector_Value);
        await addEquip_Vector_Value.save({ transaction });

        const newOperational_Streets_Values = {
          ...vect.Operational_Streets_Values,
          vector_id: vectorSaved.id,
        };
        const addOperational_Streets_Values = Operational_Streets_Values.build(newOperational_Streets_Values);
        await addOperational_Streets_Values.save({ transaction });

        const newValueVector = {
          ...ValueVector,
          user_id: user_id,
          vector_id: vectorSaved.id,
        };
        const addValueVector = ValueVector.build(newValueVector);
        await addValueVector.save({ transaction });
      }
    }

    await transaction.commit();

    const projects = await Project.findAll({
      include: [
        { model: User, attributes: ['user_name'] },
        { model: Vector, attributes: ['id'] }
      ],
      attributes: { exclude: ['user_id'] },
      where: { user_id: user_id }
    });

    res.status(201).json({ msg: 'project created correctly', projects });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    res.status(500).json({ msg: 'error creating project' });
  }
};

