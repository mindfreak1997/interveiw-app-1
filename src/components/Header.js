import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../assets/codecraft_logo.png";
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../Actions/adminAction";
import { useNavigate } from "react-router";
import { auth } from "../firebase-config";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  img: {
    width: "200px",
    objectFit: "contain",
    marginLeft: "20px",
    marginRight: "20px",
  },
}));
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyle();
  const login = useSelector((state) => {
    return state.login;
  });

  const handleLogout = () => {
    const redirectLogin = () => {
      navigate("/", { replace: true });
    };
    dispatch(adminLogout(redirectLogin));
  };
  return (
    <AppBar style={{ backgroundColor: "#3c44b126" }} position="static">
      <Toolbar>
        <Grid container alignItems="centre">
          <Grid item sm>
            <img
              className={classes.img}
              src={image}
              alt="logo"
              loading="lazy"
            />
          </Grid>

          {localStorage.getItem("status") && (
            <>
              <Grid item>
                <Avatar
                  sx={{ bgcolor: deepOrange[500], color: "white", mr: 2 }}
                >
                  A
                </Avatar>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
