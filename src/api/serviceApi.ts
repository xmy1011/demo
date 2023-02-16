// 项目请求接口

import http from "."

const PORT1 = '/hooks';
const PORT2 = '/geeker'

// 动态获取菜单列表
export const getMenuList = () => {
  return http.get(PORT1+`/menu/list`)
}
// 登录啦
export const login = (params:{username:string, password:string}) => {
  return http.post(PORT1+ `/login`, params)
}