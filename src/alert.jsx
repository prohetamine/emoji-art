import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const Body = styled.div`
  position: fixed;
  z-index: 999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(46, 46, 46, 0.84);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
`

const Message = styled.div`
  padding: 14px 24px;
  background: #F3DC1E;
  border-radius: 9px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Alert = () => {
  const dispatch = useDispatch()
  const { message, isShow } = useSelector(store => store.alert)
  return isShow
          ? (
            <Body onClick={() => dispatch({ type: 'hidden-alert' })}>
              <Message>{message}</Message>
            </Body>
          )
          : null
}

export default Alert
