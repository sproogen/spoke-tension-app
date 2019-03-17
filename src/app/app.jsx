import React from 'react'
import SpokeTable from './spoke-table'

import './app.scss'

const App = () => (
  <SpokeTable
    spokeCount={16}
    toolId="x-tools"
    spokeId="round-1.8"
  />
)

export default App
