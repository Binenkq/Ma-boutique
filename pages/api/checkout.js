import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { productId } = req.body;

  const PRODUCTS = {
    gopro: { name: "GoPro Hero 12 Black", price: 28000 }, // 280 € en centimes
    garmin: { name: "Garmin Fenix 8", price: 40000 }      // 400 € en centimes
  };

  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: "Produit inconnu" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: product.name },
            unit_amount: product.price
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.SITE_URL}/success`,
      cancel_url: `${process.env.SITE_URL}/cancel`
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
