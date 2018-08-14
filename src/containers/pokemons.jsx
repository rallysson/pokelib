import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Card, Image, Loader, Pagination, Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash/fp';
import { Link } from 'react-router-dom';
import { read } from '../store/actions';
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
    getPokesBypage: PropTypes.func,
  };

  state = {
    page: 1,
    poke: '',
  };
  componentDidMount() {
    this.getAllPokes(this.state.page);
  }

  getAllPokes = (page) => {
    const { dispatch } = this.props;
    const offset = (page - 1) * 20;
    dispatch(read({ slug: `pokemon/?limit=20&offset=${offset}`, name: `pokesPage${page}` }));
    this.setState({ page });
  }

  getPokeIdFromUrl = (url) => url.split('/').splice(-2, 1);
  getPokeImageUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  handlePoke = (e) => this.setState({ poke: e.target.value });
  generateId = () => Math.floor(Math.random() * 10000000);

  render() {
    const { getPokesBypage } = this.props;
    const { page, poke } = this.state;
    const pokes = getPokesBypage(page);

    return (
      <Container style={styles.gridPokesContainer}>
        <Input
          style={{ width: '50%', margin: 10 }}
          onChange={this.handlePoke}
          action={
            <Link to={`/pokemon/${poke}`}>
              <Button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} icon="search" color="teal" />
            </Link>
          }
          placeholder="Procurar"
        />
        <Container style={styles.pokesContainer}>
          {!isEmpty(pokes) ? map((el) => {
            const id = this.getPokeIdFromUrl(el.url);
            return (
              <Link to={`/pokemon/${id}`}>
                <Card style={styles.card} key={this.generateId()}>
                  <Image size="small" src={this.getPokeImageUrl(id)} />
                  <Card.Content>
                    <Card.Header>{el.name.replace(/-/g, ' ')}</Card.Header>
                  </Card.Content>
                </Card>
              </Link>
            );
          }, pokes.results) : <Loader active />}
        </Container>
        <Pagination
          onPageChange={(e, data) => this.getAllPokes(data.activePage)}
          defaultActivePage={1}
          totalPages={48}
          style={{ margin: 10 }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  getPokesBypage: (page) => findPoke(state.get('cache'), `pokesPage${page}`)
});
export default connect(mapStateToProps)(Pokemons);
