import EventIcon from "@mui/icons-material/Event";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "moment/locale/es";
import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  minLength,
  stripeCardExpirValidation,
  stripeCardNumberValidation,
  textWithSpacesOnly,
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from "../../validations";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "cardNumber":
      return { ...state, cardNumber: formatCreditCardNumber(action.data) };
    case "expDate":
      return { ...state, expDate: formatExpirationDate(action.data) };
    case "securityCode": {
      console.log("securityCode", action.data);
      return { ...state, securityCode: formatCVC(action.data) };
    }
    case "cardOwner":
      return { ...state, cardOwner: action.data };
    default:
      return state;
  }
};

const findDebitCardType = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) return card;
  }
  return "";
};

const PaymentForm = ({ setValidatedPaymentMethod, setReservation }) => {
  const [state, dispatch] = useReducer(reducer, {
    cardOwner: "",
    cardNumber: "",
    expDate: "",
    securityCode: "",
  });

  const [cardType, setCardType] = useState();

  const [error, setError] = useState({});

  const isFormValid = () => {
    const { cardOwner, cardNumber, expDate, securityCode } = state;

    return cardOwner && cardNumber && expDate && securityCode;
  };

  const handleValidations = (type, value) => {
    console.log("handleValidations");
    console.log(type);
    console.log(value);
    let errorText;
    switch (type) {
      case "cardNumber":
        setCardType(findDebitCardType(value));
        errorText =
          value === "" ? "Requerido" : stripeCardNumberValidation(value);
        setError({ ...error, cardNumberError: errorText });
        break;
      case "cardOwner":
        errorText = value === "" ? "Requerido" : textWithSpacesOnly(value);
        setError({ ...error, cardOwnerError: errorText });
        break;
      case "expDate":
        errorText =
          value === "" ? "Requerido" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "securityCode":
        errorText = value === "" ? "Requerido" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleBlur = (e) => {
    handleValidations(e.target.name, e.target.value);
  };

  useEffect(() => {
    console.log("unica vez");
    setValidatedPaymentMethod(true);
  }, []);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("validando datos");
    console.log(error);
    if (
      !error.cardNumberError &&
      !error.securityCodeError &&
      !error.expiryError &&
      !error.cardOwnerError &&
      isFormValid()
    ) {
      setValidatedPaymentMethod(false);
      setReservation((prevState) => {
        return { ...prevState, checkout: state };
      });
    } else {
      setValidatedPaymentMethod(true);
    }
  }, [error]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Medio de Pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Nombre en la tarjeta"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            name="cardOwner"
            value={state.cardOwner}
            onChange={handleChange}
            onBlur={handleBlur}
            {...(error &&
              error.cardOwnerError &&
              error.cardOwnerError.length > 1 && {
                error,
                helperText: error.cardOwnerError,
              })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Numero de Tarjeta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="cardNumber"
            value={state.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            {...(error &&
              error.cardNumberError &&
              error.cardNumberError.length > 1 && {
                error,
                helperText: error.cardNumberError,
              })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardExpDate"
            label="Valida Hasta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="expDate"
            value={state.expDate}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: <EventIcon />,
            }}
            {...(error &&
              error.expiryError &&
              error.expiryError.length > 1 && {
                error,
                helperText: error.expiryError,
              })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Últimos tres dígitos en la parte posterior de la tarjeta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="securityCode"
            value={state.securityCode}
            onChange={handleChange}
            onBlur={handleBlur}
            {...(error &&
              error.securityCodeError &&
              error.securityCodeError.length > 1 && {
                error,
                helperText: error.securityCodeError,
              })}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
