/**
 * @Author: 郑钊宇
 * @Date: 2022-03-16 08:44:06
 * @LastEditTime: 2022-03-21 14:37:58
 * @LastEditors: 郑钊宇
 * @Description:
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
