import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectDate from './SelectDate';

const FormularioHorarioPrecioCancha = ({ open, setOpen }) => {

    //const [open, setOpen] = useState(false);

    /*const handleClickOpen = () => {
        setOpen(true);
    };*/

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Precios Y Horarios</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <SelectDate />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Guardar Precios y Horarios </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormularioHorarioPrecioCancha
