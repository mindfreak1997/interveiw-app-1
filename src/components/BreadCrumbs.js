import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((x) => x);
  console.log(pathname, "navigate");
  return (
    <div style={{ height: "50px", marginLeft: "15%" }}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <Typography color="text.primary">Home</Typography>
        <Typography color="text.primary">List</Typography>
        {path.length > 1
          ? path[0] == "candidates" && (
              <Typography color="text.primary">Candidate</Typography>
            )
          : null}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
