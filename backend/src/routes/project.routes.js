import { Router } from 'express';
import multer from 'multer';
import {
  exportProject,
  importProject,
  projectDelete,
  projectGet,
  projectPost
} from '../controllers/project.controllers.js'
import { fieldValidation } from '../middlewares/field-validation.js'
import { check } from 'express-validator'

export const projectRt = Router()

const upload = multer();

projectRt.get('/projects/:user_id', projectGet);
projectRt.post('/newProject', [fieldValidation], projectPost);
projectRt.post(
  '/importProject/:user_id',
  upload.single('svg'),
  importProject
);
projectRt.post('/exportProject/:user_id/:project_id', exportProject);
projectRt.delete('/deleteProject/:id/:user_id', projectDelete);
