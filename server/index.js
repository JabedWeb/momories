import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import paypal from '@paypal/checkout-server-sdk';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

app.use('/posts', postRoutes);
app.use('/users', userRouter);

app.post('/create-paypal-order', async (req, res) => {
  const { coffeeCount } = req.body;
  const pricePerCoffee = 5.00; // 5 USD

  console.log('Received request to create PayPal order:', req.body);

  const order = new paypal.orders.OrdersCreateRequest();
  order.prefer("return=representation");
  order.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: (coffeeCount * pricePerCoffee).toFixed(2),
      }
    }]
  });

  try {
    const orderResponse = await paypalClient.execute(order);
    console.log('Order created successfully:', orderResponse);
    res.json({ id: orderResponse.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/memories', (req, res) => {
  res.send('Server is working!');
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
