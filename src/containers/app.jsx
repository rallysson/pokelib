import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EeveeImg from '../assets/eeve.png';
import Pokemon from './pokemon';

const styles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(to right, #f5f7fa   , #c3cfe2)',
    zIndex: '-1',
  },
  infoContainer: {
    zIndex: '3'
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
        <Route path="/pokemons" component={Pokemon} />
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

