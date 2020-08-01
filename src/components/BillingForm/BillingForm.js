import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LoaderButton } from "../";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, handleFieldChange, name, ...props }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      name !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements.getElement(CardElement);

    setIsProcessing(true);

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    const { token, error } = await stripe.createToken(cardElement);

    setIsProcessing(false);

    onSubmit({ token, error });
  };

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
    <Form.Group controlId="name">
        <Form.Label>Cardholder&apos;s name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
          size="lg"
        />
    </Form.Group>
      <Form.Label>Credit Card Info</Form.Label>
      <CardElement
        className="card-field"
        onChange={e => setIsCardComplete(e.complete)}
        size="lg"
      />
      <LoaderButton
        block
        type="submit"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
}

export default BillingForm;
