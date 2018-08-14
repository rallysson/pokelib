import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EeveeImg from '../assets/eeve.png';
import pokelibName from '../assets/pokelib.png';
import Pokemon from './pokemon';
import Pokemons from './pokemons';

const styles = {
  mainContainer: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(to right, #f5f7fa   , #c3cfe2)',
    zIndex: '-1',
  },
  infoContainer: {
    zIndex: '3',
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    display: 'flex',
    position: 'fixed',
    bottom: 10,
    right: 0,
    zIndex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pokelibName: {
    margin: 10,
  }
};

const App = () => (
  <Container style={styles.mainContainer}>
    <Link to="/pokemons">
      <Image style={styles.pokelibName} src={pokelibName} />
    </Link>
    <Container style={styles.infoContainer}>
      <Switch>
        <Route path="/pokemons" component={Pokemons} />
        <Route path="/Pokemon/:id" component={Pokemon} />
        <Redirect exact from="/" to="/pokemons" />
      </Switch>
    </Container>
    <ToastContainer />
    <Container style={styles.footer}>
      <Image size="huge" src={EeveeImg} />
    </Container>
  </Container>
);

export default App;

