import React, { useState } from "react";
import styled from "styled-components";
import { addPokemon } from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BackButton from '../BackButton/Back';

const InputForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-row-gap: 10px;
`;
const ContenedorCreacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.5rem;
  color: white;
`;
const Contenedor = styled.div`
  display: flex;
  width: 35%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
  padding: 2rem 0px 2rem 0px;
  border-radius: 20px;

  @media (max-width: 1100px) {
    width: 45%;
  }

  @media (max-width: 850px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 75%;
  }

  @media (max-width: 400px) {
    width: 85%;
  }
`;
const ContenedorTipos = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Create(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    imagen:
      "https://www.thequiz.com/wordpress/wp-content/uploads/2017/12/Featured-Whos-That-Pokemon.jpg",
    types: [],
  });

  const [errores, setErrores] = useState({});

  const validarCampos = (state) => {
    let errores = {};
    if (!state.name) {
      errores.name = "Nombre es un campo obligatorio";
    } else if (/(?=.*[0-9])/.test(state.name)) {
      errores.name = "Nombre no puede contener numeros";
    }
    if (!state.hp) {
      errores.hp = "Vida es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.hp)) {
      errores.hp = "Vida solamente puede contener numeros";
    }
    if (!state.attack) {
      errores.attack = "Ataque es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.attack)) {
      errores.attack = "Ataque solamente puede contener numeros";
    }
    if (!state.defense) {
      errores.defense = "Defensa es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.defense)) {
      errores.defense = "Defensa solamente puede contener numeros";
    }
    if (!state.speed) {
      errores.speed = "Velocidad es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.speed)) {
      errores.speed = "Velocidad solamente puede contener numeros";
    }
    if (!state.height) {
      errores.height = "Altura es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.height)) {
      errores.height = "Altura solamente puede contener numeros";
    }
    if (!state.weight) {
      errores.weight = "Peso es un campo obligatorio";
    } else if (!/^[0-9]+$/gm.test(state.weight)) {
      errores.weight = "Peso solamente puede contener numeros";
    }
    return errores;
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    setErrores(
      validarCampos({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleOptions = (e) => {
    setState({
      ...state,
      [e.target.name]: state.types.concat(
        e.target.options[e.target.selectedIndex].text
      ),
    });
    console.log(state);
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    if (Object.keys(validarCampos(state)) !== 0) {
      if(errores.name) {
        alert(errores.name)
        return;
      } else if(errores.attack){
        alert(errores.attack)
        return;
      } else if(errores.defense){
        alert(errores.defense)
        return;
      } else if(errores.speed){
        alert(errores.speed)
        return;
      } else if(errores.hp){
        alert(errores.hp)
        return;
      } else if(errores.height){
        alert(errores.height)
        return;
      } else if(errores.weight){
        alert(errores.weight)
        return;
      }
      console.log(errores)
    }
    let nombre = document.querySelector("#name").value;
    let attack = document.querySelector("#attack").value;
    let defense = document.querySelector("#defense").value;
    let speed = document.querySelector("#speed").value;
    let hp = document.querySelector("#hp").value;
    let height = document.querySelector("#height").value;
    let weight = document.querySelector("#weight").value;
    if(nombre.length === 0){
      alert(
        "Nombre es un dato obligatorio, porfavor llena el formulario correctamente."
      )
      return
    } else if (attack.length === 0) {
      alert(
        "Ataque es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (defense.length === 0) {
      alert(
        "Defensa es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (speed.length === 0) {
      alert(
        "Velocidad es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (hp.length === 0) {
      alert(
        "Vida es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (height.length === 0) {
      alert(
        "Altura es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (weight.length === 0) {
      alert(
        "Peso es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else if (state.types.length === 0) {
      alert(
        "El tipo es un dato obligatorio, porfavor llena el formulario correctamente"
      );
      return;
    } else {
      dispatch(addPokemon(state));
      history.push("/home");
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <ContenedorCreacion>
      <Contenedor>
        <h1>CREA TU POKEMON</h1>
        <InputForm onSubmit={(e) => validarFormulario(e)}>
          <label htmlFor="">Nombre</label>
          <input
            className="inputForm"
            type="text"
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Ataque</label>
          <input
            className="inputForm"
            type="text"
            name="attack"
            id="attack"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Defensa</label>
          <input
            className="inputForm"
            type="text"
            name="defense"
            id="defense"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Velocidad</label>
          <input
            className="inputForm"
            type="text"
            name="speed"
            id="speed"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">HP</label>
          <input
            className="inputForm"
            type="text"
            name="hp"
            id="hp"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Altura</label>
          <input
            className="inputForm"
            type="text"
            name="height"
            id="height"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Peso</label>
          <input
            className="inputForm"
            type="text"
            name="weight"
            id="weight"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <label htmlFor="">Imagen</label>
          <input
            className="inputForm"
            type="text"
            name="imagen"
            id="imagen"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />

          <label htmlFor="">Tipos</label>
          <select
            defaultValue={9999}
            name="types"
            onChange={(e) => handleOptions(e)}
            
          >
            <option disabled value="9999">
              Escoger
            </option>
            <option value="1">normal</option>
            <option value="2">fighting</option>
            <option value="3">flying</option>
            <option value="4">poison</option>
            <option value="5">ground</option>
            <option value="6">rock</option>
            <option value="7">bug</option>
            <option value="8">ghost</option>
            <option value="9">steel</option>
            <option value="10">fire</option>
            <option value="11">water</option>
            <option value="12">grass</option>
            <option value="13">electric</option>
            <option value="14">psychic</option>
            <option value="15">ice</option>
            <option value="16">dragon</option>
            <option value="17">dark</option>
            <option value="18">fairy</option>
            <option value="19">unknown</option>
            <option value="20">shadow</option>
          </select>

          <button type="submit">ACEPTAR</button>

          {state.types.length === 0 ? null : (
            <div>
              {state.types.length === 1 ? (
                <ContenedorTipos>
                  <span>{state.types[0]}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState({
                        ...state,
                        types: [],
                      });
                    }}
                  >
                    X
                  </button>
                </ContenedorTipos>
              ) : (
                <ContenedorTipos>
                  <div>
                    <span>{state.types[0]}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setState({
                          ...state,
                          types: [state.types[1]],
                        });
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div>
                    <span>{state.types[1]}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setState({
                          ...state,
                          types: [state.types[0]],
                        });
                      }}
                    >
                      X
                    </button>
                  </div>
                </ContenedorTipos>
              )}
            </div>
          )}
        </InputForm>
      </Contenedor>
      <BackButton goBack={props.history.goBack}/>
    </ContenedorCreacion>
  );
}

export default Create;
