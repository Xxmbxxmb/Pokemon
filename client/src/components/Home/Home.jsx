import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterPaginado, getPokemons, filtradoAlt } from "../../actions";
import Card from "../Card/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Home.css";

export const DivXl = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 30px;
  flex-wrap: wrap;
  width: 40%;
  overflow: hidden;
  overflow-y: scroll;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 10px 10px 10px;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-height: 850px) {
    height: 480px;
  }

  @media (max-height: 750px) {
    height: 400px;
  }

  @media (max-height: 650px) {
    height: 300px;
  }

  @media (max-width: 500px) {
    width: 80%;
    height: 220px;
    margin-bottom: 1.2rem;
    margin-left: 0px;
  }
`;
export const DivFilters = styled.div`
  background-color: transparent;
  margin-top: 1rem;
  display: flex;
  width: 80%;
  height: 40px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding-top: 1rem;

  @media (max-width: 1150px) {
    padding-top: 1rem;
    width: 65%;
  }

  @media (max-width: 800px) {
    padding-top: 0.3rem;
  }

  @media (max-width: 700px) {
    align-self: flex-start;
    width: 70%;
  }
`;
export const DivButton = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-evenly;
  margin-left: 6.7rem;
  width: 35%;
  height: 40px;
  align-self: flex-start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 8px;
  padding-bottom: 5px;

  @media (max-width: 1100px) {
    margin-left: 5.25rem;
    height: 25px;
  }

  @media (max-width: 800px) {
    margin-left: 5.25rem;
    height: 25px;
  }

  @media (max-width: 720px) {
    margin-left: 4rem;
    height: 20px;
    margin-top: 2.5rem;
  }

  @media (max-width: 500px) {
    margin-left: 10rem;
    margin-top: 4rem;
    height: 20px;
  }

  @media (max-width: 420px) {
    margin-left: 8.5rem;
    margin-top: 3rem;
    height: 20px;
  }

  @media (max-width: 360px) {
    margin-left: 7.5rem;
    margin-top: 3rem;
    height: 20px;
  }
`;
export const Contenedor = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-top: 1rem;

  @media (max-height: 800px) {
    width: 70%;
  }
`;
export const ImgPoke = styled.img`
  min-height: 200px;
  max-height: 200px;
  mix-width: 200px;
  max-width: 200px;

  @media (max-height: 800px) {
    min-height: 150px;
    max-height: 150px;
    mix-width: 150px;
    max-width: 150px;
  }

  @media (max-height: 600px) {
    min-height: 100px;
    max-height: 100px;
    mix-width: 100px;
    max-width: 100px;
  }

  @media (max-width: 800px) {
    min-height: 95px;
    max-height: 95px;
    mix-width: 95px;
    max-width: 95px;
  }

  @media (max-width: 720px) {
    min-height: 100px;
    max-height: 100px;
    mix-width: 100px;
    max-width: 100px;
  }

  @media (max-width: 600px) {
    min-height: 80px;
    max-height: 80px;
    mix-width: 80px;
    max-width: 80px;
  }

  @media (max-width: 450px) {
    min-height: 60px;
    max-height: 60px;
    mix-width: 60px;
    max-width: 60px;
  }
`;
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

  @media (max-width: 700px) {
    font-size: 10px;
  }

  @media (max-width: 400px) {
    font-size: 7px;
    width: 25%;
  }
`;
export const MainTipos = styled.div`
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
`;

const ITEMS_PAGINA = 12;

const sName = (lista) => {
  lista = lista.sort((a, b) => {
    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;
    return 0;
  });
};

const sAtt = (lista) => {
  lista = lista.sort((a, b) => {
    if (a.attack > b.attack) return 1;
    if (a.attack < b.attack) return -1;
    return 0;
  });
};

