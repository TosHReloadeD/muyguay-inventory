import React from 'react';
import { useStyles } from './tabla.styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Box } from '@material-ui/core';
export const TablaComponent = ({ products, stickyHeaderOn }) => {
  const classes = useStyles();

  return products ? (
    <div>
      <Typography variant='h6'>
        INVENTARIO DE PRODUCTOS
      </Typography>
      <Box mt={3}>
        <TableContainer className={classes.container}>
          <Table stickyHeader={stickyHeaderOn}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Producto</TableCell>
                <TableCell align='center'>En Stock</TableCell>
                <TableCell align='center'>Precio de Venta Normal</TableCell>
                <TableCell align='center'>Precio de Venta en Oferta</TableCell>
                <TableCell align='center'>Precio de Compra</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell align='center'>{product.name}</TableCell>
                  <TableCell align='center'>{product.stock}</TableCell>

                  <TableCell align='center'>
                    {product.normalSellingPrice}
                  </TableCell>
                  <TableCell align='center'>
                    {product.offerSellingPrice}
                  </TableCell>
                  <TableCell align='center'>{product.buyingPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  ) : null;
};
