import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SiginPage from './pages/SiginPage/SiginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage'
import MapPage from './pages/MapPage/MapPage';
import EscolherPaginas from './pages/EscolherPaginas/EscolherPaginas';
import './index.css'


/*const Private = (Item)=>{
  const singned = false;
  return singned > 0 ? <Item/> : <SiginPage/>
}*/

const router = createBrowserRouter([
  {
    path:"*", 
    element: <HomePage />
  },
  {
    path:"login",
    element: <LoginPage />
  },

  {
    path:"criar conta",
    element:<SiginPage />
  },
  {
    path: "operacao",
    element: <EscolherPaginas/>
  },
  {
    path: "dashboard",
    element: <DashboardPage/>
  },
  {
    path: "mapa",
    element: <MapPage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
