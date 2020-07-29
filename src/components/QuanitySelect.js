import React from "react";
import { Form } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";

export default function LoaderButton({
  isLoading,
  className = "",
  title = "Please Select Amount to Purchase",
  options,
  handleSelect,
  ...props
}) {
  const { toggleQuanity } = useAppContext();

  return (
    <Form.Group controlId="exampleForm.SelectCustomSizeLg">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="select"
        onChange={toggleQuanity}
      >
        {
          options.map((value, index) =>
            <option key={index} value={Number(value)}>{value}</option>
          )
        }
      </Form.Control>
    </Form.Group>
  );
}
