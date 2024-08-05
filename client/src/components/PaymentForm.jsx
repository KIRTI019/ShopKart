import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { backendDomain } from "../common/index";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const fetchClientSecret = async () => {
    try {
      const response = await fetch(`${backendDomain}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 5000 }),
      });
      const data = await response.json();
      console.log(data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Enter your payment details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {succeeded && (
        <Typography color="success" sx={{ mb: 2 }}>
          Payment succeeded!
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={processing || succeeded}
        fullWidth
      >
        {processing ? <CircularProgress size={24} /> : "Pay"}
      </Button>
    </Box>
  );
};

export default PaymentForm;
