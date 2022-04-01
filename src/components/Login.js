import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import validator from "validator";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { adminLogin } from "../Actions/adminAction";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const error = {};
  const validation = () => {
    if (validator.isEmail(email) === false) {
      error.email = "email is invalid";
      console.log(email, "email");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirectHome = () => {
      navigate("/home", { replace: true });
    };
    setErrors({});
    validation();
    if (Object.keys(error).length == 0) {
      dispatch(adminLogin(email, password, redirectHome));
    } else {
      setErrors(error);
    }
  };
  return (
    <Container maxWidth="xs">
      <Grid
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "darkgreen", m: 2 }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
            {...(formErrors.email && {
              error: true,
              helperText: formErrors.email,
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <Button
            sx={{ mt: 3, mb: 3 }}
            type="submit"
            fullWidth
            variant="contained"
            color="info"
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
