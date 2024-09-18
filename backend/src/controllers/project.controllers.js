import { response, request } from 'express'
import db from '../database/config.db.js';
import { validationResult } from 'express-validator';
import { parseStringPromise } from 'xml2js';
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

export const exportProject = async (req = request, res = response) => {
  const { user_id, project_id } = req.params;
  try {
    const project = await Project.findOne({
      include: [
        {
          model: Setting,
          attributes: { exclude: ['id', 'project_id'] },
        },
        {
          model: Criteria,
          attributes: { exclude: ['id', 'project_id'] },
          include: [
            {
              model: Vector,
              attributes: {
                exclude: [
                  'id',
                  'user_id',
                  'project_id',
                  'area_id',
                  'sub_area_id',
                  'activity_id',
                  'criteria_id',
                ],
              },
              include: [
                {
                  model: ValueVector,
                  attributes: { exclude: ['id', 'user_id', 'vector_id'] },
                },
                {
                  model: Area,
                  attributes: { exclude: ['id'] },
                },
                {
                  model: SubArea,
                  attributes: { exclude: ['id'] },
                },
                {
                  model: Activity,
                  attributes: { exclude: ['id'] },
                },
                {
                  model: Operational_Streets,
                  attributes: { exclude: ['id', 'criteria_id', 'vector_id'] },
                },
                {
                  model: Operational_Streets_Values,
                  attributes: { exclude: ['id', 'vector_id'] },
                },
                {
                  model: Equip_Vector_Value,
                  attributes: { exclude: ['id', 'vector_id'] },
                }
              ]
            }
          ]
        },
      ],
      attributes: { exclude: ['id', 'user_id'] },
      where: { user_id, id: project_id }
    });

    if (!project) {
      return res.status(404).send('Proyecto no encontrado');
    }

    const jsonString = JSON.stringify(project, null, 2);

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="100%" height="100%" fill="lightgray" />
        <text x="10" y="20" font-size="16" fill="black">Project Export</text>
        <foreignObject x="10" y="40" width="580" height="360">
          <pre>${jsonString}</pre>
        </foreignObject>
      </svg>
    `;

    res.setHeader('Content-Disposition', 'attachment; filename="project-export.svg"');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgContent);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'error creating project' });
  }
}

export const importProject = async (req, res) => {
  const { user_id } = req.params;

  const svgFile = req.file;

  if (!svgFile) {
    return res.status(400).json({ error: 'El archivo SVG es obligatorio.' });
  }

  const transaction = await db.transaction();

  try {
    const svg = svgFile.buffer.toString('utf-8');

    const svgData = await parseStringPromise(svg);

    const embeddedJson = svgData?.svg?.foreignObject?.[0]?.pre?.[0];

    if (!embeddedJson) {
      return res.status(400).json({ error: 'No se encontró un JSON embebido en el SVG.' });
    }

    const jsonData = JSON.parse(embeddedJson);
    
    const {
      project_name,
      settings,
      criteria
    } = jsonData;

    const project = {
      project_name: project_name,
      user_id: user_id
    };
    const addProject = Project.build(project);
    const projectSaved = await addProject.save({ transaction });


    for (const sett of settings) {
      const newSetting = {
        unit: sett.unit,
        leakage: sett.leakage,
        value_leakage: sett.value_leakage,
        period: sett.period,
        project_id: projectSaved.id
      };
      const addSetting = Setting.build(newSetting);
      await addSetting.save({ transaction });
    }

    for (const crit of criteria) {

      //console.log('crit ----> ' + JSON.stringify(crit));

      const newCriteria = {
        project_id: projectSaved.id,
        name: crit.name,
        value: crit.value,
        type_vector: crit?.type_vector,
        other_vector: crit?.other_vector
      };
      const addCriteria = Criteria.build(newCriteria);
      const criteriaSaved = await addCriteria.save({ transaction });

      if (crit.vectors.length > 0) {
        for (const vect of crit.vectors) {
          if (vect.area && vect.subarea && vect.activity) {
            const area = vect.area;
            const newArea = {
              name: area.name,
            };
            const addArea = Area.build(newArea);
            const areaSaved = await addArea.save({ transaction });

            const subarea = vect.subarea;
            const newsubarea = {
              name: subarea.name,
            };
            const addSubArea = SubArea.build(newsubarea);
            const subAreaSaved = await addSubArea.save({ transaction });

            const activity = vect.activity;
            const newActivity = {
              name: activity.name,
            };
            const addActivity = Activity.build(newActivity);
            const activitySaved = await addActivity.save({ transaction });

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

            for (const opeSt of vect.operational_streets) {
              const newOperational_Streets = {
                ...opeSt,
                vector_id: vectorSaved.id,
                criteria_id: criteriaSaved.id,
              };
              const addOperational_Streets = Operational_Streets.build(newOperational_Streets);
              await addOperational_Streets.save({ transaction });
            }

            for (const opeStV of vect.opetarional_streets_values) {
              const newOperational_Streets_Values = {
                ...opeStV,
                vector_id: vectorSaved.id,
              };
              const addOperational_Streets_Values = Operational_Streets_Values.build(newOperational_Streets_Values);
              await addOperational_Streets_Values.save({ transaction });
            }


            for (const equipVector of vect.equip_vector_values) {
              const newEquip_Vector_Value = {
                ...equipVector,
                vector_id: vectorSaved.id,
              };
              const addEquip_Vector_Value = Equip_Vector_Value.build(newEquip_Vector_Value);
              await addEquip_Vector_Value.save({ transaction });
            }


            for (const valueVectors of vect.valuevectors) {
              const newValueVector = {
                ...valueVectors,
                user_id: user_id,
                vector_id: vectorSaved.id,
              };
              const addValueVector = ValueVector.build(newValueVector);
              await addValueVector.save({ transaction });
            }
          } else {
            res.status(400).json({ msg: 'Area & Activity can not be empty' });
          }
        }
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
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.log(error);
    res.status(500).json({ msg: 'error creating project' });
  }
};
