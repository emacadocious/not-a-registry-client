import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";

import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { BillingForm } from "../../components";
import "./Settings.css";

export default function Settings() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    name: ""
  });
  const { item, quanity } = useAppContext();

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  function billUser(details) {
    console.log(details)
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
        source: token.id
      });

      await saveNote({
        purchasedBy: fields.name,
        available: false,
        purchased: true,
        purchaseDate: new Date()
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  console.log(quanity)

  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
            handleFieldChange={handleFieldChange}
            name={fields.name}
          />
        </Elements>
      </StripeProvider>
    </div>
  );
}
