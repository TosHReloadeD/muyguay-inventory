import 'date-fns';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useStyles } from './sellingForm.styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FindAddUserComponent } from '../findAddUser/findAddUser.component';
import { Box, Typography } from '@material-ui/core';
import { firebase } from '../../firebase';

export const SellingFormComponent = ({ products }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [clients, setClients] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('clients')
      .onSnapshot((serverUpdate) => {
        const clients = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        setClients(clients);
      });

    //var clientsdb = firebase.collection('clients')
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectedProduct = (event, value) => {
    if (value) {
      setSelectedProductPrice(value.normalSellingPrice);
    }
  };

  const handleProductPrice = (e) => {
    setSelectedProductPrice(Math.round(e.target.value));
  };

  const handleNewClient = (c) => {
    firebase
      .firestore()
      .collection('clients')
      .doc()
      .set({
        address: c.address,
        name: c.name,
        phoneNumber: c.phoneNumber,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  const classes = useStyles();

  console.log(clients);
  console.log('hmmm', products);
  if (clients && products) {
    console.log('wtf is this' , clients)
    return (
      <div>
        <Typography variant='h6'>REGISTRAR VENTA</Typography>
        <Box mt={3}>
          <Grid container justify='center' spacing={2}>
            <Grid container justify='center' item xs={12}>
              <FindAddUserComponent
                clients={clients}
                newClient={handleNewClient}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Fecha de la Venta'
                  format='dd/MM/yyyy'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid container item xs={12} justify='center'>
              <Autocomplete
                id='combo-box-demo'
                options={products}
                getOptionLabel={(option) => option.name}
                style={{ width: 200 }}
                onChange={handleSelectedProduct}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Selecciona Producto'
                    variant='outlined'
                    onChange={(e) => handleSelectedProduct(e.target.value)}
                  />
                )}
              />

              <TextField
                id='search-text'
                label='Precio'
                value={selectedProductPrice.toFixed(2)}
                text-align='center'
                onChange={handleProductPrice}
                variant='outlined'
                style={{ width: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>S/.</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else {
    return null;
  }
};
