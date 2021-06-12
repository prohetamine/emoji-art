import React from 'react'
import useWindowSize from '@charlietango/use-window-size'
import styled from 'styled-components'
import logo from './assets/logo.svg'

const Body = styled.a`
  width: 100%;
  height: 63px;
  display: flex;
  text-decoration: none;
  justify-content: space-between;
  align-items: center;
  background: #F3DC1E;
`

const Logo = styled.img`
  width: 109.12px;
  height: 48.7px;
  margin-left: 13px;
`

const Repository = styled.div`
  display: flex;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 29px;
  line-height: 34px;
  color: #000000;
  margin-right: 13px;
`

const Bold = styled.div`
  font-weight: 500;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.06em;
  color: #000000;
`

const Header = () => {
  const { width } = useWindowSize()

  return (
    <Body href='https://github.com/prohetamine/emoji-art'>
      <Logo src={logo} />
      <Title><span style={{ fontWeight: '900' }}>Emoji Art</span>{width > 784 ? '— new creativity, images from emoji' : ''}</Title>
      <Repository>
        Git<Bold>Hub</Bold>
      </Repository>
    </Body>
  )
}

export default Header
