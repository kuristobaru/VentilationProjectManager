import { axiosProject } from './api'

export const getProjects = async (user_id) => {
  try {
    const { data } = await axiosProject.get(`/projects/${user_id}`)
    return { ok: true, projects: data }
  } catch (error) {
    return { ok: false, msg: 'Error getting projects' }
  }
}
export const postProject = async (project) => {
  try {
    const { data } = await axiosProject.post('/newProject', project)

    return { ok: true, msg: data.msg, projects: data.projects }
  } catch (error) {
    return { ok: false, msg: 'Error creating project' }
  }
}

export const deleteProject = async (id, user_id) => {
  try {
    const { data } = await axiosProject.delete(
      `/deleteProject/${id}/${user_id}`
    )
    return {
      ok: true,
      msg: data.msg,
      projects: data.projects,
    }
  } catch (error) {
    return { ok: false, msg: 'Error deleting project' }
  }
}
