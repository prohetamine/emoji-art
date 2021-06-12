import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import toBase64 from './lib/to-base64'
import downloadFile from './lib/download-file'

import logo from './assets/logo.svg'
import arrowBottomBlack from './assets/arrow-bottom-black.svg'
import arrowBottom from './assets/arrow-bottom.svg'
import arrowTopBlack from './assets/arrow-top-black.svg'
import arrowTop from './assets/arrow-top.svg'
import shareBlack from './assets/share-black.svg'
import share from './assets/share.svg'
import mark from './assets/mark.svg'
import markBlack from './assets/mark-black.svg'
import telegram from './assets/telegram.svg'
import telegramBlack from './assets/telegram-black.svg'

const Body = styled.div`
  width: 100%;
  background: #000000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 20px;
`

const ButtonFile = (() => {
  const Body = styled(motion.div)`
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 18px;
    width: 245px;
    height: 45px;
    background: #000000;
    border: 3px solid #F3DC1E;
    box-sizing: border-box;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    color: #F3DC1E;
  `

  const Img = styled.img`
    margin-left: 10px;
    height: 15px;
  `

  return ({ onChange }) => {
    const ref = useRef()
        , [active, setActive] = useState(false)

    useEffect(() => {
      if (ref.current) {
        const file = ref.current

        const _onChange = (e) => {
          if (e.target.files.length !== 0) {
            toBase64(e.target.files[0]).then(base64 => onChange(base64))
          }
        }

        file.addEventListener('change', _onChange)

        return () => file.removeEventListener('change', _onChange)
      }
    }, [ref.current, onChange])

    return (
      <div>
        <input ref={ref} type='file' name='file' id='file' hidden />
        <label htmlFor='file'>
          <Body
            animate={{ background: active ? '#F3DC1E' : '#000000' }}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onTouchStart={() => setActive(true)}
            onTouchEnd={() => setActive(false)}
          >
            <Text style={{ color: active ? '#000000' : '#F3DC1E' }}>Upload</Text>
            <Img src={active ? arrowTopBlack : arrowTop } />
          </Body>
        </label>
      </div>
    )
  }
})()

const Button = (() => {
  const Body = styled(motion.button)`
    padding: 0px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 18px;
    width: 245px;
    height: 45px;
    background: #000000;
    border: 3px solid #F3DC1E;
    box-sizing: border-box;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    color: #F3DC1E;
  `

  const Img = styled.img`
    margin-left: 10px;
    height: 15px;
  `

  return ({ label, icon, onClick }) => {
    const [active, setActive] = useState(false)

    return (
      <Body
        animate={{ background: active ? '#F3DC1E' : '#000000' }}
        onClick={onClick}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onTouchStart={() => setActive(true)}
        onTouchEnd={() => setActive(false)}
      >
        <Text style={{ color: active ? '#000000' : '#F3DC1E' }}>{label}</Text>
        <Img src={active ? icon[1] : icon[0] } />
      </Body>
    )
  }
})()

const ButtonCheckBox = (() => {
  const Body = styled(motion.button)`
    padding: 0px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 18px;
    height: 45px;
    width: 245px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    background: #000000;
    border: none;
    cursor: pointer;
  `

  const Box = styled(motion.div)`
    margin-right: 10px;
    width: 45px;
    height: 45px;
    background: #000000;
    border: 3px solid #F3DC1E;
    box-sizing: border-box;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    color: #F3DC1E;
  `

  const Img = styled.img`
    height: 20px;
    width: 20px;
  `

  return ({ label, onClick, value }) => {
    const [hover, setHover] = useState(false)

    return (
      <Body
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onClick()}
      >
        <Box animate={{ background: value ? hover ? '#F3DC1E' : '#000000' : hover ? '#F3DC1E' : '#000000' }}>
          {
            value
              ? <Img src={value ? hover ? markBlack : mark : hover ? markBlack : mark} />
              : null
          }
        </Box>
        <Text>{label}</Text>
      </Body>
    )
  }
})()

const By = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  color: #F3DC1E;
`

const Navigation = () => {
  const dispatch = useDispatch()
      , hiddenLayer = useSelector(store => store.hiddenLayer)
      , saveFile = useSelector(store => store.saveFile)

  return (
    <Body>
      <ButtonFile
        onChange={
          base64 => dispatch({ type: 'upload-file', payload: base64 })
        }
      />
      <Button
        label='Save'
        icon={[arrowBottom, arrowBottomBlack]}
        onClick={() => {
          if (saveFile) {
            downloadFile(saveFile)
          } else {
            dispatch({
              type: 'alert',
              payload: 'Draw wait!'
            })
          }
        }}
      />
      <ButtonCheckBox
        label='Hidden layer'
        value={hiddenLayer}
        onClick={() => dispatch({ type: 'hidden-layer' })}
      />
      <Button
        label='Share'
        icon={[share, shareBlack]}
        onClick={() => dispatch({ type: 'share' })}
      />
      <Button
        label='Telegram'
        icon={[telegram, telegramBlack]}
        onClick={() => window.open('https://t.me/prohetamine_emojiart')}
      />
    <By>By <a href='https://github.com/prohetamine'>Prohetamine</a> 2021</By>
    </Body>
  )
}

export default Navigation
