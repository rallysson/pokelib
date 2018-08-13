import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EeveeImg from '../assets/eeve.png';
import Pokemon from './pokemon';
import Pokemons from './pokemons';

const styles = {
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(to right, #f5f7fa   , #c3cfe2)',
    zIndex: '-1',
  },
  infoContainer: {
    zIndex: '3',
    height: '100%',
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
  }
};

const App = () => (
  <Container style={styles.mainContainer}>
    <Container style={styles.infoContainer}>
      <Switch>
        <Route path="/pokemons" component={Pokemons} />
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

