import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { deleteProject, getProjects, postProject } from '../helpers/api/project'
import { simpleErrorAlert, simpleSuccessAlert } from '../helpers/alerts/alerts'

export const useProjectStore = create(
  devtools(
    persist(
      (set) => {
        return {
          projects: [],
          project: null,
          projectSelected: (id) => {
            set({ project: id }, false, 'PROJECT_SELECTED')
          },
          getProjects: async (id) => {
            const { ok, msg, projects: data } = await getProjects(id)
            if (ok) {
              set({ projects: data }, false, 'GET_PROJECTS')
            } else {
              simpleErrorAlert('Error getting projects', msg)
            }
          },
          createProject: async (project, handleClose) => {
            const { ok, msg, projects: data } = await postProject(project)
            if (ok) {
              handleClose()
              simpleSuccessAlert('Project created', msg)
              set({ projects: data }, false, 'CREATE_PROJECT')
            } else {
              handleClose()
              simpleErrorAlert('Error creating project', msg)
            }
          },
          deleteProject: async (id, user_id) => {
            const { ok, msg, projects: data } = await deleteProject(id, user_id)
            if (ok) {
              simpleSuccessAlert('Project deleted', msg)
              set({ projects: data }, false, 'DELETE_PROJECT')
            } else {
              simpleErrorAlert('Error deleting project', msg)
            }
          },
        }
      },
      { name: 'Project' }
    )
  )
)
