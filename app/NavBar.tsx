'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBackpack2 } from "react-icons/bs";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useAppContext } from '@/context';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#003892',
        }),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
        ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
        }),
    },
}));


const NavBar = () => {
    const { userLogged , userName , userTheme , setUserTheme } = useAppContext();
    const currentPath = usePathname();

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Product', href: '/product' },
        { label: 'Practice', href: '/practice' }
    ]

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }
    function stringAvatar(name: string) {
        const nameParts = name.split(' ');
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : `${nameParts[0][0]}`, // Use the first character if only one part exists
        };
    }
    const themeChanged = () => {
        if(userTheme === 'light') setUserTheme('dark');
        else setUserTheme('light');
    }

    return (
        <>
            <nav className='flex justify-between space-x-6 border-b mb-5 px-5 h-14 items-center'>
                <Link href='/'><BsBackpack2 size='30' /></Link>
                <ul className='flex space-x-6'>
                    {links.map(link =>
                        <Link key={link.href} href={link.href}
                            className={`${currentPath === link.href ? '' : 'text-gray-500 font-thin'}`}
                        >{link.label}</Link>
                    )}
                </ul>
                {(currentPath !== '/register' && currentPath !== '/login' && currentPath !== '/forgotpassword') ? (
                    userLogged ? (
                        <ul className='flex space-x-2 text-sm items-center'>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: -1 }} checked={userTheme === 'dark'} onChange={themeChanged}/>}
                                label=""
                            />
                            <li>
                                <Link href='/profile'>
                                    <Avatar {...stringAvatar(userName)} />
                                </Link>
                            </li>
                            <li><Link href='/logout'>Logout&nbsp;<LogoutIcon fontSize='small'/></Link></li>
                        </ul>
                    ) : (
                        <ul className='flex space-x-2 text-sm items-center'>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: -1 }} checked={userTheme === 'dark'} onChange={themeChanged} />}
                                label=""
                            />
                            <li><Link href='/register'>Register</Link></li>
                            <li>or</li>
                            <li><Link href='/login'>Login</Link></li>
                        </ul>
                    )
                ) : <div></div>}

            </nav>
        </>
    )
}

export default NavBar