import axios from 'axios'

const prodConnection = 'localhost:5000'

export const axiosAuth = axios.create({
  baseURL: `http://${prodConnection}/api/auth/`,
})
export const axiosUser = axios.create({
  baseURL: `http://${prodConnection}/api/user/`,
})
export const axiosCriteria = axios.create({
  baseURL: `http://${prodConnection}/api/criteria`,
})
export const axiosArea = axios.create({
  baseURL: `http://${prodConnection}/api/area`,
})
export const axiosActivity = axios.create({
  baseURL: `http://${prodConnection}/api/activity`,
})
export const axiosSubArea = axios.create({
  baseURL: `http://${prodConnection}/api/subarea`,
})
export const axiosVector = axios.create({
  baseURL: `http://${prodConnection}/api/vector`,
})
export const axiosValuesEquip = axios.create({
  baseURL: `http://${prodConnection}/api/values`,
})
export const axiosSetting = axios.create({
  baseURL: `http://${prodConnection}/api/setting`,
})
export const axiosProject = axios.create({
  baseURL: `http://${prodConnection}/api/project`,
})
