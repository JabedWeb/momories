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

// PayPal setup
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// MongoDB setup
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define schema and model for coffee purchases
const coffeePurchaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  coffeeCount: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const CoffeePurchase = mongoose.model('CoffeePurchase', coffeePurchaseSchema);

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRouter);

// PayPal order creation endpoint
app.post('/create-paypal-order', async (req, res) => {
  const { coffeeCount, name, email } = req.body;
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

    // Save the purchase to MongoDB
    const newPurchase = new CoffeePurchase({
      name,
      email,
      coffeeCount,
      price: coffeeCount * pricePerCoffee,
    });

    await newPurchase.save();

    res.json({ id: orderResponse.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/coffee-purchases', async (req, res) => {
  const { email } = req.query;

  if (email !== 'jabedweb73@gmail.com') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const purchases = await CoffeePurchase.find().sort({ date: -1 });
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching coffee purchases:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/memories', (req, res) => {
  res.send('Server is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

mongoose.set('useFindAndModify', false);
