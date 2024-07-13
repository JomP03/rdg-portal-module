import React from "react";
import TextField from "@mui/material/TextField";
import {createTheme, ThemeProvider} from "@mui/material";


interface OutlinedTextFieldProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: 'primary' | 'secondary';
    width?: string;
    name: string;
    isOptional?: boolean;
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

const OutlinedTextField: React.FC<OutlinedTextFieldProps> =
    ({
         label = "Label: ", placeholder = "Enter Information", disabled = false, color
         , width = '100%', value = '', onChange, name, isOptional = false
     }) => {
        return (
            <ThemeProvider theme={theme}>
                <TextField
                    disabled={disabled}
                    id="outlined-basic"
                    label={label  + (isOptional ? '' : '*')}
                    variant="outlined"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    color={color}
                    sx={{
                        width: width,
                        mx: '10px',
                        ml: '10px',
                        zIndex: 0,
                    }}
                />
            </ThemeProvider>
        );
    }

export default OutlinedTextField;