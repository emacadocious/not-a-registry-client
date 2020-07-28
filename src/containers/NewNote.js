import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { API } from "aws-amplify";

import { LoaderButton } from "../components";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import { useInput } from "../libs/inputHookLib";
import "./NewNote.css";

export default function NewNote() {
  const file = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { value:itemTitle, bind:bindItemTitle, reset:resetItemTitle } = useInput('');
  const { value:itemDescription, bind:bindItemDescription, reset:resetItemDescription } = useInput('');
  const { value:itemPrice, bind:bindItemPrice, reset:resetItemPrice } = useInput(0);
  const { value:purchaseDate, bind:bindPurchaseDate, reset:resetPurchaseDate} = useInput('');
  const { value:isAvailable, bind:bindIsAvailable, reset:resetBindIsAvailable } = useInput(true);
  const { value:purchasedBy, bind:bindPurchasedBy, reset:resetBindPurchasedBy } = useInput('');

  function validateForm() {
    return itemTitle.length > 0 && itemDescription.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit2(event) {
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
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({
        itemTitle,
        itemDescription,
        itemPrice,
        purchaseDate,
        isAvailable: isAvailable === true,
        purchasedBy,
        attachment
      });
      alert('Item successfully created.');
      resetItemTitle();
      resetItemDescription()
      resetItemPrice()
      resetPurchaseDate()
      resetBindIsAvailable()
      resetBindPurchasedBy()
    } catch (e) {
      console.log(e)
      onError(e);
      setIsLoading(false);
    }
  }


  function createNote(note) {
    return API.post("items", "/items", {
      body: note
    })
  }


  return (
    <div className="new-item">
      <form onSubmit={handleSubmit2}>
        <Form.Group controlId="ControlTextarea1">
          <Form.Label>Item Title</Form.Label>
          <Form.Control
            type="text"
            {...bindItemTitle}
          />
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            {...bindItemDescription}
          />
          <Form.Label>Item Price</Form.Label>
          <Form.Control
            type="number"
            {...bindItemPrice}
          />
          <Form.Label>Purchase Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/DD/YYYY"
            {...bindPurchaseDate}
          />
          <Form.Label>Available</Form.Label>
          <Form.Control
            as="select"
            {...bindIsAvailable}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Control>
          <Form.Label>Purchased By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Whoever purchased this item"
            {...bindPurchasedBy}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
        <Form.Control
          onChange={handleFileChange}
          type="file"
        />
      </Form.Group>
        <LoaderButton
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
