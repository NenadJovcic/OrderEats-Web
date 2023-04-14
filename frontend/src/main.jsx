import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup";
import MenuUser from "./components/menuuser/MenuUser";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import OrderRes from "./components/orderres/OrderRes";
import MenuAdmin from "./components/menuadmin/MenuAdmin";
import OrderUser from "./components/orderuser/OrderUser";
import Error from "./components/Erorr";

const router = createBrowserRouter(
  createRoutesFromElements(
   
      <Route path="/" element={<App />}>
        <Route index element={<MenuUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).isAdmin === true ? (
          <>
            <Route path="/orderres" element={<OrderRes />} />
            <Route path="/menuadmin" element={<MenuAdmin />} />
          </>
        ) : (
          <Route path="/orderuser" element={<OrderUser />} />
        )}
        <Route path="*" element={<Error />} />
          
      </Route>
   
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
