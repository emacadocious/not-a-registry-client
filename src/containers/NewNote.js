import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { API } from "aws-amplify";

import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./NewNote.css";

export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
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

      await createNote({ content, attachment });
      history.push("/");
    } catch (e) {
      console.log(e)
      onError(e);
      setIsLoading(false);
    }
  }


  function createNote(note) {
    return API.post("items", "/items", {
      body: note
    });
  }

  return (
    <div className="new-item">
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
        <Form.Control onChange={handleFileChange} type="file" />
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
