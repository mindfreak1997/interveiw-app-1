import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCandidates } from "../../Actions/candidates";
import { convertTimeStamp } from "../helperFunctions";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "5%",
    marginLeft: "15%",
  },
}));
const Form = ({
  candidateData,
  title,
  formSubmission,
  name: candidate,
  status: info,
  createdBy: byCreated,
  createdAt: atCreated,
  lastUpdated: updatedLast,
}) => {
  const classes = useStyle();

  const [name, setName] = useState(candidate ? candidate : "");
  const [status, setStatus] = useState(info ? info : "");
  const [createdBy, setCreatedBy] = useState(byCreated ? byCreated : "");
  const [createdAt, setCreatedAt] = useState(atCreated ? atCreated : "");
  const [lastUpdated, setLastUpdated] = useState(
    updatedLast ? updatedLast : ""
  );

  const dispatch = useDispatch();
  /*   useEffect(() => {
    setName(candidateData.name);
    setStatus(candidateData.status);
  }, []); */

  // onChange event

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "status") {
      setStatus(e.target.value);
    }
    if (e.target.name == "createdBy") {
      setCreatedBy(e.target.value);
    }
    if (e.target.name == "createdAt") {
      setCreatedAt(e.target.value);
    }
    if (e.target.name == "lastUpdated") {
      setLastUpdated(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      createdAt: createdAt,
      lastUpdated: lastUpdated,
      status: status,
      createdBy: createdBy,
    };
    const resetForm = () => {
      setName("");
      setCreatedAt("");
      setLastUpdated("");
      setStatus("");
      setCreatedBy("");
    };
    formSubmission(formData, resetForm);
    //dispatch(updateCandidates(formData));
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Card>
          {candidate && (
            <CardHeader
              style={{ backgroundColor: "#CE49BF", color: "white" }}
              title={`${candidate}'s Details`}
            />
          )}
        </Card>
        <CardContent>
          <div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <InputLabel>Candidate Name</InputLabel>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <InputLabel>Created At</InputLabel>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="createdAt"
                    type="date"
                    onChange={handleChange}
                    value={createdAt}
                    fullWidth
                    required
                    {...(atCreated && { disabled: true })}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <InputLabel>Last Updated</InputLabel>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="lastUpdated"
                    type="date"
                    onChange={handleChange}
                    value={lastUpdated}
                    fullWidth
                    required
                    {...(updatedLast && { disabled: true })}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <InputLabel>Created By</InputLabel>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="createdBy"
                    onChange={handleChange}
                    value={createdBy}
                    fullWidth
                    required
                    {...(byCreated && { disabled: true })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    fullWidth
                    {...(info && { disabled: true })}
                  >
                    <MenuItem value="new">new</MenuItem>
                    <MenuItem value="in-progress">in-progress</MenuItem>
                    <MenuItem value="hold">hold</MenuItem>
                    <MenuItem value="reject">reject</MenuItem>
                    <MenuItem value="offered">offered</MenuItem>
                  </Select>
                  {/*  <TextField
                    margin="dense"
                    variant="outlined"
                    name="status"
                    label="Status"
                    value={status}
                    fullWidth
                    required
                  /> */}
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} />
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    {candidate ? "Save" : "Add"}
                  </Button>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} />
              </Grid>
            </form>
          </div>
        </CardContent>
      </Paper>
    </div>
  );
};

export default Form;
