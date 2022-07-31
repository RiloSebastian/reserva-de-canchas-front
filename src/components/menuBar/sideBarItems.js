import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PeopleIcon from "@mui/icons-material/People";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import HomeIcon from "@mui/icons-material/Home";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { USER_ROLE } from "../../constants/userRole";
import SettingsIcon from "@mui/icons-material/Settings";

const reservationMenu = (user) => [
  {
    name: "Inicio",
    url: "/home",
    icon: <HomeIcon />,
    visible: hasUserRole(user, [USER_ROLE.CUSTOMER]),
  },
  {
    name: "Mis Reservas",
    url: "/mis-reservas",
    icon: <EventAvailableIcon />,
    visible: hasUserRole(user, [USER_ROLE.CUSTOMER, USER_ROLE.COACH]),
  },
  {
    name: "Reservas",
    url: "/reservas",
    icon: <EventAvailableIcon />,
    visible: hasUserRole(user, [
      USER_ROLE.ADMIN,
      USER_ROLE.EMPLOYEE,
      USER_ROLE.COACH,
    ]),
  },
  {
    name: "Canchas",
    url: "/canchas",
    icon: <SportsScoreIcon />,
    visible: hasUserRole(user, [USER_ROLE.ADMIN]),
  },
  {
    name: "Instituciones",
    url: "/instituciones",
    icon: <EditLocationAltIcon />,
    visible: hasUserRole(user, [USER_ROLE.SUPER_ADMIN]),
  },
  {
    name: "Promociones",
    url: "/promociones",
    icon: <WhatshotIcon />,
    visible: hasUserRole(user, [USER_ROLE.ADMIN]),
  },
  {
    name: "Empleados",
    url: "/empleados",
    icon: <PeopleIcon />,
    visible: hasUserRole(user, [USER_ROLE.ADMIN]),
  },
  {
    name: "Feedback",
    url: "/feedback",
    icon: <FeedbackIcon />,
    visible: hasUserRole(user, [USER_ROLE.ADMIN]),
  },
  {
    name: "Configuracion",
    url: "/configuracion",
    icon: <SettingsIcon />,
    visible: hasUserRole(user, [USER_ROLE.ADMIN]),
  },
];

export default function getMenu(user) {
  return reservationMenu(user);
}

function hasUserRole(user, roles) {
  // return userIsAuthorized()

  return user ? roles.map((role) => role.role).includes(user.roles[0]) : false;
}
