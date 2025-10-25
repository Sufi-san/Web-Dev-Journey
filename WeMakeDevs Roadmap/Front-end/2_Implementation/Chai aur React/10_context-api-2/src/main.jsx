import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TodoListProvider from "./contexts/TodoListProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoListProvider>
      <App />
    </TodoListProvider>
  </StrictMode>,
)
