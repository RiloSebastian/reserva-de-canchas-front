import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CardCanchaLista from "../../components/CardCanchaLista";
import FormularioFiltroCanchas from "./../../components/formularios-datos/FormularioFiltroCanchas";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5, 2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: 100, width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box
          gridColumn="span 2"
          sx={{
            height: "100%",
            display: "inline-block",
          }}
        >
          <Item>
            <FormularioFiltroCanchas />
          </Item>
        </Box>
        <Box
          gridColumn="span 10"
          sx={{
            height: "100%",
            display: "inline-block",
          }}
        >
          <Item>
            <CardCanchaLista />
          </Item>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
