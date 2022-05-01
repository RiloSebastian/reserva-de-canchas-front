import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import { Link } from "react-router-dom";

const backgroundImage =
  "https://velez.com.ar/img/noticias/20/ct/10-01-tenis.jpg?v=2";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h3" marked="center">
        Mejora tu experiencia a la hora de Reservar tu Cancha
      </Typography>

      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 2, sm: 5 } }}
      >
        Disfruta las mejores canchas de tu deporte favorito.
      </Typography>

      <Link
        to="/login"
        style={{
          color: "inherit",
          variant: "h6",
          textDecoration: "none",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/signup"
          sx={{ minWidth: 200 }}
        >
          registrate
        </Button>
      </Link>
    </ProductHeroLayout>
  );
}
