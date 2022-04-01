import { MenuItem, MenuList, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  SideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    backgroundColor: "#253053",
    height: "150%",
    width: "15%",
  },
  paper: {
    marginTop: "50px",
    backgroundColor: "#9254C8",
  },
});
const SideMenu = () => {
  const classes = useStyle();
  return (
    <div className={classes.SideMenu}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem>
            <Link style={{ textDecoration: "none", color: "white" }} to="/home">
              Home
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};

export default SideMenu;
