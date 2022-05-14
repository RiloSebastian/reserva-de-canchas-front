import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import ScrollBar from "./ScrollBar";
//import { ColorManyPicker } from "../../../components/color-utils";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

/* const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isOpenFilter",
})(({ theme, isOpenFilter }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(isOpenFilter && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!isOpenFilter && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
})); */

const SORT_BY_OPTIONS = [
  { value: "featured", label: "Destacadas" },
  { value: "priceDesc", label: "Precio: Mayor-Menor" },
  { value: "priceAsc", label: "Precio: Menor-Mayor" },
];
const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
const FILTER_CATEGORY_OPTIONS = ["All", "Shose", "Apparel", "Accessories"];
const FILTER_RATING_OPTIONS = ["up4Star", "up3Star", "up2Star", "up1Star"];
const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];
const FILTER_COLOR_OPTIONS = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

const CourtFilterSideBar = ({ isOpenFilter, onOpenFilter, onCloseFilter }) => {
  const theme = useTheme();

  CourtFilterSideBar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
  };

  return (
    <div>
      <Button
        disableRipple
        color="inherit"
        endIcon={<FilterListIcon />}
        onClick={onOpenFilter}
      >
        Filtros&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: "none", zIndex: theme.zIndex.speedDial },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filtros
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <ScrollBar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              {/*<ColorManyPicker
                name="colors"
                colors={FILTER_COLOR_OPTIONS}
                onChange={handleChange}
                 onChecked={(color) => values.colors.includes(color)}
                sx={{ maxWidth: 38 * 4 }}
                />*/}
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      "& > :first-of-type": { py: 0.5 },
                      "&:hover": {
                        opacity: 0.48,
                        "& > *": { bgcolor: "transparent" },
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </ScrollBar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<ClearAllIcon />}
          >
            Limpiar Filtros
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default CourtFilterSideBar;
