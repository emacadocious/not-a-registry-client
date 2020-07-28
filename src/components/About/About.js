import React from 'react';
import { Container, Image, Col, Row } from "react-bootstrap";

import image from './pregnant.png';
import peru from './peru.png';
import crossOut from './cross-out.png';

import './About.css';

const About = () => (
  <Container fluid className="about">
    <Row className="about-us">We live in Peru and are having a baby!</Row>
    <Row className="about-us-imgs">
      <Col small={12}>
        <Image
          src={peru}
          className="item-image"
          fluid
        />
      </Col>
      <Col small={12}>
        <Image
          src={crossOut}
          className="item-image"
          fluid
        />
      </Col>
      <Col small={12}>
        <Image
          src={image}
          className="item-image"
          fluid
        />
      </Col>
    </Row>
    <Row className="about-us-why">
      However...We don't have Amazon, or international delivery so this is our "registry". You can give us money and we buy the gifts.
    </Row>
  </Container>
);

export default About;
