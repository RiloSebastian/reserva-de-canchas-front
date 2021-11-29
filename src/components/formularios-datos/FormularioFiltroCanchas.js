import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ubicaciones = [
    'Palermo',
    'Belgrano',
    'Caballito',
    'Avellaneda',
    'Haedo',
    'Moron',
    'San Miguel',
    'Flores',
    'La Plata',
    'Quilmes',
];

function getStyles(name, ubicacion, theme) {
    return {
        fontWeight:
        ubicacion.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const FormularioFiltroCanchas = () => {

    const theme = useTheme();
    const [deporte, setDeporte] = useState();
    const [ubicacion, setUbicacion] = useState([]);
    const [institucion, setInstitucion] = useState();
    const [value, setValue] = useState(new Date());

    const handleChange = (event) => {
        setDeporte(event.target.value);
    }

    const handleUbicacion = (event) => {
        const {
            target: { value },
        } = event;
        setUbicacion(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleInstitucion = (event) => {
        //setDeporte(event.target.value);
    }

    const [checked, setChecked] = React.useState(true);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl fullWidth>

                <InputLabel id="demo-simple-select-label">Deporte</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deporte}
                    label="Deporte"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Futbol</MenuItem>
                    <MenuItem value={20}>Tenis</MenuItem>
                    <MenuItem value={30}>Padel</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Ubicacion</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={ubicacion}
                    onChange={handleUbicacion}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {ubicaciones.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, ubicacion, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Institucion</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    value={institucion}
                    onChange={handleInstitucion('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>

            <FormControl fullWidth>
                <FormLabel component="legend">Fechas</FormLabel>
            </FormControl>


            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <FormControl sx={{ width: '25ch' }}>
                    <MobileDatePicker
                        label="Desde"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl sx={{ width: '25ch' }}>
                    <MobileDatePicker
                        label="Hasta"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>

            </LocalizationProvider>


            <FormLabel component="legend">Horarios</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl sx={{ width: '25ch' }}>
                    <MobileTimePicker
                        label="Desde"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl sx={{ width: '25ch' }}>
                    <MobileTimePicker
                        label="Hasta"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
            </LocalizationProvider>

            <FormLabel component="legend">Franja Horaria</FormLabel>
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Mañana"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Tarde"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Noche"
                    labelPlacement="end"
                />
            </FormGroup>
        </Box >
    )
}

export default FormularioFiltroCanchas
