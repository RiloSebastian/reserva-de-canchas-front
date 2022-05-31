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
  //options,
  label,
  error,
  setError,
  setDaysSelected,
  daysSelected,
  daysAndTimesId,
}) => {
  const classes = useStyles();

  const handleClick = (clickedValue, daysAndTimesId) => {
    console.log("daysAndTimesId")
    console.log(daysAndTimesId)
    if (setError) {
      setError("");
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);

      const dayUpdated = daysSelected.map(day => {
        if (day.value === clickedValue) {
          return {
            ...day,
            selected: false,
            daysAndTimesId: daysAndTimesId
          }
        }
        return day;
      })
      setDaysSelected(dayUpdated);
    } else {
      const dayUpdated = daysSelected.map(day => {
        if (day.value === clickedValue) {
          return {
            ...day,
            selected: true,
            daysAndTimesId: daysAndTimesId
          }
        }
        return day;
      })


      setValue([...value, clickedValue]);
      setDaysSelected(dayUpdated);
    }
  };

  return (
    <>
      <div className={classes.container}>
        {label && (
          <FormLabel error={Boolean(error)}>
            <Typography variant="body2">{`${label}${value.length ? ":" : ": No ha seleccionado ningun dia."
              } ${value.length === 7
                ? "Todos los Dias"
                : daysSelected
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
          {daysSelected && daysSelected.length
            ? daysSelected.map((option, i) => {
              if (!option.selected || option.daysAndTimesId === daysAndTimesId) {
                return (
                  <Chip
                    icon={option.icon}
                    className={classes.chip}
                    key={i}
                    color={option.selected && option.daysAndTimesId === daysAndTimesId ? "primary" : "default"}
                    variant={
                      value.find((e) => e === option.value) || option.selected
                        ? "default"
                        : "outlined"
                    }
                    label={
                      <Typography variant="body2">{`${option.label}`}</Typography>
                    }
                    clickable={!option.selected || option.daysAndTimesId === daysAndTimesId}
                    onClick={!option.selected || option.daysAndTimesId === daysAndTimesId ? () => handleClick(option.value, daysAndTimesId) : undefined}
                  />
                )
              }
            })
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
  daysSelected: PropTypes.arrayOf(
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
