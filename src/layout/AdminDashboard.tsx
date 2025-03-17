import { Autocomplete, Box, Button, Card, Divider, Grid2 as Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import MapContainer from '../map/MapContainer'
import Leaderboard from '../user/components/Leaderboard'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { IRoleQuest } from '../quest/types'
import { setTeamCoins } from '../user/api/setTeamCoins'
import { set } from 'firebase/database'
import { useAppDispatch } from '../app/hooks'
import { setRoleQuest } from '../user/api/setRoleQuest'

const AdminDashboard = () => {

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

    const { users } = useSelector((state: RootState) => state.user);
    const { quests, roleQuests } = useSelector((state: RootState) => state.quest);

    const [teamQuestTeam, setTeamQuestTeam] = React.useState<string | null>(null);
    const [teamQuestCoins, setTeamQuestCoins] = React.useState<number | null>(null);

    const [roleQuestTeam, setRoleQuestTeam] = React.useState<string | null>(null);
    const [roleQuestRole, setRoleQuestRole] = React.useState<string | null>(null);
    const [roleQuestQuest, setRoleQuestQuest] = React.useState<IRoleQuest | null>(null);

    const dispatch = useAppDispatch();


    const currentUser = users.find(
        (user) => user.team === roleQuestTeam && user.role === roleQuestRole
    );

    const filteredQuests: IRoleQuest[] = roleQuests
        // Vybereme pouze questy pro vybranou roli
        .filter((quest) => quest.role === roleQuestRole)
        // Vyfiltrujeme questy, které už jsou u uživatele (currentUser.roleQuests obsahuje id questů)
        .filter((quest) => {
            if (currentUser && currentUser.roleQuests) {
                return !currentUser.roleQuests.includes(quest.id);
            }
            return true;
        });

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Grid container spacing={4} sx={{ p: 2, height: "100%" }}>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Card sx={{ height: "calc(100% - 3em)" }}>
                        <MapContainer />
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <Box sx={{ height: "calc(100% - 3em)", display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}>
                            <Typography variant="subtitle1">Každému v týmu přidat coiny</Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                            }}>
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    value={teamQuestTeam}
                                    options={["teamA", "teamB", "teamC", "teamD"]}
                                    getOptionLabel={(option) => teamMap[option]}
                                    sx={{ width: "100%" }}
                                    onChange={(event: any, newValue: string | null) => {
                                        setTeamQuestTeam(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tým" />}
                                />
                                <TextField
                                    type='number'
                                    size='small'
                                    label="Počet coinů"
                                    value={teamQuestCoins}
                                    onChange={(event) => setTeamQuestCoins(parseInt(event.target.value))}
                                />
                                <Button
                                    size='small'
                                    variant="contained"
                                    onClick={() => {
                                        dispatch(setTeamCoins({ team: `${teamQuestTeam}`, coins: Number(teamQuestCoins) }));
                                        setTeamQuestTeam(null);
                                        setTeamQuestCoins(0);
                                    }}
                                >
                                    ok
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}>
                            <Typography variant="subtitle1">Úkoly pro role</Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                            }}>
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    value={roleQuestTeam}
                                    options={["teamA", "teamB", "teamC", "teamD"]}
                                    getOptionLabel={(option) => teamMap[option]}
                                    sx={{ width: "100%" }}
                                    onChange={(event: any, newValue: string | null) => {
                                        setRoleQuestTeam(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tým" />}
                                />
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    value={roleQuestRole}
                                    options={["role1", "role2", "role3", "role4", "role5", "role6"]}
                                    getOptionLabel={(option) => roleMap[option]}
                                    sx={{ width: "100%" }}
                                    onChange={(event: any, newValue: string | null) => {
                                        setRoleQuestRole(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Role" />}
                                />
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    value={roleQuestQuest} // roleQuestQuest je stavová proměnná, kam se uloží id vybraného questu
                                    options={filteredQuests}
                                    getOptionLabel={(option) => option.title}
                                    onChange={(event, newValue: IRoleQuest | null) => {
                                        setRoleQuestQuest(newValue);
                                    }}
                                    sx={{ width: "100%" }}
                                    renderInput={(params) => <TextField {...params} label="Úkol" />}
                                />
                                <Button
                                    size='small'
                                    variant="contained"
                                    onClick={() => {
                                        dispatch(setRoleQuest({ team: `${roleQuestTeam}`, role: `${roleQuestRole}`, roleQuest: roleQuestQuest }));
                                        setRoleQuestTeam(null);
                                        setRoleQuestRole(null);
                                        setRoleQuestQuest(null);
                                    }}
                                >ok</Button>
                            </Box>
                        </Box>
                        <Divider />
                        <Leaderboard />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminDashboard