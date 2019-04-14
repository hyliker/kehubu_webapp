import axios from 'axios'

const $api = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

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
  createGroup(options) {
    return $api.post('kehubu/group/', options)
  },
  updateGroup(id, data) {
    return $api.put(`kehubu/group/${id}/`, data)
  },
  destroyGroup(id) {
    return $api.delete(`kehubu/group/${id}/`);
  },
  getMemberList(options) {
    return $api.get('kehubu/member/', options)
  },
  getMember(id) {
    return $api.get(`kehubu/member/${id}`);
  },
  getGroupInvitationList(options) {
    return $api.get('kehubu/groupinvitation/', options);
  },
  createGroupInvitation(options) {
    return $api.post('kehubu/groupinvitation/', options);
  },
  getActivityList(options) {
    return $api.get('kehubu/activity/', options);
  },
  getGroupAlbum(id) {
    return $api.get(`kehubu/groupalbum/${id}`);
  },
  getGroupAlbumList(options) {
    return $api.get('kehubu/groupalbum/', options);
  },
  createGroupAlbum(options) {
    return $api.post('kehubu/groupalbum/', options);
  },
  destroyGroupAlbum(id) {
    return $api.delete(`kehubu/groupalbum/${id}`);
  },
  createGroupAlbumImage(options) {
    return $api.post('kehubu/groupalbumimage/', options);
  },
  destroyGroupAlbumImage(id) {
    return $api.delete(`kehubu/groupalbumimage/${id}`);
  },
  updateGroupAlbum(id, data) {
    return $api.put(`kehubu/groupalbum/${id}/`, data)
  },
  updateGroupAlbumImage(id, data) {
    return $api.put(`kehubu/groupalbumimage/${id}/`, data)
  },
}

export default {
  kehubu,
}
