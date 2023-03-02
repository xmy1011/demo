import { RouteObject } from "@/routers/interface";


/**
 * @description 递归查询对应的路由
 * @param {string} path  当前访问地址
 * @param {Array} routes 路由列表
 * @returns RouteObject
 * 
 * **/ 

export const searchRoute = (path:string, routes: RouteObject[] = []): RouteObject => {

  let result: RouteObject = {};
  for (let item of routes) {
    if(item.path === path) return item;
    if(item.children){
      const res = searchRoute(path, item.children);
      if(Object.keys(res).length) result = res;
    }
  }
  return result;

}

// 深拷贝
function deepCopy(obj:any) {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
  } else {
    newObj = obj;
  }
  return newObj;
}