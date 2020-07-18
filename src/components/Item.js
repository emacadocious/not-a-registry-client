import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { currencyFormatter } from '../libs/currencyLib';
import './Item.css';

export default function Item({ item }) {
  let url = '';
  if (item.imageUrl) {
    url = item.imageUrl;
  }
  return (
    <Card>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <div>
          <span className="item-price">{currencyFormatter(10)}</span>
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
