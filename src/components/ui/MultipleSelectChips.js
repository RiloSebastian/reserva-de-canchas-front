import React from "react";
import PropTypes from "prop-types";

import {
  makeStyles,
  FormLabel,
  Chip,
  Typography,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ".5rem 0 .5rem",
    textAlign: "center",
  },
  chipsDiv: {
    marginTop: ".3rem",
  },
  chip: {
    margin: ".5rem",
    padding: "0.5rem",
  },
  formHelperText: {
    textAlign: "center",
  },
}));

// 1.0.5

const MultipleSelectChips = ({
  value,
  setValue,
  options,
  label,
  error,
  setError,
  setDaysSelected,
  daysSelected,
}) => {
  const classes = useStyles();

  const handleClick = (clickedValue) => {
    console.log("clickedValue");
    console.log(clickedValue);
    if (setError) {
      setError("");
    }
    if (value.find((e) => e === clickedValue)) {
      console.log("Day Selected");
      console.log(value);
      const index = value.findIndex((e) => e === clickedValue);
      console.log("index founded");
      console.log(index);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
      setDaysSelected([arr]);
    } else {
      setValue([...value, clickedValue]);
      setDaysSelected([...value, clickedValue]);
    }
  };

  return (
    <>
      <div className={classes.container}>
        {label && (
          <FormLabel error={Boolean(error)}>
            <Typography variant="body2">{`${label}${
              value.length ? ":" : ": No ha seleccionado ningun dia."
            } ${
              value.length === 7
                ? "Todos los Dias"
                : options
                    .filter((option) => value.indexOf(option.value) !== -1)
                    .map((option) => option.label)
                    .join(", ")
            }`}</Typography>
          </FormLabel>
        )}
        {Boolean(error) && (
          <FormHelperText
            className={classes.formHelperText}
            error={Boolean(error)}
          >
            {error}
          </FormHelperText>
        )}
        <div className={classes.chipsDiv}>
          {options && options.length
            ? options.map((option, i) => (
                <Chip
                  icon={option.icon}
                  className={classes.chip}
                  key={i}
                  color="primary"
                  variant={
                    value.find((e) => e === option.value)
                      ? "default"
                      : "outlined"
                  }
                  label={
                    <Typography variant="body2">{`${option.label}`}</Typography>
                  }
                  clickable
                  onClick={() => handleClick(option.value)}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

MultipleSelectChips.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
};

export default MultipleSelectChips;
