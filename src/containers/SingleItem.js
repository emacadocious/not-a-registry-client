import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { Container, Row, Image, Button, Collapse, Alert, Form, Col } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import Settings from './Settings';
import { currencyFormatter } from '../libs/currencyLib';
import "./SingleItem.css";

const SHOW_PURCHASE = 'SHOW_PURCHASE';
const SHOW_ALREADY_PURCHASED = 'SHOW_ALREADY_PURCHASED';

export default function SingleItem() {
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
        console.log(note)
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(note) {
    console.log(note)
    return API.put("items", `/items/${id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      console.log(content)

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

  function deleteNote() {
    return API.del("items", `/items/${id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  function renderPurchaseOrAlreadyPurchased() {
    return (
      <div className="item-is-purchased">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setPurchase(showRender = SHOW_PURCHASE)}
        >
          I want to purchase this item
        </Button>{' '}
        <Button
          variant="primary"
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
    <div>
      {note && (
        <Container className="single-item">
          <Row>
            <span className="item-title ">{note.title}</span>
          </Row>
          <Row>
            <span className="item-description">
              <Button
                onClick={() => setOpen(!open)}
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
          </Row>
          <Row>
            <Image
              src={note.imageUrl}
              className="item-image"
            />
          </Row>
          <Row className="item-price">
            <Alert variant="success">
              <Alert.Heading>{currencyFormatter(note.price)}</Alert.Heading>
              <hr />
              <p>
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
              </p>
            </Alert>
          </Row>
          {renderPurchaseOrAlreadyPurchased()}
          {renderMarkerup}
        </Container>
      )}
    </div>
  );
}
