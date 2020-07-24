import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { Container, Row, Image, Button, Collapse, Form, Col } from "react-bootstrap";

import { LoaderComponent } from "../components";
import config from "../config";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import Settings from './Settings';
import { currencyFormatter } from '../libs/currencyLib';
import "./SingleItem.css";

const SHOW_PURCHASE = 'SHOW_PURCHASE';
const SHOW_ALREADY_PURCHASED = 'SHOW_ALREADY_PURCHASED';

export default function SingleItem() {
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let [showRender, setPurchase] = useState("false");

  useEffect(() => {
    function loadNote() {
      return API.get("items", `/items/${id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
        setIsPageLoading(false);
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function saveNote(note) {
    console.log(note)
    return API.put("items", `/items/${id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await saveNote({
        firstName,
        lastName,
        available: false,
        purchased: true
      });
      history.push("/");
    } catch (e) {
      console.log(e)
      onError(e);
      setIsLoading(false);
    }
  }

  function renderPurchaseOrAlreadyPurchased() {
    return (
      <div className="item-is-purchased">
        <Button
          variant="success"
          size="lg"
          onClick={() => setPurchase(showRender = SHOW_PURCHASE)}
        >
          I want to purchase this item
        </Button>{' '}
        <Button
          variant="success"
          size="lg"
          onClick={() => setPurchase(showRender = SHOW_ALREADY_PURCHASED)}
        >
          I have already purchased this item.
        </Button>{' '}
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
                placeholder="First name"
                className="item-input"
                onChange={e => setFirstName(e.target.value)}
                size="lg"
              />
            </Row>
            <Row>
              <Form.Control
                placeholder="Last name"
                className="item-input"
                onChange={e => setLastName(e.target.value)}
                size="lg"
              />
            </Row>
            <Row>
              <Form.Check
                label="I have already purchased this item."
                type="checkbox"
                id="checkbox-1"
                onClick={() => setVerify(!verify)}
              />
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

  return (
    <div className="single-item-wrapper">
      {!isPageLoading ? note && (
        <Container className="single-item">
          <Row>
            <h1>{note.title}</h1>
          </Row>
          <Row>
            <Col md={6} sm={12} className="mb-5">
              <Image
                src={note.imageUrl}
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
                    {note.description}
                  </div>
                </Collapse>
              </span>
              <Row className="item-price">
                <h2>{currencyFormatter(note.price)}</h2>
              </Row>
              {renderPurchaseOrAlreadyPurchased()}
            </Col>
          </Row>
          <Row>
            <Col>
              {renderMarkerup}
            </Col>
          </Row>
        </Container>
      ) : <LoaderComponent />}
    </div>
  );
}
