import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';
import ShowMore from 'react-show-more';

const styles = {
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'silver 0px 0px 4px',
    borderRadius: 3,
    marginBottom: 10,
  },
  header: {
    borderTop: '1px solid teal',
    borderBottom: '1px solid teal',
    padding: 10,
    textTransform: 'capitalize',
  },
  description: {
    padding: 10,
    backgroundColor: 'white',
  },
  movesContainer: {
    textAlign: 'justify',
  },
  span: {
    color: 'silver',
  },
};

const generateId = () => Math.floor(Math.random() * 100000);


const PokeDescription = ({ pokemon }) => (
  <Container style={styles.descriptionContainer}>
    <Container style={styles.header}>
      <h3>{pokemon.name}</h3>
    </Container>
    <Container style={styles.description}>
      <Container>
        <i style={styles.span} >Abilities: </i>
        {map((el) => el.ability.name.replace('-', ' '), pokemon.abilities).join(', ')}
      </Container>
      <Container style={styles.movesContainer}>
        <ShowMore
          lines={3}
          more="Show more"
          less="Show less"
        >
          <i style={styles.span}>Moves: </i>
          {(map((el) => el.move.name.replace('-', ' '), pokemon.moves)).join(', ')}
        </ShowMore>
      </Container>
      <Container>
        <i style={styles.span}>weight: </i> {pokemon.weight / 10} kg
      </Container>
      <Container>
        {map((el) => <Label key={generateId()} color="teal" horizontal>{el.type.name}</Label>, pokemon.types)}
      </Container>
    </Container>
  </Container>
);

PokeDescription.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokeDescription;
