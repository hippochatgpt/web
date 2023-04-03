import { get, post } from '@/axios/request'
export function getUserId(data) {
  return get('/v1/generateUserId', data)
}
export function sendQuestion(data, config) {
  return post('/v1/chat/completions', data, config)
}
export function register(data) {
  return post('/user/register', data)
}
export function login(data) {
  return post('/user/login', data)
}
export function logout() {
  return get('/user/logout')
}
// pageSize  分页参数 默认20
// currentPage  分页参数  默认1
export function getChatList(data) {
  return get('/v1/chat/list', data)
}
// chatName 会话名称
export function newChat(data) {
  return post('/v1/new/chat', data)
}
//   id  会话ID
// chatName 会话名称
export function editChat(data) {
  return post('/v1/edit/chat', data)
}
export function rmAll() {
  return get('/v1/chat/rmAll')
}
//  chatId
export function rmSingle(data) {
  return get('/v1/chat/rmSingle', data)
}
// chatId  会话ID
// pageSize  分页参数 默认20
// currentPage  分页参数  默认1
export function getMessageList(data) {
  return get('/v1/message/list', data)
}
