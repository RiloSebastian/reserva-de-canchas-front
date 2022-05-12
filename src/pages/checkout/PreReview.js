import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DoneIcon from "@mui/icons-material/Done";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        variants: [
          {
            props: { variant: "dashed" },
            style: {
              textTransform: "none",
              border: `2px dashed `,
            },
          },
          {
            props: { variant: "dashed", color: "secondary" },
            style: {
              border: `4px dashed `,
            },
          },
        ],
      },
    },
  },
});

/* const reservas = [
  {
    cancha: "Cancha 1",
    institucion: "Institucion",
    fecha: "21/10/2021",
    horario: "20:00",
    precio: 1200.0,
  },
]; */

const TAX_RATE_1 = 0.5;
const TAX_RATE_2 = 0.75;
const TAX_RATE_3 = 1.0;

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

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const handlePercentage = () => {
  console.log("Percentage");
};

const handleDelete = () => {
  console.log("handleDelete");
};

const percentages = Array.from({ length: 3 }, (_, i) => {
  console.log("cargando porcentaje de señas");
  const percentage = 0.25 * i + TAX_RATE_1;
  console.log(percentage);
  return percentage;
});

const PreReview = ({ reservation }) => {
  const [selectedPercentages, setSelectedPercentages] = useState();
  const [chipColor, setChipColor] = useState("info");
  //const [reservations, setReservations] = useState(reservation);

  const subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  };

  const [invoiceSubtotal, setInvoiceSubtotal] = useState(subtotal(rows));
  const invoiceTaxes = TAX_RATE_1 * invoiceSubtotal;
  const invoiceTotal = invoiceSubtotal - invoiceTaxes;

  const handleSelectPercemtage = (newPercentageSelected) => {
    setSelectedPercentages(newPercentageSelected);

    if (newPercentageSelected === 1) {
      setChipColor("success");
    } else {
      setChipColor("info");
    }
  };

  useEffect(() => {
    console.log("loading preview");
    console.log(reservation);

    let selectedPercentages = percentages.filter(
      (percentage) => percentage === 0.5
    );
    setSelectedPercentages(selectedPercentages[0]);
  }, []);

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
            {/*reservations.map((reserva) => (
              <TableRow key={reserva.cancha}>
                <TableCell>{reserva.cancha}</TableCell>
                <TableCell align="right">{reserva.fecha}</TableCell>
                <TableCell align="right">{reserva.horario}</TableCell>
                <TableCell align="right">{ccyFormat(reserva.precio)}</TableCell>
              </TableRow>
            ))*/}
            <TableRow key={reservation.name}>
              <TableCell>{reservation.name}</TableCell>
              <TableCell align="right">{reservation.fecha}</TableCell>
              <TableCell align="right">{reservation.horario}</TableCell>
              <TableCell align="right">
                {ccyFormat(reservation.price)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Seña</TableCell>
              <TableCell align="right">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {percentages.map((percentage) => (
                      <FormControlLabel
                        value={percentage}
                        control={
                          <ThemeProvider theme={theme}>
                            <Chip
                              key={percentage}
                              onClick={() => handleSelectPercemtage(percentage)}
                              //onClick={() => setSelected((s) => !s)}
                              onDelete={
                                selectedPercentages === percentage && (() => {})
                              }
                              color={
                                selectedPercentages === percentage
                                  ? chipColor
                                  : "default"
                              }
                              variant={
                                selectedPercentages === percentage
                                  ? "default"
                                  : "outlined"
                              }
                              deleteIcon={<DoneIcon />}
                              label={`${parseFloat(percentage * 100).toFixed(
                                0
                              )} %`}
                              //onClick={() => setSelectedPercentages(percentage)}
                            />
                          </ThemeProvider>
                        }
                        label=""
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {/*`${parseFloat((TAX_RATE * 100)).toFixed(0)} %`*/}
              </TableCell>
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
  );
};

export default PreReview;
