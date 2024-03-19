'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'

// Components
import Loading from './Loading';

const ModalModel = ({ urlPokemon, isModal, setIsModal }) => {
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPokemonDetails = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${urlPokemon}`);
            setPokemonDetails(response.data);
        } catch (error) {
            console.error('Something went wrong,', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonDetails(urlPokemon);
    }, [])

    const handleModal = () => setIsModal(!isModal);

    console.log(pokemonDetails);

    return (

        <div className='h-screen w-screen absolute top-0 left-0 flex justify-center items-center overflow-hidden'>
            <div onClick={() => handleModal()} className='bg-black/50 absolute w-full h-full cursor-pointer overflow-hidden'></div>
            <div className='h-fit w-[480px] bg-white p-6 rounded-xl flex flex-col relative m-2'>
                <button onClick={() => handleModal()} className='btn btn-exit absolute right-4 top-4 font-bold'>X</button>
                {isLoading ?
                    <div className='flex justify-center items-center'>
                        <Loading />
                    </div>
                    :
                    <div className='grid grid-cols-1 space-y-8'>
                        <div className='flex flex-col items-center space-y-4'>
                            <h2 className='text-2xl font-semibold capitalize'>{pokemonDetails?.name}</h2>
                            <img className='h-[180px] w-[180px]' src={pokemonDetails?.sprites?.other?.showdown?.front_default} alt="front_default" />
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex space-x-2'>
                                <h3 className='font-semibold'>Ability(s):</h3>
                                <ul className='flex space-x-2'>
                                    {pokemonDetails?.abilities?.map((abl, index) => (
                                        <li key={abl.ability.name}>
                                            {abl.ability.name}
                                            {index < pokemonDetails.abilities.length - 1 && ','}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex space-x-2'>
                                <h3 className='font-semibold'>Type(s):</h3>
                                <ul className='flex space-x-2'>
                                    {pokemonDetails?.types?.map((abl, index) => (
                                        <li key={abl.type.name}>
                                            {abl.type.name}
                                            {index < pokemonDetails.types.length - 1 && ','}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default ModalModel