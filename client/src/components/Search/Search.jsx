import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import "./Search.css";

export const NavBar = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 40px;
  align-items: center;
`;
export const DivForm = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
`;
export const SearchForm = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
`;
export const SearchButton = styled.button`
  background-color: transparent;
  border: 0px;
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  cursor: pointer;
`;
export const ImgCrear = styled.img`
width: 200px;
position: absolute;
right: 35px;
cursor: pointer;
top: 3.5rem;

&:hover{
  -webkit-transform:scale(1.3);
}

@media (max-width: 1100px){
  width: 150px;
}

@media (max-width: 800px){
  width: 100px;
  right: 20px;
}

@media (max-width: 400px){
  width: 80px;
  right: 6.5px;
  top: 2.7rem;
}

`;

function Search(props) {
  const history = useHistory();
  let pokemones = useSelector((state) => state.pokemones);

  const [input, setInput] = useState("");

  const onFilter = (nombre) => {
    let pokemon_buscado = pokemones.filter((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (pokemon_buscado.length > 0) {
      let id = pokemon_buscado[0].id;
      history.push(`/pokemon/${id}`);
    } else {
      history.push("/");
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(input);
    setInput("");
  };

  return (
    <NavBar>
      <Link to='/'>
      <img
        id="logo"
        src="https://fontmeme.com/permalink/220718/87bb8bcc39cbebd929a137928cc46d82.png"
        alt=""
        />
        </Link>

      <DivForm>
        <SearchForm onSubmit={(e) => handleSubmit(e)}>
          <input
            id="inputSearch"
            type="text"
            name="input"
            value={input}
            placeholder='Ingresa el nombre de algun pokemon...'
            onChange={(e) => handleChange(e)}
            autoComplete='off'
          />
          <SearchButton type="submit"><img id="lupaBusqueda" src="https://cdn.icon-icons.com/icons2/2469/PNG/512/magnifier_magnifying_glass_icon_149435.png" alt="" /></SearchButton>
        </SearchForm>
      </DivForm>
      <Link to='/crear'>
        <ImgCrear src="https://fontmeme.com/permalink/220723/a2bd403873a825726714d251299050c1.png" alt="crear_pokemon"/>
      </Link>
    </NavBar>
  );
}

export default Search;
