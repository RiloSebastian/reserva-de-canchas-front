import * as React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const reservas = [
    {
        cancha: 'Cancha 1',
        institucion: 'Institucion',
        fecha: '21/10/2021',
        horario: '20:00',
        precio: 1200.00,
    },
];

const TAX_RATE = 0.5;

function ccyFormat(num) {
  return `${parseFloat(num).toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return reservas.map(({ precio }) => precio).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceSubtotal - invoiceTaxes;

const PreReview = () => {



    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Tu Reserva
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
                                Detalles
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Cancha</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Horario</TableCell>
                            <TableCell align="right">Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservas.map((reserva) => (
                            <TableRow key={reserva.cancha}>
                                <TableCell>{reserva.cancha}</TableCell>
                                <TableCell align="right">{reserva.fecha}</TableCell>
                                <TableCell align="right">{reserva.horario}</TableCell>
                                <TableCell align="right">{ccyFormat(reserva.precio)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seña</TableCell>
                            <TableCell align="right">{`${parseFloat((TAX_RATE * 100)).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default PreReview


