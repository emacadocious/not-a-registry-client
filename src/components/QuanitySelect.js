import React from "react";
import { Form } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";

export default function LoaderButton({
  isLoading,
  className = "",
  options,
  handleSelect,
  ...props
}) {
  const { toggleQuanity } = useAppContext();

  return (
    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
      <Form.Label>Custom select Large</Form.Label>
      <Form.Control
        as="select"
        size="lg"
        custom
        onChange={toggleQuanity}
      >
        {
          options.map((value, index) =>
            <option key={index} value={value}>{value}</option>
          )
        }
      </Form.Control>
    </Form.Group>
  );
}
