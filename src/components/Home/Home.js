import {
  Backdrop,
  Breadcrumbs,
  Button,
  CircularProgress,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCandidates } from "../../Actions/candidates";
import PageHeader from "./PageHeader";
import MuiTable from "./Table";
import _ from "lodash";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    marginLeft: "15%",
  },
  search: {
    width: "75%",
  },
  addButton: {
    position: "absolute",
    right: "1%",
    width: "175px",
    height: "55px",
  },
}));
const Home = () => {
  const classes = useStyle();
  const candidatestate = useSelector((state) => {
    return state.candidates;
  });
  const [candidate, setCandidate] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectStatus, setSelectStatus] = useState("");
  const [selectCreatedBy, setSelectCreatedBy] = useState("");
  const useHistory = createBrowserHistory();
  console.log(useHistory);
  const handleSearch = (e) => {
    let target = e.target;
    setSearch(target.value);
    console.log(target.value, search);
    setFilterFn({
      fn: (items) => {
        if ((target.value = "")) {
          return items;
        } else {
          return items.filter((x) => x.name.toLowerCase().includes(search));
        }
      },
    });
  };
  useEffect(() => {
    dispatch(asyncGetCandidates(page, rowsPerPage));
  }, [page, rowsPerPage]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  //created by dropdown Data
  const createdByData = () => {
    const uniqCreatedBy = _.unionBy(candidatestate, "createdBy");
    console.log("uniq", uniqCreatedBy);
    const result = uniqCreatedBy.map((ele) => {
      return ele.createdBy;
    });
    return result;
  };
  //headcells of the table
  const headCells = [
    { id: "name", label: "Candidate Name", dropDown: false },
    { id: "createdAt", label: "Created At", dropDown: false },
    { id: "lastUpdated", label: "Last Updated", dropDown: false },
    {
      id: "status",
      label: "Status",
      dropDown: true,
      dropDownData: ["new", "in-progress", "reject", "offered"],
    },
    {
      id: "createdBy",
      label: "Created By",
      dropDown: true,
      dropDownData: createdByData(),
    },
  ];

  //to add candidates
  const addCandidates = () => {
    console.log(true);
    setOpenPopup(true);
  };
  const handleChange = (e) => {
    if (e.target.name === "status") {
      setSelectStatus(e.target.value);
    }
    if (e.target.name === "createdBy") {
      setSelectCreatedBy(e.target.value);
    }
  };
  //staus dropDown filter
  const statusFilter = () => {
    if (selectStatus.length == 0) {
      console.log("status-default");
      return candidatestate;
    } else {
      console.log("status-filter");
      const result = candidatestate.filter((ele) => {
        return ele.status == selectStatus;
      });
      return result;
    }
  };
  const createdByFilter = (data) => {
    if (selectCreatedBy.length == 0) {
      console.log("createdBy-default");
      return data;
    } else {
      console.log("createdBy-filter");
      const result = data.filter((ele) => {
        return ele.createdBy == selectCreatedBy;
      });
      return result;
    }
  };
  //final data to the table after serch and pagination
  const recordsAfterPaging = () => {
    return filterFn
      .fn(createdByFilter(statusFilter()))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <div className={classes.root}>
      <PageHeader />

      {candidatestate.length == 0 ? (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Toolbar style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              className={classes.search}
              label="Search Candidates"
              onChange={handleSearch}
              value={search}
              fullWidth
            />
            <Tooltip title="click to add">
              <Button
                className={classes.addButton}
                variant="contained"
                onClick={addCandidates}
              >
                Add candidates
              </Button>
            </Tooltip>
          </Toolbar>
          <MuiTable
            data={recordsAfterPaging()}
            headCells={headCells}
            handleChange={handleChange}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />

          <TablePagination
            rowsPerPageOptions={pages}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={filterFn.fn(createdByFilter(statusFilter())).length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
