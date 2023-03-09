import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { HomeContainer, Product } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import { NextSeo } from 'next-seo'
import { Handbag } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'

interface HomeProps {
  products: {
    id: string
    name: string
    image: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()
  const [slierRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  })

  async function handleBuyProduct(product: any) {
    addItem({
      ...product,
      image: product.image,
    })
  }

  return (
    <>
      <NextSeo title="Home" description="Listagem dos produtos" />

      <HomeContainer ref={slierRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.image} width={520} height={480} alt={''} />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={() => handleBuyProduct(product)}>
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
