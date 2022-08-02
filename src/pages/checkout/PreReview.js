import React, { useEffect, useState, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

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

/* const percentages = Array.from({ length: 3 }, (_, i) => {
  console.log("cargando porcentaje de señas");
  const percentage = 0.25 * i + TAX_RATE_1;
  console.log(percentage);
  return percentage;
}); */

const PreReview = ({ reservation, setReservation }) => {
  const [selectedPercentages, setSelectedPercentages] = useState();
  const [chipColor, setChipColor] = useState("info");

  const [percentages, setPercentages] = useState(
    Array.from({ length: 3 }, (_, i) => {
      console.log("cargando porcentaje de señas");
      const percentage = 0.25 * i + TAX_RATE_1;
      console.log(percentage);
      return percentage;
    })
  );

  const subtotal = (price) => {
    //return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    return price;
  };

  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const invoiceAdvancePayment = selectedPercentages * invoiceSubtotal;
  const invoiceTotal = invoiceAdvancePayment;
  //const invoiceTotal = invoiceSubtotal - invoiceAdvancePayment;

  const handleSelectPercentage = (newPercentageSelected) => {
    setSelectedPercentages(newPercentageSelected);

    if (newPercentageSelected === 1) {
      setChipColor("success");
    } else {
      setChipColor("info");
    }
  };

  useEffect(() => {
    console.log("updating total to pay");
    setReservation((prevState) => {
      return {
        ...prevState,
        priceToPay: ccyFormat(invoiceTotal),
        debToPay: ccyFormat(invoiceSubtotal - invoiceTotal),
      };
    });
  }, [selectedPercentages]);

  useEffect(() => {
    console.log("CARGANDO PREVIEW");
    console.log(reservation);

    setInvoiceSubtotal(subtotal(reservation.price));

    let selectedPercentages = percentages.filter(
      (percentage) => percentage === 0.5
    );
    setSelectedPercentages(selectedPercentages[0]);
    setReservation((prevState) => {
      return {
        ...prevState,
        priceToPay: ccyFormat(invoiceTotal),
        debToPay: ccyFormat(invoiceSubtotal - invoiceTotal),
      };
    });
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
              <TableCell>Deporte</TableCell>
              <TableCell>Cancha</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Horario</TableCell>
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
              <TableCell>{reservation.sport}</TableCell>
              <TableCell>{reservation.name}</TableCell>
              <TableCell>{reservation.fecha}</TableCell>
              <TableCell>{reservation.horario}</TableCell>
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
                              onClick={() => handleSelectPercentage(percentage)}
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
              <TableCell align="right">
                {ccyFormat(invoiceAdvancePayment)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total a Pagar</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default PreReview;
