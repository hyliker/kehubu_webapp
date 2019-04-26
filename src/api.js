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
  createGroupChat(options) {
    return $api.post('kehubu/groupchat/', options);
  },
  destroyGroupChat(id) {
    return $api.delete(`kehubu/groupchat/${id}`);
  },
  getGroupChatList(options) {
    return $api.get('kehubu/groupchat/', options);
  },
  createWxConfig(options) {
    return $api.post('kehubu/wxconfig/', options);
  },
  createUserChat(data) {
    return $api.post('kehubu/userchat/', data);
  },
  getUserChatList(options) {
    return $api.get('kehubu/userchat/', options);
  },
  getGroupMemberRankList(options) {
    return $api.get('kehubu/groupmemberrank/', options);
  },
  getGroupMemberRank(id) {
    return $api.get(`kehubu/groupmemberrank/${id}/`);
  },
  createGroupMemberRank(data) {
    return $api.post('kehubu/groupmemberrank/', data);
  },
  updateGroupMemberRank(id, data) {
    return $api.patch(`kehubu/groupmemberrank/${id}/`, data);
  },
  destroyGroupMemberRank(id) {
    return $api.delete(`kehubu/groupmemberrank/${id}/`);
  },
  updateMember(id, data) {
    return $api.patch(`kehubu/member/${id}/`, data);
  },
  destroyMember(id) {
    return $api.delete(`kehubu/member/${id}/`);
  },
};

export const forum = {
  getCategory(id) {
    return $api.get(`forum/category/${id}`);
  },
  getCategoryList(options) {
    return $api.get('forum/category/', options);
  },
  getTopicList(options) {
    return $api.get('forum/topic/', options);
  },
  getTopic(id) {
    return $api.get(`forum/topic/${id}`);
  },
  getPostList(options) {
    return $api.get('forum/post/', options);
  },
  getPost(id) {
    return $api.get(`forum/post/${id}`);
  },
  createPost(options) {
    return $api.post('forum/post/', options);
  },
  createTopic(data) {
    return $api.post('forum/topic/', data);
  },
  createCategory(data) {
    return $api.post('forum/category/', data);
  },
  updateCategory(id, data) {
    return $api.put(`forum/category/${id}/`, data)
  },
  destroyCategory(id){
    return $api.delete(`forum/category/${id}/`);
  },
  updateTopic(id, data) {
    return $api.put(`forum/topic/${id}/`, data);
  },
  updatePost(id, data) {
    return $api.patch(`forum/post/${id}/`, data);
  },
  destroyPost(id){
    return $api.delete(`forum/post/${id}/`);
  },
  destroyTopic(id){
    return $api.delete(`forum/topic/${id}/`);
  },
};

export default {
  kehubu, forum,
}
