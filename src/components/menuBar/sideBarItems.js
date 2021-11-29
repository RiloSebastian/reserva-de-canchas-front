import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import HomeIcon from '@mui/icons-material/Home';
import { USER_ROLE } from '../../constants/userRole';
import { useHistory } from "react-router-dom";

const reservationMenu = (user) => [
    {
        name: "Inicio",
        url: "/home",
        icon: <HomeIcon />,
        visible: hasUserRole(user, [USER_ROLE.CUSTOMER])
    },
    {
        name: "Reservas",
        url: "/reservas",
        icon: <EventAvailableIcon />,
        visible: hasUserRole(user, [USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.COACH])
    },
    {
        name: "Canchas",
        url: "/canchas",
        icon: <SportsScoreIcon />,
        visible: hasUserRole(user, [USER_ROLE.ADMIN])
    },
    {
        name: "Promociones",
        url: "/promociones",
        icon: <WhatshotIcon />,
        visible: hasUserRole(user, [USER_ROLE.ADMIN])
    },
    {
        name: "Empleados",
        url: "/empleados",
        icon: <PeopleIcon />,
        visible: hasUserRole(user, [USER_ROLE.ADMIN]),
        children: [
            {
                name: "Child31",
                url: "/child31"
            },
            {
                name: "Child32",
                url: "/child32"
            },
            {
                name: "Child33",
                url: "/child33"
            }
        ]
    },
    {
        name: "Feedback",
        url: "/feedback",
        icon: <FeedbackIcon />,
        visible: hasUserRole(user, [USER_ROLE.ADMIN]),
        children: [
            {
                name: "Child41",
                url: "/child41"
            },
            {
                name: "Child42",
                url: "/child42"
            },
            {
                name: "Child43",
                children: [
                    {
                        name: "Child431",
                        url: "/child431"
                    },
                    {
                        name: "Child432",
                        url: "/child432,"
                    },
                    {
                        name: "Child433",
                        url: "/child433"
                    }
                ]
            }
        ]
    }
];


export default function getMenu(user) {

    return reservationMenu(user);

};

function hasUserRole(user, roles) {
    // return userIsAuthorized()

    return user ? roles.map(role => role.role).includes(user.roles[0]) : false;
}
