import { Card, Paper, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
  },
  PageHeader: {
    display: "flex",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    marginLeft: theme.spacing(4),
    "& .MuiTypography-subtitle1": {
      opacity: "0.6",
    },
  },
}));
const PageHeader = () => {
  const classes = useStyle();
  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.PageHeader}>
        <Card className={classes.pageIcon}>
          <PeopleAltIcon fontSize="large" />
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h5">Interview Candidates</Typography>
          <Typography variant="subtitle1">candidates table</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
