import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Input = styled('input')({
    display: 'none',
});

const UploadImage = (props) => {

    const [selectedValue, setSelectedValue] = useState({});

    const handleUploadClick = (event) => {

        console.log('manejador de imagenes');
        console.log(props);

       // let file = event.target.files[0];
     //   const imageData = new FormData();
      //  imageData.append('imageFile', file);

        //setSelectedValue(imageData)
        //onChange(selectedValue)

        //setImages(imageData);
        //setImagePreview(URL.createObjectURL(file));

        console.log('despues de cargar imagen');
        //onChange(file)
        console.log(props);


    }

    return (
        <label htmlFor="icon-button-file">
            <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                //value={selectedValue}
                //onChange={handleUploadClick}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    )
}

export default UploadImage
