import React from "react";
import styled from "styled-components";

export const BackDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  position: absolute;
  top: 6rem;
  height: 60px;
  width: 70px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  left: 0;
  cursor: pointer;

  @media (max-width: 460px){
    height: 40px;
    width: 50px;
  }
`;

export const BackImg = styled.img`
  height: 40px;
  width: 50px;
  
  &:hover{
    transform: scale(1.1);
  }
  
  @media (max-width: 460px){
    height: 25px;
    width: 35px;
  }
`;

function Back(props) {
  return (
    <BackDiv>
      <BackImg
        src="https://www.inmotasa.es/wp-content/uploads/2018/03/flechaatras-300x250.png"
        alt="back_button"
        onClick={props.goBack}
      />
    </BackDiv>
  );
}

export default Back;
