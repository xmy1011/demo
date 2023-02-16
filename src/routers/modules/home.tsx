import LayoutIndex from "@/layouts";
import Home from "@/view/Home";
import React from "react";
import { RouteObject } from "../interface";

const homeRouter:Array<RouteObject> =[
  {
    element: <LayoutIndex />,
    children: [{
      path:'/home/index',
      element: <Home />,
      meta: {
        requiresAuth: true,
        title: '主页',
        key: 'home'
      }
    }]
  }
]

export default homeRouter;