import React, { useEffect, useState, forwardRef } from 'react'
import MaterialTable from 'material-table';
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
import Button from '@mui/material/Button';
import FormularioHorarioPrecioCancha from '../../components/formularios-datos/FormularioHorarioPrecioCancha';
import UploadImage from '../../components/UploadImage';
import CanchaService from '../../services/canchas/CanchaService';
import DeporteService from '../../services/deportes/DeporteService';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';

/*const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "1rem",
      height: "fit-content",
    },
  })
);*/

function srcset(image, width, height) {
    return {
        src: `${image}?w=${width}&h=${height}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width}&h=${height}&fit=crop&auto=format&dpr=2 2x`,
    };
}

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap'
    }
}));

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];

const Input = styled('input')({
    display: 'none',
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

const ListaCanchas = ({ institutionId }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);

    const [images, setImages] = useState([]);

    const [horariosYPrecios, setHorariosYPrecios] = useState({});

    const [sport, setSport] = useState({});

    const columns = [
        { title: 'Nombre Cancha', field: 'name' },
        { title: 'Descripcion', field: 'description' },
        //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Deporte',
            field: 'sport',
            lookup: sport
        },
        {
            field: 'horarios',
            filtering: false,
            editComponent: (props) => (
                <Button
                    color="info"
                    variant="contained"
                    onClick={desplegarModal}>
                    Agregar Horarios y Precios
                </Button>
            )
        },
        {
            field: 'imagenes',
            filtering: false,
            editComponent: props => (
                <label htmlFor="icon-button-file">
                    <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        //value={props.value}
                        onChange={/*e => props.onChange(e.target.value)*/handleUploadImage}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            )
        },
    ];

    /*const [data, setData] = useState([
        { name: 'Cancha 1', description: 'Cancha de Polvo de Ladrillos', sport: 1 },
        { name: 'Cancha 2', description: 'Cancha de Cemento', sport: 1 },
        { name: 'Futbol 1', description: 'Cancha de 5 Sintetica', sport: 2 },
        { name: 'Futbol 2', description: 'Cancha de 9 de pasto natural', sport: 2 },
        { name: 'Cancha 2', description: 'Cancha de Cemento', sport: 3 },
    ]);*/



    useEffect(() => {

        retrieveCourts("61a6d2b35df5ed18eec54355");
        retrieveSportsList();

    }, []);

    useEffect(() => {
        console.log('trayendo deportes');
        //retrieveSportsList();
        const listadoDeportes = DeporteService.getAll();

        const data = listadoDeportes.data;

        if (data) {
            console.log('before set sports');
            console.log(data);

            const sport = {};
            data.map(s => sport[0] = s.name);

            console.log('converted');
            console.log(sport);

            // setSport({ 0: 'hockeuy' })


        }

    }, []);

    const handleUploadImage = (event) => {

        let file = event.target.files[0];
        let imageData = new FormData();
        imageData.append('imageFile', event.target.files[0])

        console.log('guardando imagen');
        console.log(imageData.values);
        console.log(file);
        console.log(URL.createObjectURL(file));

    }

    const retrieveCourts = async (institutionId) => {
        const listadoCanchas = await CanchaService.getAll(institutionId);

        const data = listadoCanchas.data;

        console.log('courts')
        console.log(data)

        if (data) {
            setData(data);
        }

    };

    const retrieveSportsList = async () => {
        const listadoDeportes = await DeporteService.getAll();

        const data = listadoDeportes.data;

        if (data) {
            console.log('before set sports');
            console.log(data);

            const sport = {};
            data.map(s => sport[s.sport_id] = s.name);

            console.log('converted');
            console.log(sport);

            setSport(sport)
        }

    };


    const desplegarModal = (props) => {

        // horarios

        setOpen(true)
    }

    const createCancha = async (newCancha) => {

        console.log('newCancha')
        console.log(newCancha)

        // const cancha = await CanchaService.create("61a6d2b35df5ed18eec54355", newCancha);
        //const data = cancha.data;
        return newCancha;
    }

    return (
        <>
            <MaterialTable
                icons={tableIcons}
                title="Listado de Canchas"
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} cancha(s) seleccionada(s)'
                    },
                    header: {
                        actions: 'Opciones'
                    },
                    body: {
                        emptyDataSourceMessage: 'Aun no existen canchas asociadas a la institucion',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
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
                        tooltip: 'Show Name',
                        render: rowData => {
                            return (
                                <ImageList style={{ display: 'flex', flexDirection: 'row', padding: 0 }} rowHeight={164}>
                                    {itemData.map((item) => (
                                        <ImageListItem key={item.img} >
                                            <img
                                                {...srcset(item.img, 250, 250, 0, 0)}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                sx={{
                                                    background:
                                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                }}
                                                title={item.title}
                                                position="top"
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        aria-label={`star ${item.title}`}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                                actionPosition="left"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
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

                        new Promise(async (resolve, reject) => {

                            const cancha = await createCancha(newData);

                            console.log('agregar cancha a la lista')
                            console.log(cancha)

                            setData([...data, newData]);

                            resolve();
                        })

                        /*new Promise((resolve, reject) => {

                            const cancha = createCancha(newData);
                            
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                        })*/,
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
            {open && <FormularioHorarioPrecioCancha open={open} setOpen={setOpen} setHorariosYPrecios={setHorariosYPrecios} />}

        </>
    )
}

export default ListaCanchas
