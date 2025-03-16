import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { iconMap } from '../../assets/icons';
import { AdsClick } from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { takeQuest } from '../api/takeQuest';
import { ICords } from '../types';

const Quest = () => {

    const param = useParams();
    const quests = useSelector((state: RootState) => state.quest.quests);

    const quest = quests.find((quest) => `${quest.id}` === param.id);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const EARTH_RADIUS = 6371000; // Poloměr Země v metrech

    // Převod stupňů na radiány
    const deg2rad = (deg: number): number => {
        return deg * (Math.PI / 180);
    }

    // Výpočet vzdálenosti mezi dvěma body pomocí Haversinovy formule
    const getDistanceFromLatLonInMeters = (
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number
    ): number => {
        const dLat = deg2rad(lat2 - lat1);
        const dLng = deg2rad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }

    const [userLocation, setUserLocation] = useState<ICords | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        if (quest) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const loc: ICords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        setUserLocation(loc);
                        const dist = getDistanceFromLatLonInMeters(
                            loc.lat,
                            loc.lng,
                            quest.location.lat,
                            quest.location.lng
                        );
                        setDistance(dist);
                    },
                    (error) => {
                        setLocationError("Chyba při získávání polohy: " + error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            } else {
                setLocationError("Geolocation API není podporováno vaším prohlížečem.");
            }
        }
    }, [quest]);

    // Quest bude přístupný, pokud je vzdálenost menší nebo rovna 10 metrů
    const isAccessible = distance !== null && distance <= 50;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
        }}>
            {quest
                ? isAccessible ? <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    {quest?.title}
                                </Typography>
                                {quest.status !== "" && <Box sx={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    backgroundColor: "primary.main",
                                }} />}
                            </Box>
                            <Typography
                                color='grey'
                                variant='body2'>
                                {`${quest.location.lat}, ${quest.location.lng}`}
                            </Typography>

                        </Box>
                        <img src={iconMap[quest?.icon]} alt={quest.title} width={"46px"} height={"46px"}></img>
                    </Box>
                    <Box sx={{ pb: 4 }}>
                        <Typography>
                            {quest?.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            {`${distance} m`}
                        </Typography>
                        <Button
                            disabled={quest.status === user?.team}
                            variant='contained'
                            startIcon={<AdsClick />}
                            onClick={() => dispatch(takeQuest(quest.id))}
                        >
                            {"zabrat"}
                        </Button>
                    </Box>
                </Box>
                    : <Typography
                        variant='h6'
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        {"Úkol není v dosahu..."}
                    </Typography>
                : <Typography
                    variant='h6'
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    {"Úkol nenalezen..."}
                </Typography>}
        </Box>
    )
}

export default Quest