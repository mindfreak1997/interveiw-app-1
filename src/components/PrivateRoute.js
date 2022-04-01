import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router";
import Login from "./Login";

const PrivateRoute = () => {
  return localStorage.getItem("status") ? <Outlet /> : <Login />;
};

export default PrivateRoute;
