import MaterialTable from 'material-table';
import React, { useState, forwardRef } from 'react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Delete } from '@material-ui/icons';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormularioHorarioPrecioCancha from '../../../components/formularios-datos/FormularioHorarioPrecioCancha';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import DoneIcon from "@mui/icons-material/Done";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import ChipState from '../../../components/employees/ChipState';
import { TextField } from '@material-ui/core';

const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: 'green',
                },
                colorSecondary: {
                    backgroundColor: 'red',
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
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ListaEmpleado = () => {

    const [open, setOpen] = useState(false);

    const [activo, setActivo] = useState(false);

    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'name' },
        {
            title: 'Correo Electronico', field: 'email',
            editComponent: (props) => (
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                  />
            ),
        },
        //{ title: 'Descripcion', field: 'description', initialEditValue: 'initial edit value' },
        //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Tipo',
            field: 'tipo',
            lookup: { 1: 'Empleado', 2: 'Administrador', 3: 'Entrenador' },
        },
        {
            title: 'Estado',
            field: 'estado',
            editComponent: (rowData) => {
                return <FormControlLabel control={
                    <Switch
                        onChange={(e) => rowData.onChange(e.target.checked)}
                        checked={rowData.value} />
                }
                    label={rowData.value ? "Activo" : "Inactivo"}
                />;
            },
            render: (rowData, renderType) => <ChipState rowData={rowData} renderType={renderType} />
        },
    ]);

    const [data, setData] = useState([
        { name: 'Marcos', email: "marcos@email.com", description: 'Cancha de Polvo de Ladrillos', tipo: 1, estado: true },
        { name: 'Claudia', email: "claudia@email.com", description: 'Cancha de Cemento', tipo: 1, estado: true },
        { name: 'Raul', email: "raul@email.com", description: 'Cancha de 5 Sintetica', tipo: 2, estado: false },
        { name: 'Susana', email: "susana@email.com", description: 'Cancha de 9 de pasto natural', tipo: 2, estado: true },
        { name: 'Vanina', email: "vaninca@email.com", description: 'Cancha de Cemento', tipo: 3, estado: false },
    ]);

    const desplegarModal = () => {
        setOpen(true)
    }

    const handleChange = () => {
        setActivo(true);
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
                        tooltip: 'Show Name',
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#43A047',
                                    }}
                                >
                                    {rowData.name}
                                </div>
                            )
                        },
                    },
                ]}
                actions={[
                    {
                        tooltip: 'Eliminar todas las canchas seleccionadas',
                        icon: Delete,
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    },
                    {
                        tooltip: 'Editar Horarios',
                        icon: Edit,
                        onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    }
                ]}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve()
                            }, 1000)
                        }),
                }}
            />
            {open && <FormularioHorarioPrecioCancha open={open} setOpen={setOpen} />}

        </>
    )
}

export default ListaEmpleado
