import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import EeveeImg from '../assets/eeve.png';

const styles = {
  footer: {
    display: 'flex',
    position: 'fixed',
    bottom: 10,
    right: 0,
    zIndex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
};

const Footer = () => (
  <Container style={styles.footer}>
    <Image size="huge" src={EeveeImg} />
  </Container>
);

export default Footer;
