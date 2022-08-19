import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderComponent from "../components/Header/HeaderComponent";
import styles from "./Details.module.css";

function Details() {
  const { id } = useParams();
  const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon/" + id;
  const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const [mainType, setMainType] = useState("");
  const [pokemon, setPokemon] = useState({});
  const [pokemonTypes, setPokemonTypes] = useState([]);

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
    return () => {
      fetch(BASE_API_URL)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
          setPokemon(data)
          setMainType(data.types[0].type.name)
          setPokemonTypes(data.types)
        })
    }
  }, [id, mainType, pokemon, pokemonTypes])
  return (
    <>
      <HeaderComponent />
      <div className={styles.containerPokemon} style={{backgroundColor: mainType ? colours[mainType] : ""}}>
        <div className={styles.header}>
          {id > 1 && <Link to={`/details/${id - 1}`}>Previous</Link>}
          <Link to={`/details/${parseInt(id) + 1}`}>Next</Link>
        </div>
        {pokemon && <>
          <div>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <p className={styles.personalStats}>Height: {pokemon.height} | Weight: {pokemon.weight}</p>
          </div>
          <img src={pokemonSpriteUrl} alt={`${pokemon.name} image`} className={styles.firstImage} />
          <div className="types">
            {pokemonTypes.map((item, index) => (
              <div className="typesContainer" key={index}>
                <div className={"type " + item.type.name}></div>
                <p className="typeName">{item.type.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.modes}>
            <h3>Modes</h3>
            <div className={styles.modesContainer}>
              <div>
                Normal
                <div>
                  {pokemon.sprites && <img src={pokemon.sprites.back_default} alt="" />}
                  {pokemon.sprites && <img src={pokemon.sprites.front_default} alt="" />}
                </div>
              </div>
              <div>
                Shiny
                <div>
                  {pokemon.sprites && <img src={pokemon.sprites.back_shiny} alt="" />}
                  {pokemon.sprites && <img src={pokemon.sprites.front_shiny} alt="" />}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Stats</h3>
            {pokemon.stats && pokemon.stats.map((item) => (
              <p key={item.stat.name}>Base {item.stat.name}: {item.base_stat}</p>
            ))}
          </div>
        </>}
      </div>
    </>
  )
}

export default Details