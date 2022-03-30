/**
 * @Author: 郑钊宇
 * @Date: 2022-03-16 08:44:06
 * @LastEditTime: 2022-03-30 16:55:59
 * @LastEditors: 郑钊宇
 * @Description:
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  roles: state => state.user.roles,
  username: state => state.user.username,
  routes: state => state.permission.routes
}
export default getters
