import customReactDOM from './custom-react-dom.js'
import App from './App.js'

customReactDOM.createRoot(document.querySelector('#root')).customRender(
    App()
)