'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

// COmponents
import ModalModel from './ModalModel';

const CardModel = ({ name, urlPokemon }) => {
    const [pokemonModel, setPokemonModel] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPokemonModel = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${url}`);
            setPokemonModel(response.data.sprites?.other?.dream_world?.front_default);
        } catch(error) {
            console.error('Something went wrong,', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonModel(urlPokemon);
    }, [])

    const handleModal = () => setIsModal(!isModal);

    return (
        <>
            <div onClick={() => handleModal()} className='border-2 rounded p-3 h-[150px] aspect-square space-y-2 flex justify-center items-center flex-col cursor-pointer transition-all active:scale-95 hover:border-stone-400'>
                <h2 className='text-lg font-semibold capitalize'>{name}</h2>
                <div className='h-[80px] aspect-square flex justify-center items-center'>
                    <img src={pokemonModel} alt={name} className='h-full w-full'/>
                </div>
            </div>
            {isModal && (
                <ModalModel urlPokemon={urlPokemon} isModal={isModal} setIsModal={setIsModal} />
            )}
        </>
    )
}

export default CardModel