import React from "react";
import TextField from "@mui/material/TextField";
import {
    createTheme,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    ThemeProvider
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface OutlinedTextFieldProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: 'primary' | 'secondary';
    width?: string;
    name: string;
}

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif'
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: '#656B76',
                        borderRadius: '10px',
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: '#656B76',
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#DB9161',
        },
        secondary: {
            main: '#656B76',
        },
    },
});

const PasswordTextField: React.FC<OutlinedTextFieldProps> =
    ({
         onChange, value, name
     }) => {

        const [showPassword, setShowPassword] = React.useState(false);
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        return (
            <ThemeProvider theme={theme}>
                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        value={value}
                        name={name}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder={'Password*'}
                        label="Password"
                    />
                </FormControl>
            </ThemeProvider>
        );
    }

export default PasswordTextField;