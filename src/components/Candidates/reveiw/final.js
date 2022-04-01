import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { asyncFinal } from "../../../Actions/finalAction";
import { convertTimeStamp } from "../../helperFunctions";
import ReveiwForm from "../reveiwForm";

const Final = ({
  id,
  title,
  stateData,
  data,
  setEditor,
  setConfirmDialog,
  setNotify,
  confirmDialog,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinal = (e) => {
    setEditor({ ...stateData, [e.target.name]: e.target.value });
  };
  const handlePassFinal = () => {
    const notification = () => {
      setNotify({
        isOpen: true,
        message: "Rejected Successfully",
        type: "success",
      });
    };
    const redirectHome = () => {
      navigate("/home", { replace: true });
    };
    const todayDate = convertTimeStamp(Date.now() / 1000);
    const updateData = {
      id: id,
      status: "offered",
      lastUpdated: todayDate,
    };
    if (stateData.reveiws.length > 0 && stateData.ratings) {
      dispatch(asyncFinal(stateData, updateData, notification, redirectHome));
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };
  const handleRejectFinal = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const notification = () => {
      setNotify({
        isOpen: true,
        message: "Rejected Successfully",
        type: "success",
      });
    };
    const redirectHome = () => {
      navigate("/home", { replace: true });
    };
    const todayDate = convertTimeStamp(Date.now() / 1000);
    const updateData = {
      id: id,
      status: "reject",
      lastUpdated: todayDate,
    };
    if (stateData.reveiws !== "" > 0 && stateData.ratings) {
      dispatch(asyncFinal(stateData, updateData, notification, redirectHome));
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };
  return (
    <>
      {/*  <Grid item xs={2} sm={2} md={2} lg={2}>
        <Typography variant="h5">Final</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <TextField
          multiline
          rows={4}
          name="reveiws"
          {...(Object.keys(finalData).length > 0
            ? { value: finalData.reveiws }
            : { value: final.reveiws })}
          onChange={handleFinal}
          fullWidth
          {...(Object.keys(finalData).length > 0 && { disabled: true })}
        />
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3}>
        <Rating
          {...(Object.keys(finalData).length > 0
            ? { value: finalData.ratings }
            : { value: final.ratings })}
          name="ratings"
          onChange={handleFinal}
          max={10}
          {...(Object.keys(finalData).length > 0 && { disabled: true })}
        />
        {Object.keys(finalData).length == 0 && (
          <>
            <Button
              style={{ width: "1%" }}
              variant="contained"
              color="success"
              size="small"
              onClick={handlePassFinal}
            >
              pass
            </Button>
            <Button
              style={{ width: "1%", marginLeft: "10px" }}
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to reject this candidate?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    handleRejectFinal();
                  },
                });
              }}
            >
              Reject
            </Button>
          </>
        )}
      </Grid> */}
      <ReveiwForm
        setEditor={setEditor}
        title={title}
        data={data}
        stateData={stateData}
        handleChange={handleFinal}
        handlePass={handlePassFinal}
        handleReject={handleRejectFinal}
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
    </>
  );
};

export default Final;
