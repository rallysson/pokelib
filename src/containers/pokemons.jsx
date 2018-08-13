import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Card, Image, Loader, Pagination, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash/fp';
import { read } from '../store/actions';
import Pokelib from '../assets/pokelib.png';
import { findPoke } from '../store/selectors';


const styles = {
  pokesContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: 150,
    maxHeight: 200,
    margin: 5,
    cursor: 'pointer',
  },
  gridPokesContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }
};

class Pokemons extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    allPokes: PropTypes.object,
  };

  static defaultProps = {
    allPokes: {},
  };


  componentDidMount() {
    this.getAllPokes();
  }

  getAllPokes = () => this.props.dispatch(read({ slug: 'pokemon/', name: 'all' }))
  getPokeIdFromUrl = (url) => url.split('/').splice(-2, 1);
  getPokeImageUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  generateId = () => Math.floor(Math.random() * 10000000);

  render() {
    const { allPokes } = this.props;

    return (
      <Container style={styles.gridPokesContainer}>
        <Image size="medium" src={Pokelib} />
        <Input
          style={{ width: '50%', margin: 10 }}
          onChange={this.handlePoke}
          action={{ icon: 'search', color: 'teal', onClick: () => { console.log('asssa'); } }}
          placeholder="Procurar"
        />
        <Container style={styles.pokesContainer}>
          {!isEmpty(allPokes) ? map((poke) => {
            const id = this.getPokeIdFromUrl(poke.url);
            return (
              <Card style={styles.card} key={this.generateId()}>
                <Image size="small" src={this.getPokeImageUrl(id)} />
                <Card.Content>
                  <Card.Header>{poke.name}</Card.Header>
                </Card.Content>
              </Card>
            );
          }, allPokes.results) : <Loader active />}
        </Container>
        <Pagination defaultActivePage={5} totalPages={10} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  allPokes: findPoke(state.get('cache'), 'all')
});
export default connect(mapStateToProps)(Pokemons);
