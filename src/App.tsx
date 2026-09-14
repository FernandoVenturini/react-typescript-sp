import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home/index';
import { Login } from './pages/login/index';
import { Register } from './pages/register/index';
import { Dashboard } from './pages/dashboard/index';
import { New } from './pages/dashboard/new/index';
import { CarDetail } from './pages/car/index';
import { Layout } from './components/layout/index';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/car/:id",
        element: <CarDetail />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "dashboard/new",
        element: <New />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export { router };