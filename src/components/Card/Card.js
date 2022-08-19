import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import React from 'react';

function Card({pokemon}) {
  const [pokemonData, setPokemon] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [mainType, setMainType] = useState("")

  const pokemonSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  useEffect(() => {  
    fetch(pokemon)
      .then((res) => {
        return res.json()
      }).then((data) => {
        setPokemon(data)
        setPokemonTypes(data.types)
        setMainType(data.types[0].type.name)
      })
    return () => {
      ""
    }
  }, [pokemon])

  return (
    <>
    {pokemonData && 
      <div className={styles.card} style={{backgroundColor: mainType ? colours[mainType] : ""}}>
        <h2>{pokemonData.name} - #{pokemonData.id}</h2>
        {pokemonData.id && <img src={`${pokemonSpriteUrl}${pokemonData.id}.png`} alt={`Img ${pokemonData.name}`} />}
        <p>Type</p>
        <div className="types">
          {pokemonTypes.map((item, index) => (
            <div className="typesContainer" key={index}>
              <div className={"type " + item.type.name}></div>
              <p className="typeName">{item.type.name}</p>
            </div>
          ))}
        </div>
        <Link className={styles.detailsButton} to={`/details/${pokemonData.id}`}>Mais detalhes</Link>
      </div>
    }
    </>
  )
}

export default Card