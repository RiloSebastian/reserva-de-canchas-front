import { Alert } from '@mui/material'
import React from 'react'

const AlertInformation = ({returnableDeposit}) => {
    return (
        <Alert variant="filled" severity={returnableDeposit ? "success" : "warning"}>
            {returnableDeposit ?
                "El monto de la Seña será reintegrado." :
                "La Seña no se reintegrará si procede a cancelar la Reserva."
            }
        </Alert>
    )
}

export default AlertInformation