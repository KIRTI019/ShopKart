import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentDetail = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  return (
    <Box
      sx={{
        mt: isNonMobileScreen ? "5%" : "15%",
        p: isNonMobileScreen ? "2%" : "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: isNonMobileScreen ? "50%" : "100%",
          padding: isNonMobileScreen ? "2%" : "5%",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mb: "2%",
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Payment Details
        </Typography>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Paper>
    </Box>
  );
};

export default PaymentDetail;
