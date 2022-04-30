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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useHistory } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import moment from 'moment';
import PhotoService from '../../services/photos/PhotoService';
import MuiAlert from '@mui/material/Alert';

/*const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "1rem",
      height: "fit-content",
    },
  })
);*/

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
];

const InputImage = styled('input')({
    display: 'none',
});



const ListaCanchas = ({ institutionId }) => {

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

    const history = useHistory();

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [isMultipleEdit, setIsMultipleEdit] = useState(false);

    const [enableButtons, setEnableButtons] = useState(true);

    const [data, setData] = useState([]);

    const [photoData, setPhotoData] = useState([]);

    const [images, setImages] = useState({
        selectedFiles: undefined,
        previewImages: [],
        progressInfos: [],
        message: [],

        imageInfos: [],
    });

    const [horariosYPrecios, setHorariosYPrecios] = useState({
        excluirDiasNoLaborales: true
    });

    const [sport, setSport] = useState({});

    const [switchState, setSwitchState] = useState(false);

    const handleSwitchChange = (oldRow, e) => {
        const changeData = { [e.target.name]: e.target.checked };
        const newRow = { ...oldRow, ...changeData };

        console.log('habilitando canchsa')
        console.log(changeData)
        console.log(oldRow)
        console.log(newRow)
    };

    const ariaLabel = { 'aria-label': 'description' };

    const columns = [
        { title: 'Nombre Cancha', field: 'name', validate: rowData => rowData.name === undefined || rowData.name === '' ? { isValid: false, helperText: 'El nombre de la cancha no puede estar vacio' } : true, },
        { title: 'Descripcion', field: 'description' },
        //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Deporte',
            field: 'sport',
            validate: rowData => rowData.sport === undefined ? { isValid: false, helperText: 'Debe seleccionar un deporte para la cancha' } : true,
            lookup: sport,
            render: rowData => rowData.sport.name,
        },
        {
            title: 'Seña',
            field: 'signPercentage',
            type: 'numeric',
            // validate: rowData => rowData.signPercentage === undefined || (rowData.sensignPercentageia >= 0 && rowData.signPercentage <= 100),
            render: rowData => rowData.signPercentage === undefined || rowData.signPercentage === 0 ? 'no requiere seña' : '% ' + rowData.signPercentage,
            editComponent: (props) => (
                <TextField
                    id="standard-start-adornment"
                    type="number"
                    size="small"
                    value={props.value}
                    helperText={props.value < 0 || props.value > 100 ? 'La Seña debe ser entre 0 y 100' : ''}
                    onChange={e => props.onChange(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    variant="standard"
                />
            )
        },
        {
            title: 'Estado',
            field: 'enabled',
            render: rowData => rowData.enabled ? 'Habilidata' : 'Deshabilitada',
            editComponent: (props) => (<FormControlLabel control={<Switch onChange={e => props.onChange(e.target.checked)} checked={props.value} />} label={props.value ? 'Habilitada' : 'Deshabilitada'} />),
        },
        {
            field: 'schedule',
            filtering: false,
            editComponent: props => (
                <Button
                    color="info"
                    variant="contained"
                    onClick={desplegarModal}>
                    Agregar Horarios y Precios
                </Button >)

        },
        {
            field: 'images',
            filtering: false,
            editComponent: props => (
                <label htmlFor="icon-button-file">
                    <InputImage
                        accept="image/*"
                        multiple
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

    useEffect(() => {

        retrieveCourts("61a6d2b35df5ed18eec54355");
        retrieveSportsList();


    }, []);

    const handleUploadImage = (event) => {

        let images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }

        setImages({
            progressInfos: [],
            message: [],
            selectedFiles: event.target.files,
            previewImages: images
        });


        /*    let file = event.target.files[0];
            let imageData = new FormData();
            imageData.append('imageFile', event.target.files[0])
        
            console.log('guardando imagen');
            console.log(imageData.values);
            console.log(file);
            console.log(URL.createObjectURL(file));
            setImages(file)*/

    }

    const retrieveCourts = async (institutionId) => {

        try {
            const listadoCanchas = await CanchaService.getAll(institutionId);

            console.log('listadoCanchas');
            console.log(listadoCanchas);

            const data = listadoCanchas.data;

            if (data) {

                data.forEach(court => {

                    console.log('obteniendo imagenes')
                    console.log(court)

                    if (court.images_id !== null) {
                        let photos = [];

                        court.images_id.forEach(image_id => {

                            photos.push({
                                img: 'http://localhost:8080/api/photos/' + image_id,
                                title: 'Breakfast',
                                author: '@bkristastucchio',
                                featured: true,
                            })

                        })


                        console.log('array de photos')
                        console.log(photos)

                        court.photos = photos;


                    } else {

                    }

                });

                console.log('final data')
                console.log(data)

                setData(data);
            }
        } catch (err) {
            history.push("/login");
        }


    };

    const retrieveSportsList = async () => {

        try {
            const listadoDeportes = await DeporteService.getAll();

            console.log('listadoDeportes');
            console.log(listadoDeportes);

            const data = listadoDeportes.data;

            if (data) {

                const sport = {};
                data.map(s => sport[s.id] = s.name);

                console.log(sport);

                setSport(sport)
            }
        } catch (err) {
            history.push("/login");
        }


    };


    const desplegarModal = (props) => {
        setIsMultipleEdit(false)
        setOpen(true)

    }

    const desplegarModalForMultipleEdit = (props) => {

        setIsMultipleEdit(true)
        setOpen(true)

    }

    const createCancha = async (newCancha) => {

        console.log('newCancha')

        //const cancha = { ...newCancha, ['horarios']: horariosYPrecios, ['images']: images }
        //let cancha = { ...newCancha, ['schedule']: horariosYPrecios }

        const horarios = horariosYPrecios.schedules.map(s => s ? { ...s, ['from']: moment(s.from).format('HH:mm'), ['to']: moment(s.to).format('HH:mm') } : s)
        horariosYPrecios.schedules = horarios;

        const cancha = { ...newCancha, ['schedule']: horariosYPrecios }

        console.log(cancha)

        const canchaCreated = await CanchaService.create("61a6d2b35df5ed18eec54355", cancha);
        const data = canchaCreated.data;


        for (let i = 0; i < images.selectedFiles.length; i++) {
            const photoAdded = await PhotoService.upload(data.id, images.selectedFiles[i]);

            console.log('photoAdded');
            console.log(photoAdded);

            setPhotoData((photos) => [...photos, {
                img: photoAdded.data,
                title: 'Breakfast',
                author: '@bkristastucchio',
                featured: true,
            }])

        }

        console.log('cancha creada')
        console.log(canchaCreated)
        console.log(data)
        return data;
    }

    const updateCancha = async (canchaToUpdated) => {

        console.log('canchaToUpdated')

        //const cancha = { ...newCancha, ['horarios']: horariosYPrecios, ['images']: images }
        const cancha = { ...canchaToUpdated, ['schedule']: horariosYPrecios }

        console.log(cancha)

        const canchaUpdated = await CanchaService.update("61a6d2b35df5ed18eec54355", cancha);
        const data = canchaUpdated.data;

        console.log('cancha actualizada')
        console.log(canchaUpdated)
        console.log(data)
        return data;
    }

    const deleteCancha = async (id) => {

        const canchaCreated = await CanchaService.remove("61a6d2b35df5ed18eec54355", id);
        const data = canchaCreated.data;
        return data;
    }

    return (
        <>
            <MaterialTable
                icons={tableIcons}
                title="Listado de Canchas"
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'canchas',
                        nextTooltip: 'Proxima Pagina',
                        previousTooltip: 'Pagina Previa',
                        firstTooltip: 'Primer Pagina',
                        lastTooltip: 'Ultima Pagina'
                    },
                    toolbar: {
                        nRowsSelected: '{0} cancha(s) seleccionada(s)',
                        searchTooltip: 'Buscar',
                        searchPlaceholder: 'Buscar Cancha'
                    },
                    header: {
                        actions: 'Opciones'
                    },
                    body: {
                        addTooltip: 'Agregar Nueva Cancha',
                        editTooltip: 'Editar Cancha',
                        deleteTooltip: 'Eliminar Cancha',
                        emptyDataSourceMessage: 'Aun no existen canchas asociadas a la institucion',
                        filterRow: {
                            filterTooltip: 'Filter'
                        },
                        editRow: {
                            saveTooltip: 'Guardar Cancha',
                            cancelTooltip: 'Cancelar'
                        }
                    },
                    grouping: {
                        placeholder: 'Arrastre los encabezados aquí para agruparlos'
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
                        tooltip: 'Mostrar Imagenes',
                        render: rowData => {
                            return (
                                rowData.photos.length > 0 ? (
                                    <ImageList sx={{ width: 500, height: 500 }} style={{ display: 'flex', flexDirection: 'row', padding: 0 }} rowHeight={164}>
                                        {rowData.photos.map((item) => (
                                            <ImageListItem key={item.img} >
                                                <img
                                                    //{...srcset(item.img, 250, 250, 0, 0)}
                                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
                                            </ImageListItem>))}
                                    </ImageList>
                                ) : (
                                    <Grid container justifyContent="center">
                                        <Alert severity="warning">no hay imagenes cargadas para esta cancha</Alert>
                                    </Grid>
                                )
                            )
                        },
                    },
                ]}
                actions={[
                    {
                        tooltip: 'Eliminar todas las canchas seleccionadas',
                        icon: Delete,
                        onClick: (evt, data) => alert('Quieres eliminar ' + data.length + ' Canchas')
                    },
                    {
                        tooltip: 'Editar Horarios',
                        icon: Edit,
                        onClick: (evt, data) => desplegarModalForMultipleEdit()
                    }
                ]}
                editable={{
                    onRowAdd: newData =>

                        new Promise(async (resolve, reject) => {

                            const cancha = await createCancha(newData);

                            console.log('agregar cancha a la lista')
                            console.log(cancha)

                            setData([...data, cancha]);

                            resolve();
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(async (resolve, reject) => {

                            const cancha = await updateCancha(newData);

                            console.log('actualizar cancha')
                            console.log(cancha)

                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = cancha;
                            setData([...dataUpdate]);

                            resolve();
                        }),
                    onRowDelete: oldData =>
                        new Promise(async (resolve, reject) => {

                            console.log('eliminando cancha')
                            console.log(oldData)

                            const cancha = await deleteCancha(oldData.id);

                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }),
                }}
            />
            {open && <FormularioHorarioPrecioCancha open={open} setOpen={setOpen} horariosYPrecios={horariosYPrecios} setHorariosYPrecios={setHorariosYPrecios} isMultipleEdit={isMultipleEdit} />}

        </>
    )
}

export default ListaCanchas
