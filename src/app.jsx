import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Alert from './alert'
import ShareAlert from './share-alert'
import Header from './header'
import Progress from './progress'
import Canvas from './canvas'
import Navigation from './navigation'

const App = () => (
  <>
    <Alert />
    <ShareAlert />
    <Header />
    <Canvas />
    <Progress />
    <Navigation />
  </>
)

export default App
