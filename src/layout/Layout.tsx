import { Assignment, Close, Leaderboard, Logout, Map, Menu } from '@mui/icons-material'
import { AppBar, Box, IconButton, Typography, List, ListItemText, Fade, Divider, ListItemButton, ListItemIcon, Toolbar } from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../user/userSlice';
import { IconEnum, iconMap } from '../assets/icons';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICords } from '../quest/types';
import { getDistance } from 'geolib';
import { setLocation } from '../user/api/setLocation';

const Layout = ({ children }: { children: ReactNode }) => {

    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const [openMenu, setOpenMenu] = React.useState(false);
    const [geolocationError, setGeolocationError] = React.useState<boolean>(false);

    useEffect(() => {
        if (user?.id !== "admin") {
            if (!sessionStorage.getItem('refreshed')) {
                sessionStorage.setItem('refreshed', 'true');
                window.location.reload();
            }
        }
    }, []);

    useEffect(() => {
        let watchId: number;
        if (!user) return;

        if (user.id !== "admin") {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const loc: ICords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        const distance = getDistance(
                            { latitude: user.location.lat, longitude: user.location.lng },
                            { latitude: loc.lat, longitude: loc.lng }
                        );

                        if (distance > 8) {
                            dispatch(setLocation(loc));
                        }
                    },
                    (error) => {
                        setGeolocationError(true);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            }
            // Vyčištění watch při unmountu komponenty
            return () => {
                if (navigator.geolocation && watchId) {
                    navigator.geolocation.clearWatch(watchId);
                }
            };
        }
    }, [user]);

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }: { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
        if (completed) {
            // Render a completed state
            return <Typography color='common.black' variant='subtitle1'>Konec hry!</Typography>
        } else {
            // Render a countdown
            return <Typography color='common.black' variant='subtitle1'>{`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Typography>
        }
    };

    const titleMap: Record<string, string> = {
        "/": "Mapa",
        "/map": "Mapa",
        "/task-list": "Úkolníček",
        "/leaderboard": "Žebříček",
    }

    const teamMap: Record<string, string> = {
        "teamA": "Modráci",
        "teamB": "Červeňáci",
        "teamC": "Zelenáči",
        "teamD": "Oranžáci",
    }


    const roleMap: Record<string, string> = {
        "role1": "Mapař",
        "role2": "Vyjednavač",
        "role3": "Dělostřelec",
        "role4": "Zásobovač",
        "role5": "Palubní krysa",
        "role6": "První důstojník",
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
        }}>
            <Box>
                <AppBar position="static">
                    <Toolbar sx={{ pr: 1 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {titleMap[location.pathname] ?? "Úkol"}
                        </Typography>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => setOpenMenu((prev) => !prev)}
                        >
                            {openMenu ? <Close /> : <Menu />}
                        </IconButton>
                    </Toolbar>
                    <Box sx={{
                        backgroundColor: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        pr: 3,
                        py: 0.5,
                        justifyContent: "space-between",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}>
                            <Typography variant="subtitle1" color='common.black' >
                                {user && roleMap[user.role]}
                            </Typography>
                            <Typography variant="subtitle1" color='common.black' >
                                {"/"}
                            </Typography>
                            <Typography variant="subtitle1" color='common.black' >
                                {user && teamMap[user.team]}
                            </Typography>
                            <Typography variant="subtitle1" color='common.black' >
                                {"/"}
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                            }}>
                                <Typography variant="subtitle1" color='common.black'>
                                    {user?.coins}
                                </Typography>
                                <img src={iconMap[IconEnum.COIN]} alt="coin" width={16} height={16} />
                            </Box>
                        </Box>
                        <Countdown renderer={renderer} date={"Sat Mar 22 2025 16:30:00 GMT+0100"} />
                    </Box>
                </AppBar>
                {/* Menu se vysune ze shora pod AppBar */}
                <Fade in={openMenu} >
                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            width: '100%',
                            boxShadow: 3,
                            position: 'absolute',
                            zIndex: 1,
                            // případně lze nastavit marginTop, pokud by bylo potřeba odsazení
                        }}
                    >
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                onClick={() => {
                                    navigate("/map");
                                    setOpenMenu(false);
                                }}
                            >
                                <ListItemIcon>
                                    <Map />
                                </ListItemIcon>
                                <ListItemText primary="Mapa" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    navigate("/task-list");
                                    setOpenMenu(false);
                                }}
                            >
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Úkolníček" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    navigate("/leaderboard");
                                    setOpenMenu(false);
                                }}
                            >
                                <ListItemIcon>
                                    <Leaderboard />
                                </ListItemIcon>
                                <ListItemText primary="Žebříček" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folder">
                            <ListItemButton
                                onClick={() => dispatch(logout())}
                            >
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary="Odhlásit" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Fade>
            </Box>
            {!geolocationError ? <Box sx={{
                height: "calc(100% - 64px)",
            }}>
                {children}
            </Box>
                : <Typography sx={{ p: 2 }}>
                    {"Aplikace je dostupná pouze s povoleným přístupem ke geolokaci."}
                </Typography>
            }
        </Box>
    )
}

export default Layout
