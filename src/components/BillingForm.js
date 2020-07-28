import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, handleFieldChange, name, ...props }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      name !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: name });

    setIsProcessing(false);

    onSubmit({ token, error });
  }

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

export default injectStripe(BillingForm);
