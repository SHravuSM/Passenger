import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="center-body">
        <div className="loader-shape-3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .center-body {
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: absolute;
    top: 5px;
    left: 0px;
    /* border: 2px solid tomato; */
    padding-top: 10px;
    width: 32px;
    height: 30px;
  }
  body {
  }
  .loader-shape-3 {
    position: relative;
    display: inline-block;
    width: 80%;
    height: 80%;
  }
  .loader-shape-3:after {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 15px;
  }
  .loader-shape-3:before {
    width: 100%;
    height: 100%;
    border-radius: 100% 100% 100% 0;
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 1);
    animation: anm-SL-3-move 1s linear infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-46deg);
    /* margin-top: 20px; */
  }
  .loader-shape-3:before,
  .loader-shape-3:after {
    position: absolute;
    content: "";
  }
  @keyframes anm-SL-3-move {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    100% {
      top: 0;
    }
  }`;

export default Loader;