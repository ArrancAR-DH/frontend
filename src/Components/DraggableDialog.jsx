import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import moment from 'moment';
import { routes } from '../utils/routes';
import { useContextGlobal } from '../Context/GlobalContext';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { carReserved, errorBooking } from '../utils/modals';
import { Typography } from '@mui/material';



function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({car, end, start, modal, setModal}) => {
const formattedStartDate = start ? moment(start).format('DD-MM-YYYY') : '';
const formattedEndDate = end ? moment(end).format('DD-MM-YYYY') : ''; 
const desde = start ? moment(start).format('YYYY-MM-DD') : '';
const hasta = end ? moment(end).format('YYYY-MM-DD') : ''; 
const {getToken, state } = useContextGlobal();
const {idUser} = state; 
const token = getToken(); 


  const handleClose = () => {
    setModal(false);
  };


const handleConfirm = () => {
    axios.post( `${routes.booking}`, {
        "startsOn": desde,
        "endsOn": hasta,
        "idVehicle": car.idVehicle,
        "idUser": idUser
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + token,
        },
    })
    .then((response) => {
        console.log('Response:', response);
        carReserved();

    })
    .catch((error) => {
        if (error.response) {
            console.log('Error response:', error.response);
        } else if (error.request) {
            console.log('Error request:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        errorBooking(error.response.data)
    });
    handleClose();
};

  return (
    <>
      <Dialog
        open={modal}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Reserva
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant='h6'>
                Usted esta a punto de reservar un auto {car.brand?.name} {car.model?.name}.
            </Typography>
            <Typography variant='h6'>
                Las fechas seleccionadas son: {formattedStartDate} - {formattedEndDate}
                
            </Typography>
            <Typography variant='h6'>
                El precio a pagar por esta reserva es: ${car?.price}
            </Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default DraggableDialog;