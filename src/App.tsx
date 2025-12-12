import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Admin } from "./pages/Admin";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./layout";
import { Notfound } from "./pages/Notfound";
import { TableProducts } from "./pages/TableProducts";
import { ExpiredProducts } from "./pages/ExpiredProducts";
import { ExpiringProducts } from "./pages/ExpiringProducts";
export const router = createBrowserRouter([
  {
    element: <Home/>,
    path:"/"
  },
  {
    element: <Login/>,
    path: "/login"
  },
  {
    element: <Signup/>,
    path:"/signup"
  },
  {
    element: <PrivateRoute/>,
    children:[
      {
       element: <Layout/>,
       children:[
        {
          element: <Admin/>,
          path: "/admin"
        },
        {
          element: <TableProducts/>,
          path:"admin/products"
        },
        {
          element: <ExpiringProducts/>,
          path: "admin/expiring"
        },
        {
          element: <ExpiredProducts/>,
          path:"admin/expired"
        }
       ] 
      }
    ]
  },
  {
    element: <Notfound/>,
    path: "*"
  }
])