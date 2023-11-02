This is a [Next.js](https://nextjs.org/) project 
## Technology Used
- Typescript
- NextJS
- Redis
- MongoDB
- Tailwind CSS
- Stripe

## Getting Started

### For Windows users- it is important to have WSL installed

Run Redis on WSL using - redis-server redis.conf ( Make sure no redis servers are running in the background )
Then run - npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Stripe is running in testing mode
  Test Credit Card details - 4242 4242 4242

# Example Env
GOOGLE_ID="Your Google Oauth Client Id"

GOOGLE_SECRET="Your Google Oauth Client Secret"

DATABASE_URL="Your MongoDB Database URL"

DATABASE_PASSWORD="Your MongoDB Database Password"

URL="Your Localhost URL"

NEXTAUTH_URL="Your website URL"

NEXTAUTH_SECRET=""Your Next Auth URL"

STRIPE_SECRET_KEY="Your Stripe Secret Key"

STRIPE_PUBLISHABLE_KEY=" Your Stripe Publishable Key "
