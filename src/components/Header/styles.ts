import { styled } from '@stitches/react'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  button: {
    padding: '0.75rem',
    border: 0,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: '$gray800',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    span: {
      color: '$white',
      padding: '0.125rem 0.5rem',
      backgroundColor: '$green500',
      borderRadius: 999,

      position: 'absolute',
      left: '2.2rem',
      bottom: '2.2rem',
    },

    svg: {
      color: '$gray300',
    },
  },
})
