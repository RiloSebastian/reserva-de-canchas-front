import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectDate from './SelectDate';
import ScheduleAndPrice from './../ScheduleAndPrice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FormularioHorarioPrecioCancha = ({ open, setOpen, setHorariosYPrecios }) => {

    //const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [horarios, setHorarios] = useState([]);

    const [dates, setDates] = useState([]);

    useEffect(() => {
        const newSchedule = [...horarios, ScheduleAndPrice];
        setHorarios(newSchedule);
    }, [])

    /*const handleClickOpen = () => {
        setOpen(true);
    };*/

    const handleGuardarHorariosYPrecios = () => {

        setLoading(true);

        setHorariosYPrecios()

        setOpen(false);

    };

    const handleClose = () => {

        setLoading(true);
        setOpen(false);

    };

    const handleAddNewSchedule = () => {

        const newSchedule = [...horarios, ScheduleAndPrice];
        setHorarios(newSchedule);

    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xl"
            >
                <DialogTitle>Precios Y Horarios</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Configure las fechas, horarios y precios para las canchas seleccionadas.
                    </DialogContentText>

                    <Box textAlign='center' sx={{ m: 4 }}>
                        <SelectDate setDates={setDates} />
                    </Box>

                    <Box textAlign='center' sx={{ m: 4 }}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Excluir dias no Laborales" />
                        </FormGroup>
                    </Box>

                    {
                        horarios.length === 0 ? (
                            <Box textAlign='center' sx={{ m: 4 }}>
                                <ScheduleAndPrice />
                            </Box>
                        )
                            : (
                                horarios.map((ScheduleAndPrice, i) => {
                                    return (
                                        <Box textAlign='center' sx={{ m: 4 }}>
                                            <ScheduleAndPrice key={i} />
                                        </Box>
                                    )
                                }))
                    }


                </DialogContent>

                <Box textAlign='center'>
                    <IconButton color="secondary" aria-label="delete" size="large">
                        <AddCircleIcon onClick={handleAddNewSchedule} sx={{ fontSize: 50 }} />
                    </IconButton>
                </Box>

                <Box textAlign='center' sx={{ m: 2 }}>
                    <LoadingButton
                        color="secondary"
                        onClick={handleGuardarHorariosYPrecios}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Guardar Horarios y Precios
                    </LoadingButton>
                </Box>

            </Dialog>
        </div >
    )
}

export default FormularioHorarioPrecioCancha
