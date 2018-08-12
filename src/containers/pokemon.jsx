import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash/fp';
import { Input, Container, Tab, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { findPoke } from '../store/selectors';
import ShowPoke from '../components/showPoke';
import Status from '../components/status';


class Pokemon extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    getPokemon: PropTypes.func.isRequired,
  };

  state = {
    pokemonToFind: '',
    pokemon: {},
    isLoading: false,
  };

  handlePoke = (e) => {
    this.setState({ pokemonToFind: e.target.value });
  };

  searchPokemon = () => (async () => {
    const { pokemonToFind } = this.state;
    const { getPokemon, search } = this.props;

    if (!isEmpty(getPokemon(pokemonToFind))) {
      return this.setState({ pokemon: this.props.getPokemon(pokemonToFind) });
    }
    this.setState({ isLoading: !this.state.isLoading });
    await search(pokemonToFind);
    return this.setState({
      pokemon: this.props.getPokemon(pokemonToFind),
      isLoading: !this.state.isLoading,
    });
  })();

  render() {
    const { pokemon, isLoading } = this.state;

    const panes = [
      {
        menuItem: 'General',
        render: () => (
          <Container style={{ height: '50%', minHeight: '300px' }} attached={false}>
            {isLoading ? <Loader active>carregando</Loader> : <ShowPoke pokemon={pokemon} />}
          </Container>)
      }, {
        menuItem: 'Status',
        render: () => (
          <Container style={{ height: '50%', minHeight: '300px' }} attached={false}>
            {isLoading ? <Loader active>carregando</Loader> : <Status pokemon={pokemon} />}
          </Container>)
      },
    ];

    return (
      <Container style={{ width: '50%' }}>
        <Input
          style={{ width: '100%' }}
          onChange={this.handlePoke}
          action={{ icon: 'search', color: 'teal', onClick: () => { this.searchPokemon(); } }}
          placeholder="Procurar"
        />
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  getPokemon: (poke) => findPoke(state.get('cache'), poke),
});

const mapDispatchToProps = (dispatch) => ({
  search: (poke) => dispatch(actions.read({ slug: `pokemon/${poke}`, name: poke })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);

