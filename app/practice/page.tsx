import React from 'react'
import Card from '../components/Card'

const page = () => {
    return (
        <>
            {/* <div>Practice Page</div> */}
            <div className="flex w-full h-svh justify-between">
                <div className='w-3/4 h-full'>
                    <Card />
                </div>
                <div className='w-1/4 h-full'>
                    
                </div>
            </div>
        </>
    )
}

export default page