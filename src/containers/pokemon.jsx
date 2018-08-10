import React, { PureComponent } from 'react';
import { Input, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class Pokemon extends PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
  };

  state = {
    poke: '',
  };

  handlePoke = (e) => {
    this.setState({ poke: e.target.value });
  };

  render() {
    const { poke } = this.state;
    const { search } = this.props;
    return (
      <Container>
        <Input
          onChange={this.handlePoke}
          action={{ icon: 'search', color: 'teal', onClick: () => search(poke) }}
          placeholder="Procurar"
        />
      </Container>
    );
  }
}

const mapStateToProps = () => ({
  pokemon: 'isso'
});

const mapDispatchToProps = (dispatch) => ({
  search: (poke) => dispatch(actions.read({ slug: `pokemon/${poke}`, name: 'pokemon' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);

