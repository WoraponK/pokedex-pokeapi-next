'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Components
import Layout from './components/Layout'
import Loading from './components/Loading';
import CardModel from './components/CardModel'

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setPokemons(response.data.results);
    } catch (error) {
      console.error('Something went wrong,', error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [])

  return (
    <>
      <Layout>
        <main className='flex flex-col items-center space-y-8'>
          <div className='w-[250px] h-[120px] relative overflow-hidden '>
            <Image
              fill
              src={'/images/pokemon-logo.svg'}
              alt='pokemon-logo'
              className='w-full object-cover'
            />
          </div>
          <div className='flex flex-wrap gap-4 justify-center'>
            {isLoading ? (
              <Loading />
            ) : (
              pokemons.map((pokemon, index) => (
                <CardModel key={index} name={pokemon.name} urlPokemon={pokemon.url} />
              ))
            )}

          </div>
          <loading />
        </main>
      </Layout>
    </>
  )
}

export default Home