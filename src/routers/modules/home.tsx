import LayoutIndex from "@/layouts";
import Home from "@/view/Home";
import Step from "@/view/StepBar";
import React from "react";
import { RouteObject } from "../interface";

const homeRouter:Array<RouteObject> =[
  {
    element: <LayoutIndex />,
    children: [
      {
        path:'/home/index',
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: '主页',
          key: 'home'
        }
      },
      {
        path: '/proTable',
        element: <Step />,
        meta: {
          requiresAuth: false,
          title: "步骤条",
          key: 'step'
        }
      },
    
  ]
  }
]

export default homeRouter;