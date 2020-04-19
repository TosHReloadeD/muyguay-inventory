import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export const FindAddUserComponent = ({ clients, newClient }) => {
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });

  const handleClose = () => {
    setDialogValues({
      name: '',
      phoneNumber: '',
      address: '',
    });

    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValues.name,
      phoneNumber: dialogValues.phoneNumber,
      address: dialogValues.address,
    });
    console.log(dialogValues.name)
    console.log('valores cliente para agregar: ', value);

    newClient = value;

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValues({
                name: newValue,
                phoneNumber: '',
                address: '',
              });
            });
            return;
          }

          if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValues({
              name: newValue.inputValue,
              phoneNumber: '',
              address: '',
            });
            return;
          }

          setValue(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id='clients-dialog'
        options={clients}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(option) => option.name}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label='Selecciona Cliente'
            variant='outlined'
          />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>
            Agregar un nuevo Cliente
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              value={dialogValues.name}
              onChange={(e) =>
                setDialogValues({ ...dialogValues, name: e.target.value })
              }
              label='Nombre'
              type='text'
            />
            <TextField
              margin='dense'
              id='name'
              value={dialogValues.phoneNumber}
              onChange={(e) =>
                setDialogValues({
                  ...dialogValues,
                  phoneNumber: e.target.value,
                })
              }
              label='Número de celular'
              type='number'
            />
            <TextField
              margin='dense'
              id='name'
              value={dialogValues.address}
              onChange={(e) =>
                setDialogValues({ ...dialogValues, address: e.target.value })
              }
              label='Dirección'
              type='text'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancelar
            </Button>
            <Button type='submit' color='primary'>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
