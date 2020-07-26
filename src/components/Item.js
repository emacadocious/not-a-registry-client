import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import config from "../config";
import { currencyFormatter } from '../libs/currencyLib';
import './Item.css';


export default function Item({ item }) {
  const baseUrl = `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${item.attachment}`;
  return (
    <Card>
      <Card.Img variant="top" src={baseUrl} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <div>
          <span className="item-price">{currencyFormatter(Number(item.price))}</span>
        </div>
      </Card.Body>
      <Card.Footer>
      {
        item.available ?
          <Link to={`/items/${item.itemId}`}>
            <Button variant="success">
              Purchase
            </Button>
          </Link>
          :
          <Button variant="danger">
            Already Purchased
          </Button>
      }

      </Card.Footer>
    </Card>
  );
}
