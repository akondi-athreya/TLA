"use client";
import React from "react";
import { TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { Flip, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from "@/context";


const page = () => {
	const router = useRouter();
	const { setUserlogged, setUserName } = useAppContext();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);


	const submittingData = async () => {
		setError('');
		if (username === '' || password === '') {
			toast.warn('Enter Valid Details', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Flip,
			})
			return;
		}
		try {
			setLoading(true);
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const data = await res.json();
			if (res.status !== 200) {
				setError(data.message || 'Login failed');
				toast.warn('Wrong Password', {
					position: "top-right",
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
				setUserlogged(true);
				setUserName(username);
				router.push('/');
			}
		} catch (error) {
			setError('An error occurred while logging in');
			toast.error('Server Error', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Flip,
			});
			console.error(error);
		}
		setLoading(false);
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

	return (
		<>
			<div className="max-w-full flex justify-center">
				<div className='w-64 h-fit flex justify-center flex-col gap-10'>
					<TextField.Root type="text" placeholder="Username" className='max-w-lg' name='username' value={username} onChange={(e) => setUsername(e.target.value)}></TextField.Root>
					<TextField.Root type="password" placeholder="Password" className='max-w-lg' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></TextField.Root>
					<div className="max-w-lg flex justify-center">
						<div className="flex flex-col items-center gap-4">
							<Button color="cyan" size="3" variant="soft" onClick={submittingData}>
								Login
							</Button>
							{loading && <GradientCircularProgress />}
						</div>
					</div>
					<div className="flex justify-between text-sm">
						<Link href='/forgotpassword'>Forgot Password?</Link>
						<Link href='/register'>SignUp</Link>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default page;
