import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Candidates from "./components/Candidates/candidates";
import PageNotFound from "./components/PageNotFound";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "white",
    },
    shape: {
      borderRadius: "12px",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          {/*  <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/candidates/:id" element={<Candidates />} />
          </Route> */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/candidates/:id" element={<Candidates />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
