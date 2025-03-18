import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IconEnum, iconMap } from '../../assets/icons';
import { AdsClick } from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { takeQuest } from '../api/takeQuest';
import { getDistance } from 'geolib';
import Countdown from 'react-countdown';
import { takeTime } from '../api/takeTime';
import { IQuest } from '../types';

const Quest = ({ questKey }: { questKey: string }) => {
    const quests = useSelector((state: RootState) => state.quest.quests);

    const [quest, setQuest] = useState<IQuest | null>(null);

    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const [distance, setDistance] = useState<number | null>(null);


    useEffect(() => {
        const quest = quests.find((quest) => `${quest.id}` === questKey);
        if (quest) {
            setQuest(quest);
        }

    }, [quests, questKey]);


    useEffect(() => {
        if (quest && user) {
            const distance = getDistance(
                { latitude: user.location.lat, longitude: user.location.lng },
                { latitude: quest.location.lat, longitude: quest.location.lng }
            );

            setDistance(distance);
        }
    }, [quest, user]);


    const renderer = ({ minutes, seconds, completed }: { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
        if (quest) {
            if (completed) {
                // Render a completed state
                return <Button
                    disabled={quest.status === user?.team}
                    variant='contained'
                    startIcon={<AdsClick />}
                    onClick={() => {
                        dispatch(takeQuest(quest.id));
                        dispatch(takeTime(quest.id));
                    }}
                >
                    {"zabrat"}
                </Button>
            } else {
                // Render a countdown
                // return <Typography color='secondary' variant='subtitle1'>{`${days}:${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Typography>
                return <Button
                    disabled
                    variant='contained'
                    startIcon={<AdsClick />}
                >
                    {`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
                </Button>
            }
        }
    };

    // Quest bude přístupný, pokud je vzdálenost menší nebo rovna 10 metrů
    const isAccessible = distance !== null && distance <= 50;


    const teamMap: Record<string, string> = {
        "teamA": "primary.main",
        "teamB": "error.main",
        "teamC": "success.main",
        "teamD": "warning.main",
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
        }}>
            {quest
                ? <Box sx={{
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
                                    backgroundColor: teamMap[quest.status],
                                }} />}
                            </Box>
                            <Typography
                                color='grey'
                                variant='body2'>
                                {`${quest.location.lat.toFixed(5)}, ${quest.location.lng.toFixed(5)}`}
                            </Typography>

                        </Box>
                        <img src={iconMap[quest?.icon]} alt={quest.title} width={"46px"} height={"46px"}></img>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}>
                        <Typography sx={{ pr: 0.5 }} variant="body2">
                            {"Odměna:"}
                        </Typography>
                        <Typography variant="body2">
                            {quest.reward}
                        </Typography>
                        <img src={iconMap[IconEnum.COIN]} alt="coin" width={14} height={14} />
                        <Typography sx={{ pl: 0.5 }} variant="body2">
                            {"/ člen"}
                        </Typography>
                    </Box>
                    <Box sx={{ pb: 4 }}>
                        {isAccessible ? <Typography>
                            {quest?.description}
                        </Typography>
                            : <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Typography>
                                    {"Úkol je přístupný pouze v jeho blízkosti (50 m)."}
                                </Typography>
                                <Typography>
                                    {`Vzdálenost od úkolu cca ${Number(distance).toFixed(2)} m`}
                                </Typography>
                            </Box>
                        }
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        {isAccessible && quest.takeTime &&
                            <Countdown key={quest.status} renderer={renderer} date={quest.takeTime} />
                        }
                    </Box>
                </Box>
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