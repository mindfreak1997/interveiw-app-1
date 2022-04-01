import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Form from "./form";
import Reveiws from "./reveiw/reveiws";
import { getScreening } from "../../Actions/screeningAction";
import { getRounds } from "../../Actions/roundsAction";
import { getFinal } from "../../Actions/finalAction";

const Candidates = () => {
  const dispatch = useDispatch();
  const candidate = useSelector((state) => {
    return state.candidates;
  });
  const screening = useSelector((state) => {
    return state.screening;
  });
  const rounds = useSelector((state) => {
    return state.round;
  });
  const final = useSelector((state) => {
    return state.final;
  });
  const [candidateData, setData] = useState({});

  const { id } = useParams();
  const param = useParams();
  console.log(param);

  useEffect(() => {
    const filteredData = candidate.find((ele) => ele.id === id);
    setData(filteredData);
    dispatch(getScreening(id));
    dispatch(getRounds(id));
    dispatch(getFinal(id));
  }, [candidate]);

  return (
    <div>
      {Object.keys(candidateData).length > 0 && <Form {...candidateData} />}
      <Reveiws
        id={id}
        screeningData={screening}
        candidateData={candidateData}
        roundsData={rounds}
        finalData={final}
      />
    </div>
  );
};

export default Candidates;
