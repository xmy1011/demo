import { store } from '@/redux';
import { searchRoute } from '@/utils/util';
import { useLocation, Navigate} from 'react-router-dom';
import { routerArray } from '..';
import { HOME_URL } from '@/config/config';

// 路由守卫组件
const AuthRouter = (props: {children: JSX.Element}) => {
  
  const { pathname } = useLocation();
  const currentRoute = searchRoute(pathname, routerArray);
  // return props.children;
  if(!currentRoute.meta?.requiresAuth) return props.children;
  // 判断是否有token
  const token = store.getState().global?.token ;
  if(!token) return <Navigate to={'/login'} replace  />
  

  // 动态路由
  const dynamicRouter = store.getState().auth.authRouter ?? [];
  // 静态路由
  const staticRouter = [HOME_URL, '/403'];
  const routerList = dynamicRouter.concat(staticRouter);

  // 如果访问的地址没有在路由表中，重定向到 403
  if(routerList.indexOf(pathname) == -1) return <Navigate to={'/403'} />
  // 当前账号有权限，返回Router  正常访问页面 
  return props.children;
}

export default AuthRouter;