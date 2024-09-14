import { Router } from 'express'
import {
  importProject,
  projectDelete,
  projectGet,
  projectPost
} from '../controllers/project.controllers.js'
import { fieldValidation } from '../middlewares/field-validation.js'

export const projectRt = Router()

projectRt.get('/projects/:user_id', projectGet)
projectRt.post('/newProject', [fieldValidation], projectPost)
projectRt.post(
  '/exportProject', 
  [ 
    check('project_name','El project_name es obligatorio').not().isEmpty(),
    check('user_id','El user_id es obligatorio').not().isEmpty(),
    check('unit','El unit es obligatorio').not().isEmpty(),
    check('leakage','El leakage es obligatorio').not().isEmpty(),
    check('value_leakage','El value_leakage es obligatorio').not().isEmpty(),
    check('period','El period es obligatorio').not().isEmpty(),
    check('area','El area es obligatorio').not().isEmpty(),
    check('subArea','El subArea es obligatorio').not().isEmpty(),
    check('activity','El activity es obligatorio').not().isEmpty(),
    check('criteria','El criteria es obligatorio').not().isEmpty(),
    fieldValidation
  ],
  importProject
)
projectRt.delete('/deleteProject/:id/:user_id', projectDelete)
