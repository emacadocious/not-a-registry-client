import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import "./LoaderComponent.css";

export default function LoaderComponent() {
  return (
    <Row>
      <Col className="loader-component">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}
