import { axiosArea } from './api'

export const getAreas = async () => {
  try {
    const { data } = await axiosArea.get('/areas')
    return {
      ok: true,
      data,
    }
  } catch (err) {
    const { errors } = err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
export const postArea = async (area = null) => {
  if (!area) return
  try {
    console.log(area)
    const { data } = await axiosArea.post('/newArea', area)
    console.log(data)
    const { msg: message } = await data
    return {
      ok: true,
      message,
    }
  } catch (err) {
    console.log(err)
    const { errors } = await err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
export const deleteArea = async (id = null) => {
  if (!id) return
  try {
    const { data } = await axiosArea.delete(`/${id}`)
    const { msg: message } = await data
    return {
      ok: true,
      message,
    }
  } catch (err) {
    const { errors } = err.response.data
    const errorMessage = errors.map((e) => e.msg)[0]
    return {
      ok: false,
      errorMessage,
    }
  }
}
