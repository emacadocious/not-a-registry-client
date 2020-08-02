import React, { useState, useEffect } from "react";
import { CardDeck, CardColumns, Container, Row } from "react-bootstrap";
import { API } from "aws-amplify";

import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { Banner, Item, About, LoaderComponent } from '../../components';
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
    let markup = <LoaderComponent />
    if (items) {
      markup = (
        <div className="items">
          <span className="items-title">Items we'll need..</span>
          <CardDeck>
            <CardColumns data-aos="fade-up">
              {!isLoading && renderItemsList(items)}
            </CardColumns>
          </CardDeck>
        </div>
      );
    }
    return markup;
  }

  return (
    <div className="home">
      <Banner />
      <About />
      <div className="main-container">
        <Container>
          <Row>
            {renderItems()}
          </Row>
        </Container>
      </div>
    </div>
  );
}
