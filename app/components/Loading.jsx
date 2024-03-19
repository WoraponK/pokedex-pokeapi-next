'use client'

import React from 'react'

// Icons
import { ImSpinner } from "react-icons/im";

const Loading = () => {
    return (
        <span className='text-5xl animate-spin'>
            <ImSpinner />
        </span>
    )
}

export default Loading