// 项目请求接口

import http from "."

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

const PORT1 = '/hooks';
const PORT2 = '/geeker'

// 动态获取菜单列表
export const getMenuList = () => {
  // const url =  isDev ?  PORT1+`/menu/list` : 'https://mock.mengxuegu.com/mock/62abda3212c1416424630a45/menu/list';
  return http.get(PORT1+`/menu/list`);
}
// 登录啦
export const login = (params:{username:string, password:string}) => {
  return http.post(PORT1+`/login`, params)
}

// 获取vip列表
export const getVipList = () => {
  return http.get("/hooks/viplist")
}
// 新增 vip 
export const createVip = (params:{name:string, age:number, address: string}) => {
  return http.post("/hooks/create", params)
}

//  删除一条
export const deleteVip = (params:{key: number}) => {
  return http.post("/hooks/delete", params)
}

export const getStep1List = () => {
  return http.get("/hooks/stepFirstList");
}
export const upload=(file:any) => {
  return http.post("/file/upload", file)
}