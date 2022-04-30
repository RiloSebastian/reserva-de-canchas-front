import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const reservas = [
    {
        cancha: 'Cancha 1',
        institucion: 'Institucion',
        fecha: '21/10/2021',
        horario: '20:00',
        precio: '$1200.00',
    },
];

const payments = [
    { name: 'Tipo de Tarjeta', detail: 'Visa' },
    { name: 'Titular de la tarjeta', detail: 'Martiniano D' },
    { name: 'Número de tarjeta', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Fecha de caducidad', detail: '04/2024' },
];

const Review = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Tu Reserva
            </Typography>
            <List disablePadding>
                {reservas.map((reserva) => (
                    <ListItem key={reserva.cancha} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={reserva.cancha} secondary={reserva.institucion} />
                        <Typography variant="body2">{reserva.precio}</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $1200.00
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Medio de Pago
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Review
