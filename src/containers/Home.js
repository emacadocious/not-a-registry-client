import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { Banner, Footer, Item } from '../components';
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
    console.log(items)
    return [{}].concat(items).map((item, i) =>
      i !== 0 ? <Item item={item} /> : ''
    );
  }

  function renderItems() {
    return (
      <div className="items">
        <h1>Your Items</h1>
        <ListGroup>
          {!isLoading && renderItemsList(items)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      <Banner />
      {renderItems()}
      <Footer />
    </div>
  );
}
