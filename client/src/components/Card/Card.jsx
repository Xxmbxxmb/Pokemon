import React from "react";
import styled from "styled-components";
import "./Card.css";
import { useDispatch } from "react-redux";
import { getDetailsbyId } from "../../redux/slices/pokemonThunk";

export const DivCard = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  min-width: 230px;
  max-width: 350px;
  min-height: 50px;
  max-height: 60px;
  padding: 20px 20px 20px 20px;
  border-radius: 15px;
  justify-content: space-between;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 1400px){
    min-width: 115px;
    max-width: 175px;
    min-height: 25px;
    max-height: 30px;
  }

  @media (max-width: 1100px){
    min-width: 100px;
    max-width: 100px;
    min-height: 15px;
    max-height: 25px;
  }

`;

export const MainTipos = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 125px;

  @media (max-width: 1100px){
    width: 60px;
  }
`;

export const ContenedorTipo = styled.div`
background-color: ${({tipo}) => {
  if(tipo === 'normal') return 'rgb(150, 170, 190)';
  if(tipo === 'fighting') return 'rgb(40, 50, 110)';
  if(tipo === 'flying') return 'rgb(120, 230, 240)';
  if(tipo === 'poison') return 'rgb(100, 90 ,230)';
  if(tipo === 'ground') return 'rgb(190, 150, 118)';
  if(tipo === 'rock') return 'rgb(40, 50, 50)';
  if(tipo === 'bug') return 'rgb(30, 230, 130)';
  if(tipo === 'ghost') return 'rgb(165, 90, 240)';
  if(tipo === 'steel') return 'rgb(181, 192, 201)';
  if(tipo === 'fire') return 'rgb(240, 140, 40)';
  if(tipo === 'water') return 'rgb(1, 140, 250)';
  if(tipo === 'grass') return 'rgb(0, 180, 140)';
  if(tipo === 'electric') return 'rgb(252, 220, 92)';
  if(tipo === 'psychic') return 'rgb(160, 160, 155)';
  if(tipo === 'ice') return 'rgb(219, 241, 253)';
  if(tipo === 'dragon') return 'rgb(240 , 240, 170)';
  if(tipo === 'dark') return 'rgba(64, 64, 64, 0.5)';
  if(tipo === 'fairy') return 'rgb(255, 10, 100)';
  if(tipo === 'unknown') return 'rgb()';
  if(tipo === 'shadow') return 'rgb(51, 47, 44)';
}};
width:50%;
margin-right: 0.5rem;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
padding: 3px;
font-size: 12.5px;

@media (max-width: 1100px){
  width: 35%;
  font-size: 8px;
}
`

function Card(props) {
  const dispatch = useDispatch()

  return (
    <DivCard className="test_media_card" onClick={() => dispatch(getDetailsbyId(props.id))}>
      <div id="aaa">
        <span>{`${props.name[0].toUpperCase()}${props.name.slice(1)}`}</span>
        {props.types.length > 1 ? (
          <MainTipos>
            <ContenedorTipo tipo={props.types[0]}>{props.types[0]}</ContenedorTipo>
            <ContenedorTipo tipo={props.types[1]}>{props.types[1]}</ContenedorTipo>
          </MainTipos>
        ) : (
          <MainTipos>
            <ContenedorTipo tipo={props.types[0]}>{props.types[0]}</ContenedorTipo>
          </MainTipos>
        )}
      </div>
      <div>

      </div>
      <img className="imgs" src={`${props.imagen}`} alt="imagen_pokemon" />
    </DivCard>
  );
}

export default Card;
