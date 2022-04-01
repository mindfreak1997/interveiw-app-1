import React from "react";
import { useSelector } from "react-redux";
import BreadCrumbs from "./BreadCrumbs";
import Header from "./Header";
import SideMenu from "./SideMenu";

const Navbar = () => {
  const login = useSelector((state) => {
    return state.login;
  });
  console.log("login", login);
  return (
    <div>
      <Header />
      {localStorage.getItem("status") && (
        <>
          <SideMenu />
          <BreadCrumbs />
        </>
      )}
    </div>
  );
};

export default Navbar;
