import { useEffect, useReducer } from "react";
import { TodoListContext, TodoMethodsContext } from "./todoContext";
import { nanoid } from "nanoid";

export default function TodoProvider({ children }) {

    const [todoList, dispatch] = useReducer(todoReducer, []);

    const addTodo = (todoMsg) => { dispatch({ type: "Add", todoMsg }); };
    const editTodo = (id, todoMsg) => { dispatch({ type: "Edit", id, todoMsg }); };
    const deleteTodo = (id) => { dispatch({ type: "Delete", id }); };
    const toggleCompleted = (id) => { dispatch({ type: "Toggle", id }); };

    // initialize list on mount
    useEffect(() => {
        try {
            const savedTodoString = localStorage.getItem("savedTodoList");
            const savedTodoList = JSON.parse(savedTodoString);
            
            if(savedTodoList && savedTodoList.length > 0) {
                dispatch({type: "Initialize", todoList: savedTodoList});
            }
        }
        catch(e) {
            console.error(e);
        }
    }, []);

    // track state and update in local storage
    useEffect(() => {
        try {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
        catch (e) {
            console.error(e);
        }
    }, [todoList]);

    return (
        <TodoListContext value={{ todoList }}>
            <TodoMethodsContext value={{ addTodo, editTodo, deleteTodo, toggleCompleted }}>
                {children}
            </TodoMethodsContext>
        </TodoListContext>
    );
}

function todoReducer(list, action) {
    switch (action.type) {
        case "Initialize": {
            return action.todoList;
        }
        case "Add": {
            const addedTodo = {
                id: nanoid(),
                todoMsg: action.todoMsg,
                completed: false
            }

            const nextList = [...list, addedTodo];
            return nextList;
        }
        case "Edit": {
            const nextList = list.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, todoMsg: action.todoMsg };
                }
                return todo;
            })
            return nextList;
        }
        case "Delete": {
            const nextList = list.filter(todo => todo.id != action.id);
            return nextList;
        }
        case "Toggle": {
            const nextList = list.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            });
            return nextList;
        }
        default: {
            throw new Error(`Operation ${action.type} not supported.`);
        }
    }
}