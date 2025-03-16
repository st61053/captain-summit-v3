import { Assignment, Close, Leaderboard, Logout, Map, Menu } from '@mui/icons-material'
import { AppBar, Box, IconButton, Typography, List, ListItemText, Fade, Divider, ListItemButton, ListItemIcon, Toolbar } from '@mui/material'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../user/userSlice';
import { IconEnum, iconMap } from '../assets/icons';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {

    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const [openMenu, setOpenMenu] = React.useState(false);

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }: { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
        if (completed) {
            // Render a completed state
            return <Typography variant='subtitle1'>Konec hry!</Typography>
        } else {
            // Render a countdown
            return <Typography color='secondary' variant='subtitle1'>{`${days}:${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Typography>
        }
    };

    const titleMap: Record<string, string> = {
        "/map": "Mapa",
        "/task-list": "Úkolníček",
        "/leaderboard": "Žebříček",
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
                            <Typography variant="subtitle1" color='secondary' >
                                {user && user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Typography>
                            <Typography variant="subtitle1" color='secondary' >
                                {"/"}
                            </Typography>
                            <Typography variant="subtitle1" color='secondary' >
                                {user && user.team}
                            </Typography>
                            <Typography variant="subtitle1" color='secondary' >
                                {"/"}
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                            }}>
                                <Typography variant="subtitle1" color='secondary'>
                                    {user?.coins}
                                </Typography>
                                <img src={iconMap[IconEnum.COIN]} alt="coin" width={12} height={12} />
                            </Box>
                        </Box>
                        <Countdown renderer={renderer} date={"Sat Mar 22 2025 15:00:00 GMT+0000"} />
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
            <Box sx={{
                height: "calc(100% - 64px)",
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout