import { createContext, useContext } from "react";

export const TodoListContext = createContext({
    todoList: [{id: 0, todoMsg: "Default Todo", completed: false}] 
    // should preferably be empty, but this explains todo object structure
});

export const TodoMethodsContext = createContext({
    addTodo: (newTodo) => { },
    editTodo: (id, todoMsg) => { },
    deleteTodo: (id) => { },
    toggleCompleted: (id) => { }
});

export const useTodo = () => {
    return useContext(TodoListContext);
};

export const useTodoMethods = () => {
    return useContext(TodoMethodsContext);
}