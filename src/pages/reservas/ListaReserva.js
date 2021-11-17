import React, { useState, forwardRef } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ListaReserva = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 8">
                        <Item>xs=8</Item>
                    </Box>
                    <Box gridColumn="span 4">
                        <Item>xs=4</Item>
                    </Box>
                    <Box gridColumn="span 4">
                        <Item>xs=4</Item>
                    </Box>
                    <Box gridColumn="span 8">
                        <Item>xs=8</Item>
                    </Box>
                    <Box gridColumn="span 12" display="flex" justifyContent="center" alignItems="center">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                            <Tab label="Item Four" />
                            <Tab label="Item Five" />
                            <Tab label="Item Six" />
                            <Tab label="Item Seven" />
                        </Tabs>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ListaReserva
