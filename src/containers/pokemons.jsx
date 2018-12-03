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

const styles = {
  pokesContainer: {
    width: "100%",
    height: "80%",
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    width: 150,
    maxHeight: 200,
    margin: 5,
    cursor: "pointer"
  },
  gridPokesContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
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
    const { dispatch } = this.props;
    this.setState(() => ({ isLoading: true }));
    await dispatch(
      read({
        slug: "pokemon/",
        name: "pokes"
      })
    );
    this.setState(() => ({ isLoading: false }));
  };

  getPokeIdFromUrl = url => url.split("/").splice(-2, 1);
  getPokeImageUrl = id =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  handlePoke = e => this.setState({ poke: e.target.value });
  generateId = () => Math.floor(Math.random() * 10000000);

  handlePage = (e, data) => this.setState({ page: data.activePage });

  renderPokes = (filteredPokes) => {
    const { poke, page } = this.state;
    const { pokes } = this.props;

    return map(el => {
      const id = this.getPokeIdFromUrl(el.url);
      return (
        <Link to={`/pokemon/${id}`}>
          <Card style={styles.card} key={el.name}>
            <Image size="small" src={this.getPokeImageUrl(id)} />
            <Card.Content>
              <Card.Header>{el.name.replace(/-/g, " ")}</Card.Header>
            </Card.Content>
          </Card>
        </Link>
      );
    }, chunk(21, filteredPokes)[page]);
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
          totalPages={chunk(21, filteredPokes).length - 1}
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
