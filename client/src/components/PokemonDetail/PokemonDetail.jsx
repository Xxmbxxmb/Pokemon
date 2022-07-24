import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDetailsbyDB, getDetailsbyId } from "../../actions";
import './PokemonDetail.css'

export const Contenedor = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 15px 25px 15px;
  border-radius: 99px;

  @media (max-width: 1150px){
    width: 30%;
  }

  @media (max-width: 950px){
    width: 40%;
  }

  @media (max-width: 650px){
    width: 55%;
  }

  @media (max-width: 450px){
    width: 65%;
  }
`;

export const ContenedorXl = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 5rem;
`

export const CuadriculaStats = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(3, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
width: 100%;
text-align: center;
`

export const ImgPoke = styled.img`
min-width: 200px;
max-width: 270px;
`

export const DivTipos = styled.div`
width: 100%;
display: flex;
justify-content: space-around;

@media (max-width: 950px){
  width: 80%;
}

@media (max-width: 650px){
  width: 75%;
}
`

export const ContenedorTipo = styled.div`
  background-color: ${({ tipo }) => {
    if (tipo === "normal") return "rgb(150, 170, 190)";
    if (tipo === "fighting") return "rgb(40, 50, 110)";
    if (tipo === "flying") return "rgb(120, 230, 240)";
    if (tipo === "poison") return "rgb(100, 90 ,230)";
    if (tipo === "ground") return "rgb(190, 150, 118)";
    if (tipo === "rock") return "rgb(40, 50, 50)";
    if (tipo === "bug") return "rgb(30, 230, 130)";
    if (tipo === "ghost") return "rgb(165, 90, 240)";
    if (tipo === "steel") return "rgb(181, 192, 201)";
    if (tipo === "fire") return "rgb(240, 140, 40)";
    if (tipo === "water") return "rgb(1, 140, 250)";
    if (tipo === "grass") return "rgb(0, 180, 140)";
    if (tipo === "electric") return "rgb(252, 220, 92)";
    if (tipo === "psychic") return "rgb(160, 160, 155)";
    if (tipo === "ice") return "rgb(219, 241, 253)";
    if (tipo === "dragon") return "rgb(240 , 240, 170)";
    if (tipo === "dark") return "rgba(64, 64, 64, 0.5)";
    if (tipo === "fairy") return "rgb(255, 10, 100)";
    if (tipo === "unknown") return "rgb()";
    if (tipo === "shadow") return "rgb(51, 47, 44)";
  }};
  width: 50%;
  margin-right: 0.5rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  font-size: 17px;
`;
export const MainTipos = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
`;



function PokemonDetail(props) {
  const dispatch = useDispatch();
  const pokemon_detail = useSelector((state) => state.pokemon_detail);

  useEffect(() => {
    const id = props.match.params.id;
    if(id.length > 8) dispatch(getDetailsbyId(id));
    else dispatch(getDetailsbyDB(id))
  }, [dispatch, props.match.params.id]);

  
  return (
    <ContenedorXl>
      {Object.keys(pokemon_detail).length === 0 ? (
        "Cargando"
      ) : (
        <Contenedor>
          <div className="divID">
            <span className="detalle_id">{`#${pokemon_detail.id}`}</span>
          </div>
          <ImgPoke src={`${pokemon_detail.imagen}`} alt="" />
          <h2 style={{color: 'white'}}>{`${pokemon_detail.nombre[0].toUpperCase()}${pokemon_detail.nombre.slice(1)}`}</h2>

            {
                pokemon_detail.types.length > 1 
                ? <DivTipos>
                  <ContenedorTipo tipo={pokemon_detail.types[0]}>{pokemon_detail.types[0]}</ContenedorTipo>
                <ContenedorTipo tipo={pokemon_detail.types[1]}>{pokemon_detail.types[1]}</ContenedorTipo>
                </DivTipos>
                : <MainTipos><ContenedorTipo tipo={pokemon_detail.types[0]}>{pokemon_detail.types[0]}</ContenedorTipo></MainTipos>
            }

          <CuadriculaStats>
            <p>{`Vida: ${pokemon_detail.hp}`}<img className="icons" src="https://i.imgur.com/cNRQUhr.png" alt="hp"/></p>
            <p>{`Ataque: ${pokemon_detail.attack}`}<img className="icons" src="https://icon-library.com/images/attack-icon/attack-icon-28.jpg" alt="att"/></p>
            <p>{`Defensa: ${pokemon_detail.defense}`}<img className="icons" src="https://icon-library.com/images/defend-icon/defend-icon-21.jpg" alt="def"/></p>
            <p>{`Velocidad: ${pokemon_detail.speed}`}<img className="icons" src="https://cdn-icons-png.flaticon.com/512/1408/1408870.png" alt="speed"/></p>
            <p>{`Peso: ${pokemon_detail.weight}`}<img className="icons" src="https://cdn-icons-png.flaticon.com/512/847/847345.png" alt="weight"/></p>
            <p>{`Altura: ${pokemon_detail.height}`}<img className="icons" src="data:image/png;base64,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" alt="height" /></p>
          </CuadriculaStats>
        </Contenedor>
      )}
    </ContenedorXl>
  );
}

export default PokemonDetail;
