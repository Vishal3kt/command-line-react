import "./App.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from './HomePage';
import Dashboard from './components/Dashboard/Dashboard';

const router = createBrowserRouter([
  { path: '', element: <HomePage /> },
  { path: 'dashboard', element: <Dashboard /> }
])

function App() {

  return (

    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
