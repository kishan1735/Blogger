import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  console.log(process.env.STRIPE_PUBLISHABLE_KEY);
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY!}`);
  }
  return stripePromise;
};

export default getStripe;
