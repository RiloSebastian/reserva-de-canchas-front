import React from 'react';
import CardCancha from './items/CardCancha';
import Stack from '@mui/material/Stack';

const CardCanchaLista = () => {

    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <CardCancha />
                <CardCancha />
                <CardCancha />
            </Stack>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <CardCancha />
                <CardCancha />
                <CardCancha />
            </Stack>
        </>
    )
}

export default CardCanchaLista
