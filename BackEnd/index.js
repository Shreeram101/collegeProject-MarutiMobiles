require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const productsRouter = require('./Routes/RouteProducts');
const categoriesRouter = require('./Routes/Categories');
const cartRouter = require('./Routes/Cart');
const usersRouter = require('./Routes/Users');
const authRouter = require('./Routes/auth');
const orderRouter = require('./Routes/Order');
const wishlistRouter = require('./Routes/Wishlist');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { cookieExtractor } = require('./Services/Common');
const session = require('express-session');
const passport = require('passport');
const { env } = require('process');

main().catch(err => console.log(err));

const opts = {};
opts.jwtFormRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.authenticate('session'));
app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
)
app.use(express.json());

app.use('/products', productsRouter.router);
app.use('/categories', categoriesRouter.router);
app.use('/cart', cartRouter.router);
app.use('/auth', authRouter.router);
app.use('/users', usersRouter.router);
app.use('/orders', orderRouter.router);
app.use('/wishlist', wishlistRouter.router);

main().catch(err => console.log(err))

const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

app.post('/create-payment-intent', async (req, res) => {

  const orderId = req.body.items.id;
  const subtotal = req.body.items.subtotal;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: subtotal * 100,
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId: orderId,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

async function main() {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("database connected");
  }).catch((err) => {
    console.log(err);
  });
}

app.get('/', (req, res) => {
  res.json({ status: 'success' })
})

app.listen(process.env.PORT, () => {
  console.log(`server is running`);
}); 