import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./navBar.styles";
import { SideBarComponent } from "../sideBar/sideBar.component";

export const NavBarComponent = ({ handleChange, openDrawer }) => {
  const classes = useStyles();
  const [openDrawr, setOpenDrawr] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawr(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawr(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: "#8200D7" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={openDrawer}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            align="left"
            noWrap
          >
            MUY GUAY
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      {/* <SideBarComponent open={openDrawr} onClose={handleDrawerClose}/> */}
    </div>
  );
};
