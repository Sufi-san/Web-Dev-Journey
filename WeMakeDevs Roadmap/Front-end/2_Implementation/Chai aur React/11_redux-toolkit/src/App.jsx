import { useState, useRef } from 'react';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';

/*
Steps Involved: 

    1) Create/configure store. 
    - There is only one store which will be divided into 'slices'.
    - Think of slices and create them as well. A slice is a portion of your Redux state that a specific reducer manages.
    - A slice groups the state, actions, and reducer functions for a single feature, like a "user" slice or a "posts" slice.

    2) Create reducers within slices. 
    - Reducers are defined/assigned inside the slices we create, alongside the 'name' and 'initialState' for the slice.
    - We will need access to (export if required) the slice, its individual reducers, and the generated actions.

    3) Expose the store to the React application.
    - Use the `<Provider>` component from `react-redux` to wrap your root React component (e.g., `App.js`).
    - Pass the created Redux `store` as a prop to the `<Provider>`. This makes the store accessible to all components within the provider's scope.

    4) Interact with the store from React components.
    - Use the `useSelector` hook from `react-redux` to read data (state) from the store within your components.
    - Use the `useDispatch` hook from `react-redux` to get the `dispatch` function, which is used to dispatch actions to the store.
    - When an action is dispatched, the corresponding reducer in the relevant slice will update the state.
*/


function App() {

    const [input, setInput] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);

    const inputRef = useRef(null);

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleEditEnd() {
        setEditTodoId(null);
        setInput("");
    }

    function handleEditStart(todoId, todoText) {
        setEditTodoId(todoId);
        setInput(todoText);
        inputRef.current.focus();
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", backgroundColor: "#474747" }}>
            <AddTodo
                input={input}
                onInputChange={handleInputChange}
                inputRef={inputRef}
                editTodoId={editTodoId}
                onEditEnd={handleEditEnd}
            />
            <Todo editTodoId={editTodoId} onEditStart={handleEditStart} />
        </div>
    )
}

export default App
