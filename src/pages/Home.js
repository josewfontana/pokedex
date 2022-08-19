import { useEffect, useState, React } from "react";
import Card from "../components/Card/Card";
import HeaderComponent from "../components/Header/HeaderComponent";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { usePaginationContext } from "../hooks/usePaginationContext";

function Home() {
  const BASE_API_URL = "https://pokeapi.co/api/v2/"

  const [pokemonList, setPokemonList] = useState([])
  const {limit, offset, setCountTotal} = usePaginationContext();
  
  useEffect(() => {
    fetch (`${BASE_API_URL}pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setCountTotal(data.count)
        setPokemonList(data.results);
      })
    return () => {
      ""
    }
  }, [pokemonList.length, offset, limit, setCountTotal])

  return (
    <>
      <HeaderComponent />
      <div className='cards-container'>
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.url} pokemon={pokemon.url} />
        ))}
      </div>
      <PaginationComponent />
    </>
  )
}

export default Home
