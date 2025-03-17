import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Autocomplete, Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../api/loginUser';

const LoginForm = () => {

    const [role, setRole] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const dispatch = useAppDispatch();

    const roleMap: Record<string, string> = {
        "role1": "Mapař",
        "role2": "Vyjednavač",
        "role3": "Dělostřelec",
        "role4": "Zásobovač",
        "role5": "Palubní krysa",
        "role6": "První důstojník",
    }

    return (
        <Box
            sx={{
                width: "100%",
            }}>
            <Box
                sx={{
                    mt: 8,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>První kapitánský sraz</Typography>
                <Typography variant="h6">2025</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 4,
                    gap: 2,
                }}
            >
                <Autocomplete
                    disablePortal
                    value={role}
                    options={["role1", "role2", "role3", "role4", "role5", "role6"]}
                    getOptionLabel={(option) => roleMap[option]}
                    sx={{ width: "100%" }}
                    onChange={(event: any, newValue: string | null) => {
                        setRole(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                />

                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Heslo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            error !== "" && setError("");
                        }}
                        error={error !== ""}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />

                    {error !== "" && <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>}
                </FormControl>
                <Button
                    sx={{ py: 2, mt: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {

                        dispatch(
                            loginUser({ password, role: `${role}` })).unwrap()
                            .catch(() => setError("Nesprávné heslo!"))

                    }
                    }
                >
                    Přihlásit
                </Button>
            </Box>

        </Box>
    )
}

export default LoginForm