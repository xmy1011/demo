import React from "react";
import { RouteObject } from "../interface";
import lazyLoad from "../utils/lazyload";

const errorRouter: Array<RouteObject> = [
  {
    path: "/403",
    element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
    meta:{
      requiresAuth: true,
      title: '403页面',
      key: "403"
    }
  },
  {
    path: "/404",
    element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
    meta:{
      requiresAuth: true,
      title: '404页面',
      key: "404"
    }
  }
]

export default errorRouter;