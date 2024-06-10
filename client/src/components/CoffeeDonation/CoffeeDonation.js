import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';

const coffeePrices = [
  { count: 1, price: 5 },
  { count: 2, price: 10 },
  { count: 3, price: 15 },
  { count: 4, price: 20 },
];

const CoffeeDonation = () => {
  const classes = useStyles();
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Buy a Coffee for the Developer
        </Typography>
        <Grid container spacing={3}>
          {coffeePrices.map((coffee) => (
            <Grid item xs={3} key={coffee.count}>
              <Paper
                className={`${classes.coffeeOption} ${selectedCoffee === coffee.count ? classes.selected : ''}`}
                onClick={() => setSelectedCoffee(coffee.count)}
                elevation={3}
              >
                <Typography variant="h6">{coffee.count} Coffee{coffee.count > 1 ? 's' : ''}</Typography>
                <Typography variant="body1">${coffee.price}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {selectedCoffee && (
          <div className={classes.paymentContainer}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return fetch('http://localhost:5000/create-paypal-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    coffeeCount: selectedCoffee,
                    name: user?.result?.name,
                    email: user?.result?.email,
                    price: selectedCoffee * 5,
                  }),
                }).then(response => response.json()).then(order => order.id);
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
              
                  alert('Thank you' + details.payer.name.given_name + 'for your support! We will do more great things for you.');
                  // redirect to home page
                  window.location.replace("/");
                });
              }}
              onError={(err) => {
                console.error("PayPal Checkout onError", err);
                alert('Something went wrong with the transaction.');
              }}
            />
          </div>
        )}
      </Container>
    </PayPalScriptProvider>
  );
};

export default CoffeeDonation;
