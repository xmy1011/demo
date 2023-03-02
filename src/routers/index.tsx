import { useRoutes, Navigate } from 'react-router-dom'
import homeRouter from "./modules/home";
import errorRouter from "./modules/error";
import { RouteObject } from './interface';
import Login from '@/view/login';
import Step from '@/view/StepBar';

// 处理路由
export const routerArray: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/login'} />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: 'login'
    }
  },
  
  ...homeRouter,
  ...errorRouter,
]


const Router = () => {
  const routes = useRoutes(routerArray);
  console.log(routes, 15);
  
  return routes;
}

export default Router;
