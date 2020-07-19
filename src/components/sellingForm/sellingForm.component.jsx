import "date-fns";
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useStyles } from "./sellingForm.styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FindAddUserComponent } from "../findAddUser/findAddUser.component";
import { Box, Typography } from "@material-ui/core";
import { firebase } from "../../firebase";

export const SellingFormComponent = ({ products, clients }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProductStock, setSelectedProductStock] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectedProduct = (event, value) => {
    if (value) {
      setSelectedProductPrice(value.normalSellingPrice);
      setSelectedProductStock(value.stock);
      console.log("test", value.stock);
    }
  };

  const handleProductPrice = (e) => {
    setSelectedProductPrice(Math.round(e.target.value));
  };

  const handleNewClient = (c) => {
    firebase
      .firestore()
      .collection("clients")
      .doc()
      .set({
        address: c.address,
        name: c.name,
        phoneNumber: c.phoneNumber,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const classes = useStyles();

  console.log(clients);
  if (clients && products) {
    return (
      <div>
        <Typography variant="h6">REGISTRAR VENTA</Typography>
        <Box mt={3}>
          <Grid container justify="center" spacing={2}>
            <Grid container justify="center" item xs={12}>
              <FindAddUserComponent
                clients={clients}
                newClient={handleNewClient}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha de la Venta"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid container item xs={12} justify="center">
              <Autocomplete
                id="combo-box-products"
                options={products}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={handleSelectedProduct}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona Producto"
                    variant="outlined"
                    onChange={(e) => handleSelectedProduct(e.target.value)}
                  />
                )}
              />
              <TextField
                disabled
                label="Stock"
                variant="outlined"
                value={selectedProductStock ? selectedProductStock : "-"}
                style={{ width: 100 }}
                inputProps={{ style: { textAlign: "center" } }}
              ></TextField>
            </Grid>
            <Grid container item xs={12} justify="center">
              <TextField
                id="search-price"
                label="Precio"
                value={selectedProductPrice.toFixed(2)}
                text-align="center"
                onChange={handleProductPrice}
                variant="outlined"
                style={{ width: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">S/.</InputAdornment>
                  ),
                }}
              />
              <TextField
                id="quantity"
                label="Cantidad"
                value={1}
                variant="outlined"
                inputProps={{ style: { textAlign: "center" } }}
                style={{ width: 100 }}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else {
    console.log("error clients or products not found");
    return null;
  }
};
