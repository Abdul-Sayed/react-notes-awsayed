# Stripe Integration

## Setup

Create an account with Stripe. Get public and secret api keys.

    npm install --save stripe
    npm install --save @stripe/react-stripe-js @stripe/stripe-js

In your env file;

    STRIPE_PUBLIC_KEY=...
    STRIPE_SECRET_KEY=...

    STRIPE_SIGNING_SECRET=key_goes_here

    HOST=http://localhost:3000

Add these keys to vercel, or deployment platform. Change HOST to production domain.  

## Provide cart data to Stripe

In your checkout page, make an api call to your Nextjs serverside code;

    import { loadStripe } from "@stripe/stripe-js";
    import axios from "axios";

    const stripePromise = loadStripe(process.env.stripe_public_key);

    // called on click of checkout button
    async function createCheckoutSession() {
      const stripe = await stripePromise;

      // call  backend to create a checkout session
      const checkoutSession = await axios.post("./api/create-checkout-session", {
        items,
        total,
        numItems,
        user: data.user,
      });

      // redirect user to Stripe checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) alert(result.error.message);
    }

  In pages/api/create-checkout-session.js;

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    export default async (req, res) => {
      const { items, total, user } = req.body;

      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.image],
            },
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "usd" },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 3 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ],
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cancel`,
        metadata: {
          name: user.name,
          email: user.email,
          images: JSON.stringify(items.map((item) => item.image)),
          total: total,
        },
      });

      res.status(200).json({ id: session.id });
    };


## Webhook

Use the Stripe CLI to trigger an event to a webhook to get data from Stripe after a successful order completion

https://stripe.com/docs/stripe-cli

Download and unzip the windows version. Move the unzipped folder to the project directory.

Using cmd, go to the unzipped folder, and run `stripe`, then `stripe login` and complete the login, and get the pairing code.
You'll need to re-authenticate after 90 days.

Run `stripe listen --forward-to localhost:3000/api-webhook`, and get the webhook signing key and store it in your env file.

