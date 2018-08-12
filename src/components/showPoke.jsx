import React from 'react';
import { Container, Image, Label } from 'semantic-ui-react';
import { isEmpty, map } from 'lodash/fp';
import ShowMore from 'react-show-more';

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

const generateId = () => Math.floor(Math.random() * 10000000);

const ShowPoke = ({ pokemon }) => !isEmpty(pokemon) && (
  <Container style={styles.showPokeContainer} >
    <Image size="small" src={pokemon.sprites.front_default} />
    <Container>
      <h2>{pokemon.name}</h2>
    </Container>
    <Container>
      <i>Abilities: </i>
      {map((el) => <span key={generateId()}>{`${el.ability.name.replace('-', ' ')}, `}</span>, pokemon.abilities)}
    </Container>
    <Container style={styles.movesContainer}>
      <ShowMore
        lines={3}
        more="Show more"
        less="Show less"
      >
        <i>Moves: </i>
        {map((el) => <span key={generateId()}>{`${el.move.name.replace('-', ' ')}, `}</span>, pokemon.moves)}
      </ShowMore>
      <Container>
        <i>weight: {pokemon.weight / 10} kg</i>
      </Container>
      <Container>
        {map((el) => <Label key={generateId()} color="red" horizontal>{el.type.name}</Label>, pokemon.types)}
      </Container>
    </Container>
  </Container>
);

export default ShowPoke;

