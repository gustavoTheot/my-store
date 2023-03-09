import {
  ButtonClose,
  ImageContainer,
  InformationContainer,
  MainContainer,
  NavBarContainer,
} from './styles'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useProSidebar } from 'react-pro-sidebar'
import React, { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export interface CartInfoProps {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  defaultPriceId: string
}

export function Sidebar() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { collapsed, collapseSidebar } = useProSidebar()
  const { cartDetails, cartCount, removeItem, clearCart } = useShoppingCart()

  const cartInfo = Object.entries(cartDetails).map(([key, value]) => {
    return {
      product_id: key,
      ...value,
    }
  })

  async function handleBuyProduct() {
    try {
      setIsRedirecting(true)
      const response = await axios.post('/api/checkout', {
        items: cartDetails,
      })

      const url = response.data.checkoutUrl

      window.location.href = url
      clearCart()
    } catch (error) {
      alert('Falha ao redirecionar ao checkout' + error)
      setIsRedirecting(false)
    }
  }

  const priceTotal = cartInfo.map((item: any) => {
    const price = item.price
    const formatPrice = Number(
      price.toString().replace('R$', '').replace(',', '.').trim(),
    )

    return formatPrice
  })

  const total =
    priceTotal.length > 0
      ? priceTotal.reduce((acc: number, element: number) => {
          return acc + element
        })
      : 0

  const totalFromatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total)

  function handleRemove(productId: string) {
    removeItem(productId)
  }

  return (
    <NavBarContainer collapsed={collapsed}>
      <div>
        <header>
          <h3>Sacols de compras</h3>
          <ButtonClose
            onClick={() => {
              collapseSidebar()
            }}
          >
            <X size={20} />
          </ButtonClose>
        </header>
        <main>
          {cartInfo.map((product) => (
            <React.Fragment key={product.product_id}>
              <MainContainer>
                <ImageContainer>
                  <Image src={product.image} alt="" width={100} height={93} />
                </ImageContainer>
                <InformationContainer>
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>

                  <button onClick={() => handleRemove(product.product_id)}>
                    Remover
                  </button>
                </InformationContainer>
              </MainContainer>
            </React.Fragment>
          ))}
        </main>
      </div>

      <footer>
        <div>
          <span>Quantidade</span>
          <span>{cartCount} Itens</span>
        </div>

        <div>
          <span>Valor total</span>
          <span>{totalFromatted}</span>
        </div>
        <button disabled={isRedirecting} onClick={handleBuyProduct}>
          Finalizar compra
        </button>
      </footer>
    </NavBarContainer>
  )
}
