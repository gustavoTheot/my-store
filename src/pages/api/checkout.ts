import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { items } = req.body

  if (req.method !== 'POST') {
    return res.status(405)
  }

  if (!items) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const sucessUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const arrayOfProducts = Object.keys(items).map((key) => items[key])
  const pricesId = arrayOfProducts.map((item) => item.price_id)

  const lineItems = pricesId.map((priceId) => {
    return {
      price: priceId,
      quantity: 1,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    cancel_url: cancelUrl,
    success_url: sucessUrl,
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
