import axios from 'axios'

const $api = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
})

export const kehubu = {
  getProfile(id) {
    return $api.get(`kehubu/profile/${id}/`)
  },
  getProfileList(options) {
    return $api.get('kehubu/profile/', options)
  },
  updateProfile(id, data) {
    return $api.put(`kehubu/profile/${id}/`, data)
  },
  getGroup(id) {
    return $api.get(`kehubu/group/${id}/`)
  },
  getGroupList(options) {
    return $api.get('kehubu/group/', options)
  },
}

export default {
  kehubu,
}
