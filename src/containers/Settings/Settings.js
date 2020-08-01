import React, { useState } from "react";
import { useHistory, useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { BillingForm } from "../../components";
import "./Settings.css";

const stripePromise = loadStripe(config.STRIPE_KEY);

export default function Settings() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: ""
  });
  const { item, quanity } = useAppContext();

  function billUser(details) {
    return API.post("items", "/billing", {
      body: details
    });
  }

  function saveNote(note) {
    return API.put("items", `/items/${id}`, {
      body: note
    });
  }

  async function handleFormSubmit({ token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        price: item.price,
        source: token.id,
        quanity
      });

      await saveNote({
        available: item.quanityAvailable - quanity > 0,
        purchased: item.quanityAvailable - quanity === 0,
        purchaseHistory: {
          purchasedBy: fields.name,
          purchaseDate: new Date(),
          quanity
        },
        quanityAvailable: item.quanityAvailable
      });


      toast.success(`Thank you for your purchase of ${item.title}!`);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="settings">
      <Elements stripe={stripePromise}>
        <BillingForm
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          handleFieldChange={handleFieldChange}
          name={fields.name}
        />
      </Elements>
    </div>
  );
}
