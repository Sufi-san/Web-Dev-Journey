import { createSlice, nanoid } from "@reduxjs/toolkit"; // redux provides nanoid by default 

const initialState = {  
    // we will use the property name 'todos' to access this state using 'useSelector()'
    todos: [ 
        { id: 1, text: "Hello", completed: false } // default data for understanding structure
    ]
};

export const todoSlice = createSlice({
    name: "todo", // this name shows up in redux dev tools extension during debugging
    initialState,
    reducers: {
        // We can use mutable instructions because internally redux uses immer
        // It thus converts mutable update instructions to immutable ones automatically
        addTodo: (state, action) => {
            const nextTodo = {
                id: nanoid(),
                text: action.payload, // in this case, we only pass the string value of the next todo as a payload, not an object
                completed: false
            }
            state.todos.push(nextTodo);
        },
        editTodo: (state, action) => {
            // console.log(action);
            const editedTodo = state.todos.find((todo) => todo.id == action.payload.id);
            editedTodo.text = action.payload.text;
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload);
        },
        toggleCompleted: (state, action) => {
            const toggledTodo = state.todos.find((todo) => todo.id == action.id);
            toggledTodo.completed = !toggledTodo.completed;
        }
    }
});

/*
    slice.actions: 
    - This is an object containing automatically generated action creators for each "reducer" function defined within the reducers field of your createSlice configuration. 
    - These action creators are functions that, when called, return an action object with a 'type' property corresponding to the reducer's name and a 'payload' property containing any arguments passed to the action creator. 
    - You 'dispatch' these action creators from your components or other parts of your application to trigger state changes.
*/
// below line exports these action creators individually, separate from the slice
export const { addTodo, editTodo, removeTodo, toggleCompleted } = todoSlice.actions;

/*
    slice.reducer: 
    - This is the actual slice reducer function that createSlice generates. 
    - It's a single, combined reducer that handles all the actions defined within that specific slice. 
    - This reducer takes the current state and an action as arguments, and based on the action's type, it applies the corresponding logic (defined in your reducers functions) to produce a new state. 
    - This slice.reducer is then typically combined with other slice reducers using combineReducers to form the root reducer for your Redux store.
*/
// the redux 'stores' are restricitive, we need to export the reducer function created by a slice and register them under the store so that the store allows state updation using those reducers.
export default todoSlice.reducer;

/*
    slice.actions: provides the tools (action creators) to initiate state changes.
    
    slice.reducer: is the mechanism that executes those state changes and updates the state according to the dispatched actions.
*/

