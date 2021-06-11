import React from 'react'
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

const Header = () => (
  <Body href='https://github.com/prohetamine/emoji-art'>
    <Logo src={logo} />
    <Repository>
      Git<Bold>Hub</Bold>
    </Repository>
  </Body>
)

export default Header
