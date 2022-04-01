import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { convertFromRaw, EditorState } from "draft-js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { asyncRounds } from "../../../Actions/roundsAction";
import { convertTimeStamp } from "../../helperFunctions";
import EditorContainer from "./RichTextEditor";

const Rounds = ({
  setConfirmDialog,
  rounds,
  setEditor,
  setRounds,
  data,
  stateData,
  setNotify,
  confirmDialog,
  roundsData,
  id,
  candidateData,
  finalData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(stateData);
  // to add more  round feilds
  const handleAdd = () => {
    setRounds([...rounds, { cid: id, reveiws: {}, ratings: "" }]);
  };
  const handleRounds = (e, i) => {
    const newValue = rounds.map((ele, index) => {
      if (index == i) {
        return { ...ele, [e.target.name]: e.target.value };
      } else {
        return { ...ele };
      }
    });
    setRounds(newValue);
  };
  const handleRoundsPass = (i) => {
    const formData = rounds.find((ele, index) => {
      return index === i;
    });

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
    const updatedData = {
      id: id,
      status: "in-progress",
      lastUpdated: todayDate,
    };
    if (stateData.reveiws !== "" && stateData.ratings) {
      dispatch(asyncRounds(formData, updatedData, notification, redirectHome));
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };

  const handleRoundsReject = (i) => {
    const formData = rounds.find((ele, index) => {
      return index === i;
    });
    console.log(formData);
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
    const updatedData = {
      id: id,
      status: "reject",
      lastUpdated: todayDate,
    };
    // validation for the round forms
    if (rounds[i].reveiws !== "" && rounds[i].ratings) {
      dispatch(asyncRounds(formData, updatedData, notification, redirectHome));
    } else {
      setNotify({
        isOpen: true,
        message: "fill all the feilds",
        type: "error",
      });
    }
  };
  //convert raw data to content data
  const convertData = (i) => {
    console.log(data[i] !== undefined, "condition", data, i);
    const contentState =
      Object.keys(data[i]).includes("reveiws") &&
      convertFromRaw(data[i].reveiws);
    const editor =
      Object.keys(data[i]).includes("reveiws") &&
      EditorState.createWithContent(contentState);
    return editor;
  };

  return (
    <>
      {rounds.map((ele, i) => {
        return (
          <>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <Typography variant="h5">Round {i + 1}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <EditorContainer
                setData={setEditor}
                stateData={stateData}
                {...(data[i] !== undefined && {
                  data: convertData(i),
                })}
              />
              {/*  <TextField
                multiline
                rows={4}
                name="reveiws"
                value={ele.reveiws}
                onChange={(e) => handleRounds(e, i)}
                fullWidth
                {...(roundsData[i] && { disabled: true })}
              /> */}
            </Grid>

            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Rating
                value={ele.ratings}
                name="ratings"
                onChange={(e) => handleRounds(e, i)}
                max={10}
                {...(data[i] && { disabled: true })}
              />
              {
                data[i] == undefined && (
                  <>
                    <Button
                      style={{ width: "1%" }}
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleRoundsPass(i)}
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
                          title:
                            "Are you sure you want to reject this candidate?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleRoundsReject(i);
                          },
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </>
                ) /*  : candidateData.status == "reject" ? null : (
                rounds[roundsData.length - 1].reveiws == "" && (
                  <>
                    <Button
                      style={{ width: "1%" }}
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleRoundsPass(i)}
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
                          title:
                            "Are you sure you want to reject this candidate?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            handleRoundsReject(i);
                          },
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )
              ) */
              }
            </Grid>
          </>
        );
      })}
      <Grid item xs={4} sm={4} md={4} lg={4} />
      <Grid item xs={4} sm={4} md={4} lg={4}>
        {candidateData.status == "reject" ||
        candidateData.status == "offered" ? null : (
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleAdd}
          >
            Add more
          </Button>
        )}
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} />
    </>
  );
};

export default Rounds;
