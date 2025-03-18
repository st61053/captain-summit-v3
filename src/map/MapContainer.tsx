import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef, useState } from 'react'
import { getQuests } from '../quest/questSlice';
import { useSelector } from 'react-redux';
import { IconEnum, iconMap } from '../assets/icons';
import { Box, IconButton, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { RootState } from '../app/store';
import { IUser } from '../user/types';

const MapContainer = () => {

    const quests = useSelector(getQuests);
    const [open, setOpen] = useState(-1);

    const mapRef = useRef(null);
    const [center,] = useState({
        lat: 50.10104924627968, lng: 14.419361241410119
    });

    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
    });

    const onLoad = React.useCallback(function callback(map: any) {
        mapRef.current = map;
    }, []);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
        }
    };

    const teamMarkerMap: Record<string, string> = {
        "teamA": iconMap[IconEnum.BLUE],
        "teamB": iconMap[IconEnum.RED],
        "teamC": iconMap[IconEnum.GREEN],
        "teamD": iconMap[IconEnum.ORANGE],
    }

    const teamColorMap: Record<string, string> = {
        "teamA": "#1976d2",
        "teamB": "#d32f2f",
        "teamC": "#2e7d32",
        "teamD": "#ed6c02",
    }


    const { users } = useSelector((state: RootState) => state.user);

    return (
        <>
            {
                isLoaded &&
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    options={{
                        gestureHandling: "greedy",
                        disableDefaultUI: true, // Vypne výchozí uživatelské rozhraní (UI)
                        streetViewControl: false, // Vypne ovládání street view
                        styles: [
                            {
                                featureType: "poi.business",
                                stylers: [{ visibility: "off" }],
                            },
                            {
                                featureType: "transit",
                                elementType: "labels.icon",
                                stylers: [{ visibility: "off" }],
                            },
                            {
                                featureType: "poi",
                                stylers: [
                                    { visibility: "off" }
                                ]
                            },
                            {
                                featureType: "poi.park",
                                stylers: [
                                    { visibility: "on" }
                                ]
                            },
                            {
                                featureType: "landscape.natural",
                                stylers: [
                                    { visibility: "off" }
                                ]
                            }
                        ],
                    }}>
                    {
                        quests.map((quest, i) => {
                            return (
                                <Marker
                                    key={`${quest.id}_${i}`}
                                    position={quest.location}
                                    icon={{
                                        url: iconMap[quest.icon],
                                        scaledSize: new google.maps.Size(35, 35),
                                    }}
                                    label={
                                        quest.status !== ""
                                            ? {
                                                text: `⛳︎`,
                                                fontWeight: "bold",
                                                color: teamColorMap[quest.status], // primary blue
                                                className: 'marker-label'
                                            }
                                            : undefined
                                    }
                                    onClick={() => setOpen(open === i ? -1 : i)}
                                >
                                    {
                                        open === i &&
                                        <InfoWindow
                                            options={{
                                                disableAutoPan: true,
                                            }}
                                        >
                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                p: 0.5,
                                                mt: 2
                                            }}>
                                                <Typography
                                                    lineHeight={1}
                                                    sx={{ fontWeight: "bold", pb: 0.5 }}>
                                                    {`${quest.title}`}
                                                </Typography>
                                                <Typography
                                                    lineHeight={1.2}
                                                    sx={{
                                                        pt: 0.5,
                                                        color: "grey",
                                                        pb: 1
                                                    }}
                                                    variant='caption'>
                                                    {quest.locDesc}
                                                </Typography>
                                                <Box sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}>
                                                    <IconButton
                                                        sx={{ pl: 0 }}
                                                        onClick={() => handleCopy(`${quest.location.lat}, ${quest.location.lng}`)}
                                                    >
                                                        <ContentCopy />
                                                    </IconButton>
                                                    <Typography
                                                        variant='body2'>
                                                        {`${quest.location.lat.toFixed(5)}, ${quest.location.lng.toFixed(5)}`}
                                                    </Typography>
                                                </Box>

                                            </Box>
                                        </InfoWindow>
                                    }

                                </Marker>
                            )
                        }
                        )
                    }

                    {
                        users.map((user: IUser, i: number) => {
                            return (
                                <Marker
                                    key={`${user.id}_${i}`}
                                    position={user.location}
                                    icon={{
                                        url: teamMarkerMap[user.team],
                                        scaledSize: new google.maps.Size(12, 12),
                                    }}
                                />
                            )
                        })
                    }
                </GoogleMap >
            }
        </>
    )
}

export default MapContainer