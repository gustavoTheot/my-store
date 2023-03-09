import {
  ImageContainer,
  ProdcutContainer,
  ProductDetails,
} from '@/styles/pages/product'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { NextSeo } from 'next-seo'

import { useShoppingCart } from 'use-shopping-cart'

interface ProdcutProps {
  product: {
    id: string
    name: string
    image: string
    price: number
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProdcutProps) {
  const { addItem } = useShoppingCart()

  async function handleBuyProduct() {
    addItem({
      name: product.name,
      price_id: product.defaultPriceId,
      price: product.price,
      image: product.image,
      currency: 'BRL',
    })
  }

  return (
    <>
      <NextSeo title={product.name} description={product.description} />
      <ProdcutContainer>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt={''} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct}>Colocar na sacola</button>
        </ProductDetails>
      </ProdcutContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const producId = params.id

  const product = await stripe.products.retrieve(producId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],

        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  }
}
