import React, { useState, useEffect } from "react";
import { CardDeck, CardColumns, Container, Row } from "react-bootstrap";
import { API } from "aws-amplify";
import Fade from 'react-reveal/Fade';

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { Banner, Item } from '../components';
import "./Home.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const items = await loadItems();
        setItems(items);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadItems() {
    return API.get("items", "/items")
  }

  function renderItemsList(items) {
    return [{}].concat(items).map((item, i) =>
      i !== 0 ? <Item key={i} item={item} /> : ''
    );
  }

  function renderItems() {
    return (
      <div className="items">
        <h1>Items</h1>
        <CardDeck>
          <CardColumns>
            {!isLoading && renderItemsList(items)}
          </CardColumns>
        </CardDeck>
      </div>
    );
  }

  return (
    <div className="Home">
      <Banner />
      <div className="main-container">
        <Fade bottom>
          <Container>
            <Row>
              {renderItems()}
            </Row>
          </Container>
          </Fade>
      </div>
    </div>
  );
}
