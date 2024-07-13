import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  createTheme,
  ThemeProvider
} from "@mui/material";
import {PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, PRIMARY_COLOR_VARIANT, SECONDARY_COLOR} from "../../../utils/colors";
import './combo-box.css';


interface ComboBoxProps {
  data: { value: string, id: string }[];
  label: string;
  name: string;
  labelSpace?: string;
  width?: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    sx: {
      '& .MuiMenuItem-root': {
        color: SECONDARY_COLOR,
        '&:hover': {
          backgroundColor: PRIMARY_COLOR_LIGHT,
        },
      },
    },
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};


const ComboBox: React.FC<ComboBoxProps> = ({
                                               data = [], label, name,
                                               labelSpace = '1.1em', width, value = '' ,
                                               onChange, disabled = false
                                           }) => {
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
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '656B76',
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
            "&.MuiOutlinedInput-root": {
              "& fieldset>legend": {
                fontSize: labelSpace,
              },
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
        main: PRIMARY_COLOR,
      },
      secondary: {
        main: SECONDARY_COLOR,
      },
    },
  });

  // Sort the data alphabetically 
  data.sort((a, b) => (a.value > b.value) ? 1 : -1);

  return (
    <ThemeProvider theme={theme}>

            <FormControl className={'combo-box'}
                         sx={{
                             width: width,
                             mx: '10px',
                             ml: '10px',
                             zIndex: 0,
                         }}>
                <InputLabel id="test-select-label">{label}</InputLabel>
                <Select
                    disabled={disabled}
                    MenuProps={MenuProps}
                    value={value}
                    onChange={onChange}
                    name={name}
                    labelId="test-select-label"
                    label="Label"
                >
                    {data.map((item) => (
                        <MenuItem
                            id={item.value}
                            key={item.id}
                            value={item.value}
                            accessKey={item.id}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: PRIMARY_COLOR_VARIANT,
                                    color: SECONDARY_COLOR,
                                },
                            }}
                        >
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

    </ThemeProvider>
  )
}


export default ComboBox;