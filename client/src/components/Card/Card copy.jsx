import React from "react";
import styled from "styled-components";
import './Card.css';
import poketest from "../../info";

export const DivCard = styled.div`
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 30px 20px 30px 20px;
  border-radius: 15px;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;

export const MainTipos = styled.div`
  background-color: black;
  background: black;
  color: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Card(props) {

  return (
    <DivCard>
      <div>{props.hp}</div>
      <img className="imgs" src={`${props.imagen}`} alt="imagen_pokemon" />
      <h4>{`${props.name[0].toUpperCase()}${props.name.slice(1)}`}</h4>
      <div>
        {
          props.types.length > 1 
          ? <MainTipos><span>{props.types[0]}</span><span>{props.types[1]}</span></MainTipos>
          : <MainTipos>{props.types[0]}</MainTipos>
        }
        
      </div>
    </DivCard>
  );
}

export default Card;
