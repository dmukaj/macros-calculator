// src/CircularProgressBar.js
import React from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
`;

const CircularProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <Wrapper>
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: "#4f4f4f",
          trailColor: "#d6d6d6",
        })}
      />
    </Wrapper>
  );
};

export default CircularProgressBar;
