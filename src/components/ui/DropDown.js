import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

const DropDown = ({ value, handleChange, items }) => {

  return (
      <Select
        value={value}
        onChange={handleChange}
        
        IconComponent={ExpandMoreRoundedIcon}
        labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
        
          autoWidth
          label="Age"
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            {item.key}
          </MenuItem>
        ))}
      </Select>
  );
};

export default DropDown;
