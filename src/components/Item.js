import React from 'react';

import { Card, Button } from 'react-bootstrap';
import { currencyFormatter } from '../../utilities';

import image from './stroller.jpg';

import './Item.css';

export default function Item() {
  const { item } = this.props;
  return (
    <Card>
      <Card.Img variant="top" src={`${image}`} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <div>
          <span className="item-price">{currencyFormatter(Number(item.price))}</span>
          <span className="margin-top-bottom-15px">
            {
              item.need ?
                <Button
                  variant="success"
                  onClick={() => this.props.purchaseItem(item)}
                >Purchase</Button>
                : <Button variant="info">Already Purchased</Button>
            }
          </span>
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{item.updated}</small>
      </Card.Footer>
    </Card>
  );
}
