import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

const App = ({ test, name }) => (
  <Card>
    <Image src="https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg" />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>{JSON.stringify(name)}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon onClick={test} name="user" />
        22 Friends       
      </a>
    </Card.Content>
  </Card>
);

const mapStateToProps = (state) => ({
  name: state,
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(actions.read('pokemon/mewtwo', dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

