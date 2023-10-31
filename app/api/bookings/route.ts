const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getCheckoutSession(req: Request) {
  stripe.checkout.session.create();
}
