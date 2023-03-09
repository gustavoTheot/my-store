import { Handbag } from 'phosphor-react'
import { HeaderContainer } from './styles'
import logoImg from '../../assets/logo.svg'
import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'
import { useProSidebar } from 'react-pro-sidebar'
import Link from 'next/link'

export function Header() {
  const { collapseSidebar } = useProSidebar()
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <button
        onClick={() => {
          collapseSidebar()
        }}
      >
        <span>{cartCount}</span>
        <Handbag size={24} />
      </button>
    </HeaderContainer>
  )
}
