import React from "react";
import styled from "styled-components";

const Checkbox = (props) => {
  return (
    <StyledWrapper>
      <div className="hamburgers">
        <label className="hamburger">
          <input type="checkbox" onClick={props.fun}/>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .hamburgers {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hamburger {
    cursor: pointer;
    padding-bottom: 3px;
    position: relative;
  }

  .hamburger input {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  .bar {
    display: block;
    width: 30px;
    height: 3px;
    margin: 6px auto;
    border-radius: 40px;
    transition: all 0.3s cubic-bezier(0.37, -1.11, 0.79, 2.02);
    background-color: #1499e6;
  }

  .hamburger input:checked ~ .bar:nth-child(2) {
    transform: translateY(9.5px) rotate(45deg);
  }

  .hamburger input:checked ~ .bar:nth-child(3) {
    opacity: 0;
  }

  .hamburger input:checked ~ .bar:nth-child(4) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;

export default Checkbox;
