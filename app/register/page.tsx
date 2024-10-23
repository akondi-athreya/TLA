"use client";
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '@/context';
import { useTheme } from '@mui/material/styles';

interface User {
    username: string,
    password: string,
    confirmPassword: string,
    email: string
}

const page = () => {
    const {setUserlogged,setUserName,userTheme } =useAppContext();
    const router = useRouter();
    const theme = useTheme();

    const [userData, setUserData] = useState<User>({ username: "", password: "", confirmPassword: "", email: "" });
    const [strengthMsg, setStrengthMsg] = useState('');
    const [NotMatch, setNotMatch] = useState(false);
    const [userEnteredotp, setOtp] = useState('');
    const [showotp, setShowOtp] = useState(false);
    const [disableOption, setDis] = useState(false);
    const [developOTP, setDev] = useState('');
    const [loader, setLoader] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [signUpbtnDisable , setSignUpbtnDisable] = useState(false);

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
    const checkBothPasswords = () => {
        if (userData.password != userData.confirmPassword) setNotMatch(true);
        else setNotMatch(false);
    }
    const dataFilling = (event: any) => {
        if (event.target.name === 'password') {
            checkPasswordStrength(event.target.value);
        }
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }
    const sendOTP = async () => {
        const sendingotp = generateOtp();
        try {
            const response = await fetch('/api/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email, otp: sendingotp, username: userData.username }),
            });
            const result = await response.json();
            if (response.ok) {
                setShowOtp(true);
                setDis(true);
                toast.info('Check Your Mail !', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                });
            }
        } catch (err) {
            console.error(err);
        }
        setLoader(false);
    }
    const validateData = () => {
        if (userData.username == '' || userData.password == '' || userData.confirmPassword == '' || userData.email == '') {
            alert('fill the fields');
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        } else if (!(userData.email.includes('@'))) {
            alert('provide a valid email')
            return;
        } else {
            setLoader(true);
            setDis(true);
            sendOTP();
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeOfUserOtp = (newVal: any) => {
        setOtp(newVal);
    }
    const validateOTP = () => {
        if (developOTP === userEnteredotp.toString()) {
            setSigningUp(true);
            setSignUpbtnDisable(true);
            DumpData();
        }
        else {
            toast.error('Invalid Otp Entered', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }
    const generateOtp = () => {
        let otp;
        do {
            otp = Math.floor(Math.random() * 10000);
        } while (otp < 1000);
        var strOTP = otp.toString();
        setDev(strOTP);
        return strOTP;
    }
    const DumpData = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success('Successfully Registered', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            setUserlogged(true);
            setUserName(userData.username);
            router.push('/');
        } catch (err) {
            console.error(err);
        }
        setSigningUp(false);
        setSignUpbtnDisable(false);
    }

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

    const textFieldStyles = {
        '& .MuiInputBase-input': {
            color: userTheme === 'dark' ? '#ffffff' : '#000000',  // Input text color
        },
        '& .MuiInputLabel-root': {
            color: userTheme === 'dark' ? '#ffffff' : '#000000',  // Label text color
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: userTheme === 'dark' ? '#ffffff' : '#000000',  // Border color
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: userTheme === 'dark' ? '#ffffff' : '#000000',
        },
    };

    return (
        <>
            <div className='max-w-full flex justify-center'>
                <div className='p-8 flex flex-col justify-evenly border-4 rounded-2xl space-y-4'>
                    <p className='text-2xl'>Register</p>
                    <div className='min-w-80 flex flex-col justify-evenly space-y-4 gap-3 stroke-lime-50'>
                        <TextField
                            required size="small"
                            id="outlined-required" label="Username" name='username' sx={textFieldStyles}
                            defaultValue="" onChange={(event) => dataFilling(event)} />
                        <FormControl sx={{ m: 0, width: '40ch' }} size='small' variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password"
                            sx={{color:userTheme==='dark'?'white':'dark'}}
                            >Password</InputLabel>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                            sx={textFieldStyles}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                } label="Password" name='password' onChange={(event) => dataFilling(event)} />
                            {strengthMsg && (
                                <p className={`px-5 ${getPasswordStrengthColor()}`}>
                                    {strengthMsg}
                                </p>
                            )}
                        </FormControl>

                        <FormControl sx={{ m: 0, width: '40ch' }} size='small' variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password" sx={{color:userTheme==='dark'?'white':'dark'}}
                            >Confirm Password</InputLabel>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                            sx={textFieldStyles}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                } label="Password" name='confirmPassword' onChange={(event) => dataFilling(event)}
                                onBlur={checkBothPasswords} />
                            {NotMatch === true && <p className='px-5 text-red-600'>password not matched</p>}
                        </FormControl>

                        <TextField
                            required size="small" name='email'
                            sx={textFieldStyles}
                            id="outlined-required" label="E-mail address"
                            defaultValue="" onChange={(event) => dataFilling(event)} />
                    </div>
                    <div className='flex justify-center flex-col items-center gap-y-5'>
                        <Button variant="contained" className='w-36' onClick={validateData} disabled={disableOption}>Verify</Button>
                        {loader && <GradientCircularProgress />}
                        {showotp && <MuiOtpInput value={userEnteredotp} length={4}
                            autoFocus onChange={handleChangeOfUserOtp} className='w-80' />}
                    </div>
                    <div className='flex justify-center'>{signingUp && <GradientCircularProgress />}</div>
                    <div className='flex justify-center'>
                        {showotp && <Button variant="contained" className='w-36' disabled={signUpbtnDisable}
                        onClick={validateOTP}>Signup</Button>}
                    </div>
                    <div className='flex justify-center text-sm text-blue-400'><Link href='/login'>already have account !</Link></div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default page