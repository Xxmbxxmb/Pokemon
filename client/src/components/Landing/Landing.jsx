import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Img = styled.img`
  width: 450px;
  position: absolute;
  bottom: 0;
  right: 0;
    
  @media (max-width: 560px){
    width: 350px;    
  }

  @media (max-width: 450px){
    width: 300px;
  }
`;

const DivCentro = styled.div`
  display: flex;
  width: 100%;
  height: 20vw;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px){
    margin-top: 5rem;
  }
`;

const ImgCentro = styled.img`
  width: 550px;
  
  @media (max-width: 560px){
    width: 450px;    
  }
  
  @media (max-width: 450px){
    width: 400px;    
  }

  @media (max-width: 400px){
    width: 350px;
  }
`;

const DivPosicion = styled.div`
  height: 100px;
  margin-top: 6.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px){
    margin-top: 7rem;
  }

  @media (max-width: 500px){
    margin-top: 9rem;
  }

`;

const DivAcceder = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 25px;
  font-size: 50px;
  height: 100px;
  color: white;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 560px){
    font-size: 40px;    
  }
  
  @media (max-width: 450px){
    font-size: 35px;    
  }

`;

function Landing(props) {
  return (
    <>
      <DivCentro>
        <ImgCentro src="https://www.kokiri.cl/presta17/img/m/9.jpg" />
      </DivCentro>
      <DivPosicion>
        <Link to='/home' style={{ textDecoration: 'none' }} >
          <DivAcceder>INGRESAR</DivAcceder>
        </Link>
      </DivPosicion>
      <Img src="https://i.pinimg.com/originals/53/65/8e/53658ed6e7b51f26e3d18ccf66eeed4c.png" />
    </>
  );
}

export default Landing;