function Home(props) {
  const options = [
    { value: "", text: "-- Ordenar por tipo --" },
    { value: "normal", text: "normal" },
    { value: "fighting", text: "fighting" },
    { value: "flying", text: "flying" },
    { value: "poison", text: "poison" },
    { value: "ground", text: "ground" },
    { value: "rock", text: "rock" },
    { value: "bug", text: "bug" },
    { value: "ghost", text: "ghost" },
    { value: "steel", text: "steel" },
    { value: "fire", text: "fire" },
    { value: "water", text: "water" },
    { value: "grass", text: "grass" },
    { value: "electric", text: "electric" },
    { value: "psychic", text: "psychic" },
    { value: "ice", text: "ice" },
    { value: "dragon", text: "dragon" },
    { value: "dark", text: "dark" },
    { value: "fairy", text: "fairy" },
    { value: "unknown", text: "unknown" },
    { value: "shadow", text: "shadow" },
  ];

  const dispatch = useDispatch();
  let [selected, setSelected] = useState(options[0].value);
  let [selName, setName] = useState("-- Orden por Nombre --");
  let [selAtt, setAtt] = useState("-- Orden por Attaque --");
  let [selOri, setOri] = useState("-- Orden por Origen --");

  let [filterCreados, setFilterCreados] = useState(false);
  let [filterOriginales, setFilterOriginales] = useState(false);

  let [sortName, setSortName] = useState(false);
  let [sortAttack, setSortAttack] = useState(false);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  let pokemones = useSelector((state) => state.pokemones);
  let asdf = useSelector((state) => state.filtrado);
  let poke_originales = pokemones.filter((p) => typeof p.id === "number");
  let creados = pokemones.filter((p) => typeof p.id !== "number");
  let detalle = useSelector((state) => state.pokemon_detail);

  useEffect(() => {
    if (pokemones.length === 0) dispatch(getPokemons());
  }, [pokemones, items, dispatch, currentPage]);

  const nextHandler = () => {
    let lista = [...asdf];
    if (lista.length === 0 && !filterCreados && !filterOriginales)
      lista = [...pokemones];
    if (lista.length === 0 && filterOriginales) lista = [...poke_originales];
    if (lista.length === 0 && filterCreados) lista = [...creados];

    let total_elementos = lista.length;
    let nextPage = currentPage + 1;
    let firstIndex = nextPage * ITEMS_PAGINA;
    if (firstIndex + 1 > total_elementos) return;

    setItems([...lista].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    let lista = [...asdf];
    if (lista.length === 0 && !filterCreados && !filterOriginales)
      lista = [...pokemones];
    if (lista.length === 0 && filterOriginales) lista = [...poke_originales];
    if (lista.length === 0 && filterCreados) lista = [...creados];

    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * ITEMS_PAGINA;
    setItems([...lista].splice(firstIndex, ITEMS_PAGINA));
    setCurrentPage(prevPage);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    let pokemon_filter;

    if (filterOriginales === true) {
      if (event.target.value !== "") {
        pokemon_filter = poke_originales.filter((p) =>
          p.types.includes(event.target.value)
        );
        if (sortName === true) sName(pokemon_filter);
        else if (sortAttack === true) sAtt(pokemon_filter);
        dispatch(getFilterPaginado(pokemon_filter));
        setItems([...pokemon_filter].splice(0, ITEMS_PAGINA));
        setCurrentPage(0);
      }
    }

    if (filterCreados === true) {
      if (event.target.value !== "") {
        pokemon_filter = creados.filter((p) =>
          p.types.includes(event.target.value)
        );
        if (sortName === true) sName(pokemon_filter);
        else if (sortAttack === true) sAtt(pokemon_filter);
        dispatch(getFilterPaginado(pokemon_filter));
        setItems([...pokemon_filter].splice(0, ITEMS_PAGINA));
        setCurrentPage(0);
      }
    }

    if (filterCreados === false && filterOriginales === false) {
      if (event.target.value !== "") {
        pokemon_filter = pokemones.filter((p) =>
          p.types.includes(event.target.value)
        );
        if (sortName === true) sName(pokemon_filter);
        else if (sortAttack === true) sAtt(pokemon_filter);
        dispatch(getFilterPaginado(pokemon_filter));
        setItems([...pokemon_filter].splice(0, ITEMS_PAGINA));
        setCurrentPage(0);
      }
    }
  };

  const sortByName = (reverse) => {
    setSortName(true);
    setSortAttack(false);
    let lista = [...pokemones];
    if (selected !== "") {
      lista = lista.filter((p) => p.types.includes(selected));
    }
    if (filterCreados === true) {
      lista = lista.filter((p) => typeof p.id !== "number");
    }
    if (filterOriginales === true) {
      lista = lista.filter((p) => typeof p.id === "number");
    }
    sName(lista);
    if (reverse) {
      lista = lista.reverse();
    }
    dispatch(getFilterPaginado(lista));
    setItems([...lista].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
  };

  const sortByAttack = (reverse) => {
    setSortName(false);
    setSortAttack(true);
    let lista = [...pokemones];
    if (selected !== "") {
      lista = lista.filter((p) => p.types.includes(selected));
    }
    if (filterCreados === true) {
      lista = lista.filter((p) => typeof p.id !== "number");
    }
    if (filterOriginales === true) {
      lista = lista.filter((p) => typeof p.id === "number");
    }
    sAtt(lista);
    if (reverse) {
      lista = lista.reverse();
    }
    dispatch(getFilterPaginado(lista));
    setItems([...lista].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
  };

  const sortOriginals = () => {
    setFilterOriginales(true);
    setFilterCreados(false);
    let lista = [...pokemones];
    if (selected !== "") {
      lista = lista.filter((p) => p.types.includes(selected));
    }
    lista = lista.filter((p) => typeof p.id === "number");
    if (sortName === true) sName(lista);
    else if (sortAttack === true) sAtt(lista);

    dispatch(getFilterPaginado(lista));
    setItems([...lista].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
  };

  const sortCreated = () => {
    setFilterOriginales(false);
    setFilterCreados(true);
    let lista = [...pokemones];
    if (selected !== "") {
      lista = lista.filter((p) => p.types.includes(selected));
    }
    lista = lista.filter((p) => typeof p.id !== "number");
    if (sortName === true) sName(lista);
    else if (sortAttack === true) sAtt(lista);

    dispatch(getFilterPaginado(lista));
    setItems([...lista].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
  };

  const sortTodos = () => {
    setFilterOriginales(false);
    setFilterCreados(false);
    let lista = [...pokemones];

    dispatch(getFilterPaginado([]));
    setItems([...lista].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
  };

  const filtroAltura = () => {
    dispatch(filtradoAlt());
    setItems([...pokemones].splice(0, ITEMS_PAGINA));
    setCurrentPage(0);
    console.log(pokemones);
  };

  return (
    <>
      <div id="contenedorFiltros">
        <DivFilters>
          <select
            className="selec_general"
            value={selName}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value === "ascendente") sortByName();
              if (e.target.value === "descendente") sortByName(true);
            }}
          >
            <option value="">-- Orden por Nombre --</option>
            <option value="ascendente">A - Z</option>
            <option value="descendente">Z - A</option>
          </select>

          <select
            className="selec_general"
            value={selAtt}
            onChange={(e) => {
              setAtt(e.target.value);
              if (e.target.value === "ascendente") sortByAttack();
              if (e.target.value === "descendente") sortByAttack(true);
            }}
          >
            <option value="">-- Orden por Ataque --</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>

          <select
            className="selec_general"
            value={selected}
            onChange={handleChange}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>

          <select
            className="selec_general"
            value={selOri}
            onChange={(e) => {
              setOri(e.target.value);
              if (e.target.value === "originales") sortOriginals();
              if (e.target.value === "creados") sortCreated();
              if (e.target.value === "todos") sortTodos();
            }}
          >
            <option value="">-- Orden por Origen --</option>
            <option value="todos">Todos</option>
            <option value="originales">Originales</option>
            <option value="creados">Creados</option>
          </select>

          <button onClick={() => filtroAltura()}>X</button>
        </DivFilters>
        <DivButton>
          <button className="pageButton" onClick={prevHandler}>
            ANTERIOR
          </button>
          <button
            className="pageButton"
            onClick={() => window.location.reload()}
          >
            INICIO
          </button>
          <button className="pageButton" onClick={nextHandler}>
            SIGUIENTE
          </button>
        </DivButton>
      </div>
      <div id="try">
        <DivXl>
          {pokemones.length === 0 ? (
            <>
              <img
                id="cargando"
                src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
                alt=""
              />
              <div id="div_load">
                <img
                  src="https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif"
                  id="loading_gif"
                  alt=""
                />
              </div>
            </>
          ) : items.length === 0 && selected === "" ? (
            setItems([...pokemones].splice(0, ITEMS_PAGINA))
          ) : items.length === 0 && selected !== "" ? null : (
            items.map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  name={pokemon.nombre}
                  hp={pokemon.hp}
                  imagen={
                    pokemon.imagenStatic ? pokemon.imagenStatic : pokemon.imagen
                  }
                  defense={pokemon.defense}
                  attack={pokemon.attack}
                  types={pokemon.types}
                  id={pokemon.id}
                  // base_exp={pokemon['base_exp']}
                />
              );
            })
          )}
        </DivXl>

        <div id="pokedetail">
          {Object.keys(detalle).length !== 0 ? (
            <Contenedor>
              <div>
                <span className="detalle_hp">{detalle.hp}</span>
                <img
                  className="hp_img"
                  src="https://i.imgur.com/cNRQUhr.png"
                  alt="hp"
                />
                <span className="detalle_att">{detalle.attack}</span>
                <img
                  src="https://icon-library.com/images/attack-icon/attack-icon-28.jpg"
                  alt="att"
                  className="img_att"
                />
                <span className="detalle_def">{detalle.defense}</span>
                <img
                  // src="https://cdn2.iconfinder.com/data/icons/rpg-basic-set-2/512/defense-512.png"
                  src="https://icon-library.com/images/defend-icon/defend-icon-21.jpg"
                  alt="def"
                  className="img_def"
                />
              </div>
              <Link to={`/pokemon/${detalle.id}`}>
                <ImgPoke src={`${detalle.imagen}`} alt="" />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to={`/pokemon/${detalle.id}`}
              >
                <h3
                  style={{ color: "black" }}
                >{`${detalle.nombre[0].toUpperCase()}${detalle.nombre.slice(
                  1
                )}`}</h3>
              </Link>

              {detalle.types.length > 1 ? (
                <div>
                  <div className="tipo_detalle">
                    <ContenedorTipo tipo={detalle.types[0]}>
                      {detalle.types[0]}
                    </ContenedorTipo>
                    <ContenedorTipo tipo={detalle.types[1]}>
                      {detalle.types[1]}
                    </ContenedorTipo>
                  </div>
                </div>
              ) : (
                <MainTipos>
                  <ContenedorTipo tipo={detalle.types[0]}>
                    {detalle.types[0]}
                  </ContenedorTipo>
                </MainTipos>
              )}

              <div className="abilities_grid">
                {detalle.abilities
                  ? detalle.abilities.map((ab, index) => {
                      return (
                        <ul key={`${index}${ab}`}>
                          <li>{`Habilidad N°${
                            index + 1
                          }: ${ab.toUpperCase()}`}</li>
                        </ul>
                      );
                    })
                  : null}
              </div>
            </Contenedor>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home;
