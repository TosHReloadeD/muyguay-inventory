import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export const SearchComponent = ({ handleChange }) => {
  const classes = useStyles();

  return (
    <form>
      <TextField
        id='search-text'
        label='Buscar Producto'
        onChange={handleChange}
        variant='outlined'
        InputLabelProps={{}}
        style={{ width: 140 }}
      />
    </form>
  );
};
