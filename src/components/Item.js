import React from 'react';

import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <div>
          <span className="item-price">10</span>
        </div>
      </Card.Body>
      <Card.Footer>
      <Link to={`/items/${item.itemId}`}>
        <Button>
          Purchase
        </Button>
      </Link>
      </Card.Footer>
    </Card>
  );
}
