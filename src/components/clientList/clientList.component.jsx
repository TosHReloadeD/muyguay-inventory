import React from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export const ClientListComponent = ({ clients }) => {
  console.log("test clients");
  return (
    <div>
      <Typography variant="h6">LISTA DE CLIENTES</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Celular</TableCell>
                <TableCell align="center">Dirección</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{client.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
