import { styled } from '@stitches/react'

export const NavBarContainer = styled('div', {
  zIndex: 1,
  position: 'absolute',
  height: '100vh',
  top: 0,
  right: 0,
  backgroundColor: '$gray800',
  padding: '3rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    h3: {
      marginBottom: '2rem',
    },

    button: {
      backgroundColor: 'transparent',
      border: 0,
      position: 'relative',
      bottom: '1.8rem',
      cursor: 'pointer',
      svg: {
        color: '#8D8D99',
      },
    },
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',

    div: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    'div:first-child': {
      color: '$gray300',
    },

    'div:nth-child(2)': {
      fontSize: '$md',
      fontWeight: 'bold',
      padding: '0.5rem 0 3.5rem 0',
    },

    button: {
      width: '24rem',
      padding: '1.25rem 0',
      backgroundColor: '$green500',
      color: 'white',

      fontSize: '$md',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 0,
      borderRadius: 8,
    },
  },

  variants: {
    collapsed: {
      true: { transform: 'translateX(0%)', opacity: 1 },
      false: { transform: 'translateX(110%)', opacity: 0 },
    },
  },
})

export const ButtonClose = styled('button', {})

export const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1.25rem',
  marginTop: '1rem',
})

export const ImageContainer = styled('div', {
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
})

export const InformationContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',

  text: {
    fontSize: '$md',
    color: '$gray300',
  },

  span: {
    fontWeight: 'bold',
    fontSize: '$md',
  },

  button: {
    fontWeight: 'bold',
    color: '$green500',
    padding: 0,
    width: '3.6rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
  },
})
