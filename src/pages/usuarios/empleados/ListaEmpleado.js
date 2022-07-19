import MaterialTable from "material-table";
import React, { useState, forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Delete } from "@material-ui/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import ChipState from "../../../components/employees/ChipState";
import { TextField } from "@material-ui/core";
import authService from "../../../services/auth.service";
import EmailService from "../../../services/email/EmailService";
import { USER_ROLE } from "../../../constants/userRole";

const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "green",
        },
        colorSecondary: {
          backgroundColor: "red",
        },
      },
    },
  },
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const ListaEmpleado = () => {
  const [open, setOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [activo, setActivo] = useState(false);

  const [columns, setColumns] = useState([
    {
      title: "Nombre",
      field: "firstName",
      validate: (rowData) =>
        rowData.firstName === undefined ||
        rowData.firstName === "" ||
        rowData.firstName.trim() === ""
          ? {
              isValid: false,
              helperText: "El nombre del usuario no puede estar vacio",
            }
          : true,
    },
    {
      title: "Apellido",
      field: "lastName",
      validate: (rowData) =>
        rowData.lastName === undefined ||
        rowData.lastName === "" ||
        rowData.lastName.trim() === ""
          ? {
              isValid: false,
              helperText: "El apellido del usuario no puede estar vacio",
            }
          : true,
    },
    {
      title: "Correo Electronico",
      field: "email",
      validate: (rowData) => {
        if (
          rowData.email === undefined ||
          rowData.email === "" ||
          rowData.email.trim() === ""
        ) {
          console.log("EMAIL REQUERIDO");
          return {
            isValid: false,
            helperText: "El email del usuario no puede estar vacio",
          };
        } else if (
          !rowData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          console.log("EMAIL FORMATO");
          return {
            isValid: false,
            helperText: "Introduzca una dirección de correo electrónico válida",
          };
        } else {
          console.log("EMAIL OKAY");
          return true;
        }
      },
    },
    //{ title: 'Descripcion', field: 'description', initialEditValue: 'initial edit value' },
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: "Tipo",
      field: "userRole",
      lookup: {
        ROLE_EMPLOYEE: "Empleado",
        ROLE_ADMIN: "Administrador",
        ROLE_COACH: "Entrenador",
      },
      validate: (rowData) =>
        rowData.userRole === undefined || rowData.userRole === ""
          ? {
              isValid: false,
              helperText: "El tipo de usuario debe estar seleccionado",
            }
          : true,
    },
    {
      title: "Estado",
      field: "estado",
      editComponent: (rowData) => {
        return (
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => rowData.onChange(e.target.checked)}
                checked={rowData.value}
              />
            }
            label={rowData.value ? "Activo" : "Inactivo"}
          />
        );
      },
      render: (rowData, renderType) => (
        <ChipState
          rowData={rowData}
          renderType={renderType}
          states={{ enable: "Activo", disable: "Inactivo" }}
        />
      ),
      editable: "onUpdate",
    },
  ]);

  const [data, setData] = useState([
    {
      firstName: "Marcos",
      lastName: "Gonzalez",
      email: "marcos@email.com",
      description: "Cancha de Polvo de Ladrillos",
      userRole: "ROLE_EMPLOYEE",
      estado: true,
    },
    {
      firstName: "Claudia",
      lastName: "Solis",
      email: "claudia@email.com",
      description: "Cancha de Cemento",
      userRole: "ROLE_EMPLOYEE",
      estado: true,
    },
    {
      firstName: "Raul",
      lastName: "Perez",
      email: "raul@email.com",
      description: "Cancha de 5 Sintetica",
      userRole: "ROLE_ADMIN",
      estado: false,
    },
    {
      firstName: "Susana",
      lastName: "Carbone",
      email: "susana@email.com",
      description: "Cancha de 9 de pasto natural",
      userRole: "ROLE_ADMIN",
      estado: true,
    },
    {
      firstName: "Vanina",
      lastName: "Sanchez",
      email: "vaninca@email.com",
      description: "Cancha de Cemento",
      userRole: USER_ROLE.ADMIN.role,
      estado: false,
    },
  ]);

  const desplegarModal = () => {
    setOpen(true);
  };

  const handleChange = () => {
    setActivo(true);
  };

  const createNewUser = async (newUser) => {
    console.log("newUser");
    console.log(newUser);

    let user = { newUser };

    try {
      const registerUser = await authService
        .register(
          newUser.firstName,
          newUser.lastName,
          newUser.userRole,
          newUser.email,
          newUser.password
        )
        .then((data) => data);

      console.log("usuario Creado");
      console.log(registerUser);

      //pegarle al endpo email

      const emailSended = await EmailService.sendVerificationEmail(
        registerUser.email
      ).then((data) => data);

      console.log("usuario creado");
      console.log(registerUser);

      console.log("email de confirmacion enviado");
      console.log(emailSended);

      return registerUser;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  const updateUser = async (userUpdated) => {
    console.log("userUpdated");
    console.log(userUpdated);
    try {
      const userUpdated = await authService
        .register(
          newUser.firstName,
          newUser.lastName,
          newUser.userRole,
          newUser.email,
          newUser.password
        )
        .then((data) => data);

      console.log("usuario updated");
      console.log(userUpdated);
      console.log(emailSended);

      return userUpdated;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  const deleteUser = async (newUser) => {
    console.log("newUser");
    console.log(newUser);

    let user = { newUser };

    try {
      const registerUser = await authService
        .register(
          newUser.firstName,
          newUser.lastName,
          newUser.userRole,
          newUser.email,
          newUser.password
        )
        .then((data) => data);

      console.log("usuario Creado");
      console.log(registerUser);

      //pegarle al endpo email

      const emailSended = await EmailService.sendVerificationEmail(
        registerUser.email
      ).then((data) => data);

      console.log("usuario creado");
      console.log(registerUser);

      console.log("email de confirmacion enviado");
      console.log(emailSended);

      return registerUser;
    } catch (error) {
      return Promise.reject(error.data);
    }
  };

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Empleados"
        columns={columns}
        data={data}
        options={{
          selection: true,
          grouping: true,
          filtering: true,
        }}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: (rowData) => {
              return (
                <div
                  style={{
                    fontSize: 100,
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#43A047",
                  }}
                >
                  {rowData.name}
                </div>
              );
            },
          },
        ]}
        actions={[
          {
            tooltip: "Eliminar todas las canchas seleccionadas",
            icon: Delete,
            onClick: (evt, data) =>
              alert("You want to delete " + data.length + " rows"),
          },
          {
            tooltip: "Editar Horarios",
            icon: Edit,
            onClick: (evt, data) =>
              alert("You want to delete " + data.length + " rows"),
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              const user = await createNewUser(newData)
                .then((user) => {
                  console.log("agregar usuario a la institucion");
                  console.log(user);

                  setData([...data, user]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Usuario creado Exitosamente!",
                  });

                  resolve();
                })
                .catch((err) => {
                  console.log(
                    "error al agregar un nuevo usuario a la institucion"
                  );
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              const user = await updateUser(newData)
                .then((user) => {
                  console.log("actualizar user");
                  console.log(user);

                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = user;
                  setData([...dataUpdate]);

                  resolve();
                })
                .catch((err) => {
                  console.log("error al editar el user seleccionado");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              console.log("eliminando usuario");
              console.log(oldData);

              const user = await deleteUser(oldData.id)
                .then((userDeleted) => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                })
                .catch((err) => {
                  console.log("error al eliminar el user de la institucion");
                  console.log(err);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: err.message,
                  });
                  reject();
                });
            }),
        }}
      />
    </>
  );
};

export default ListaEmpleado;
