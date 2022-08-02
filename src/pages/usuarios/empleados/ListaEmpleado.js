import { Delete } from "@material-ui/icons";
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
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import { createTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import MaterialTable from "material-table";
import React, { forwardRef, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserForInstitution,
  deleteAppUser,
  retrieveUsers,
  updateAppUser,
} from "../../../actions/institution";
import ChipEmployeesState from "../../../components/employees/ChipEmployeesState";
import { USER_ROLE } from "../../../constants/userRole";
import Utils from "../../../utils/utils";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const { user } = useSelector((state) => state.auth);
  const institution = useSelector((state) => state.institution);
  const dispatch = useDispatch();
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
      field: "roles",
      lookup: {
        ROLE_EMPLOYEE: "Empleado",
        ROLE_ADMIN: "Administrador",
        ROLE_COACH: "Entrenador",
      },
      validate: (rowData) =>
        rowData.roles === undefined || rowData.roles === ""
          ? {
              isValid: false,
              helperText: "El tipo de usuario debe estar seleccionado",
            }
          : true,
    },
    {
      title: "Estado",
      field: "state",
      editComponent: (rowData) => {
        console.log(rowData);
        return (
          <FormControlLabel
            control={
              <Switch
                onChange={(e) =>
                  rowData.onChange(e.target.checked ? "ACTIVE" : "SUSPENDED")
                }
                checked={rowData.value === "ACTIVE"}
              />
            }
            label={rowData.value === "ACTIVE" ? "Activo" : "Inactivo"}
          />
        );
      },
      render: (rowData, renderType) => (
        <ChipEmployeesState rowData={rowData} renderType={renderType} />
      ),
      editable: "onUpdate",
    },
  ]);

  const [data, setData] = useState([]);

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const createNewUser = (newUser) => {
    console.log("newUser");
    console.log(newUser);

    let roles = [];
    roles.push(newUser.roles);

    let newUserAdapted = [];
    newUserAdapted.push({
      ...newUser,
      //  telephone: "(11)3231-1234",
      password: Utils.genPassword(),
      state: "SUSPENDED",
      roles,
    });

    let role_type = "";

    switch (newUser.roles) {
      case USER_ROLE.COACH.role:
        role_type = "coaches";
        break;
      case USER_ROLE.EMPLOYEE.role:
        role_type = "employees";
        break;
      case USER_ROLE.ADMIN.role:
        role_type = "managers";
        break;
      default:
        break;
    }
    console.log(newUserAdapted);
    return dispatch(
      createUserForInstitution(institution.id, role_type, newUserAdapted)
    );
  };

  const updateUser = async (userUpdated) => {
    console.log("userUpdated");
    if (!Array.isArray(userUpdated.roles)) {
      let roles = [];
      roles.push(userUpdated.roles);
      return dispatch(
        updateAppUser({
          ...userUpdated,
          roles,
        })
      );
    } else {
      return dispatch(updateAppUser(userUpdated));
    }
  };

  const deleteUser = async (userId) => {
    console.log("userId");
    console.log(userId);

    return dispatch(deleteAppUser(userId));
  };

  useEffect(() => {
    //DEVOLVER LOS EMPLEADOS DE LA INSTITUCION
    let institutionUsers = [];
    dispatch(retrieveUsers(institution.id))
      .then((data) => {
        console.log("DEVOLVIENDO MANAGERS");
        console.log(data);
        if (data) {
          setData((prevState) => {
            return [...prevState, ...data];
          });
        }
      })
      .catch((error) => {
        setOpenSnackbar({
          open: true,
          severity: "error",
          message: Object.values(error.data).map((error, idx) => (
            <Fragment key={error}>
              {error}
              {<br />}
            </Fragment>
          )),
        });
      });
    /* dispatch(retrieveEmployees(institution.id))
      .then((data) => {
        console.log("DEVOLVIENDO EMPLOYEES");
        console.log(data);
        if (data) {
          institutionUsers.push(...data);
        }
      })
      .catch();
    dispatch(retrieveCoches(institution.id))
      .then((data) => {
        console.log("DEVOLVIENDO COACHES");
        console.log(data);
        if (data) {
          institutionUsers.push(...data);
        }
      })
      .catch(); */
  }, []);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Listado de Empleados"
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "empleados",
            nextTooltip: "Proxima Pagina",
            previousTooltip: "Pagina Previa",
            firstTooltip: "Primer Pagina",
            lastTooltip: "Ultima Pagina",
          },
          toolbar: {
            nRowsSelected: "{0} empleado(s) seleccionado(s)",
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar Empleado",
          },
          header: {
            actions: "Opciones",
          },
          body: {
            addTooltip: "Agregar Nuevo Usuario",
            editTooltip: "Editar Usuario",
            deleteTooltip: "Eliminar Usuario",
            emptyDataSourceMessage:
              "Aun no existen empleados, entrenadores u otros administradores asociados a la institucion",
            filterRow: {
              filterTooltip: "Filtro",
            },
            editRow: {
              saveTooltip: "Confirmar",
              cancelTooltip: "Cancelar",
              deleteText: "Esta seguro que desea Eliminar esta Usuario?",
            },
          },
          grouping: {
            placeholder: "Arrastre los encabezados aquí para agruparlos",
          },
        }}
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
          isEditable: (rowData) => rowData.id !== user.id,
          isEditHidden: (rowData) => rowData.id === user.id,
          isDeletable: (rowData) => rowData.id !== user.id,
          isDeleteHidden: (rowData) => rowData.id === user.id,

          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              const user = await createNewUser(newData)
                .then((user) => {
                  console.log("agregar usuario a la institucion");
                  console.log(user);

                  setData([...data, user[0]]);

                  setOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Usuario creado Exitosamente!",
                  });

                  resolve();
                })
                .catch((error) => {
                  console.log(
                    "error al agregar un nuevo usuario a la institucion"
                  );
                  console.log(error);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: Object.values(error.data).map((error, idx) => (
                      <Fragment key={error}>
                        {error}
                        {<br />}
                      </Fragment>
                    )),
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
                .catch((error) => {
                  console.log("error al editar el user seleccionado");
                  console.log(error);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: Object.values(error.data).map((error, idx) => (
                      <Fragment key={error}>
                        {error}
                        {<br />}
                      </Fragment>
                    )),
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
                .catch((error) => {
                  console.log("error al eliminar el user de la institucion");
                  console.log(error);
                  setOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: Object.values(error.data).map((error, idx) => (
                      <Fragment key={error}>
                        {error}
                        {<br />}
                      </Fragment>
                    )),
                  });
                  reject();
                });
            }),
        }}
      />
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openSnackbar.open}
            onClose={handleCloseSnackbar}
          >
            <Alert
              severity={openSnackbar.severity}
              onClose={handleCloseSnackbar}
              sx={{ width: "100%" }}
            >
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </>
  );
};

export default ListaEmpleado;
