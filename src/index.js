import React from 'react'
import ReactDOM from 'react-dom'

const title = 'Spoke tension app'

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app'),
)

if (module.hot) {
  module.hot.accept()
}
