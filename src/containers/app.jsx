import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as actions from '../store/actions';
import Footer from '../components/footer';
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
  },
  infoContainer: {

  }
};

const App = () => (
  <Container style={styles.mainContainer}>
    <Container style={styles.infoContainer}>
      <Switch>
        <Route path="/asas" render={() => (<h2>2188321809213089213098908</h2>)} />
        <Route path="/pokemons" component={Pokemon} />
        <Redirect exact from="/" to="/pokemons" />
      </Switch>
    </Container>
    <Footer />
    <ToastContainer />
  </Container>
);

const mapStateToProps = (state) => ({
  name: state,
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(actions.read('pokemon/mewtasasaaswo', dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

