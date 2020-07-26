import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";

import { onError } from "../libs/errorLib";
import config from "../config";
import BillingForm from "../components/BillingForm";
import "./Settings.css";

export default function Settings() {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

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

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      await saveNote({
        firstName: "from UI",
        lastName: "from UI",
        available: false,
        purchased: true
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
}
