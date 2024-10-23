"use client";
import { useAppContext } from '@/context';
import React from 'react'

const Home = () => {
  const {userName , userLogged} = useAppContext();
  return (
    <>
      <div>Home</div>
      {userLogged && <div className='w-full flex justify-center text-6xl'>
        <span className='pr-3'>Welcome</span>{userName}
      </div>}
    </>
  )
}

export default Home