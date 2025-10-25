import Comp1 from './Comp1.js';
import Link from './Link.js'

function App() {
    const reactComponent = {
        type: 'ReactComponent',
        props: {
            id: 'app-div',
            style: `
                display: flex; 
                justify-content: center;
                align-items: center; 
                color: #f5f5f5; 
                background-color: #474747; 
                font-family: Helvetica
            `,
        },
        children: [
            Comp1(), Link(), Comp1()
        ]
    }
    return reactComponent;
}

export default App;