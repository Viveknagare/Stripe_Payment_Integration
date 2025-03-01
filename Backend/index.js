import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Stripe with your secret key from `.env`
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Routes
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/payment", async (req, res) => {
    try {
        const { product, token } = req.body;
        console.log("PRODUCT:", product);
        console.log("PRICE:", product.price);

        const idempotencyKey = uuidv4();

        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id // token.uuidv4 is incorrect, it should be token.id
        });

        // Create a charge
        const charge = await stripe.charges.create({
            amount: product.price * 100, // Convert to cents
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey });

        return res.status(200).json(charge);
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).json({ error: error.message });
    }
});

// Listen
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



























// import express from "express";
// import cors from "cors";
// import Stripe from "stripe";
// // import 'dotenv/config'; // Load environment variables
// import { configDotenv } from "dotenv";
// import { v4 as uuidv4 } from 'uuid';

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Initialize Stripe with your secret key from `.env`
// const stripe = new Stripe("sk_test_51Qxm1EIeynoCl5MpbZuV1lNXSzqvElFpQiXzyK2N64zMGkTHeXZuSGYMxyfvhXGnptAGGzf7AebfV5fcRcociYk7004ncBGwkV");

// // Routes
// app.get("/", (req, res) => {
//     res.send("Hello world");
// });

// app.post("/payment",(req,res) => {
//     const {product, token} = req.body;
//     console.log("PRODUCT ",product);
//     console.log("PRICE ",product.price);
//     const idempotencyKey = uuidv4();
    
//     return stripe.customers.create({
//         email:token.email,
//         source:token.uuidv4
//     }).then(customer => {
//         stripe.charges.create({
//             amount:product.price * 100,
//             currency:'usd',
//             customer:customer.id,
//             receipt_email:token.email,
//             description:`purchase of ${product.name}`,
//             shipping:{
//                 name:token.card.name,
//                 address:{
//                     country:token.card.address_country
//                 }
//             }
//         },{idempotencyKey});
//     }).then(result => res.status(200).json(result))
//     .catch(err => console.log(err));
// })


// // Listen
// const PORT = 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// }); this is my backend code now whats the issue i have also changed the port of both to 8000