import React from 'react'
import QuestionCard from './QuestionCard'
import { Pagination } from '@mui/material'
import Stack from '@mui/material/Stack';

const Card = () => {
    return (
        <>
            <div className='h-fit w-full border-2'>
                <QuestionCard />
            </div>
        </>
    )
}

export default Card