import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import TableChartIcon from "@material-ui/icons/TableChart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export const SideBarComponent = ({ open, closeDrawer }) => {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={open}
          onClose={closeDrawer}
          // onClose={toggleDrawer(anchor, false)}
          // onOpen={toggleDrawer(anchor, true)}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={closeDrawer}
          >
            <List>
              <ListItem button key="inventario" component={Link} to="/">
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary="Inventario"></ListItemText>
              </ListItem>
              <ListItem
                button
                key="venta"
                component={Link}
                to="/registrar-venta"
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Agregar Venta"></ListItemText>
              </ListItem>
              <ListItem
                button
                key="clientes"
                component={Link}
                to="/lista-clientes"
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Clientes"></ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
