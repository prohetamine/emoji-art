import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import useWindowSize from '@charlietango/use-window-size'
import { useSelector, useDispatch } from 'react-redux'
import nameColors from './assets/name-colors.js'
import importImages from './lib/import-images'
import loadImage from './lib/load-images'
import delay from './lib/delay'
import intToHex from './lib/int-to-hex'
import rgbToHex from './lib/rgb-to-hex'
import getRGB from './lib/get-rgb'
import deltaE from './lib/delta-e'

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden; 
`

const Canvas = styled.canvas``

export default () => {
  const ref = useRef()
  const { width, height: _height } = useWindowSize()

  const dispatch = useDispatch()

  const file = useSelector(store => store.uploadFile)
      , hiddenLayer = useSelector(store => store.hiddenLayer)

  const height = _height - (63 + 49 + 18 + 18)

  const [state, setState] = useState({
    width: 0,
    height: 0,
    file: null,
    ctx: null,
    images: []
  })

  useEffect(() => {
    const images = {}
    Promise.all(
      Object.keys(nameColors).map(async key => {
        const image = await loadImage(importImages['./'+key])
        images[key] = image
      })
    ).then(() => {
      setState(state => ({
        ...state,
        images
      }))
    })
  }, [])

  useEffect(() => {
    setState(state => ({
      ...state,
      width: width,
      height: height
    }))
  }, [width])

  useEffect(() => {
    let _file = new Image()
    _file.onload = async () => {
      setState(
        state => ({
          ...state,
          file: _file
        })
      )
    }
    _file.src = file
  }, [file])

  useEffect(() => {
    if (width && state.file && state.file.src) {

      const _windowWidth = width > height
                            ? state.file.height > state.file.width
                              ? height > 900 ? 900 : height
                              : width > 1300 ? 1300 : width
                            : state.file.height > state.file.width
                              ? width > 1300 ? 1300 : width
                              : height > 900 ? 900 : height

      const _height = (state.file.height / state.file.width) * _windowWidth
          , _width = _windowWidth

      setState(
        state => ({
          ...state,
          height: _height,
          width: _width
        })
      )
    }
  }, [width, state.file && state.file.src])

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current
      const ctx = canvas.getContext('2d')

      setState(state => ({
        ...state,
        ctx
      }))
    }
  }, [ref.current])

  useEffect(() => {
    const ctx = state.ctx
        , file = state.file
        , width = parseInt(state.width)
        , height = parseInt(state.height)
        , images = state.images

    if (ctx && file && width && height && images) {
      dispatch({
        type: 'save-file',
        payload: null
      })

      ctx.clearRect(0, 0, width, height)

      ctx.drawImage(file, 0, 0, width, height)

      const imgData = ctx.getImageData(0, 0, width, height)

      if (hiddenLayer) {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)
      }

      let progress = 0
      const maxProgress = parseFloat(height * width)

      const timerIds = []

      for (let x = 0; x < width; x += 5) {
        for (let y = 0; y < height; y += 5) {
          const index = (y * imgData.width + x) * 4

          const red     = imgData.data[index]
              , green   = imgData.data[index+1]
              , blue    = imgData.data[index+2]

          const timeId = setTimeout(() => {
            progress += 5 * 5

            const _progerss = parseFloat(progress / maxProgress).toFixed(2) * 100

            dispatch({
              type: 'progress',
              payload: _progerss
            })

            const [{ key }] = Object.keys(nameColors).map(key => ({
              key,
              deltaE: deltaE(getRGB(nameColors[key]), [red, green, blue])
            }))
            .sort((a, b) => a.deltaE - b.deltaE)

            try {
              const size = parseInt(Math.random() * 2) + 10
              ctx.drawImage(images[key], x - size / 2, y - size / 2, size, size)
            } catch (e) {}

            if (_progerss === 100) {
              timerIds.forEach(
                timeId => clearTimeout(timeId)
              )

              dispatch({
                type: 'save-file',
                payload: ref.current.toDataURL('image/png')
              })

              dispatch({
                type: 'alert',
                payload: 'Draw done!'
              })
            }
          }, Math.random() * 100)

          timerIds.push(timeId)
        }
      }

      return () =>
        timerIds.forEach(
          timeId => clearTimeout(timeId)
        )
    }
  }, [state.ctx, state.file && state.file.src, state.width, state.height, state.images.length, hiddenLayer])

  const w = parseInt(state.width)
      , h = parseInt(state.height)

  return (
    <Body>
      <Canvas ref={ref} height={h} width={w} />
    </Body>
  )
}
