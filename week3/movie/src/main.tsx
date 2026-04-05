import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 이 부분이 있어야 합니다!
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)