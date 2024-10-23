"use client";
import React from 'react'
import { Card, Text } from '@radix-ui/themes'
import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Flip, toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassowrd = () => {
    const [btnClr, setBtnClr] = useState('');
    const [atherate, setAtherate] = useState(false);
    const [email, setEmail] = useState('');
    const [loading , setLoading] = useState(false);
    const DataSetting = (email: string) => {
        setEmail(email);
        if (!(email.includes('@'))) {
            setAtherate(true);
            setBtnClr('error')
        }
        else {
            setAtherate(false);
            setBtnClr('success');
        }
    }
    const sendData = async () => {
        if (email && !atherate) {
            setLoading(true);
            try {
                const response = await fetch('/api/auth/request-reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
    
                const data = await response.json();
                console.log(data)
                if (response.ok || response.status===200) {
                    toast.success('Email Sent !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                    });
                        
                } else {
                    toast.error('Error sending Request', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                    });
                }
            } catch (error) {
                console.error('Error sending password reset request:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    function GradientCircularProgress() {
        return (
            <React.Fragment>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            </React.Fragment>
        );
    }
    return (
        <>
            <div className='flex justify-center'>
                <div className='h-fit max-w-80 bg-slate-100 rounded-xl p-5 flex flex-col gap-5'>
                    <p className='text-3xl pl-1'>Password Reset</p>
                    <div className='flex flex-col items-center'>
                        <Card variant="classic">
                            <Text as="div" size="2">
                                Povide Your Registered Email To Reset Your Acoount Passowrd
                            </Text>
                        </Card>
                    </div>
                    <div className='flex flex-col'>
                        <TextField id="outlined-basic" size='small' label="Email"
                            variant="outlined" required onChange={(event) => DataSetting(event.target.value)} />
                        {atherate && <p className='pt-2 text-red-400 text-sm'>Invalid</p>}
                    </div>
                    <div className='flex justify-center flex-col items-center gap-2'>
                        <Button variant="contained" color='success' onClick={sendData}>Verify</Button>
                        {loading && <GradientCircularProgress />}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ForgotPassowrd