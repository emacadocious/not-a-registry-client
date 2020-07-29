import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form, Button, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

import { LoaderButton, RenderTooltip } from "../../components";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Login.css";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group>
          <RenderTooltip />
        </Form.Group>
        <Link
          to="/login/reset"
          className="password-reset"
        >Forgot password?</Link>
        <LoaderButton
          block
          type="submit"
          size="large"
          className="login-btn"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        <Button
          block
          variant="info"
          size="large"
          className="login-btn"
        >
          <Link to="/signup">Create Account</Link>
        </Button>
      </form>
    </div>
  );
}
