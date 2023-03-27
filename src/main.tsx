import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProductPage from './ProductPage'

import './style.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async ({ params }) => {
      const res = await fetch(`https://testbackend.nc-one.com/image`)
      const data = await res.json()
      return data;
    },
    children: [
      {
        element: <App />,
        index: true,
      },
      {
        path: "products/:pid",
        element: <ProductPage />,
        loader: async ({ params }) => {
          const res = await fetch(`https://testbackend.nc-one.com/image?id=${params.pid}`)
          const data = await res.json()
          return data;
        }
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
