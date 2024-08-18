import { Router } from 'express'
import {
  projectDelete,
  projectGet,
  projectPost
} from '../controllers/project.controllers.js'
import { fieldValidation } from '../middlewares/field-validation.js'

export const projectRt = Router()

projectRt.get('/projects/:user_id', projectGet)
projectRt.post('/newProject', [fieldValidation], projectPost)
projectRt.delete('/deleteProject/:id/:user_id', projectDelete)
