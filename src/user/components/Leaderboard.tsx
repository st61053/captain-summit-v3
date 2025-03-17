import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { iconMap, IconEnum } from '../../assets/icons';

const Leaderboard = () => {

    const { users } = useSelector((state: RootState) => state.user);

    const teamColorMap: Record<string, string> = {
        "teamA": "#1976d2",
        "teamB": "#d32f2f",
        "teamC": "#2e7d32",
        "teamD": "#ed6c02",
    }

    const roleMap: Record<string, string> = {
        "role1": "Mapař",
        "role2": "Vyjednavač",
        "role3": "Dělostřelec",
        "role4": "Zásobovač",
        "role5": "Palubní krysa",
        "role6": "První důstojník",
    }

    const renderIndex = (index: number) => {
        if (index === 0) {
            return <img src={iconMap[IconEnum.T1]} alt="coin" height={28} width={28} />
        } else if (index === 1) {
            return <img src={iconMap[IconEnum.T2]} alt="coin" height={28} width={28} />
        } else if (index === 2) {
            return <img src={iconMap[IconEnum.T3]} alt="coin" height={28} width={28} />
        } else {
            return <Typography sx={{ px: 1 }} variant="subtitle1">{`${index + 1}.`}</Typography>
        }
    }


    return (
        <Box sx={{
            p: 2,
            pr: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1
        }}>
            {[...users].sort((a, b) => b.coins - a.coins).map((user, index) =>
                <Box key={user.id}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5
                        }}>
                            {renderIndex(index)}
                            <Typography variant="subtitle1" sx={{ pl: 2, fontWeight: "bold", color: `${teamColorMap[user.team]}` }}>{roleMap[user.role]}</Typography>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5
                        }}>
                            <Typography variant="body1">{user.coins}</Typography>
                            <img src={iconMap[IconEnum.COIN]} alt="coin" height={18} width={18} />
                        </Box>
                    </Box>
                </Box>

            )}
        </Box>
    )
}

export default Leaderboard