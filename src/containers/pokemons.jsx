import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Container,
  Card,
  Image,
  Loader,
  Pagination,
  Input,
  Button,
  Dimmer,
  Icon
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { map, isEmpty, get, chunk, filter } from "lodash/fp";
import { Link } from "react-router-dom";
import { read } from "../store/actions";
import { findPoke } from "../store/selectors";
import formatPokeName from "../helpers/formatPokeName";

const styles = {
  pokesContainer: {
    width: "100%",
    minHeight: 420,
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "rgba(255, 255, 255, .9)",
    borderRadius: 5
  },
  card: {
    width: 151,
    maxHeight: 200,
    borderColor: "none",
    margin: 5,
    background: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
    boxShadow: "0px 0px 7px silver"
  },
  gridPokesContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  imageContainer: {
    width: 150,
    minHeight: 150
  },
  pokeName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

class Pokemons extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    getPokesBypage: PropTypes.func
  };

  state = {
    page: 1,
    poke: "",
    isLoading: false
  };
  componentDidMount() {
    this.getAllPokes();
  }

  getAllPokes = async () => {
    const { dispatch, pokes } = this.props;
    if (isEmpty(pokes)) {
      this.setState(() => ({ isLoading: true }));
      await dispatch(
        read({
          slug: "pokemon/",
          name: "pokes"
        })
      );
      this.setState(() => ({ isLoading: false }));
    }
  };

  getPokeIdFromUrl = url => url.split("/").splice(-2, 1);
  getPokeImageUrl = id =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  handlePoke = e => this.setState({ poke: e.target.value });

  handlePage = (e, data) => this.setState({ page: data.activePage });

  renderPokes = filteredPokes => {
    const { poke, page } = this.state;
    const { pokes } = this.props;

    return map(el => {
      const id = this.getPokeIdFromUrl(el.url);
      return (
        <Link to={`/pokemon/${id}`}>
          <Card style={styles.card} key={el.name}>
            <Card.Content style={styles.imageContainer}>
              <Image size="medium" src={this.getPokeImageUrl(id)} />
            </Card.Content>
            <Card.Content>
              <Card.Header style={styles.pokeName}>
                {formatPokeName(el.name)}
              </Card.Header>
            </Card.Content>
          </Card>
        </Link>
      );
    }, chunk(14, filteredPokes)[page - 1]);
  };

  render() {
    const { pokes } = this.props;
    const { page, isLoading, poke } = this.state;
    const filteredPokes = filter(el => el.name.search(poke) !== -1)(pokes);

    return (
      <Container style={styles.gridPokesContainer}>
        <Input
          style={{ width: "50%", margin: 10 }}
          onChange={this.handlePoke}
          placeholder="Procurar"
          icon={{ name: "search", circular: true }}
        />
        <Container style={styles.pokesContainer}>
          {this.renderPokes(filteredPokes)}
          <Dimmer active={isLoading}>
            <Loader />
          </Dimmer>
        </Container>
        <Pagination
          onPageChange={this.handlePage}
          defaultActivePage={1}
          totalPages={chunk(14, filteredPokes).length - 1}
          style={{ margin: 10 }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pokes: findPoke(state.get("cache"), "pokes.results")
});
export default connect(mapStateToProps)(Pokemons);
