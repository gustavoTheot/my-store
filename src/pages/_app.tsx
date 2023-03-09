import React from 'react'

import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'

import { ProSidebarProvider } from 'react-pro-sidebar'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { CartProvider } from 'use-shopping-cart'

const stripeKey = process.env.STRIPE_SECRET_KEY

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
      shouldPersist={true}
    >
      <ProSidebarProvider>
        <Sidebar />
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </ProSidebarProvider>
    </CartProvider>
  )
}
