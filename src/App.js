import React, { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "./firebase";
import { TablaComponent } from "./components/tabla/tabla.component";
import { SearchComponent } from "./components/search/search.component";
import { SellingFormComponent } from "./components/sellingForm/sellingForm.component";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { NavBarComponent } from "./components/navBar/navBar.component";
import Container from "@material-ui/core/Container";
import { SideBarComponent } from "./components/sideBar/sideBar.component";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ClientListComponent } from "./components/clientList/clientList.component";

const App = () => {
  const [products, setProducts] = useState(null);
  const [searchText, setSearchText] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [showSellsForm, setShowSellsForm] = useState(false);
  const [clients, setClients] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchProduts = async () => {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot((serverUpdate) => {
        const products = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setProducts(products);
        setFilteredProducts(products);
      });
  };

  const fetchClients = async () => {
    firebase
      .firestore()
      .collection("clients")
      .onSnapshot((serverUpdate) => {
        const clients = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setClients(clients);
      });

    //var clientsdb = firebase.collection('clients')
  };

  useEffect(() => {
    fetchProduts();
    fetchClients();
  }, []);

  useEffect(() => {
    searchText
      ? setFilteredProducts(
          products.filter((p) =>
            p.name.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setFilteredProducts(products);
    console.log(searchText);
  }, [searchText, products]);

  const handleDrawerClose = () => setOpenDrawer(false);
  const handleDrawerOpen = () => setOpenDrawer(true);

  return (
    <Router>
      <div className="App">
        <NavBarComponent
          handleChange={(e) => setSearchText(e.target.value)}
          openDrawer={handleDrawerOpen}
        />
        <SideBarComponent open={openDrawer} closeDrawer={handleDrawerClose} />
        <Container>
          <Grid container justify="center">
            {/* <Grid item xs={12}> asdfsadf</Grid> */}

            <Grid item xs={12} container justify="center" spacing={2}>
              <Box mt={9}>
                <Switch>
                  <Route path="/registrar-venta">
                    <SellingFormComponent
                      products={products}
                      clients={clients}
                    />
                  </Route>
                  <Route path="/lista-clientes">
                    <ClientListComponent clients={clients} />
                  </Route>
                  <Route path="/">
                    <TablaComponent
                      products={filteredProducts}
                      stickyHeaderOn={!showSellsForm}
                    />
                  </Route>
                </Switch>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Router>
  );
};

export default App;
