import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { convertFromRaw, EditorState } from "draft-js";
import React, { useEffect, useRef, useState } from "react";

import EditorContainer from "./reveiw/RichTextEditor";

const ReveiwForm = ({
  title,
  setEditor,
  data,
  setData,
  stateData,
  handleChange,
  handlePass,
  handleReject,
  setConfirmDialog,
}) => {
  const convertData = () => {
    const contentState =
      Object.keys(data).includes("reveiws") && convertFromRaw(data.reveiws);
    const editor =
      Object.keys(data).includes("reveiws") &&
      EditorState.createWithContent(contentState);
    return editor;
  };
  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <EditorContainer
          setData={setEditor}
          stateData={stateData}
          data={convertData()}
        />
        {/*  <TextField
          multiline
          rows={4}
          name="reveiws"
          {...(Object.keys(data).length > 0
            ? { value: data.reveiws }
            : { value: stateData.reveiws })}
          onChange={handleChange}
          fullWidth
          {...(Object.keys(data).length > 0 && { disabled: true })}
        /> */}
      </Grid>

      <Grid item xs={12} sm={3} md={3} lg={3}>
        <Rating
          {...(Object.keys(data).length > 0
            ? { value: data.ratings }
            : { value: stateData.ratings })}
          name="ratings"
          onChange={handleChange}
          max={10}
          {...(Object.keys(data).length > 0 && { disabled: true })}
        />

        {Object.keys(data).length === 0 && (
          <>
            <Button
              style={{ width: "1%" }}
              variant="contained"
              color="success"
              size="small"
              onClick={handlePass}
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
                    handleReject();
                  },
                });
              }}
            >
              Reject
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};

export default ReveiwForm;
