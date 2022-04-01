import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createReactEditorJS } from "react-editor-js";
import CheckList from "@editorjs/checklist";
import { asyncScreening } from "../../../Actions/screeningAction";
import ConfirmDialog from "../../controls/confirmDialog";
import Notification from "../../controls/notification";
import Final from "./final";
import Rounds from "./rounds";
import ReveiwForm from "../reveiwForm";
import { convertTimeStamp } from "../../helperFunctions";

const Reveiws = ({
  id,
  candidateData,
  screeningData,
  roundsData,
  finalData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [roundsEditor, setRoundsEditor] = useState({
    index: 0,
    reveiws: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [screening, setScreening] = useState({
    cid: id,
    reveiws: "",
    ratings: 0,
  });
  const [rounds, setRounds] = useState([{ cid: id, reveiws: {}, ratings: 0 }]);
  const [final, setFinal] = useState({ cid: id, reveiws: "", ratings: 0 });
  useEffect(() => {
    setRounds(
      roundsData.length > 0
        ? roundsData
        : [{ cid: id, reveiws: {}, ratings: 0 }]
    );
  }, [roundsData]);

  useEffect(() => {
    const newState = rounds.map((ele) => {
      if (ele.reveiws == null) {
        console.log("b4");
        return { ...ele };
      } else {
        console.log("else");
        return { ...ele, reveiws: roundsEditor.reveiws };
      }
    });

    setRounds(newState);
  }, [roundsEditor]);
  const handleScreening = (e) => {
    setScreening({ ...screening, [e.target.name]: e.target.value });
  };

  const handleScreeningPass = () => {
    const notification = () => {
      setNotify({
        isOpen: true,
        message: "candidate is passed Successfully",
        type: "success",
      });
    };
    const redirectHome = () => {
      navigate("/home", { replace: true });
    };
    const todayDate = convertTimeStamp(Date.now() / 1000);

    const updateData = {
      id: id,
      status: "in-progress",
      lastUpdated: todayDate,
    };
    console.log(screening.reveiws !== "", "screemimg");
    if (screening.reveiws !== "" && screening.ratings) {
      dispatch(
        asyncScreening(screening, updateData, notification, redirectHome)
      );
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };

  const handleScreeningReject = () => {
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
    if (screening.reveiws && screening.ratings) {
      dispatch(
        asyncScreening(screening, updateData, notification, redirectHome)
      );
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };

  return (
    <div style={{ marginLeft: "15%", padding: "3%" }}>
      <Grid container spacing={2} alignItems="center">
        {/*  <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography variant="h5">Screening</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <ReactEditorJS
            onInitialize={handleInitialize}
            value={editor}
            tools={{ checkList: CheckList }}
          />
           <TextField
            multiline
            rows={4}
            name="reveiws"
            {...(Object.keys(screeningData).length > 0
              ? { value: screeningData.reveiws }
              : { value: screening.reveiws })}
            onChange={handleScreening}
            fullWidth
            {...(Object.keys(screeningData).length > 0 && { disabled: true })}
          /> 
        </Grid>

        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Rating
            {...(Object.keys(screeningData).length > 0
              ? { value: screeningData.ratings }
              : { value: screening.ratings })}
            name="ratings"
            onChange={handleScreening}
            max={10}
            {...(Object.keys(screeningData).length > 0 && { disabled: true })}
          />
          {Object.keys(screeningData).length > 0 ? null : (
            <>
              <Button
                style={{ width: "1%" }}
                variant="contained"
                color="success"
                size="small"
                onClick={handleScreeningPass}
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
                      handleScreeningReject();
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
          setEditor={setScreening}
          title="screening"
          data={screeningData}
          stateData={screening}
          handleChange={handleScreening}
          handlePass={handleScreeningPass}
          handleReject={handleScreeningReject}
          setConfirmDialog={setConfirmDialog}
          confirmDialog={confirmDialog}
        />
        {Object.keys(screeningData).includes("id") &&
          (roundsData.length > 0 ? (
            <>
              <Rounds
                setEditor={setRoundsEditor}
                stateData={roundsEditor}
                setConfirmDialog={setConfirmDialog}
                finalData={finalData}
                rounds={rounds}
                data={roundsData}
                setRounds={setRounds}
                setNotify={setNotify}
                confirmDialog={confirmDialog}
                id={id}
                candidateData={candidateData}
              />

              {candidateData.status != "reject" && (
                <Final
                  id={id}
                  setEditor={setFinal}
                  title="final"
                  data={finalData}
                  stateData={final}
                  setNotify={setNotify}
                  setConfirmDialog={setConfirmDialog}
                  confirmDialog={confirmDialog}
                />
              )}
            </>
          ) : (
            candidateData.status != "reject" && (
              <>
                <Rounds
                  setEditor={setRoundsEditor}
                  stateData={roundsEditor}
                  setConfirmDialog={setConfirmDialog}
                  rounds={rounds}
                  finalData={finalData}
                  setRounds={setRounds}
                  setNotify={setNotify}
                  confirmDialog={confirmDialog}
                  data={roundsData}
                  id={id}
                  candidateData={candidateData}
                />

                <Final
                  id={id}
                  setEditor={setFinal}
                  title="final"
                  data={finalData}
                  stateData={final}
                  setConfirmDialog={setConfirmDialog}
                  confirmDialog={confirmDialog}
                />
              </>
            )
          ))}
      </Grid>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Reveiws;
