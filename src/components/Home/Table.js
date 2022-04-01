import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import ConfirmDialog from "../controls/confirmDialog";
import Notification from "../controls/notification";
import { useDispatch } from "react-redux";
import { addCandidates, deleteCandidates } from "../../Actions/candidates";
import Popup from "../controls/Popup";
import Form from "../Candidates/form";

const useStyle = makeStyles((theme) => ({
  table: {
    margin: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));
const MuiTable = ({
  data,
  openPopup,
  setOpenPopup,
  headCells,
  statusFilter,
  handleChange,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();

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
  // to convert timestamp to date
  const convertTimeStamp = (data) => {
    const date = new Date(data.seconds * 1000).toLocaleDateString("en-US");
    return date;
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const notification = () => {
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
    };
    dispatch(deleteCandidates(id, notification));
  };
  const formSubmission = (formData, resetForm) => {
    const notification = () => {
      setNotify({
        isOpen: true,
        message: "Added Successfully",
        type: "success",
      });
    };
    dispatch(addCandidates(formData, notification, resetForm));
  };

  return (
    <>
      <Table sx={{ minWidth: "650px" }} className={classes.table}>
        <TableHead>
          <TableCell>SL No</TableCell>
          {headCells.map((ele) => {
            return (
              <>
                <TableCell>{ele.label}</TableCell>
              </>
            );
          })}
        </TableHead>
        <TableHead>
          <TableCell></TableCell>
          {headCells.map((ele) => {
            return (
              <TableCell>
                {ele.dropDown == true ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusFilter}
                    label="Age"
                    onChange={handleChange}
                    fullWidth
                    name={ele.id}
                  >
                    {ele.dropDownData.map((ele) => {
                      return <MenuItem value={ele}>{ele}</MenuItem>;
                    })}
                  </Select>
                ) : null}
              </TableCell>
            );
          })}
        </TableHead>
        {data.length == 0 ? (
          <Typography variant="h6">Data not found</Typography>
        ) : (
          <>
            <TableBody>
              {data.map((ele, i) => {
                return (
                  <>
                    <TableRow key={ele.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Tooltip title="click to veiw details">
                          <Link to={`/candidates/${ele.id}`}>{ele.name}</Link>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{ele.createdAt}</TableCell>
                      <TableCell>{ele.lastUpdated}</TableCell>
                      <TableCell>{ele.status}</TableCell>
                      <TableCell>{ele.createdBy}</TableCell>
                      <TableCell>
                        <Tooltip title="click to delete">
                          <Button
                            color="error"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: "Are you sure to delete this record?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                  onDelete(ele.id);
                                },
                              });
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </>
        )}
      </Table>
      <Popup
        openPopup={openPopup}
        title="Candidate Form"
        setOpenPopup={setOpenPopup}
      >
        <Form formSubmission={formSubmission} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default MuiTable;
