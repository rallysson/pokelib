import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash/fp';
import PokeDescription from './pokeDescription';

const styles = {
  imageContainer: {
    border: '1px solid teal',
    background: 'rgba(255, 255, 255, 0.99)',
  },
  showPokeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '70%',
  },
};


const ShowPoke = ({ pokemon }) => !isEmpty(pokemon) && (
  <Container style={styles.showPokeContainer} >
    <Image size="small" src={pokemon.sprites.front_default} />
    <PokeDescription pokemon={pokemon} />
  </Container>
);

export default ShowPoke;

