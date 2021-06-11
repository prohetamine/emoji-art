import React from 'react'
import styled from 'styled-components'
import logo from './assets/logo.svg'
import { motion } from 'framer-motion'
import useWindowSize from '@charlietango/use-window-size'
import { useSelector } from 'react-redux'

const Line = styled(motion.div)`
  position: absolute;
  z-index: 1;
  width: 169px;
  height: 6px;
  border-radius: 9px;
  background: #F3DC1E;
`

const Progress = () => {
  const value = useSelector(store => store.progress)
  const { width } = useWindowSize()
      , progress = (width / 100) * parseInt(value)
  return (
    <Line animate={{ width: progress }} />
  )
}

export default Progress
