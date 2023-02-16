import React, { lazy, Suspense, useState } from 'react';
import smallImg from '@/assets/imgs/5kb.png';
import bigImg from '@/assets/imgs/22kb.png';
import { HashRouter } from "react-router-dom";
import LayoutIndex from './layouts';
import Router from "@/routers/index";
import AuthRouter from "@/routers/utils/authRouter";


function App() {


  return (
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HashRouter>
    
  )
}

export default App;