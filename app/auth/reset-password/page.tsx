// app/auth/reset-password/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Card, Text } from '@radix-ui/themes'
import { TextField, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';


export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnClr, setBtnClr] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [strengthMsg, setStrengthMsg] = useState('');
    const [NotMatch, setNotMatch] = useState(false);


    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    // Use useEffect to safely access the window object
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const tokenFromUrl = query.get('token');
        const emailFromUrl = query.get('email');
        if (tokenFromUrl && emailFromUrl) {
            setToken(tokenFromUrl);
            setEmail(emailFromUrl);
        }
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        try {
            const response = await axios.post('/api/auth/reset-password', { token, email, password });
            setMessage(response.data.message);
            router.push('/login');
        } catch (err) {
            setError('An error occurred');
        }
        setLoading(false);
    };
    const settingData = (event: any) => {
        if (event.target.name == "password") {
            setPassword(event.target.value);
            checkPasswordStrength(event.target.value);
        }
        else setConfirmPassword(event.target.value);

        if (password === confirmPassword) setBtnClr('success')
        else setBtnClr('error');
    }
    function GradientCircularProgress() {
        return (
            <>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            </>
        );
    }
    const getPasswordStrengthColor = () => {
        switch (strengthMsg) {
            case 'Very Weak':
                return 'text-red-600'; // Red color for Very Weak
            case 'Weak':
                return 'text-orange-600'; // Orange color for Weak
            case 'Good':
                return 'text-blue-600'; // Blue color for Good
            case 'Strong':
                return 'text-purple-600'; // Violet color for Strong
            case 'Excellent':
                return 'text-green-600'; // Green color for Excellent
            default:
                return '';
        }
    }
    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[\W_]/.test(password)) strength++;
        switch (strength) {
            case 0:
            case 1:
                setStrengthMsg('Very Weak');
                break;
            case 2:
                setStrengthMsg('Weak');
                break;
            case 3:
                setStrengthMsg('Good');
                break;
            case 4:
                setStrengthMsg('Strong');
                break;
            case 5:
                setStrengthMsg('Excellent');
                break;
            default:
                setStrengthMsg('');
        }
    }
    const checkBothPasswords = () => {
        if (password != confirmPassword) setNotMatch(true);
        else {
            setNotMatch(false);
            setBtnClr('success');
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='h-fit max-w-80 bg-slate-100 rounded-xl p-5 flex flex-col gap-5'>
                    <p className='text-3xl pl-1'>Reset Password</p>
                    <div className='flex flex-col items-center'>
                        <Card variant="classic">
                            <Text as="div" size="2">
                                Now You can Reset Your Password Here to New One
                            </Text>
                        </Card>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <TextField id="outlined-basic" size='small' label="New Password" name="password"
                            type="password" variant="outlined" required onChange={(e) => settingData(e)} />
                        {strengthMsg && (
                            <p className={`px-5 ${getPasswordStrengthColor()}`}>
                                {strengthMsg}
                            </p>
                        )}
                        <TextField id="outlined-basic" size='small' label="Confirm Password" name="confirmaPass"
                            type="password" variant="outlined" required onChange={(e) => settingData(e)}
                            onBlur={checkBothPasswords} />
                        {NotMatch === true && <p className='px-5 text-red-600'>password not matched</p>}

                    </div>
                    <div className='flex justify-center flex-col items-center gap-2'>
                        <Button variant="contained" color='success' onClick={handleSubmit}>Set New Password</Button>
                        {loading && <GradientCircularProgress />}
                    </div>
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p>{message}</p>}
        </>
    );
}
