import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { currencyFormatter } from '../libs/currencyLib';
import './Item.css';

export default function Item({ item }) {
  const baseUrl = 'https://not-a-registry-api-dev-attachmentsbucket-udlpoklq6y1f.s3.amazonaws.com/private/us-east-1%3A9217774f-4e9d-4d87-a84c-e8526bb05d23/';
  return (
    <Card>
      <Card.Img variant="top" src={baseUrl + item.attachment} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <div>
          <span className="item-price">{currencyFormatter(10)}</span>
        </div>
      </Card.Body>
      <Card.Footer>
      {

          (
            <Link to={`/items/${item.itemId}`}>
              <Button variant="success">
                Purchase
              </Button>
            </Link>
          )
      }

      </Card.Footer>
    </Card>
  );
}
