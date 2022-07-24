import styled from "styled-components";
import React, { Component } from "react";
import { getPokemons } from "../../actions";
import {connect} from 'react-redux';


export const Card = styled.div`
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
  width: 12%;
`;

export class Pokemon_Card extends Component {
    componentDidMount(){
        this.props.getPokemons()
    }

  render() {
    return (
      <Card>
        <div>hp</div>
        <img src="" alt="imagen_pokemon" />
        <h1>name</h1>
        <div>Tipos</div>
        <h1>
        {
          
          this.props.pokemones.length > 0 ? console.log(this.props.pokemones) : 'Cargando'
        }
        </h1>
      </Card>
    );
  }
}

export const mapStateToProps = (state) => {
    return {
        pokemones: state.pokemones
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getPokemons: () => dispatch(getPokemons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon_Card);
