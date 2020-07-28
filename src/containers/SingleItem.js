import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { Container, Row, Image, Button, Collapse, Form, Col } from "react-bootstrap";

import config from "../config";
import { LoaderComponent, QuanitySelect } from "../components";
import { onError } from "../libs/errorLib";
import Settings from './Settings';
import { currencyFormatter } from '../libs/currencyLib';
import { AppContext } from "../libs/contextLib";
import "./SingleItem.css";

const SHOW_PURCHASE = 'SHOW_PURCHASE';
const SHOW_ALREADY_PURCHASED = 'SHOW_ALREADY_PURCHASED';

export default function SingleItem() {
  const { id } = useParams();
  const history = useHistory();
  const [item, setItem] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState(false);
  const [name, setName] = useState("");
  const [quanity, setQuanity] = useState(0);
  let [showRender, setPurchase] = useState("false");

  const toggleQuanity = (e) => setQuanity(e.target.value);

  useEffect(() => {
    function loadNote() {
      return API.get("items", `/items/${id}`);
    }

    async function onLoad() {
      try {
        const item = await loadNote();
        const { attachment } = item;

        if (attachment) {
          item.attachmentURL = await Storage.vault.get(attachment);
        }

        setItem(item);
        setQuanity(1)
        setIsPageLoading(false);
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function saveNote(item) {
    return API.put("items", `/items/${id}`, {
      body: item
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // setIsLoading(true);
    try {
      await saveNote({
        purchasedBy: name,
        available: false,
        purchased: true,
        purchaseDate: new Date()
      });
      history.push("/");
    } catch (e) {
      console.log(e)
      onError(e);
      // setIsLoading(false);
    }
  }

  function renderPurchaseOrAlreadyPurchased() {
    return (
      <div className="item-is-purchased">
        <Button
          variant="success"
          size="lg"
          onClick={() => setPurchase(showRender = SHOW_PURCHASE)}
          href="#purchase"
        >
          I want to purchase this item
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={() => setPurchase(showRender = SHOW_ALREADY_PURCHASED)}
          href="#purchase"
        >
          I have already purchased this item.
        </Button>
      </div>
    )
  }

  function renderPurchase() {
    return (
      <div>
        <Settings />
      </div>
    );
  }

  function renderAlreadyPurchased() {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Form.Control
                placeholder="Your Name"
                className="item-input"
                onChange={e => setName(e.target.value)}
                size="lg"
              />
            </Row>
            <Row>
              <Form.Check
                type="checkbox"
                id="checkbox-1"
                onClick={() => setVerify(!verify)}
              />
              <Form.Label className="checkbox-label">I promise that I have already purchased this item.</Form.Label>
            </Row>
            <Row>
              <Button
                variant="primary"
                size="lg"
                className="item-submit"
                type="submit"
                disabled={(!verify)}
              >
                Submit
              </Button>
            </Row>
          </Form.Group>
        </Form>
      </div>
    );
  }

  let renderMarkerup = "";
  if (showRender === SHOW_PURCHASE) {
    renderMarkerup = renderPurchase();
  }
  if (showRender === SHOW_ALREADY_PURCHASED) {
    renderMarkerup = renderAlreadyPurchased();
  }

  let imageUrl = '';
  if (item) {
    imageUrl = `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${item.attachment}`;
  }

  console.log(quanity)

  return (
    <div className="single-item-wrapper">
      {!isPageLoading ? item && (
        <AppContext.Provider value={{ item, quanity, toggleQuanity }}>
          <Container className="single-item">
            <Row>
              <h1 className="item-heading">{item.title}</h1>
            </Row>
            <Row>
              <Col md={6} sm={12} className="mb-5">
                <Image
                  src={imageUrl}
                  className="item-image"
                  fluid
                />
              </Col>
              <Col className="item-details">
                <span className="item-description">
                  <Button
                    onClick={() => setOpen(!open)}
                    variant="info"
                    size="lg"
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    See Description
                  </Button>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      {item.description}
                    </div>
                  </Collapse>
                </span>
                <Row className="item-price">
                  <span>{currencyFormatter(Number(item.price))}</span>
                </Row>
                <Row>
                  <QuanitySelect
                    options={[1, 2, 3]}
                  />
                </Row>
                {renderPurchaseOrAlreadyPurchased()}
              </Col>
            </Row>
            <Row>
              <Col id="purchase">
                {renderMarkerup}
              </Col>
            </Row>
          </Container>
        </AppContext.Provider>
      ) : <LoaderComponent />}
    </div>
  );
}
