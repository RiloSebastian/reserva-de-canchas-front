import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Mala",
  2: "Regular",
  3: "Buena",
  4: "Muy Buena",
  5: "Excelente",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const HoverRating = ({ handleChange, dispatch }) => {
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    dispatch({ type: "rating", data: value });
  }, []);

  return (
    <Box
      sx={{
        width: 500,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="rating"
        value={value}
        precision={1}
        size="large"
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          handleChange(event);
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
};

export default HoverRating;
